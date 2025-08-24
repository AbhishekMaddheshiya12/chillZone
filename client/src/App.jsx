import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { userExist, userNotExists } from "./redux/reducers/auth";
import ProtectedComponent from "./protected/ProtectedComponent";
import Loader from "./protected/Loader";

// Lazy load components
const Signup = React.lazy(() => import("./components/Signup"));
const ChatRoom = React.lazy(() => import("./components/ChatRoom.jsx"));
const CreateRoom = React.lazy(() => import("./pages/CreateRoom.jsx"));
const JoinRoom = React.lazy(() => import("./pages/JoinRoom"));
const Chatpages = React.lazy(() => import("./pages/Chatpages"));
const Login = React.lazy(() => import("./components/Login"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const ChatterPage = React.lazy(() => import("./pages/ChatterPage"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));
const Rooms = React.lazy(() => import("./pages/Rooms"));
const EditProfile = React.lazy(() => import("./pages/EditProfile"));
const AIChatBot = React.lazy(() => import("./components/AIChatBot.jsx"));

const API_URL = "https://chillzone-tif5.onrender.com";

const App = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMe = async () => {
      try {
        const config = {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        };
        const data = await axios.get(`${API_URL}/user/me`, config);
        dispatch(userExist(data.data.details));
      } catch (error) {
        dispatch(userNotExists());
      } finally {
        setAuthChecked(true);
      }
    };
    getMe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/register"
            element={
              <ProtectedComponent user={!user} authChecked={authChecked}>
                <Signup />
              </ProtectedComponent>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            element={
              <ProtectedComponent user={user} authChecked={authChecked} />
            }
          >
            <Route path="/join" element={<JoinRoom />} />
            <Route path="/chat/:room" element={<ChatRoom />} />
            <Route path="/createroom" element={<CreateRoom />} />
            <Route path="/chatPages" element={<Chatpages />} />
            <Route path="/home" element={<Rooms />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/editProfile" element={<EditProfile />} />
            <Route path="/ai" element={<AIChatBot />} />
            <Route path="/chatterPage/:chatId" element={<ChatterPage />} />
          </Route>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;