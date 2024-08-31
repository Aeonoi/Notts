const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: Date,
  updatedAt: Date,
  folder: mongoose.SchemaTypes.ObjectId,
});

module.exports = mongoose.model("Note", noteSchema);
