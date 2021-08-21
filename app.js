var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.listen(3000, function () {
  console.log("start!! express server on port 3000");
});

//static 파일을 요청할 떄 매번 get요청 경로를 지정해주지말고
//app.use로 'public' 밑에 있는 정적 파일들을 모두 제공하도록 설정
app.use(express.static("public"));
//express에서 bodyparser를 쓰겠다고 알림
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get("/", function (req, res) {
  //res.send("<h1>hi friend!</h1>")
  //__dirname은 현재 dir절대경로, get요청시 main.html파일 제공
  res.sendFile(__dirname + "/public/main.html");
});

app.get("/main", function (req, res) {
  //res.send("<h1>hi friend!</h1>")
  //__dirname은 현재 dir절대경로, get요청시 main.html파일 제공
  res.sendFile(__dirname + "/public/main.html");
});

app.post("/email_post", function (req, res) {
    console.log(req.body.email);
  //res.send("<h1>welcome ! </h1>" + req.body.email);

  //res.send가 아닌 res.render로 ejs에 email값 전달
    res.render('email.ejs', {'email' : req.body.email})
});
