const jsonRPCServer = require("jsonrpc-server-http-nats");
const { validator, divValidator } = require("./valid");
const functions = require("./func");

const server = new jsonRPCServer();

server.on("sum", validator, (params, channel, response) => {
  console.log("SUM IN: " + params);
  const result = functions.sum(params);
  console.log("SUM RESULT: " + result);
  response(null, result);
});

server.on("mul", validator, (params, channel, response) => {
  console.log("MUL IN: " + params);
  const result = functions.mul(params);
  console.log("MUL RESULT: " + result);
  response(null, result);
});
server.on("div", divValidator, (params, channel, response) => {
  console.log("DIV IN: " + JSON.stringify(params));
  const result = params.x / params.y;
  console.log("DIV RESULT: " + result);
  response(null, result);
});
server.on("proc", divValidator, (params, channel, response) => {
  console.log("PROC IN: " + JSON.stringify(params));
  const result = (params.x / params.y) * 100;
  console.log("PROC RESULT: " + result);
  response(null, result);
});

server.listenHttp({ host: "127.0.0.1", port: 3000 }, () => {
  console.log("JSON-RPC server is started");
});
