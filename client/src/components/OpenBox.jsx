import { Box, Grid2, Typography } from "@mui/material";

import React from "react";
import image from "../assets/678a4aae3ee9f2e87506de82_Clyde (1).webp";

function OpenBox() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          borderRadius: "50px",
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          width: "80%",
          height: "70%",
          padding: 4,
        }}
      >
        <Grid2 container spacing={2} alignItems="center">
          <Grid2 size={5}>
            <Typography variant="h5" color="white" gutterBottom fontWeight={"bold"} fontSize={35}>
              See who's around to chill
            </Typography>
            <Typography variant="body1" color="white" fontSize={20}>
              "In words we weave a cozy thread,  
              Where thoughts and laughter softly spread,  
              A spark of joy in every line,  
              In this small chat, your world meets mine."
            </Typography>
          </Grid2>
          <Grid2 size={7}>
            <Box
              sx={{
                borderRadius: "10px",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={image}
                alt="Chat Illustration"
                style={{ maxWidth: "100%", height: "auto", borderRadius: "10px" }}
              />
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
}

export default OpenBox;
