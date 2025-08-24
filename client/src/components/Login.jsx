import React, { useState } from "react";
import { Box, Button, Paper, TextField, Typography, Divider, InputAdornment } from "@mui/material";
import { Email, Lock, ArrowForward } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { motion } from "framer-motion";
import{ Grid2 as Grid} from "@mui/material"; 
import { useDispatch } from "react-redux";
import { userExist } from "../redux/reducers/auth";


const API_URL = "https://chillzone-tif5.onrender.com";
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/user/login`,
        formData,
        { withCredentials: true }
      );
      alert("Login successful!");
      dispatch(userExist(response?.data?.user))
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.7 },
    animate: { 
      scale: [1, 1.05, 1],
      opacity: [0.7, 0.9, 0.7],
      transition: { 
        duration: 4,
        repeat: Infinity 
      } 
    }
  };

  return (
    <Box sx={{ height: `calc(100vh - 64px)` }}>
      <Box>
        <NavBar/>
      </Box>
      <Grid container sx={{  
        overflow: "hidden",
        background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%)",
        height: "100vh"
      }}>
        <Grid size={6} sx={{
          position: "relative",
          overflow: "hidden",
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
          '&::before': {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundImage: "radial-gradient(circle at 75% 30%, rgba(255,255,255,0.1) 0%, transparent 30%)",
          }
        }}>
          <motion.div 
            initial="initial"
            animate="animate"
            variants={pulseVariants}
            style={{
              position: "absolute",
              width: "400px",
              height: "400px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <motion.div 
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                position: "relative",
              }}
            >
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ 
              zIndex: 4,
              color: "white",
              textAlign: "center",
              padding: "24px",
              maxWidth: "600px",
              textShadow: "0 2px 4px rgba(0,0,0,0.2)"
            }}
          >
            <Typography variant="h2" sx={{ 
              fontWeight: 800,
              mb: 3,
              fontSize: "3.5rem",
              letterSpacing: "-1px",
              lineHeight: 1.2
            }}>
              Welcome <Box component="span" sx={{ color: "#ff9a9e" }}>Back</Box>
            </Typography>
            <Typography variant="h6" sx={{ 
              opacity: 0.9,
              mb: 4,
              fontSize: "1.25rem",
              fontWeight: 300,
              letterSpacing: "0.5px"
            }}>
              We're so excited to see you again!
            </Typography>
          </motion.div>
        </Grid>

        <Grid xs={12} md={6} sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, md: 6 }
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Paper elevation={0} sx={{ 
              p: { xs: 3, md: 6 }, 
              width: "100%", 
              maxWidth: "500px",
              borderRadius: "24px",
              background: "#ffffff",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              position: "relative",
              overflow: "hidden",
              '&::before': {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "4px",
                height: "100%",
                background: "linear-gradient(to bottom, #5a67d8, #6b46c1)"
              }
            }}>
              <motion.div variants={containerVariants} initial="hidden" animate="show">
                <motion.div variants={itemVariants}>
                  <Typography variant="h3" sx={{ 
                    fontWeight: 800, 
                    mb: 1,
                    color: "#2d3748",
                    fontSize: { xs: "2rem", md: "2.5rem" },
                    letterSpacing: "-1px"
                  }}>
                    Welcome Back
                  </Typography>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Typography variant="body1" sx={{ 
                    mb: 4,
                    color: "#718096",
                    fontSize: "1.1rem"
                  }}>
                    Sign in to continue to your account
                  </Typography>
                </motion.div>
                
                {error && (
                  <motion.div variants={itemVariants}>
                    <Box sx={{
                      mb: 3,
                      p: 2,
                      background: "rgba(255, 99, 71, 0.1)",
                      borderRadius: "8px",
                      borderLeft: "3px solid #ff6347"
                    }}>
                      <Typography variant="body2" color="error">
                        {error}
                      </Typography>
                    </Box>
                  </motion.div>
                )}
                
                <Box component="form" onSubmit={loginHandler} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <motion.div variants={itemVariants}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email sx={{ color: "#5a67d8" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          backgroundColor: "#f8fafc",
                          "& fieldset": {
                            borderColor: "#e2e8f0"
                          },
                          "&:hover fieldset": {
                            borderColor: "#cbd5e0"
                          }
                        }
                      }}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <TextField
                      label="Password"
                      variant="outlined"
                      fullWidth
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock sx={{ color: "#5a67d8" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          backgroundColor: "#f8fafc",
                          "& fieldset": {
                            borderColor: "#e2e8f0"
                          },
                          "&:hover fieldset": {
                            borderColor: "#cbd5e0"
                          }
                        }
                      }}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={loading}
                      endIcon={<ArrowForward />}
                      sx={{
                        mt: 3,
                        py: 1.5,
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                        fontWeight: 700,
                        fontSize: "1rem",
                        textTransform: "none",
                        letterSpacing: "0.5px",
                        boxShadow: "0 4px 6px rgba(90, 103, 216, 0.3)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 6px 12px rgba(90, 103, 216, 0.4)",
                          background: "linear-gradient(135deg, #4a56b8 0%, #5a3ca1 100%)"
                        }
                      }}
                    >
                      {loading ? "Signing in..." : "Login to Your Account"}
                    </Button>
                  </motion.div>
                </Box>
                
                <motion.div variants={itemVariants}>
                  <Divider sx={{ 
                    my: 4, 
                    "&::before, &::after": {
                      borderColor: "#e2e8f0"
                    }
                  }}>
                    <Typography variant="body2" sx={{ color: "#94a3b8", px: 2 }}>
                      or login with
                    </Typography>
                  </Divider>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Box sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "center",
                    mb: 3
                  }}>
                  </Box>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Typography variant="body2" sx={{ 
                    textAlign: "center", 
                    color: "#64748b",
                    "& a": {
                      color: "#5a67d8",
                      fontWeight: 600,
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline"
                      }
                    }
                  }}>
                    Don't have an account? <a href="/register">Sign up</a>
                  </Typography>
                </motion.div>
              </motion.div>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;