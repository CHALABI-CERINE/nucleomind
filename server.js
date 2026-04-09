require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (index.html, styles.css, app.js, img/, etc.)
app.use(express.static(path.join(__dirname)));

// Fallback: serve index.html for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════╗
║         🧬  NucleoMind Server  🧬           ║
╠══════════════════════════════════════════════╣
║  URL:    http://localhost:${PORT}              ║
╚══════════════════════════════════════════════╝
  `);
});
