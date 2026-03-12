const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

app.post("/api/claude", async (req, res) => {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: { message: "ANTHROPIC_API_KEY environment variable is not set on the server." } });
    }
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
      },
      body: JSON.stringify(req.body),
    });
    const text = await response.text();
    res.status(response.status).set("Content-Type", "application/json").send(text);
  } catch (err) {
    res.status(500).json({ error: { message: err.message } });
  }
});

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
