import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Divider,
  InputAdornment,
  Grid2,
} from "@mui/material";
import { AccountCircle, Email, Lock, ArrowForward } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useDispatch } from "react-redux";
import { userExist } from "../redux/reducers/auth";
import useIsMobile from "../shared/useIsMobile";

const API_URL = "https://chillzone-tif5.onrender.com";

const Signup = () => {
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/user/signup`,
        formData,
        { withCredentials: true }
      );
      console.log(response?.data?.user);
      dispatch(userExist(response?.data?.user))
      navigate("/home");
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: "100vh", background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%)",}}>
      <Box>
        <NavBar />
      </Box>
      <Grid2
        container
        sx={{
          overflow: "hidden",
          background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%)",
        }}
      >
        <Grid2
          size={isMobile? 0:6}
          sx={{
            position: "relative",
            overflow: "hidden",
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)", 
            "&::before": {
              content: '""',
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundImage:
                "radial-gradient(circle at 75% 30%, rgba(255,255,255,0.1) 0%, transparent 30%)",
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "400px",
              height: "400px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                position: "relative",
                animation: "pulse 4s ease-in-out infinite",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  width: "300px",
                  height: "300px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.05)",
                  top: "-50px",
                  left: "-50px",
                  animation: "pulse 6s ease-in-out infinite 1s",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  bottom: "-30px",
                  right: "-30px",
                  animation: "pulse 5s ease-in-out infinite 2s",
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                  width: "100px",
                  height: "100px",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                    fill="white"
                    fillOpacity="0.8"
                  />
                  <path
                    d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z"
                    fill="white"
                    fillOpacity="0.8"
                  />
                </svg>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: "100px",
              left: "50px",
              zIndex: 2,
              animation: "float 6s ease-in-out infinite",
            }}
          >
            <svg
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
                fill="white"
                fillOpacity="0.9"
              />
            </svg>
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: "120px",
              right: "80px",
              zIndex: 3,
              animation: "float 6s ease-in-out infinite",
            }}
          >
            <Paper
              sx={{
                p: 2,
                borderRadius: "18px 18px 0 18px",
                background: "rgba(255,255,255,0.9)",
                maxWidth: "200px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                transformOrigin: "bottom right",
                animation: "scaleIn 0.3s ease-out",
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "#2d3748", fontWeight: 500 }}
              >
                Join our community today!
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "#64748b", display: "block", mt: 1 }}
              >
                👋 Welcome new user!
              </Typography>
            </Paper>
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: "180px",
              right: "150px",
              zIndex: 2,
              animation: "float 8s ease-in-out infinite 2s",
            }}
          >
            <Paper
              sx={{
                p: 2,
                borderRadius: "18px 18px 18px 0",
                background: "rgba(255,255,255,0.9)",
                maxWidth: "200px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                transformOrigin: "bottom left",
                animation: "scaleIn 0.3s ease-out 0.5s both",
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "#2d3748", fontWeight: 500 }}
              >
                We've been waiting for you!
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "#64748b", display: "block", mt: 1 }}
              >
                💬 3 new messages
              </Typography>
            </Paper>
          </Box>

          <Box
            sx={{
              zIndex: 4,
              color: "white",
              textAlign: "center",
              p: 6,
              maxWidth: "600px",
              textShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 3,
                fontSize: "3.5rem",
                letterSpacing: "-1px",
                lineHeight: 1.2,
              }}
            >
              Connect &{" "}
              <Box component="span" sx={{ color: "#ff9a9e" }}>
                Collaborate
              </Box>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                opacity: 0.9,
                mb: 4,
                fontSize: "1.25rem",
                fontWeight: 300,
                letterSpacing: "0.5px",
              }}
            >
              Join our growing community of professionals and enthusiasts
            </Typography>
          </Box>
          <style jsx global>{`
            @keyframes float {
              0% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-15px);
              }
              100% {
                transform: translateY(0px);
              }
            }
            @keyframes pulse {
              0% {
                transform: scale(1);
                opacity: 0.7;
              }
              50% {
                transform: scale(1.05);
                opacity: 0.9;
              }
              100% {
                transform: scale(1);
                opacity: 0.7;
              }
            }
            @keyframes scaleIn {
              0% {
                transform: scale(0);
                opacity: 0;
              }
              80% {
                transform: scale(1.1);
                opacity: 0.8;
              }
              100% {
                transform: scale(1);
                opacity: 1;
              }
            }
          `}</style>
        </Grid2>
        <Grid2
          size={isMobile ? 12 : 6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 2, md: 6 },
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 6 },
              width: "100%",
              maxWidth: "500px",
              borderRadius: "24px",
              background: "#ffffff",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "4px",
                height: "100%",
                background: "linear-gradient(to bottom, #5a67d8, #6b46c1)", 
              },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                mb: 1,
                color: "#2d3748",
                fontSize: { xs: "2rem", md: "2.5rem" },
                letterSpacing: "-1px",
              }}
            >
              Join Us Today
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: "#718096",
                fontSize: "1.1rem",
              }}
            >
              Create your account in just 30 seconds
            </Typography>

            {error && (
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
            )}

            <Box
              component="form"
              onSubmit={handleSignup}
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle sx={{ color: "#5a67d8" }} />{" "}
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "#f8fafc",
                    "& fieldset": {
                      borderColor: "#e2e8f0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#cbd5e0",
                    },
                  },
                }}
              />

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
                      <Email sx={{ color: "#5a67d8" }} />{" "}
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "#f8fafc",
                    "& fieldset": {
                      borderColor: "#e2e8f0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#cbd5e0",
                    },
                  },
                }}
              />

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
                      <Lock sx={{ color: "#5a67d8" }} />{" "}
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "#f8fafc",
                    "& fieldset": {
                      borderColor: "#e2e8f0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#cbd5e0",
                    },
                  },
                }}
              />

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
                  background:
                    "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)", 
                  fontWeight: 700,
                  fontSize: "1rem",
                  textTransform: "none",
                  letterSpacing: "0.5px",
                  boxShadow: "0 4px 6px rgba(90, 103, 216, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 12px rgba(90, 103, 216, 0.4)",
                    background:
                      "linear-gradient(135deg, #4a56b8 0%, #5a3ca1 100%)",
                  },
                }}
              >
                {loading ? "Creating your account..." : "Get Started Now"}
              </Button>
            </Box>

            <Divider
              sx={{
                my: 4,
                "&::before, &::after": {
                  borderColor: "#e2e8f0",
                },
              }}
            >
              <Typography variant="body2" sx={{ color: "#94a3b8", px: 2 }}>
                or sign up with
              </Typography>
            </Divider>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                mb: 3,
              }}
            >
              {["Google", "Apple", "Facebook"].map((provider) => (
                <Button
                  key={provider}
                  variant="outlined"
                  sx={{
                    borderRadius: "12px",
                    py: 1.5,
                    px: 3,
                    borderColor: "#e2e8f0",
                    color: "#334155",
                    fontWeight: 600,
                    "&:hover": {
                      borderColor: "#cbd5e0",
                      background: "#f8fafc",
                    },
                  }}
                >
                  {provider}
                </Button>
              ))}
            </Box>

            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "#64748b",
                "& a": {
                  color: "#5a67d8",
                  fontWeight: 600,
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                },
              }}
            >
              Already have an account? <a href="/login">Sign in</a>
            </Typography>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Signup;
