const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();

const productsModel = require("../models/productsModel");
const productsFunc = new productsModel();

exports.getProduct = (req, res) => {
  productsFunc.getProduct(conn).then((result) => {
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
    });
    res.end(JSON.stringify(result));
  });
};

exports.getHTMLProduct = (req, res) => {
  productsFunc.getProduct(conn).then((answer) => {
    res.render("../views/Product.hbs", {
      layout: false,
      product: answer,
    });
  });
};

exports.findProduct = (req, res) => {
  let productName = req.params["name"];
  console.log(`findProduct ${productName}`);
  productsFunc.getOneProduct(conn, productName).then((result) => {
    if (JSON.stringify(result) != "[]") {
      productsFunc.getProduct(conn).then((answer) => {
        res.render("../views/Product.hbs", {
          layout: false,
          product: answer,
          find_product: result,
        });
      });
    } else {
      res.writeHead(400, {
        "Content-Type": "application/json; charset=utf-8",
      });
      console.log(`Product with name ${productName} not found`);
      res.end(
        JSON.stringify({
          Error: `Product with name ${productName} not found`,
        })
      );
    }
  });
};

exports.addProduct = (req, res) => {
  let productObj = req.body;
  console.log("Body: ", productObj);
  productsFunc.getOneProduct(conn, productObj.product_name).then((result) => {
    console.log("!!! --- addProduct:");
    console.log(JSON.stringify(result));
    if (JSON.stringify(result) == "[]") {
      productsFunc
        .addProduct(conn, productObj)
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
        `Product with name ${productObj.product_name} already exists!`
      );
      res.end(
        JSON.stringify({
          Error: `Product with name ${productObj.product_name} already exists!`,
        })
      );
    }
  });
};

exports.setProduct = function (req, res) {
  let productObj = req.body;
  console.log("Body: ", productObj);
  let productId = parseInt(req.body.product_id);
  productsFunc.getOneProductById(conn, productId).then((result) => {
    if (JSON.stringify(result) != "[]") {
      productsFunc
        .updateProduct(conn, productObj)
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
      console.log(`Product with Id ${productId} is not exists!`);
      res.end(
        JSON.stringify({
          Error: `Product with Id ${productId} is not exists!`,
        })
      );
    }
  });
};

exports.deleteProduct = function (req, res) {
  let productId = parseInt(req.params["id"]);
  productsFunc.getOneProductById(conn, productId).then((result) => {
    if (JSON.stringify(result) != "[]") {
      productsFunc.deleteProduct(conn, productId).then((result) => {
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
          Error: `Product with Id ${productId} is not exists!`,
        })
      );
    }
  });
};
