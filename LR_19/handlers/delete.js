const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();

const method = require("../DBMethod");

module.exports = {
  Delete_handler(req, res, path) {
    switch (path.split("/")[1]) {
      case "api":
        switch (path.split("/")[2]) {
          case "faculties":
            (naming = "faculties"), (nam = path.split("/")[3]);
            break;
          case "pulpits":
            (naming = "pulpits"), (nam = path.split("/")[3]);
            break;
          case "teachers":
            (naming = "teachers"), (nam = path.split("/")[3]);
            break;
          case "subjects":
            (naming = "subjects"), (nam = path.split("/")[3]);
            break;
          case "auditoriumstypes":
            (naming = "auditoriumstypes"), (nam = path.split("/")[3]);
            break;
          case "auditoriums":
            (naming = "auditoriums"), (nam = path.split("/")[3]);
            break;
          default:
            res.writeHead(404, {
              "Content-Type": "application/json; charset=utf-8",
            });
            res.end("Table not founded");
            break;
        }

        method.deleting(conn, naming, nam).then((result) => {
          res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8",
          });
          res.end(JSON.stringify(result));
        });
        break;
      default:
        res.statusCode = 400;
        res.end(
          JSON.stringify({
            error: String("Method, table name or path isn't correct!"),
          })
        );
    }
  },
};
