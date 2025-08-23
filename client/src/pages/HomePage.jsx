import { Avatar, Box, Button, Grid2, Paper, Typography } from "@mui/material";
import React from "react";
import NavBar from "../components/NavBar";
import { TypeAnimation } from "react-type-animation";
import img1 from "../assets/678a4aae3ee9f2e87506de82_Clyde (1).webp";
import { motion } from "framer-motion";
import OpenBox from "../components/OpenBox";
import Footer from "../components/Footer";
import useIsMobile from "../shared/useIsMobile";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const chatMessages = [
    {
      id: 1,
      text: "Welcome to the group!",
      subtext: "Join the conversation",
      position: "right",
      delay: 0.5,
    },
    {
      id: 2,
      text: "Enter the passkey",
      subtext: "To join private rooms",
      position: "left",
      delay: 1,
    },
    {
      id: 3,
      text: "Team meeting at 3PM",
      subtext: "Don't forget!",
      position: "right",
      delay: 1.5,
    },
    {
      id: 4,
      text: "New project files added",
      subtext: "Check them out",
      position: "left",
      delay: 2,
    },
    {
      id: 5,
      text: "Let's collaborate!",
      subtext: "Share your ideas",
      position: "right",
      delay: 2.5,
    },
  ];

  return (
    <div>
      <Box
        sx={{
          bgcolor: "#5B50A0",
          backgroundImage: "linear-gradient(135deg, #5B50A0 30%, #3A2F7A 90%)",
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1), transparent 60%)",
            zIndex: 0,
            opacity: 0.4,
          },
        }}
      >
        <NavBar sx={{ py: isMobile ? 0 : 2, pt: isMobile ? 0 : 2, pb: isMobile ? 0 : 2, m: 0 }} />

        <Grid2
          container
          spacing={isMobile ? 1 : 3}
          sx={{
            minHeight: isMobile? "100%" : "100vh",
            flexDirection: isMobile ? "column-reverse" : "row",
            px: isMobile ? 2 : 5,
            py: isMobile ? 0 : 4,
            pt: isMobile ? 0 : 4,
            m: 0,
            position: "relative",
            zIndex: 1,
            alignItems: isMobile ? "center" : "stretch",
          }}
        >
          <Grid2
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              mt: isMobile ? 0 : "5%",
              m: 0,
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                maxWidth: isMobile ? "90%" : "700px",
                margin: 0,
                padding: isMobile ? "0.3rem" : "2rem",
                color: "white",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <TypeAnimation
                  sequence={[
                    "Connect and share",
                    1000,
                    "Laugh and learn",
                    1000,
                    "Build community",
                    1000,
                    "Explore ideas",
                    1000,
                    "Chat and create",
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  style={{
                    fontSize: isMobile ? "1.4rem" : "2.8rem",
                    display: "inline-block",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    lineHeight: 1.3,
                    background: "linear-gradient(45deg, #F0F4FF, #A5B4FC)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: isMobile ? "0.3rem" : "1.5rem",
                    textShadow: "0 2px 4px rgba(0,0,0,0.15)",
                  }}
                  repeat={Infinity}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: isMobile ? "0.8rem" : "1.2rem",
                    lineHeight: 1.5,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    color: "#D1D5DB",
                    mt: isMobile ? 0.8 : 3,
                    mb: isMobile ? 1 : 3,
                    px: isMobile ? 0.5 : 2,
                    opacity: 0.9,
                  }}
                >
                  Join our vibrant community to connect, collaborate, and grow. Customize your space to chat, play, and build lasting connections.
                </Typography>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button
                  variant="contained"
                  sx={{
                    fontSize: isMobile ? "0.7rem" : "1rem",
                    fontWeight: 600,
                    fontFamily: "'Poppins', sans-serif",
                    padding: isMobile ? "5px 14px" : "12px 30px",
                    borderRadius: "16px",
                    background: "linear-gradient(45deg, #F472B6 30%, #FBBF24 90%)",
                    boxShadow: "0 4px 15px rgba(244, 114, 182, 0.3)",
                    transition: "all 0.3s ease",
                    textTransform: "none",
                    "&:hover": {
                      background: "linear-gradient(45deg, #FBBF24 30%, #F472B6 90%)",
                      boxShadow: "0 6px 20px rgba(244, 114, 182, 0.5)",
                      transform: "translateY(-2px)",
                    },
                  }}
                  onClick={() => navigate("/register")}
                >
                  Join Now
                </Button>
              </motion.div>
            </Box>
          </Grid2>
          <Grid2
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              m: 0,
              p: 0,
            }}
          >
            <Box sx={{ position: "relative", width: "100%", textAlign: "center", m: 0, p: 0 }}>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              >
                <img
                  alt="Community illustration"
                  src={img1}
                  style={{
                    width: isMobile ? "70%" : "450px",
                    height: isMobile ? "auto" : "450px",
                    maxWidth: "100%",
                    objectFit: "contain",
                    filter: "drop-shadow(0 6px 15px rgba(0,0,0,0.2))",
                    m: 0,
                  }}
                />
              </motion.div>
              {chatMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: message.delay, type: "spring", stiffness: 100 }}
                  style={{
                    position: "absolute",
                    top: isMobile
                      ? `${1 + message.id * 8}%`
                      : `${10 + message.id * 8}%`,
                    [message.position]: isMobile
                      ? `${(message.id % 2) * 8}%`
                      : message.position === "left"
                      ? `${(message.id % 4) * 20}%`
                      : `${(message.id % 3) * 10}%`,
                    zIndex: 2,
                    width: isMobile ? "100px" : "180px",
                  }}
                >
                  <Paper
                    sx={{
                      display: "flex",
                      gap: isMobile ? 0.5 : 1.2,
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      maxWidth: isMobile ? "100px" : "180px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      p: isMobile ? 0.5 : 1.2,
                      borderRadius:
                        message.position === "right"
                          ? "14px 14px 4px 14px"
                          : "4px 14px 14px 14px",
                      transition: "transform 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-3px)",
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: isMobile ? 18 : 32,
                        height: isMobile ? 18 : 32,
                        bgcolor: "#A5B4FC",
                        border: "1px solid #E0E7FF",
                      }}
                    />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontSize: isMobile ? "0.55rem" : "0.8rem",
                          fontWeight: 600,
                          color: "#F0F4FF",
                        }}
                      >
                        {message.text}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: isMobile ? "0.4rem" : "0.6rem",
                          color: "#D1D5DB",
                          opacity: 0.85,
                        }}
                      >
                        {message.subtext}
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              ))}
            </Box>
          </Grid2>
        </Grid2>

        <OpenBox />
        <Footer />
      </Box>
    </div>
  );
}

export default HomePage;