const express = require("express");
const router = express.Router();
const Note = require("./model/note.js");
module.exports = router;

/**
 *  Creates a file
 */
router.post("/markdown", async (req, res) => {
  const newNote = new Note({
    title: req.body.title,
    content: req.body.content,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
  });
  try {
    const newNoteSave = await newNote.save();
    res.status(200).json(newNoteSave);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: e.message });
  }
});

/**
 *  Updates a specific file
 */
router.put("/markdown/:filename", (req, res) => {
  const filename = req.params.filename;
});

/**
 * Fetches/gets the markdown file
 */
router.get("/markdown/:filename", (req, res) => {
  res.send("GET REQUEST FROM " + req.params.filename);
});

/**
 * Deletes a markdown file
 */
router.delete("/markdown/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "markdown", filename);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.status(200).json({ message: "File deleted successfully" });
  } else {
    res.status(404).json({ message: "File not found" });
  }
});
