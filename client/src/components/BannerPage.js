import React from "react";
import { Button, Typography, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";

function BannerPage() {
  return (
    <Container
      maxWidth="xl"
      style={{
        backgroundColor: "rgba(63, 81, 181, 0.4)", // A rich blue background
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        backgroundImage: `url(${require('./bg.png')})`, // Ensure correct path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#fff", // Bright text color for contrast
        textAlign: "center",
      }}
    >
      {/* Overlay for dimming the background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(255, 255, 255, 0.92)", // Subtle overlay for readability
          zIndex: -1,
        }}
      />

      {/* Heading Section */}
      <Typography
        variant="h2"
        sx={{
          color: "#fff",
          fontWeight: "bold",
          textShadow: "2px 2px 5px rgba(0, 0, 0, 0.8)",
          marginBottom: "16px",
        }}
      >
        Welcome to DoorStep
      </Typography>
      <Typography
        variant="h5"
        sx={{
          color: "#fff",
          fontWeight: 300,
          marginBottom: "24px",
          maxWidth: "600px",
          textShadow: "1px 1px 4px rgba(0, 0, 0, 0.7)",
        }}
      >
        Discover the best products and services, delivered to your doorstep with ease.
      </Typography>

      {/* Call-to-Action Button */}
      <Button
        variant="contained"
        component={Link}
        to="/api/users/register"
        sx={{
          padding: "12px 24px",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "25px",
          backgroundColor: "#fdd835", // Bright accent color
          color: "#1a237e",
          textTransform: "uppercase",
          "&:hover": {
            backgroundColor: "#ffeb3b",
          },
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        Register Now
      </Button>
    </Container>
  );
}

export default BannerPage;
