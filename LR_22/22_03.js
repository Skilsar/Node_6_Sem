const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const bd = require("./Services/users.json");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "skilsar",
  })
);

app.get("/login", (req, res) => {
  res.send(`
    <h1>Login Page</h1>
    <form method="post" action="/login">
      <div>
        <label>login:</label>
        <input type="text" name="login" required>
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post("/login", (req, res) => {
  const { login, password } = req.body;
  const user = bd.find(
    (user) => user.login === login && user.password === password
  );

  if (user) {
    req.session.authenticated = true;
    req.session.login = user.login;
    res.redirect("/resource");
  } else {
    res.send("Invalid login or password");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/login");
  });
});

app.get("/resource", authMiddleware, (req, res) => {
  res.send(
    `<h1>Welcome, ${req.session.login}!</h1><p>RESOURCE</p></br><a href="/logout">Logout</a>`
  );
});

function authMiddleware(req, res, next) {
  if (req.session.authenticated) {
    next();
  } else {
    res.redirect("/login");
  }
}

app.get("*", (req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(3000, () => console.log(`Listening to http://localhost:3000/login`));
