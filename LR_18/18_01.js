const fs = require("fs");
const url = require("url");
const http = require("http");
const { Sequelize } = require("sequelize");

const conn = new Sequelize("node_js", "user", "qwer1234", {
  dialect: "mssql",
  pool: {
    min: 0,
    max: 5,
    acquire: 30000,
    idle: 10000,
  },
  define: { 
    timestamps: false,
  },
});

// const { Hooks } = require("sequelize/types/hooks");
const { Get_handler } = require("./resourse/js/getHandler");
const { Post_handler } = require("./resourse/js/postHandler");
const { Put_handler } = require("./resourse/js/putHandler");
const { Delete_handler } = require("./resourse/js/deleteHandler");

conn.addHook("beforeBulkDestroy", () => {
  console.log("delete global");
});

const { Faculty, Pulpit, Teacher, Subject, Auditorium_type, Auditorium } =
  require("./resourse/js/Tables").ORM(conn);

conn
  .authenticate()
  .then(() => {
    console.log("Connection success");
  })
  .then(() => {
    return conn
      .transaction({
        isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
      })
      .then((t) => {
        return Auditorium.update(
          { auditorium_capacity: 10 },
          {
            where: { auditorium_capacity: { [Sequelize.Op.gte]: 0 } },
            transaction: t,
          }
        ).then((r) => {
          setTimeout(() => {
            console.log("rollback", r);
            return t.rollback();
          }, 5000);
        });
      });
  })
  .catch((err) => {
    console.log("Connection error: ", err);
  });

let http_handler = (req, res) => {
  const path = url.parse(req.url).pathname;
  switch (req.method) {
    case "GET":
      Get_handler(req, res, path);
      break;
    case "POST":
      Post_handler(req, res, path);
      break;
    case "PUT":
      Put_handler(req, res, path);
      break;
    case "DELETE":
      Delete_handler(req, res, path);
      break;
    default:
      res.statusCode = 405;
      res.end(
        JSON.stringify({
          error: String(`Incorrected method: ${req.method}`),
        })
      );
      break;
  }
};

let server = http.createServer();
server
  .listen(3000, (v) => {
    console.log("Server running at http://localhost:3000/");
  })
  .on("error", (err) => {
    console.log(`Server running with error: ${err.code}, ${err.message}`);
  })
  .on("request", http_handler);
