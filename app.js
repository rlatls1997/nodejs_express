var express = require("express");
var app = express();
var bodyParser = require("body-parser");
//main router module import
var router = require("./router/index");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash')

app.listen(3000, function () {
  console.log("start!! express server on port 3000");
});

//********미들웨어 사용 정의 */
//static 파일을 요청할 떄 매번 get요청 경로를 지정해주지말고
//app.use로 'public' 밑에 있는 정적 파일들을 모두 제공하도록 설정
app.use(express.static("public"));
//express에서 bodyparser를 쓰겠다고 알림
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// path가 '/'이면 생략가능
app.use(router);
