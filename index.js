const parse = require("parse-svg-path");
const normalize = require("normalize-svg-path");
const svgpath = require("svgpath");
const express = require("express");
const bodyParser = require("body-parser");
const {combineSegments} = require('./path-helper');

const port = process.env.PORT || 8080;

const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/normalize", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  let path = svgpath(req.body.path);
  path = (req.body.makeAbsolute || req.body.convertToCurves) ? path.abs() : path;
  path = req.body.makeRelative ? path.rel() : path;
  path = req.body.expandSmoothCurves ? path.unshort() : path;
  path = req.body.arcsToBeziers ? path.unarc() : path;

  let pathSegments = parse(path.toString());
  pathSegments = req.body.convertToCurves ? normalize(pathSegments) : pathSegments;

  res.send(JSON.stringify({ path: combineSegments(pathSegments) }));
});

app.listen(port);
