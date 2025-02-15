// src/index.js

const express = require("express");
const dontenv = require("dotenv");
dontenv.config();
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
