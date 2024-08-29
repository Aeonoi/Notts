const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.set("Content-Security-Policy", "default-src 'self'");

app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`));

/**
 *  Creates a file
 */
app.post("/markdown", (req, res) => {
  const { filename, content } = req.body;
  const filePath = path.join(__dirname, "markdown", filename);

  // Ensure the markdown directory exists
  fs.mkdirSync(path.join(__dirname, "markdown"), { recursive: true });

  // Save or update the file
  fs.writeFileSync(filePath, content, "utf8");
  res.status(200).json({ message: "File saved successfully" });
  alert("Saved file");
});

/**
 * Fetches/gets the markdown file
 */
app.get("/markdown/:filename", (req, res) => {
  const filename = req.params.filename;

  const filePath = path.join(__dirname, "markdown", filename);

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf8");
    res.status(200).json({ content });
  } else {
    res.status(404).json({ message: "File not found" });
  }
});

/**
 * Deletes a markdown file
 */
app.delete("/markdown/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "markdown", filename);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.status(200).json({ message: "File deleted successfully" });
  } else {
    res.status(404).json({ message: "File not found" });
  }
});
