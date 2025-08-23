import React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, WidthFull } from '@mui/icons-material';

function Footer() {
  return (
    <Box
      sx={{
        color: 'white',
        padding: '40px 30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
      }}
    >
<hr style={{ width: '100%' }} />

      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        ChillZone
      </Typography>
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Link href="#" color="inherit" underline="hover">
          Home
        </Link>
        <Link href="#" color="inherit" underline="hover">
          About
        </Link>
        <Link href="#" color="inherit" underline="hover">
          Services
        </Link>
        <Link href="#" color="inherit" underline="hover">
          Contact
        </Link>
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <IconButton color="inherit">
          <Facebook />
        </IconButton>
        <IconButton color="inherit">
          <Twitter />
        </IconButton>
        <IconButton color="inherit">
          <Instagram />
        </IconButton>
        <IconButton color="inherit">
          <LinkedIn />
        </IconButton>
      </Box>

      <Typography variant="body2" color="white" sx={{ marginTop: 2 }}>
        © {new Date().getFullYear()} ChillZone. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
