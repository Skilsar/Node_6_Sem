const { Sequelize } = require("sequelize");

const conn = new Sequelize("node_js", "user", "qwer1234", {
  dialect: "mssql",
});

const { Faculty, Pulpit, Teacher, Subject, Auditorium_type, Auditorium } =
  require("./Tables").ORM(conn);

const method = require("./DBMethod");

module.exports = {
  Delete_handler(req, res, path) {
    switch (path.split("/")[1]) {
      case "api":
        switch (path.split("/")[2]) {
          case "faculties":
            (mod = Faculty), (naming = "faculties"), (nam = path.split("/")[3]);
            break;
          case "pulpits":
            (mod = Pulpit), (naming = "pulpits"), (nam = path.split("/")[3]);
            break;
          case "teachers":
            (mod = Teacher), (naming = "teachers"), (nam = path.split("/")[3]);
            break;
          case "subjects":
            (mod = Subject), (naming = "subjects"), (nam = path.split("/")[3]);
            break;
          case "auditoriumstypes":
            (mod = Auditorium_type),
              (naming = "auditoriumstypes"),
              (nam = path.split("/")[3]);
            break;
          case "auditoriums":
            (mod = Auditorium),
              (naming = "auditorium"),
              (nam = path.split("/")[3]);
            break;
          default:
            res.writeHead(404, {
              "Content-Type": "application/json; charset=utf-8",
            });
            res.end("Table not founded");
            break;
        }

        method.deleting(mod, naming, nam).then((result) => {
          res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8",
          });
          res.end(JSON.stringify(result));
        });
        break;
      default:
        res.statusCode = 418;
        res.end(
          JSON.stringify({
            error: String("I’m a teapot,I do not know this metod"),
          })
        );
    }
  },
};
