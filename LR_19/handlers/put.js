const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();

const method = require("../DBMethod");

module.exports = {
  Put_handler(req, res, path) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    switch (path.split("/")[1]) {
      case "api":
        switch (path.split("/")[2]) {
          case "faculties":
            naming = "faculties";
            break;
          case "pulpits":
            naming = "pulpits";
            break;
          case "teachers":
            naming = "teachers";
            break;
          case "subjects":
            naming = "subjects";
            break;
          case "auditoriumstypes":
            naming = "auditoriumstypes";
            break;
          case "auditoriums":
            naming = "auditorium";
            break;
          default:
            res.writeHead(404, {
              "Content-Type": "application/json; charset=utf-8",
            });
            res.end("Table not found");
            break;
        }
        req.on("end", () => {
          obj = JSON.parse(body);
          method.updating(conn, obj, naming).then((result) => {
            res.writeHead(200, {
              "Content-Type": "application/json; charset=utf-8",
            });
            res.end(JSON.stringify(result));
          });
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
