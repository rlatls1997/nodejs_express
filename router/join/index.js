var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");
var mysql = require("mysql");

//DATABASE SETTING
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "pass4360",
  database: "jsman",
});
connection.connect();

router.get("/", function (req, res) {
    console.log("get join url")
  res.sendFile(path.join(__dirname, "../../public/join.html"));
});

module.exports = router;
