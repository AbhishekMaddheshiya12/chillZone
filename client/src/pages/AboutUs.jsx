import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import {
  Box,
  Typography,
  Button,
  Grid2,
  Card,
  CardContent,
  Avatar,
  Container,
  useTheme,
  Fade,
  Grow,
  Zoom,
} from "@mui/material";
import {
  People as PeopleIcon,
  Security as SecurityIcon,
  Bolt as BoltIcon,
  RocketLaunch as RocketIcon,
} from "@mui/icons-material";

function AboutUs() {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <NavBar />

      <Fade in timeout={1000}>
        <Box
          sx={{
            py: { xs: 12, md: 20 },
            textAlign: "center",
            background: "linear-gradient(135deg, #7e57c2 0%, #3f51b5 100%)",
            color: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              bgcolor: "linear-gradient(135deg, #7e57c2 0%, #3f51b5 100%)",
            }}
          >
            <Zoom
              in
              timeout={1200}
              sx={{
                bgcolor: "linear-gradient(135deg, #7e57c2 0%, #3f51b5 100%)",
              }}
            >
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 4,
                  fontSize: { xs: "2.5rem", md: "3.75rem" },
                  textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                Our Story
              </Typography>
            </Zoom>
            <Typography
              variant="h5"
              sx={{
                mb: 6,
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                opacity: 0.9,
              }}
            >
              Building connections through innovative technology
            </Typography>
            <Zoom in timeout={1400}>
              <Button
                variant="contained"
                color="warning"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 8,
                  textTransform: "none",
                  fontWeight: 600,
                  bgcolor: "#ffb300",
                  "&:hover": {
                    bgcolor: "#ffa000",
                    transform: "scale(1.1)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  },
                  transition: "all 0.3s ease-in-out",
                }}
              >
                Join Our Community
              </Button>
            </Zoom>
          </Container>
        </Box>
      </Fade>
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid2 container spacing={6} alignItems="center">
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Fade in timeout={1000}>
              <Box>
                <Typography
                  variant="h3"
                  component="h2"
                  sx={{
                    fontWeight: 600,
                    mb: 4,
                    fontSize: { xs: "2rem", md: "2.5rem" },
                    color: "primary.main",
                  }}
                >
                  Our Mission
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    mb: 3,
                    color: "text.secondary",
                    lineHeight: 1.8,
                  }}
                >
                  We're dedicated to creating digital spaces where communities
                  can thrive. Our platform fosters meaningful connections,
                  empowers creators, and brings people together in innovative
                  ways.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    color: "text.secondary",
                    lineHeight: 1.8,
                  }}
                >
                  Founded in 2020, we've grown from a small team to a global
                  platform serving millions worldwide.
                </Typography>
              </Box>
            </Fade>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 4,
                justifyContent: "space-between",
              }}
            >
              {[
                { value: "10M+", label: "Active Users" },
                { value: "150+", label: "Countries" },
                { value: "24/7", label: "Support" },
              ].map((stat, index) => (
                <Grow key={index} in timeout={1000 + index * 200}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 3,
                      flex: 1,
                      minWidth: 120,
                      bgcolor: "background.paper",
                      borderRadius: 2,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                      },
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    <Typography
                      variant="h4"
                      color="primary"
                      sx={{ fontWeight: 700, mb: 1 }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Grow>
              ))}
            </Box>
          </Grid2>
        </Grid2>
      </Container>

      <Box sx={{ bgcolor: "grey.100", py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Fade in timeout={1000}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 600,
                textAlign: "center",
                mb: 8,
                fontSize: { xs: "2rem", md: "2.5rem" },
                color: "primary.main",
              }}
            >
              Our Values
            </Typography>
          </Fade>
          <Grid2 container spacing={4}>
            {[
              {
                icon: <PeopleIcon fontSize="large" color="primary" />,
                title: "Community First",
                text: "Authentic connections and inclusive spaces for all.",
              },
              {
                icon: <SecurityIcon fontSize="large" color="primary" />,
                title: "Trust & Safety",
                text: "Your security and privacy are fundamental.",
              },
              {
                icon: <BoltIcon fontSize="large" color="primary" />,
                title: "Seamless Experience",
                text: "Intuitive design and reliable performance.",
              },
              {
                icon: <RocketIcon fontSize="large" color="primary" />,
                title: "Constant Innovation",
                text: "Pushing boundaries to deliver the best.",
              },
            ].map((value, index) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Grow in timeout={1000 + index * 200}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      bgcolor: "background.paper",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                      },
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    <CardContent sx={{ textAlign: "center", p: 4 }}>
                      <Box sx={{ mb: 3, color: "primary.main" }}>
                        {value.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        component="h3"
                        sx={{ fontWeight: 600, mb: 2 }}
                      >
                        {value.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", lineHeight: 1.6 }}
                      >
                        {value.text}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      <Box
        sx={{ background: "linear-gradient(135deg, #7e57c2 0%, #3f51b5 100%)" }}
      >
        <Footer />
      </Box>
    </Box>
  );
}

export default AboutUs;
