const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cookieSession = require("cookie-session");

const config = require("../config/config");
const app = express();

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_APP_ID,
      clientSecret: config.GOOGLE_APP_SECRET,
      callbackURL: config.GOOGLE_REDIRECT_URI,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, { profile: profile, token: accessToken });
    }
  )
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

const isLoggedIn = (request, response, next) => {
  if (request.user) {
    next();
  } else {
    response.sendStatus(401);
  }
};

app.use(passport.initialize());
app.use(passport.session());
app.get("/login", (request, response) => {
  response.sendFile(`${__dirname}/index.html`);
});
app.get("/failed", (request, response) =>
  response.send("Неудачная попытка входа")
);
app.get("/resource", isLoggedIn, async function (request, response) {
  response.send(
    `Здравствуйте, ${request.user.profile.displayName}! <a href="/logout">Logout</a>`
  );
});
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (request, response) {
    response.redirect("/resource");
  }
);
app.get("/logout", (request, response) => {
  request.session = null;
  request.logout();
  response.redirect("/login");
});
app.listen(config.PORT, () =>
  console.log(`http://localhost:${config.PORT}/login`)
);
