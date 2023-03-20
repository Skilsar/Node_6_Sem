const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();

const manufacturersModel = require("../models/manufacturersModel");
const manufacturersFunc = new manufacturersModel();

exports.getManufacturer = (req, res) => {
  manufacturersFunc.getManufacturer(conn).then((result) => {
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
    });
    res.end(JSON.stringify(result));
  });
};

exports.getHTMLManufacturer = (req, res) => {
  manufacturersFunc.getManufacturer(conn).then((answer) => {
    console.log(answer);
    res.render("../views/Manufacturer.hbs", {
      layout: false,
      manufacturer: answer,
    });
  });
};

exports.findManufacturer = (req, res) => {
  let manufacturerName = req.params["name"];
  console.log(`findManufacturer ${manufacturerName}`);
  manufacturersFunc
    .getOneManufacturer(conn, manufacturerName)
    .then((result) => {
      if (JSON.stringify(result) != "[]") {
        manufacturersFunc.getManufacturer(conn).then((answer) => {
          res.render("../views/Manufacturer.hbs", {
            layout: false,
            manufacturer: answer,
            find_manufacturer: result,
          });
        });
      } else {
        res.writeHead(400, {
          "Content-Type": "application/json; charset=utf-8",
        });
        console.log(`Manufacturer with name ${manufacturerName} not found`);
        res.end(
          JSON.stringify({
            Error: `Manufacturer with name ${manufacturerName} not found`,
          })
        );
      }
    });
};

exports.addManufacturer = (req, res) => {
  let manufacturerObj = req.body;
  console.log("Body: ", manufacturerObj);
  manufacturersFunc
    .getOneManufacturer(conn, manufacturerObj.manufacturer_name)
    .then((result) => {
      console.log("!!! --- addManufacturer:");
      console.log(JSON.stringify(result));
      if (JSON.stringify(result) == "[]") {
        manufacturersFunc
          .addManufacturer(conn, manufacturerObj)
          .then((result) => {
            res.writeHead(200, {
              "Content-Type": "application/json; charset=utf-8",
            });
            res.end(JSON.stringify(result));
          })
          .catch((e) => {
            console.log("Error: ", e);
            res.end(JSON.stringify(e));
          });
      } else {
        res.writeHead(400, {
          "Content-Type": "application/json; charset=utf-8",
        });
        console.log(
          `Manufacturer with name ${manufacturerObj.manufacturer_name} already exists!`
        );
        res.end(
          JSON.stringify({
            Error: `Manufacturer with name ${manufacturerObj.manufacturer_name} already exists!`,
          })
        );
      }
    });
};

exports.setManufacturer = function (req, res) {
  let manufacturerObj = req.body;
  console.log("Body: ", manufacturerObj);
  let manufacturerId = parseInt(req.body.manufacturer_id);
  manufacturersFunc
    .getOneManufacturerById(conn, manufacturerId)
    .then((result) => {
      if (JSON.stringify(result) != "[]") {
        manufacturersFunc
          .updateManufacturer(conn, manufacturerObj)
          .then((result) => {
            res.writeHead(200, {
              "Content-Type": "application/json; charset=utf-8",
            });
            res.end(JSON.stringify(result));
          })
          .catch((e) => {
            console.log("Error: ", e);
            res.end(JSON.stringify(e));
          });
      } else {
        res.writeHead(400, {
          "Content-Type": "application/json; charset=utf-8",
        });
        console.log(`Manufacturer with Id ${manufacturerId} is not exists!`);
        res.end(
          JSON.stringify({
            Error: `Manufacturer with Id ${manufacturerId} is not exists!`,
          })
        );
      }
    });
};

exports.deleteManufacturer = function (req, res) {
  let manufacturerId = parseInt(req.params["id"]);
  manufacturersFunc
    .getOneManufacturerById(conn, manufacturerId)
    .then((result) => {
      if (JSON.stringify(result) != "[]") {
        manufacturersFunc
          .deleteManufacturer(conn, manufacturerId)
          .then((result) => {
            res.writeHead(200, {
              "Content-Type": "application/json; charset=utf-8",
            });
            res.end(JSON.stringify(result));
          });
      } else {
        res.writeHead(400, {
          "Content-Type": "application/json; charset=utf-8",
        });
        res.end(
          JSON.stringify({
            Error: `Manufacturer with Id ${manufacturerId} is not exists!`,
          })
        );
      }
    });
};
