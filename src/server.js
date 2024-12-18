const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors"); // To allow cross-origin requests

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

app.get("/api/news", async (req, res) => {
  const API_KEY = "3078ee2921b14697b612332a2c772e6c";

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=budgeting&language=en&sortBy=publishedAt&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching articles: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error in proxy server:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
