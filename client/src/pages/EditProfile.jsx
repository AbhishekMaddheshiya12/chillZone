import React, { useState } from "react";
import NavBar from "../components/NavBar";
import {
  Avatar,
  Box,
  Container,
  IconButton,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "https://chillzone-tif5.onrender.com";

function EditProfile() {
    const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setProfileImageFile(file);
    }
  };
  const handleSubmit = async (event) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("avatar",profileImageFile);
    event.preventDefault();
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const result = await axios.post(
        `${API_URL}/user/update-profile`,
        formData,
        config
      );
      if(result.data.success){
        navigate("/");
      }
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <NavBar />
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        paddingTop="30px"
        sx={{
        background: "linear-gradient(135deg, #6D83F2, #C77DFF)",
        overflow: "hidden",
      }}
      >
        <Container maxWidth="sm">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: 3,
              backdropFilter: "blur(15px)",
              background: "rgba(255, 255, 255, 0.15)",
              ":hover": {
                boxShadow: 5,
                scale: 1.05,
                transition: "all 0.3s ease-in-out",
              }
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" ,color:'white'}}>
              Edit Profile
            </Typography>
            <IconButton
              component="label"
              sx={{
                display: "block",
                marginBottom: "20px",
                borderRadius: "50%",
                border: "2px solid #ddd",
                padding: "5px",
              }}
            >
              <Avatar
                src={profileImage || "/default-profile-image.jpg"}
                alt="Profile Image"
                sx={{ width: 150, height: 150 }}
              />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </IconButton>

            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                marginBottom: "20px",
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255,255,255,0.5)" },
                  "&:hover fieldset": { borderColor: "#fff" },
                },
              }}
            />

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                marginBottom: "20px",
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255,255,255,0.5)" },
                  "&:hover fieldset": { borderColor: "#fff" },
                },
              }}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              sx={{ marginTop: "20px" }}
            >
              Save Changes
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default EditProfile;
