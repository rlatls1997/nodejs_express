var express = require("express");
var app = express();
//express 내부에 정의된 Router메소드
//api를 분리하여 routing을 모듈화할 때 사용한다.
var router = express.Router();
//상대경로로 쉽게 이동하기 위한 모듈
var path = require("path");

router.get("/", function (req, res) {
  //res.send("<h1>hi friend!</h1>")
  //__dirname은 현재 dir절대경로, get요청시 main.html파일 제공
  var id = req.user;
  console.log('main js loaded', id);
  //path.join 메소드는 두 경로를 합쳐줌
  //res.sendFile(path.join(__dirname, "../../public/main.html"));
  res.render('main.ejs', {'id' : id})
});

//router export
module.exports = router;
