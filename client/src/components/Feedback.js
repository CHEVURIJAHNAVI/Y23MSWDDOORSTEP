import React, { useState } from "react";

const Feedback = () => {
  const [customername, setCustomername] = useState("");
  const [emailed, setEmailed] = useState("");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/sendmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customername, emailed, feedback }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Feedback submitted successfully!");
        setCustomername("");
        setEmailed("");
        setFeedback("");
      } else {
        setMessage(`❌ Error: ${data.error || "Failed to submit feedback"}`);
      }
    } catch (error) {
      setMessage("❌ Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Feedback Form</h2>
        <input
          type="text"
          placeholder="Your Name"
          value={customername}
          onChange={(e) => setCustomername(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={emailed}
          onChange={(e) => setEmailed(e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="Your Feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
          style={styles.textarea}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "10px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  textarea: {
    marginBottom: "10px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    minHeight: "80px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#02075D",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    marginTop: "10px",
    fontWeight: "bold",
  },
};

export default Feedback;
