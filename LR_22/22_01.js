const express = require("express");

const passport = require("passport");
const BasicStrategy = require("passport-http").BasicStrategy;
const { checkUser, checkPassword } = require("./services/CheckUser");
const session = require("express-session")({
  resave: false,
  saveUninitialized: false,
  secret: "skilsar",
});

const app = express();

passport.use(
  new BasicStrategy((login, password, done) => {
    let result,
      user = checkUser(login);
    if (!user) {
      result = done(null, false, { message: "Login is not correct" });
    } else if (!checkPassword(user.password, password)) {
      result = done(null, false, { message: "Password is not correct" });
    } else {
      result = done(null, login);
    }
    return result;
  })
);

passport.serializeUser((login, done) => {
  done(null, login);
});
passport.deserializeUser((login, done) => {
  done(null, login);
});

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app
  .get(
    "/login",
    (req, res, next) => {
      if (req.session.logout && req.headers["authorization"]) {
        req.session.logout = false;
        delete req.headers["authorization"];
      }

      next();
    },
    passport.authenticate("basic"),
    (req, res, next) => {
      next();
    }
  )
  .get("/login", (req, res, next) => {
    req.headers["authorization"]
      ? res.send(
          "<h1>Login is successful!</h1><br>" +
            '<a href="http://localhost:3000/resource">Resourse</a><br>' +
            '<a href="http://localhost:3000/logout">Logout</a>'
        )
      : res.redirect("/login");
  });

app.get("/resource", (req, res, next) => {
  req.headers["authorization"] ? res.send("resource") : res.redirect("/login");
});

app.get("/logout", (req, res) => {
  req.session.logout = true;
  res.redirect("/login");
});

app.use((req, res, next) => {
  res.status(404).send("This URI is not supported");
});

app.listen(3000, () => {
  console.log("http://localhost:3000/login");
});
