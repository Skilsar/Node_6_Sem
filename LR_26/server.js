const express = require("express");
const app = express();
const https = require("https");
const fs = require("fs");
const port = 3000;

let options = {
  key: fs.readFileSync("./RS-LR26-HGG-RSA.key").toString(),
  cert: fs.readFileSync("./RS-TEN-HGG.crt").toString(),
};

app.get("/", (req, res) => {
  res.send("HELLO");
});

https.createServer(options, app).listen(
  {
    port: port,
  },
  () => {
    console.log(`https://SKILSAR:${port}/`);
    console.log(`https://SKILSAR-HGG:${port}/`);
  }
);
