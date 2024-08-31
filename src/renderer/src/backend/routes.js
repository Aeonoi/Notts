// https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/
const express = require("express");
const router = express.Router();
const Note = require("./model/note.js");
const Folder = require("./model/folder.js");
module.exports = router;

///////////////////////////////////////////////
// Notes                                     //
///////////////////////////////////////////////

/**
 *  Creates a file (/api/markdown)
 */
router.post("/markdown", async (req, res) => {
  const newNote = new Note({
    title: req.body.title,
    content: req.body.content,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    folderIds: [],
  });
  try {
    const newNoteSave = await newNote.save();
    res.status(200).json(newNoteSave);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

/**
 *  Updates a specific file (/api/markdown/<fileId>)
 *  TODO: Append the new folderId to the note's folderIds field.
 */
router.patch("/markdown/:fileId", async (req, res) => {
  const fileId = req.params.fileId;
  const newContent = req.body;
  const options = { new: true };
  try {
    const result = await Note.findByIdAndUpdate(fileId, newContent, options);
    res.status(200).send(result);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

/**
 * Fetches/gets the markdown file (/api/markdown/<fileId>)
 * @return {JSON} Returns the JSON content given the fileId
 */
router.get("/markdown/:fileId", async (req, res) => {
  const fileId = req.params.fileId;
  try {
    const content = await Note.findById(fileId);
    res.status(200).json(content);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/**
 * Deletes a markdown file (/api/markdown/<fileId>)
 */
router.delete("/markdown/:fileId", (req, res) => {
  const fileId = req.params.fileId;
});

///////////////////////////////////////////////
// Folders                                   //
///////////////////////////////////////////////

/**
 * Creates a folder (/api/folder)
 */
router.post("/folder", async (req, res) => {
  const newFolder = new Folder({
    name: req.body.name,
    notesIds: [],
  });
  try {
    const newFolderSave = await newFolder.save();
    res.status(200).json(newFolderSave);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

/**
 * Fetches/gets the folder (/api/folder/<folderId>)
 */
router.get("/folder/:folderId", async (req, res) => {
  const folderId = req.params.folderId;
});

/**
 * Fetches/gets all folders (/api/folder)
 */
router.get("/folder", async (req, res) => {
  try {
    const allFolders = await Folder.find();
    res.json(allFolders);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/**
 * Deletes a folder (/api/folder/<folderId>)
 * Deletes all files within folder
 */
router.delete("/folder/:folderId", (req, res) => {
  const folderId = req.params.folderId;
});
