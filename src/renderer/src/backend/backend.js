const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
const mongoose = require("mongoose");
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

app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`));
