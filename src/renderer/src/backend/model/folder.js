const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  title: String,
  notes: [mongoose.SchemaTypes.ObjectId],
});

module.exports = mongoose.model("Folder", folderSchema);
