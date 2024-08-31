const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const Note = require("./model/note.js");
const routes = require("./routes");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api", routes);
app.set("Content-Security-Policy", "default-src 'self'");

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

// run();
// async function run() {
//   try {
//     const note = await Note.create({
//       title: "Dawg",
//       content: "That Dawg Got That Dawg",
//     });
//     console.log(note);
//   } catch (e) {
//     console.error(e);
//   }
// }

app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`));
