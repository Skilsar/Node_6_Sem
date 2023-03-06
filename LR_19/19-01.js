const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();

const url = require("url");
const http = require("http");

const { Get_handler } = require("./handlers/get");
const { Post_handler } = require("./handlers/post");
const { Put_handler } = require("./handlers/put");
const { Delete_handler } = require("./handlers/delete");

let http_handler = (req, res) => {
  const path = url.parse(req.url).pathname;
  let method = req.method;
  switch (method) {
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
          error: String(`Incorrected method: ${method}`),
        })
      );
      break;
  }
};

let server = http.createServer();
server
  .listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
  })
  .on("error", (err) => {
    console.log(`Server running error: ${err.code}, ${err.message}`);
  })
  .on("request", http_handler);
