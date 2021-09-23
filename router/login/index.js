var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");
var mysql = require("mysql");
const passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var flash = require("connect-flash");

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
  var msg;
  console.log("get login url");
  var errMsg = req.flash("error");
  if (errMsg) msg = errMsg;
  res.render("login.ejs", { message: msg });
  //res.sendFile(path.join(__dirname, "../../public/join.html"));
});

//세션 생성
passport.serializeUser(function (user, done) {
  console.log("passport session save: ", user.id);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  console.log("passport session get id: ", id);
  done(null, id);
});

//이름이 "local-join"인 인증 처리 로직 생성하기
passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      console.log("local-join callback called");
      var query = connection.query(
        "select * from user where email=?",
        [email],
        function (err, rows) {
          if (err) return done(err);
          if (rows.length) {
            console.log("existed user");
            return done(null, { email: email, id: rows[0].id });
          } else {
            return done(null, false, {
              message: "your login info is not found",
            });
          }
        }
      );
    }
  )
);

//로그인 요청 시 authenticate
//local-join이라는 이름을 가진 passport로 인증하기
router.post("/", (req, res, next) => {
    console.log(req.body)
  passport.authenticate("local-login", (err, user, info) => {
    if (err) {
      res.status(500).json(err);
    }
    if (!user) {
     return res.status(401).json(info.message);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json(user);
    });
  })(req, res, next);
});
// router.post("/", function (req, res) {
//   var body = req.body;
//   var email = body.email;
//   var name = body.name;
//   var password = body.password;

//   var sql = { email: email, name: name, pw: password };

//   var query = connection.query(
//     //`insert into user (email, name, pw) values ("${email}","${name}","${password}")`,
//     "insert into user set ?",
//     sql,
//     function (err, rows) {
//       if (err) throw err;
//       //res.send가 아닌 res.render로 ejs에 값 전달
//       res.render("welcome.ejs", { name: name, id: rows.insertId });
//     }
//   );
// });

module.exports = router;
