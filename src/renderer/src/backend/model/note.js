/**
 * Contains the model of what a note object should contain
 * A note has at minimal a title, content, the date that it was created on,
 * and the last time it was updated
 * If the note has never been updated, it will remain the same as the created date.
 * The the folderId is the folder ID that the note corresponds with
 */
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: Date,
  updatedAt: Date,
  folderIds: [mongoose.SchemaTypes.ObjectId],
});

module.exports = mongoose.model("Note", noteSchema);
