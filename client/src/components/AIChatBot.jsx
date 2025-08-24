import {
  Avatar,
  Box,
  Grid2,
  IconButton,
  Input,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { easeIn, easeInOut, motion } from "framer-motion";
import img1 from "../assets/678a4aae3ee9f2e87506de82_Clyde (1).webp";
import { InputBox } from "../styledComponent/styld";
import SendIcon from "@mui/icons-material/Send";
import NavBar from "./NavBar";
import useIsMobile from "../shared/useIsMobile";

const API_URL = "https://chillzone-tif5.onrender.com";

function AIChatBot() {
  const isMobile = useIsMobile();
  const [message, setMessage] = useState("");
  const [content, setContents] = useState(
    localStorage.getItem("content") || "How can i help you"
  );
  const [userPrompt, setUserPrompt] = useState(
    localStorage.getItem("userPrompt") || ""
  );
  const [loading, setLoading] = useState(false);
  const handlemsg = async () => {
    setUserPrompt(message);
    localStorage.setItem("userPrompt", message);
    setLoading(true);
    const response = await axios.post(
      `${API_URL}/user/aiChat`,
      { prompt: message },
      { withCredentials: true }
    );
    setLoading(false);
    setMessage("");
    setContents(response?.data?.message);
    localStorage.setItem("content", response?.data?.message);
    console.log(response.data);
  };
  
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: "linear-gradient(135deg, #5B50A0 30%, #3A2F7A 90%)",
      }}
    >
      <NavBar />
      <Box sx={{ height: `calc(100vh - 64px)` }}>
        <Grid2 container spacing={1} sx={{ height: "100%" }} direction={isMobile?"column-reverse":"row"}>
          <Grid2
            size={isMobile?12:4}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Paper
                sx={{
                  display: "flex",
                  gap: 1.2,
                  background: "rgba(255, 255, 255, 0.1)",
                  maxWidth: "250px",
                  width: "100%",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  p: 1.2,
                  borderRadius: "1px 25px 25px 25px",
                  position: "relative",
                  left: isMobile ? "0%" : "30%",
                  margin:isMobile?"0 auto":"0"
                }}
              >
                <Avatar></Avatar>
                <Box>
                  <Typography
                    color="white"
                    fontFamily={"monospace"}
                    fontWeight={"bold"}
                  >
                    You
                  </Typography>
                  <Typography
                    sx={{
                      maxWidth: "250px",
                      color: "white",
                      fontFamily: "monospace",
                      fontSize: "15px",
                    }}
                  >
                    {userPrompt}
                  </Typography>
                </Box>
              </Paper>
            </Box>

            {/* Input box fixed at bottom */}
            <Box
              sx={{
                display: "flex",
                padding: "16px",
                backgroundColor: "transparent",
              }}
            >
              <InputBox
                placeholder="Type a message...."
                value={message}
                type="text"
                onChange={(e) => setMessage(e.target.value)}
                sx={{ flexGrow: 1, marginRight: "10px" }}
              />
              <IconButton onClick={handlemsg} disabled={!message?.trim()}>
                <SendIcon />
              </IconButton>
            </Box>
          </Grid2>

          <Grid2
            size={8}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ height: "100%" }}>
              <Box
                sx={{
                  maxWidth: "350px",
                  position: "relative",
                }}
              >
                <Paper
                  sx={{
                    display: "flex",
                    gap: 1.2,
                    background: "rgba(255, 255, 255, 0.1)",
                    maxWidth: "400px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    p: 1.2,
                    borderRadius: "4px 14px 14px 14px",
                    position: "relative",
                    mt: "20px",
                    left: "30%",
                    maxHeight: "500px",
                    overflowY: "auto",
                    "&::-webkit-scrollbar": {
                      display: "none",
                    },
                  }}
                >
                  <Avatar></Avatar>
                  <Box>
                    <Typography
                      color="white"
                      fontFamily={"monospace"}
                      fontWeight={"bold"}
                    >
                      AI Chat
                    </Typography>
                    <Typography
                      sx={{
                        maxWidth: "250px",
                        color: "white",
                        fontFamily: "monospace",
                        fontSize: "15px",
                      }}
                    >
                      {loading ? "Thinking..." : content}
                    </Typography>
                  </Box>
                </Paper>
              </Box>
              <Box sx={{ position: "absolute", left: "60%", top: "30%" ,display:isMobile?"none":"block"}}>
                <Paper
                  sx={{
                    background: "rgba(255, 255, 255, 0.1)",
                    width: "60px",
                    height: "60px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    borderRadius: "50%",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    position: "relative",
                    left: "50%",
                  }}
                ></Paper>
                <Paper
                  sx={{
                    background: "rgba(255, 255, 255, 0.1)",
                    width: "45px",
                    height: "45px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    borderRadius: "50%",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    position: "relative",
                    left: "180%",
                    mt: "7%",
                  }}
                ></Paper>
                <Paper
                  sx={{
                    background: "rgba(255, 255, 255, 0.1)",
                    width: "30px",
                    height: "30px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    borderRadius: "50%",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    position: "relative",
                    left: "300%",
                    mt: "15%",
                  }}
                ></Paper>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                height: "100%",
              }}
            >
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: easeInOut,
                }}
              >
                <img
                  src={img1}
                  alt="AIBot"
                  width={"400px"}
                  height={"400px"}
                  style={{display:isMobile?"none":"block"}}
                ></img>
              </motion.div>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
}

export default AIChatBot;
