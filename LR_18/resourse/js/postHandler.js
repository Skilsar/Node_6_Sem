const { Sequelize } = require("sequelize");

const conn = new Sequelize("node_js", "user", "qwer1234", {
  dialect: "mssql",
});

const { Faculty, Pulpit, Teacher, Subject, Auditorium_type, Auditorium } =
  require("./Tables").ORM(conn);

const method = require("./DBMethod");

module.exports = {
  Post_handler(req, res, path) {
    switch (path.split("/")[1]) {
      case "api":
        let body = "";
        let obj;
        let model = null;
        let err = false;
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        switch (path.split("/")[2]) {
          case "faculties":
            model = Faculty;
            break;
          case "pulpits":
            model = Pulpit;
            break;
          case "teachers":
            model = Teacher;
            break;
          case "subjects":
            model = Subject;
            break;
          case "auditoriumstypes":
            model = Auditorium_type;
            break;
          case "auditoriums":
            model = Auditorium;
            break;
          default:
            res.writeHead(404, {
              "Content-Type": "application/json; charset=utf-8",
            });
            res.end("Table not found");
            err = true;
            break;
        }
        req.on("end", () => {
          if (!err) {
            obj = JSON.parse(body);
            method.insertObj(model, obj).then((result) => {
              res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
              });
              res.end(JSON.stringify(result));
            });
          }
        });
        break;
      default:
        res.statusCode = 404;
        res.end(
          JSON.stringify({
            error: String("Path or method isn't corrected!"),
          })
        );
    }
  },
};
