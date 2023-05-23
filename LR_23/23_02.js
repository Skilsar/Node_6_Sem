const app = require("express")();
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const tedious = require("tedious");
const redisClient = require("redis").createClient();

redisClient.on("ready", () => console.log("ready"));
redisClient.on("error", (err) => console.log(`error: ${err}`));
redisClient.connect().then(() => console.log("connect"));
redisClient.on("end", () => console.log("end"));

const sequelize = new Sequelize("LR_23_Node", "user", "qwer1234", {
  dialect: "mssql",
});

const Model = Sequelize.Model;
class Users extends Model {}
Users.init(
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    login: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
  },
  {
    sequelize,
    Users: "Users",
    tableName: "Users",
    timestamps: false,
  }
);

const accessKey = "access_key";
const refreshKey = "refresh_key";
var oldRefreshKeyCount = 0;

app.use(cookieParser("cookie_key"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  if (req.cookies.accessToken) {
    jwt.verify(req.cookies.accessToken, accessKey, (err, payload) => {
      if (err) {
        next();
      } else if (payload) {
        req.payload = payload;
        next();
      }
    });
  } else next();
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login2.html");
});

app.post("/login", async (req, res) => {
  const candidate = await Users.findOne({
    where: {
      login: req.body.login,
      password: req.body.password,
    },
  });

  console.log(`USER: ` + candidate);
  if (candidate) {
    const accessToken = jwt.sign(
      { id: candidate.id, login: candidate.login },
      accessKey,
      { expiresIn: 10 * 60 }
    );
    const refreshToken = jwt.sign(
      { id: candidate.id, login: candidate.login },
      refreshKey,
      { expiresIn: 24 * 60 * 60 }
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
    });
    res.redirect("/resource");
  } else {
    res.redirect("/login");
  }
});

app.get("/refresh-token", async (req, res) => {
  if (req.cookies.refreshToken) {
    let isToken = await redisClient.get(req.cookies.refreshToken);
    if (isToken === null) {
      jwt.verify(req.cookies.refreshToken, refreshKey, async (err, payload) => {
        if (err) res.send(err.message);
        else if (payload) {
          await redisClient.set(req.cookies.refreshToken, "blocked");

          const candidate = await Users.findOne({ where: { id: payload.id } });
          const newAccessToken = jwt.sign(
            {
              id: candidate.id,
              login: candidate.login,
            },
            accessKey,
            { expiresIn: 10 * 60 }
          );
          const newRefreshToken = jwt.sign(
            {
              id: candidate.id,
              login: candidate.login,
            },
            refreshKey,
            { expiresIn: 24 * 60 * 60 }
          );

          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            sameSite: "strict",
          });

          res.cookie("refreshToken", newRefreshToken, {
            path: "/",
          });
          res.redirect("/resource");
        }
      });
    } else res.send("Refresh token is blocked");
  } else res.status(401).send("To access the resource, you need to log in");
});

app.get("/resource", (req, res) => {
  if (req.payload) res.status(200).send(`Resource ${req.payload.login}`);
  else res.redirect("/login");
});

app.get("/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.redirect("/login");
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/register.html");
});

app.post("/register", async (req, res) => {
  console.log(req.body);
  const user = await Users.findOne({
    where: {
      login: req.body.login,
    },
  });
  if (user) {
    res.redirect("/register");
  } else {
    createUser(req.body.login, req.body.password);
    res.redirect("/login");
  }
});

app.get("*", (req, res) => {
  res.status(404).send("404 Not Found");
});

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () =>
      console.log('Server is running on http://localhost:3000/resource"')
    );
  })
  .catch((error) => console.log(error));

async function createUser(login, password) {
  let newUser = null;
  await Users.create({ login: login, password: password });
}
