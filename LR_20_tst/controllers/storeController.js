const { PrismaClient } = require("@prisma/client");
const { json } = require("express");
const conn = new PrismaClient();

const storeModel = require("../models/storeModel");
const storeFunc = new storeModel();

exports.getStore = (req, res) => {
  storeFunc.getStore(conn).then((result) => {
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
    });
    res.end(JSON.stringify(result));
  });
};

exports.getHTMLStore = (req, res) => {
  storeFunc.getStore(conn).then((answer) => {
    res.render("../views/Store.hbs", {
      layout: false,
      stors: answer,
    });
  });
};

exports.findStore = (req, res) => {
  let custName = req.params["name"];
  storeFunc.getOneStore(conn, custName).then((result) => {
    if (JSON.stringify(result) != "[]") {
      res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
      });
      res.end(JSON.stringify(result));
    } else {
      res.writeHead(400, {
        "Content-Type": "application/json; charset=utf-8",
      });
      res.end(
        JSON.stringify({ Error: `Store with name ${custName} not found` })
      );
    }
  });
};

exports.addStore = (req, res) => {
  let storeObj = req.body;
  console.log("Body: ", storeObj);
  storeFunc.getOneStore(conn, storeObj.store_name).then((result) => {
    if (JSON.stringify(result) == "[]") {
      storeFunc
        .addStore(conn, storeObj)
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
      res.end(
        JSON.stringify({
          Error: `Store with name ${storeObj.store_name} already exists!`,
        })
      );
    }
  });
};

exports.setStore = function (req, res) {
  let storeObj = req.body;
  console.log("Body: ", storeObj);
  let custId = parseInt(req.body.store_id);
  storeFunc.getOneStoreById(conn, custId).then((result) => {
    if (JSON.stringify(result) != "[]") {
      storeFunc
        .updateStore(conn, storeObj)
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
      res.end(
        JSON.stringify({
          Error: `Store with Id ${custId} is not exists!`,
        })
      );
    }
  });
};

exports.deleteStore = function (req, res) {
  let custId = parseInt(req.params["id"]);
  storeFunc.getOneStoreById(conn, custId).then((result) => {
    if (JSON.stringify(result) != "[]") {
      storeFunc.deleteStore(conn, custId).then((result) => {
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
          Error: `Store with Id ${custId} is not exists!`,
        })
      );
    }
  });
};
