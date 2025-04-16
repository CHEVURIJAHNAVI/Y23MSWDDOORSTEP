const express = require("express");
const path = require("path");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Serve React static files after build
app.use(express.static(path.join(__dirname, "client", "build")));

// Serve static files from a 'public' folder
app.use("/static", express.static(path.join(__dirname, "public")));

// API route to fetch media URLs
app.get("/api/catalog", (req, res) => {
  res.json({
    message: "Welcome to the Catalog",
    image: "/static/image.jpg", // Example image path
    video: "/static/sample.mp4", // Example video path
    document: "/static/sample.pdf", // Example document path
  });
});

// Serve React frontend for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
