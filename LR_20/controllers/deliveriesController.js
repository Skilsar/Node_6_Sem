const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();

const deliveriesModel = require("../models/deliveriesModel");
const deliveriesFunc = new deliveriesModel();

exports.getDelivery = (req, res) => {
  deliveriesFunc.getDelivery(conn).then((result) => {
    console.log(result);
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
    });
    res.end(JSON.stringify(result));
  });
};

exports.getHTMLDelivery = (req, res) => {
  deliveriesFunc.getDelivery(conn).then((answer) => {
    res.render("../views/Delivery.hbs", {
      layout: false,
      deliveries: answer,
    });
  });
};

exports.findDelivery = (req, res) => {
  let deliveryId = req.params["id"];
  console.log(`findDelivery ${deliveryId}`);
  deliveriesFunc.getOneDeliveryById(conn, deliveryId).then((result) => {
    if (JSON.stringify(result) != "[]") {
      deliveriesFunc.getDelivery(conn).then((answer) => {
        res.render("../views/Delivery.hbs", {
          layout: false,
          deliveries: answer,
          find_delivery: result,
        });
      });
    } else {
      res.writeHead(400, {
        "Content-Type": "application/json; charset=utf-8",
      });
      console.log(`Delivery with ID ${deliveryId} not found`);
      res.end(
        JSON.stringify({
          Error: `Delivery with ID ${deliveryId} not found`,
        })
      );
    }
  });
};

exports.addDelivery = (req, res) => {
  let deliveryObj = req.body;
  console.log("addDelivery Body: ", deliveryObj);
  deliveriesFunc
    .addDelivery(conn, deliveryObj)
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
};

exports.setDelivery = function (req, res) {
  let deliveryObj = req.body;
  console.log("Body: ", deliveryObj);
  let deliveryId = parseInt(req.body.deliveries_id);
  deliveriesFunc.getOneDeliveryById(conn, deliveryId).then((result) => {
    if (JSON.stringify(result) != "[]") {
      deliveriesFunc
        .updateDelivery(conn, deliveryObj)
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
      console.log(`Delivery with Id ${deliveryId} is not exists!`);
      res.end(
        JSON.stringify({
          Error: `Delivery with Id ${deliveryId} is not exists!`,
        })
      );
    }
  });
};

exports.deleteDelivery = function (req, res) {
  let deliveryId = parseInt(req.params["id"]);
  deliveriesFunc.getOneDeliveryById(conn, deliveryId).then((result) => {
    if (JSON.stringify(result) != "[]") {
      deliveriesFunc.deleteDelivery(conn, deliveryId).then((result) => {
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
          Error: `Delivery with Id ${deliveryId} is not exists!`,
        })
      );
    }
  });
};
