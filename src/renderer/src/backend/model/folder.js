/**
 * Contains the model of what a folder object should contain
 * A folder has a name and the ids of the notes that it contains
 */
const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  name: String,
  notesIds: [mongoose.SchemaTypes.ObjectId],
});

module.exports = mongoose.model("Folder", folderSchema);
