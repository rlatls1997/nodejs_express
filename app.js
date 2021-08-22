var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");

//외부 router module import
var main = require('./router/main')
var email = require('./router/email')

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

app.listen(3000, function () {
  console.log("start!! express server on port 3000");
});

//static 파일을 요청할 떄 매번 get요청 경로를 지정해주지말고
//app.use로 'public' 밑에 있는 정적 파일들을 모두 제공하도록 설정
app.use(express.static("public"));
//express에서 bodyparser를 쓰겠다고 알림
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//main으로 들어오면 router/main으로 처리를 하라는 말
//router/main.js 파일의 /경로인 메소드 처리
//*app.js에서 설정한 bodyparser나 static파일 설정은 하위 router모듈에도 적용됨 */
app.use('/main', main);
app.use('/email', email);

app.get("/", function (req, res) {
  //res.send("<h1>hi friend!</h1>")
  //__dirname은 현재 dir절대경로, get요청시 main.html파일 제공
  res.sendFile(__dirname + "/public/main.html");
});
