import React, { useState } from "react";
import NavBar from "../components/NavBar";
import {
  Box,
  Drawer,
  Grid2,
  Icon,
  IconButton,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import Users from "../user/Users";
import Profile from "../user/Profile";
import ChatRoom from "../components/ChatRoom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useIsMobile from "../shared/useIsMobile";
import { CardMembership } from "@mui/icons-material";

function ChatterPage() {
  const { user } = useSelector((state) => state.auth);
  const { chatId } = useParams();
  const isMobile = useIsMobile();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const StyledDrawer = styled(Drawer)(({ theme }) => ({
    "& .MuiDrawer-paper": {
      width: "80%",
      right: 0,
      left: "auto",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[16],
    },
  }));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <div style={{ height: "100vh" }}>
      <Box>
        <NavBar />
      </Box>
      <Box>
        <Grid2 container spacing={1}>
          <Grid2 size={3} sx={{ display: isMobile ? "none" : "block" }}>
            <Users chatId={chatId}></Users>
          </Grid2>
          <Grid2 size={isMobile ? 12 : 6}>
            {isMobile ? (
              <Paper
                elevation={3}
                sx={{ p: 2, borderRadius: 3, backgroundColor: "#f9f9f9" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenuOpen}
                    sx={{ backgroundColor: "#e3f2fd", p: 1.5 }}
                  >
                    <CardMembership sx={{ color: "#1976d2" }} />
                  </IconButton>
                  <StyledDrawer
                    anchor="right"
                    open={open}
                    onClose={handleMenuClose}
                  >
                    <Box
                      sx={{ width: "100%", height: "100%" }}
                      role="presentation"
                      onClick={handleMenuClose}
                    >
                      <Users chatId={chatId}></Users>
                    </Box>
                  </StyledDrawer>

                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      Group Name
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            ) : (
              <Box />
            )}
            <ChatRoom chatId={chatId} user={user} />
          </Grid2>
          <Grid2 size={3} sx={{ display: isMobile ? "none" : "block" }}>
            <Profile />
          </Grid2>
        </Grid2>
      </Box>
    </div>
  );
}

export default ChatterPage;
