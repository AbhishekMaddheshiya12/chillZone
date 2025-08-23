import { Avatar, Box, Grid2, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Profile from "../user/Profile";
import NavBar from "../components/NavBar";
import image1 from "../assets/678a4aae3ee9f2e87506de82_Clyde (1).webp";
import { motion } from "framer-motion";
import CreateRoom from "./CreateRoom.jsx";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import useIsMobile from "../shared/useIsMobile";

const API_URL = "https://chillzone-tif5.onrender.com";

function Rooms() {
  const { user } = useSelector((state) => state.auth);
  const isMobile = useIsMobile();
  // console.log(user);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const getRooms = async () => {
      try {
        const config = {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        };
        const response = await axios.get(
          `${API_URL}/user/getMyChats`,
          config
        );
        // console.log(response?.data?.transformedChats);
        setRooms(response?.data?.transformedChats);
      } catch (error) {
        console.log(error);
      }
    };
    getRooms();
  }, [user]);

  return (
    <Box sx={{ height: "100vh" }}>
      <Box>
        <NavBar />
      </Box>
      <Box>
        <Grid2 container spacing={2} sx={{display:"flex",flexDirection:isMobile?"column":"row"}}>
          <Grid2 size={isMobile?12:3}>
            <Profile />
            <CreateRoom />
          </Grid2>
          <Grid2
            size={isMobile?12:6}
            sx={{
              overflowY: "auto",
              height: {
                xs: "calc(100vh - 115px)",
                md: "calc(100vh - 115px)",
              },
              overflow: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {rooms.map((room) => (
              <Link
                to={`/chatterPage/${room._id}`}
                key={room._id}
                style={{ textDecoration: "none" }}
              >
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    bgcolor: "",
                    mt: 4,
                    borderRadius: 20,
                  }}
                >
                  <Box>
                    <Avatar alt={room.name} src={room.avatar} />
                  </Box>
                  <Box>
                    <Typography color="text.primary">{room.name}</Typography>
                    <Typography color="text.secondary">
                      {room.members?.length} Members
                    </Typography>
                  </Box>
                </Paper>
              </Link>
            ))}
          </Grid2>
          <Grid2
            size={3}
            sx={{
              display: isMobile?"none": "flex",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <Box>
              <motion.div
                animate={{ y: [0, 100, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              >
                <img src={image1}></img>
              </motion.div>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
}

export default Rooms;
