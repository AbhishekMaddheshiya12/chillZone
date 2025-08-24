import { Avatar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Paper, styled, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userNotExists } from "../redux/reducers/auth";
import useIsMobile from "../shared/useIsMobile";
import MenuIcon from "@mui/icons-material/Menu";


const API_URL = "https://chillzone-tif5.onrender.com";
function NavBar() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispath = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '50%',
    right: 0,
    left: 'auto',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[16],
  },
}))

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/logOut`, {
        withCredentials: true,
      });
      console.log(response?.data?.message);
      if (response?.data?.success) {
        dispath(userNotExists());
        localStorage.clear();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 10px",
        backgroundColor: "#f5f5f5",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "0 0 12px 12px",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: "#3f51b5" }}
        onClick={() => navigate("/")}
      >
        ChillZone
      </Typography>

      {isMobile ? (
        <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleMenuOpen}
      >
        <MenuIcon />
      </IconButton>
      
      <StyledDrawer
        anchor="right"
        open={open}
        onClose={handleMenuClose}
      >
        <Box
          sx={{ width: '100%', height: '100%' }}
          role="presentation"
          onClick={handleMenuClose}
        >
          <List sx={{textAlign:"center"}}>
            <Paper sx={{ backgroundColor: '#f5f5f5', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '0 0 12px 12px' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5' ,textAlign:'center',m:2}}>ChillZone</Typography>
            </Paper>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/home")}>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/register")}>
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/aboutus")}>
                <ListItemText primary="About Us" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/join")}>
                <ListItemText primary="Join Room" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate("/ai")}>
                <ListItemText primary="Talk to" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogOut}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </StyledDrawer>
    </>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            sx={{ textTransform: "none", color: "black", fontWeight: "bold" }}
            onClick={() => navigate("/home")}
          >
            Home
          </Button>
          <Button
            sx={{ textTransform: "none", color: "black", fontWeight: "bold" }}
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
          <Button
            sx={{ textTransform: "none", color: "black", fontWeight: "bold" }}
            onClick={() => navigate("/aboutus")}
          >
            About Us
          </Button>
          <Button
            sx={{ textTransform: "none", color: "black", fontWeight: "bold" }}
            onClick={() => navigate("/join")}
          >
            Join Room
          </Button>
          <Button
            sx={{ textTransform: "none", color: "black", fontWeight: "bold" }}
            onClick={() => navigate("/ai")}
          >
            Chat with AI
          </Button>
          
          <Button
            variant="contained"
            color="#6C60CF"
            sx={{
              textTransform: "none",
              borderRadius: "20px",
              padding: "6px 16px",
            }}
            onClick={handleLogOut}
          >
            Log Out
          </Button>
          <IconButton sx={{ ml: 1 }} onClick={() => navigate("/editProfile")}>
            <Avatar
              alt="User Avatar"
              src={user?.avatar?.url}
              sx={{ width: 36, height: 36 }}
            />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}

export default NavBar;
