const parse = require("parse-svg-path");
const normalize = require("normalize-svg-path");
const svgpath = require("svgpath");
const express = require("express");
var bodyParser = require("body-parser");

const port = process.env.PORT || 8080;

const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/normalize", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const path = svgpath(req.body.path)
    .abs()
    .toString();

  res.send(JSON.stringify({ path }));
});

app.listen(port);
