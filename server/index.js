import express from "express";
import { dbConnect } from "./config/database.js";
import { Server } from "socket.io";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.js";
import socketAuthenticator from "./middleware/socket.js";
import { v4 as uuidv4 } from 'uuid';
import { Message } from "./models/Message.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';
import User from "./models/User.js";
// import { Message } from "./models/Message.js";

const app = express(); // create the instance of the express server
const server = createServer(app); // This creates an HTTP server using the Express app
dotenv.config();
const allowedOrigins = [
  "http://localhost:5173",
  "https://chill-zone-alpha.vercel.app"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

const io = new Server(server, { cors: corsOptions });

app.set("io", io); // store the instance of socket.io in the app object

const userSocketIDs = new Map(); // Map to track user socket IDs

dbConnect(process.env.MONGO_URL); // connect to the database
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


app.use(express.json()); // middleware to parse JSON data sent in the request body
app.use(cookieParser()); // middleware to parse cookies sent in the request header
app.use(cors(corsOptions));

app.use("/user", userRouter); // route the request to the userRouter

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.use((socket, next) => {
  cookieParser()(socket.request, socket.request.res, async (err) => await socketAuthenticator(err, socket, next));
});

function getSockets(members) {
  return members
    .map((member) => userSocketIDs.get(member._id.toString()))
    .filter(Boolean); // Exclude undefined socket IDs
}

io.on("connection", (socket) => {
  const user = socket.user;

  if (!user || !user._id) {
    console.error("Invalid user, disconnecting socket");
    return socket.disconnect(true);
  }

  console.log("A user is connected:", socket.id, "User ID:", user._id);
  userSocketIDs.set(user._id.toString(), socket.id);

  console.log("UserSocketIDs Map:", Array.from(userSocketIDs.entries()));

  socket.on("NEW_MESSAGE", async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuidv4(),
      sender: await User.findById(user._id).lean().select("name"),
      chat: chatId,
      createdAt: new Date(),
    };

    const messageForDB = {
      content: message,
      sender: await User.findById(user._id).lean().select("name"),
      chat: chatId,
      createdAt: new Date(),
    }
    console.log("Members:", members);
    console.log("UserSocketIDs Keys:", Array.from(userSocketIDs.keys()));

    const membersSockets = getSockets(members);

    if (membersSockets.length > 0) {
      membersSockets.forEach((socketId) => {
        io.to(socketId).emit("NEW_MESSAGE", {
          chatId,
          message: messageForRealTime,
        });
      });

      try{
        await Message.create(messageForDB);
      }catch(err){
        console.log(err);
      }
    } else {
      console.error("No connected sockets found for members:", members);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", user._id, socket.id);
    userSocketIDs.delete(user._id.toString());
  });
});

const emitEvent = (req,users,event,data) =>{
  const userSocket = getSockets(users)
  io.to(userSocket).emit(event,data);
}

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export { userSocketIDs ,cloudinary,emitEvent};
