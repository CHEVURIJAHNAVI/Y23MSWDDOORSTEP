import React from "react";
// import ReactDOM from "react-dom";
import "./index.css"; // Import Tailwind or other CSS
import App from "./App.js";
import ReactDOM from "react-dom/client";

// ReactDOM.render(<App />, document.getElementById("root"));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
