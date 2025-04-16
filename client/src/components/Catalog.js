import React, { useState } from 'react';

const Catalog = () => {
  const [content, setContent] = useState(null);

  const handlePDFClick = () => {
    setContent(
      <iframe
        src="http://localhost:5000/download.pdf"
        title="PDF Viewer"
        style={styles.contentIframe}
      ></iframe>
    );
  };

  const handleVideoClick = () => {
    setContent(
      <video controls src="http://localhost:5000/video.mp4" style={styles.contentVideo}>
        Your browser does not support the video tag.
      </video>
    );
  };

  const handleImageClick = () => {
    setContent(
      <img src="http://localhost:5000/image.png" alt="Displayed content" style={styles.contentImage} />
    );
  };

  return (
    <div style={styles.container}>
      {/* Navbar Section */}
      <div style={styles.navbar}></div>

      {/* Main Content Section */}
      <div style={styles.contentWrapper}>
        <h1 style={styles.catalogHeading}>Choose a file to display</h1>
        <div style={styles.buttonContainer}>
          <button style={{ ...styles.catalogButton, backgroundColor: '#FF6F3C', color: 'white' }} onClick={handlePDFClick}>
            PDF
          </button>
          <button style={{ ...styles.catalogButton, backgroundColor: '#17C3B2', color: 'white' }} onClick={handleVideoClick}>
            Video
          </button>
          <button style={{ ...styles.catalogButton, backgroundColor: '#FFC300', color: 'black' }} onClick={handleImageClick}>
            Image
          </button>
        </div>
        
        {/* Dynamic Content Section */}
        <div style={styles.contentContainer}>{content}</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: "linear-gradient(135deg, #1E1E92, #A29BFE)", // Deep Royal Blue to Soft Lavender
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif", // Modern font
  },
  navbar: {
    width: "100%",
    height: "20px", // Slightly increased height for better spacing
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "1000px",
    padding: "20px",
  },
  catalogHeading: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#F8FAFC", // Softer white for contrast
    marginBottom: "1.5rem",
    textShadow: "2px 2px 10px rgba(255, 255, 255, 0.3)", // Subtle glowing effect
    animation: "fadeIn 1s ease-in-out", // Smooth fade-in effect
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap", // Responsive wrapping for smaller screens
    gap: "1rem",
    marginBottom: "2rem",
  },
  catalogButton: {
    padding: "1rem 2rem",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: " #1E1E92", // Vibrant purple shade
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out, background 0.3s ease-in-out",
    outline: "none",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
  },
  catalogButtonHover: {
    backgroundColor: " #1E1E92", // Darker shade on hover
    transform: "scale(1.05)",
  },
  catalogButtonActive: {
    backgroundColor: "", // Even darker on click
    transform: "scale(0.98)",
  },
  contentContainer: {
    width: "100%",
    maxWidth: "850px",
    backgroundColor: "#FFFFFF",
    borderRadius: "14px",
    boxShadow: "0px 8px 18px rgba(0, 0, 0, 0.25)",
    padding: "1.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "120px",
    transition: "all 0.3s ease-in-out",
    animation: "fadeInUp 1s ease-in-out",
  },
  contentContainerHover: {
    transform: "translateY(-5px)", // Slight lift effect on hover
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
  },
  contentIframe: {
    width: "100%",
    height: "600px",
    border: "none",
    borderRadius: "12px",
  },
  contentVideo: {
    width: "100%",
    height: "auto",
    maxHeight: "550px",
    borderRadius: "12px",
  },
  contentImage: {
    width: "100%",
    height: "auto",
    maxHeight: "550px",
    borderRadius: "12px",
  },
};



export default Catalog;