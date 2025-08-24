import { Avatar, Box, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const {user} = useSelector((state) => state.auth);
  // console.log(user);

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", p: 3 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}
      >
        Profile
      </Typography>

      <Paper
        elevation={4}
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 3,
          borderRadius: 3,
          gap: 3,
          flexDirection: { xs: "column", md: "column"},
          textAlign:'center'
        }}
      >
        <IconButton sx={{ padding: 0 }}>
          <Avatar
            sx={{ width: 120, height: 120 }}
            src={user?.avatar?.url}
          />
        </IconButton>

        <Box>
          <Typography variant="h6" fontWeight="bold">
            {user.name}
          </Typography>
          <Typography color="text.secondary">@{user.username}</Typography>
          <Typography>{user.email}</Typography>
          <Typography fontSize={14} color="text.secondary" mt={1}>
            Joined on {new Date(user.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default Profile;
