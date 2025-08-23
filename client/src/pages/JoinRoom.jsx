import axios from "axios";
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";
import { Lock, Group, ArrowForward } from "@mui/icons-material";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

const API_URL = "https://chillzone-tif5.onrender.com";

const JoinRoom = () => {
  const [groupName, setGroupName] = useState("");
  const [passkey, setPassKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleJoin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };

    const data = { groupName, passkey };

    try {
      const response = await axios.post(
        `${API_URL}/user/joinGroup`,
        data,
        config
      );
      console.log(response);
      if(response.data.success){
        const chatId = response?.data?.chatId;
        navigate(`/chatterPage/${chatId}`);
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Failed to join room");
    } finally {
      setLoading(false);
    }
  };

  const chatMessages = [
    {
      id: 1,
      text: "Welcome to the group!",
      subtext: " Join the conversation",
      position: "right",
      delay: 0.5,
    },
    {
      id: 2,
      text: "Enter the passkey",
      subtext: " To join private rooms",
      position: "left",
      delay: 1,
    },
    {
      id: 3,
      text: "Team meeting at 3PM",
      subtext: " Don't forget!",
      position: "right",
      delay: 1.5,
    },
    {
      id: 4,
      text: "New project files added",
      subtext: " Check them out",
      position: "left",
      delay: 2,
    },
    {
      id: 5,
      text: "Let's collaborate!",
      subtext: " Share your ideas",
      position: "right",
      delay: 2.5,
    },
  ];

  const userAvatars = [
    { id: 1, color: "#FF9AA2", name: "JD" },
    { id: 2, color: "#FFB7B2", name: "AM" },
    { id: 3, color: "#FFDAC1", name: "TS" },
    { id: 4, color: "#E2F0CB", name: "KP" },
  ];

  return (
    <Box sx={{height: "100vh",overflowY:"hidden"}}>
      <Box>
        <NavBar></NavBar>
      </Box>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#6C60CF",
          padding: 2,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            zIndex: 0,
          }}
        >
          {chatMessages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: message.delay }}
              style={{
                position: "absolute",
                top: `${15 + message.id * 12}%`,
                [message.position]: `${10 + (message.id % 3) * 5}%`,
                zIndex: 1,
              }}
            >
              <Paper
                sx={{
                  p: 2,
                  borderRadius:
                    message.position === "right"
                      ? "18px 18px 0 18px"
                      : "18px 18px 18px 0",
                  background:
                    "white",
                  maxWidth: "200px",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Avatar
                    sx={{
                      bgcolor:
                        userAvatars[message.id % userAvatars.length].color,
                      width: 24,
                      height: 24,
                      fontSize: "0.75rem",
                      mr: 1,
                    }}
                  >
                    {userAvatars[message.id % userAvatars.length].name}
                  </Avatar>
                  <Typography
                    variant="body2"
                    sx={{ color: "#2d3748", fontWeight: 500 }}
                  >
                    {message.text}
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  sx={{ color: "#64748b", alignSelf: "flex-end" }}
                >
                  {message.subtext}
                </Typography>
              </Paper>
            </motion.div>
          ))}

          {userAvatars.map((user, index) => (
            <motion.div
              key={`user-${user.id}`}
              initial={{
                y: 50 + Math.random() * 100,
                x: Math.random() * 100,
                opacity: 0,
              }}
              animate={{
                y: [0, 20, 0],
                opacity: 1,
              }}
              transition={{
                duration: 8 + index * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5,
              }}
              style={{
                position: "absolute",
                top: `${20 + index * 15}%`,
                left: `${70 + (index % 2) * 10}%`,
                zIndex: 1,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: user.color,
                  width: 40,
                  height: 40,
                  fontSize: "1rem",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
              >
                {user.name}
              </Avatar>
            </motion.div>
          ))}
        </Box>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ zIndex: 2 }}
        >
          <Paper
            elevation={6}
            sx={{
              width: "100%",
              maxWidth: 500,
              p: 4,
              borderRadius: 4,
              background: "rgba(255,255,255,0.95)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              position: "relative",
              overflow: "hidden",
              backdropFilter: "blur(5px)",
              border: "1px solid rgba(255,255,255,0.2)",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "4px",
                height: "100%",
                background: "linear-gradient(to bottom, #667eea, #764ba2)",
              },
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Typography
                variant="h4"
                sx={{
                  mb: 1,
                  fontWeight: 700,
                  color: "#2d3748",
                  textAlign: "center",
                }}
              >
                Join a Room
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  color: "#718096",
                  textAlign: "center",
                }}
              >
                Enter the group details to join the conversation
              </Typography>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <Box
                  sx={{
                    mb: 3,
                    p: 2,
                    background: "rgba(255, 99, 71, 0.1)",
                    borderRadius: "8px",
                    borderLeft: "3px solid #ff6347",
                  }}
                >
                  <Typography variant="body2" color="error">
                    {error}
                  </Typography>
                </Box>
              </motion.div>
            )}

            <Box
              component="form"
              onSubmit={handleJoin}
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <TextField
                  fullWidth
                  label="Group Name"
                  variant="outlined"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Enter the name of the group"
                  required
                  InputProps={{
                    startAdornment: <Group sx={{ color: "#667eea", mr: 1 }} />,
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      backgroundColor: "rgba(248, 250, 252, 0.7)",
                      "& fieldset": {
                        borderColor: "rgba(226, 232, 240, 0.5)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(203, 213, 224, 0.7)",
                      },
                    },
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <TextField
                  fullWidth
                  label="Passkey"
                  type="password"
                  variant="outlined"
                  value={passkey}
                  onChange={(e) => setPassKey(e.target.value)}
                  placeholder="Enter the password"
                  required
                  InputProps={{
                    startAdornment: <Lock sx={{ color: "#667eea", mr: 1 }} />,
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      backgroundColor: "rgba(248, 250, 252, 0.7)",
                      "& fieldset": {
                        borderColor: "rgba(226, 232, 240, 0.5)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(203, 213, 224, 0.7)",
                      },
                    },
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  endIcon={<ArrowForward />}
                  sx={{
                    mt: 2,
                    py: 1.5,
                    borderRadius: "12px",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    fontWeight: 600,
                    fontSize: "1rem",
                    textTransform: "none",
                    boxShadow: "0 4px 6px rgba(101, 116, 234, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 12px rgba(101, 116, 234, 0.4)",
                      background:
                        "linear-gradient(135deg, #5a6fd1 0%, #6a4495 100%)",
                    },
                  }}
                >
                  {loading ? "Joining..." : "Join Room"}
                </Button>
              </motion.div>
            </Box>
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
};

export default JoinRoom;
