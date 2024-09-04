// References
// https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/
// https://stackoverflow.com/questions/28459418/use-of-put-vs-patch-methods-in-rest-api-real-life-scenarios

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
    createdAt: new Date(),
    updatedAt: new Date(),
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
 *
 *  Appending a folderId occurs outside
 */
router.patch("/markdown/:fileId", async (req, res) => {
  const fileId = req.params.fileId;
  const content = req.body;
  const options = { new: true };
  try {
    const result = await Note.findByIdAndUpdate(fileId, content, options);
    res.status(200).send(result);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

/**
 * Fetches/gets all notes (/api/markdown)
 */
router.get("/markdown", async (req, res) => {
  try {
    const allNotes = await Note.find();
    res.json(allNotes);
  } catch (e) {
    res.status(500).json({ message: e.message });
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
router.delete("/markdown/:fileId", async (req, res) => {
  const fileId = req.params.fileId;
  try {
    const content = await Note.findByIdAndDelete(fileId);
    res.send(`Note with name ${content.title} has been succesfully deleted`);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
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
    createdAt: req.body.createdAt,
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
  try {
    const folderInfo = await Folder.findById(folderId);
    res.status(200).json(folderInfo);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/**
 * Fetches/gets the note ids of the specified folder id in the form of an array
 */
router.get("/folder/:folderId/notes", async (req, res) => {
  const folderId = req.params.folderId;
  try {
    const folderInfo = await Folder.findById(folderId);
    res.status(200).json(folderInfo.notesIds);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/**
 *  Updates a specific folder (/api/folder/<folderId>)
 *
 *  Appending a fileId occurs outside
 */
router.patch("/folder/:folderId", async (req, res) => {
  const folderId = req.params.folderId;
  const newContent = req.body;
  const options = { new: true };
  try {
    const result = await Folder.findByIdAndUpdate(
      folderId,
      newContent,
      options,
    );
    res.status(200).send(result);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
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
router.delete("/folder/:folderId", async (req, res) => {
  const folderId = req.params.folderId;
  try {
    const content = await Folder.findByIdAndDelete(folderId);
    res.send(`Folder with name ${content.name} has been succesfully deleted`);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});
