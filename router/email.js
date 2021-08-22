var express = require("express");
var app = express();
//express 내부에 정의된 Router메소드
//api를 분리하여 routing을 모듈화할 때 사용한다.
var router = express.Router();
//상대경로로 쉽게 이동하기 위한 모듈
var path = require("path");
var mysql = require("mysql");

//*************************************************mysql 연결설정
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "pass4360",
    database: "jsman",
  });
  
  connection.connect();
  //*************************************************mysql 연결설정



router.post("/form", function (req, res) {
  console.log("email/form 실행 : " + req.body.email);
  //res.send("<h1>welcome ! </h1>" + req.body.email);

  //res.send가 아닌 res.render로 ejs에 email값 전달
  res.render("email.ejs", { email: req.body.email });
});

router.post("/ajax", function (req, res) {
  console.log("email/ajax 실행 : " + req.body.email);
  var email = req.body.email;
  var responseData = {};

  var query = connection.query(
    'select name from user where email ="' + email + '"',
    function (err, rows) {
      if (err) throw err;
      if (rows[0]) {
        responseData.result = "ok";
        responseData.name = rows[0].name;
      } else {
        responseData.result = "none";
        responseData.name = "";
      }
      res.json(responseData);
    }
  );
});

module.exports = router;
