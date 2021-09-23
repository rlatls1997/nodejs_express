var express = require("express");
var app = express();
//express 내부에 정의된 Router메소드
//api를 분리하여 routing을 모듈화할 때 사용한다.
var router = express.Router();
//상대경로로 쉽게 이동하기 위한 모듈
var path = require("path");

var main = require("./main/main");
var email = require("./email/email");
var form = require("./form/form");
var join = require("./join/index");
var login = require("./login/index");
var logout = require("./logout/index");

router.get("/", function (req, res) {
  //res.send("<h1>hi friend!</h1>")
  //__dirname은 현재 dir절대경로, get요청시 main.html파일 제공
  res.sendFile(path.join(__dirname, "../public/main.html"));
});

//main으로 들어오면 router/main으로 처리를 하라는 말
//router/main.js 파일의 /경로인 메소드 처리
//*app.js에서 설정한 bodyparser나 static파일 설정은 하위 router모듈에도 적용됨 */
router.use("/main", main);
router.use("/email", email);
router.use("/form", form);
router.use("/join", join);
router.use("/login", login);
router.use("/logout", logout);
module.exports = router;
