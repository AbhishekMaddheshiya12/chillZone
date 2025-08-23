import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import ChatRoom from "./components/ChatRoom.jsx";
import CreateRoom from "./pages/CreateRoom.jsx";
import JoinRoom from "./pages/JoinRoom";
import Chatpages from "./pages/Chatpages";
import Login from "./components/Login";
import { Box } from "@mui/material";
import HomePage from "./pages/HomePage";
import ChatterPage from "./pages/ChatterPage";
import AboutUs from "./pages/AboutUs";
import Rooms from "./pages/Rooms";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { userExist, userNotExists } from "./redux/reducers/auth";
import ProtectedComponent from "./protected/ProtectedComponent";
import Loader from "./protected/Loader";
import EditProfile from "./pages/EditProfile";

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
        const data = await axios.get(`${API_URL}/user/me`,config);
        // console.log(data);
        dispatch(userExist(data.data.details));
      } catch (error) {
        // console.log(error);
        dispatch(userNotExists());
      } finally {
        setAuthChecked(true);
      }
    };
    getMe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader></Loader>}>
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
              <ProtectedComponent
                user={user}
                authChecked={authChecked}
              ></ProtectedComponent>
            }
          >
            <Route path="/join" element={<JoinRoom />} />
            <Route path="/chat/:room" element={<ChatRoom />} />
            <Route path="/createroom" element={<CreateRoom />}></Route>
            <Route path="/chatPages" element={<Chatpages />}></Route>
            <Route path="/home" element={<Rooms></Rooms>}></Route>
            <Route path="/aboutus" element={<AboutUs></AboutUs>}></Route>
            <Route path="/editProfile" element={<EditProfile/>}></Route>
            <Route
              path="/chatterPage/:chatId"
              element={<ChatterPage></ChatterPage>}
            ></Route>
          </Route>
          <Route path="/" element={<HomePage></HomePage>}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
