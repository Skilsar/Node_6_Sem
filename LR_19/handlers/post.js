const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();

const method = require("../DBMethod");

module.exports = {
  Post_handler(req, res, path) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    switch (path.split("/")[1]) {
      case "api":
        switch (path.split("/")[2]) {
          case "faculties":
            break;
          case "pulpits":
            break;
          case "teachers":
            break;
          case "subjects":
            break;
          case "auditoriumstypes":
            break;
          case "auditoriums":
            break;
          default:
            res.writeHead(404, {
              "Content-Type": "application/json; charset=utf-8",
            });
            res.end("Table not founded");
            break;
        }
        req.on("end", () => {
          obj = JSON.parse(body);

          method.inserting(path.split("/")[2], obj, conn).then((result) => {
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
