const { Sequelize } = require("sequelize");
const fs = require("fs");

const conn = new Sequelize("node_js", "user", "qwer1234", {
  dialect: "mssql",
});

const { Faculty, Pulpit, Teacher, Subject, Auditorium_type, Auditorium } =
  require("./Tables").ORM(conn);

const method = require("./DBMethod");

module.exports = {
  Get_handler(req, res, path) {
    switch (path.split("/")[1]) {
      case "":
        fs.readFile("index.html", (err, data) => {
          if (err) {
            res.writeHead(400, {});
            res.end("File read error");
            return;
          }
          res.writeHead(200, {
            "Content-Type": "text/html",
          });
          res.end(data);
        });
        break;
      case "api":
        switch (path.split("/")[2]) {
          case "faculties":
            let faculty_name = decodeURI(path.split("/")[3]);
            if (path.split("/")[3]) {
              switch (path.split("/")[4]) {
                case "subjects":
                  method
                    .getPulByFac(Faculty, Pulpit, Subject, faculty_name)
                    .then((result) => {
                      res.writeHead(200, {
                        "Content-Type": "application/json; charset=utf-8",
                      });
                      res.end(JSON.stringify(result));
                    });
                  break;
                default:
                  res.statusCode = 418;
                  res.end(JSON.stringify("I do not know this metod"));
              }
            } else {
              method.gets(Faculty).then((result) => {
                res.writeHead(200, {
                  "Content-Type": "application/json; charset=utf-8",
                });
                res.end(JSON.stringify(result));
              });
            }
            break;
          case "pulpits":
            method.gets(Pulpit).then((result) => {
              res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
              });
              res.end(JSON.stringify(result));
            });
            break;
          case "teachers":
            method.gets(Teacher).then((result) => {
              res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
              });
              res.end(JSON.stringify(result));
            });
            break;
          case "auditoriumtypes":
            let auditoriums = decodeURI(path.split("/")[3]);
            if (path.split("/")[3]) {
              switch (path.split("/")[4]) {
                case "auditoriums":
                  method
                    .getAuditoriumByType(
                      Auditorium,
                      Auditorium_type,
                      auditoriums
                    )
                    .then((result) => {
                      res.writeHead(200, {
                        "Content-Type": "application/json; charset=utf-8",
                      });
                      res.end(JSON.stringify(result));
                    });
                  break;
                default:
                  console.log(path.split("/")[4]);
                  res.statusCode = 418;
                  res.end(JSON.stringify("I do not know this metod 4"));
              }
            } else {
              method.gets(auditoriumtypes).then((result) => {
                res.writeHead(200, {
                  "Content-Type": "application/json; charset=utf-8",
                });
                res.end(JSON.stringify(result));
              });
            }
            break;
          case "subjects":
            method.gets(Subject).then((result) => {
              res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
              });
              res.end(JSON.stringify(result));
            });
            break;
          case "auditoriumstypes":
            method.gets(Auditorium_type).then((result) => {
              res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
              });
              res.end(JSON.stringify(result));
            });
            break;
          case "auditoriums":
            method.gets(Auditorium).then((result) => {
              res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
              });
              res.end(JSON.stringify(result));
            });
            break;
          case "auditoriumsgt60":
            method.getAuditoriumsgt60(Auditorium).then((result) => {
              res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
              });
              res.end(JSON.stringify(result));
            });
            break;
          default:
            res.statusCode = 418;
            res.end(JSON.stringify("Path or method isn't correct!"));
        }
        break;
      default:
        res.statusCode = 404;
        res.end(
          JSON.stringify({
            error: String("Path isn't correct!"),
          })
        );
    }
  },
};
