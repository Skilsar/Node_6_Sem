const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();

const fs = require("fs");

const method = require("../DBMethod");
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
        switch ((metod = path.split("/")[2])) {
          case "faculties":
            let faculty_name = decodeURI(path.split("/")[3]);
            if (path.split("/")[3]) {
              switch (path.split("/")[4]) {
                case "subjects":
                  method.getPulByFac(conn, faculty_name).then((result) => {
                    res.writeHead(200, {
                      "Content-Type": "application/json; charset=utf-8",
                    });
                    res.end(JSON.stringify(result));
                  });
                  break;
                default:
                  res.statusCode = 400;
                  res.end(JSON.stringify("Method isn't correct!"));
              }
            } else {
              method.gets(metod, conn).then((result) => {
                res.writeHead(200, {
                  "Content-Type": "application/json; charset=utf-8",
                });
                res.end(JSON.stringify(result));
              });
            }
            break;
          case "pulpits":
            method.gets(metod, conn).then((result) => {
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
                    .getAuditoriumByType(conn, auditoriums)
                    .then((result) => {
                      res.writeHead(200, {
                        "Content-Type": "application/json; charset=utf-8",
                      });
                      res.end(JSON.stringify(result));
                    });
                  break;
                default:
                  res.statusCode = 400;
                  res.end(JSON.stringify("I do not know this metod 4"));
              }
            } else {
              method.gets(metod, conn).then((result) => {
                res.writeHead(200, {
                  "Content-Type": "application/json; charset=utf-8",
                });
                res.end(JSON.stringify(result));
              });
            }
            break;
          case "subjects":
            method.gets(metod, conn).then((result) => {
              res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
              });
              res.end(JSON.stringify(result));
            });
            break;
          case "auditoriumsWithComp1":
            method.auditoriumsWithComp1(conn).then((result) => {
              res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
              });
              res.end(JSON.stringify(result));
            });
            break;
          case "puplitsWithoutTeachers":
            method.puplitsWithoutTeachers(conn).then((result) => {
              res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
              });
              res.end(JSON.stringify(result));
            });
            break;
          case "pulpitsWithVladimir":
            method.pulpitsWithVladimir(conn).then((result) => {
              res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
              });
              res.end(JSON.stringify(result));
            });
            break;
          case "auditoriumsSameCount":
            method.auditoriumsSameCount(conn).then((result) => {
              res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
              });
              res.end(JSON.stringify(result));
            });
            break;
          case "auditoriumstypes":
            method.gets(metod, conn).then((result) => {
              res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
              });
              res.end(JSON.stringify(result));
            });
            break;
          case "teachers":
            method.gets(metod, conn).then((result) => {
              res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
              });
              res.end(JSON.stringify(result));
            });
            break;
          case "fluentapi":
            method.fluentapi(conn).then((result) => {
              res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
              });
              res.end(JSON.stringify(result));
            });
            break;
          case "transactions":
            method.transactions(conn).then((result) => {
              res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
              });
              res.end(JSON.stringify(result));
            });
            break;
          case "pulpitshtml":
            method.pulpitshtml(conn).then((result) => {
              res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
              });
              res.end(JSON.stringify(result));
            });
            break;
          case "auditoriums":
            method.gets(metod, conn).then((result) => {
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
            res.statusCode = 400;
            res.end(JSON.stringify("Table name or path isn't correct!"));
        }
        break;
      default:
        res.statusCode = 400;
        res.end(
          JSON.stringify({
            error: String("I’m a teapot,I do not know this metod"),
          })
        );
    }
  },
};
