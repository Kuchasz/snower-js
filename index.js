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

// var segments = normalize(
//     abs(
//         parse(
//             "M534.75,68.238c-8.945-8.945-19.694-13.417-32.261-13.417H45.681c-12.562,0-23.313,4.471-32.264,13.417    C4.471,77.185,0,87.936,0,100.499v347.173c0,12.566,4.471,23.318,13.417,32.264c8.951,8.946,19.702,13.419,32.264,13.419h456.815    c12.56,0,23.312-4.473,32.258-13.419c8.945-8.945,13.422-19.697,13.422-32.264V100.499    C548.176,87.936,543.699,77.185,534.75,68.238z M511.623,447.672c0,2.478-0.899,4.613-2.707,6.427    c-1.81,1.8-3.952,2.703-6.427,2.703H45.681c-2.473,0-4.615-0.903-6.423-2.703c-1.807-1.813-2.712-3.949-2.712-6.427V100.495    c0-2.474,0.902-4.611,2.712-6.423c1.809-1.803,3.951-2.708,6.423-2.708h456.815c2.471,0,4.613,0.905,6.42,2.708    c1.801,1.812,2.707,3.949,2.707,6.423V447.672L511.623,447.672z M127.91,237.541c15.229,0,28.171-5.327,38.831-15.987c10.657-10.66,15.987-23.601,15.987-38.826    c0-15.23-5.333-28.171-15.987-38.832c-10.66-10.656-23.603-15.986-38.831-15.986c-15.227,0-28.168,5.33-38.828,15.986    c-10.656,10.66-15.986,23.601-15.986,38.832c0,15.225,5.327,28.169,15.986,38.826C99.742,232.211,112.683,237.541,127.91,237.541z"
//         )
//     )
// );

// const getPath = segments =>
//     segments
//         .map(s => s.reduce((_, s) => `${_} ${s}`, ""))
//         .reduce((_, s) => `${_} ${s}`, "");

// console.log(getPath(segments));
