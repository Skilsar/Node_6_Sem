const { PrismaClient } = require("@prisma/client");
const { json } = require("express");
const conn = new PrismaClient();

const categoryModel = require("../models/categoryModel");
const categoryFunc = new categoryModel();

exports.getCategory = (req, res) => {
  categoryFunc.getCategory(conn).then((result) => {
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
    });
    res.end(JSON.stringify(result));
  });
};

exports.getHTMLCategory = (req, res) => {
  categoryFunc.getCategory(conn).then((answer) => {
    res.render("../views/Category.hbs", {
      layout: false,
      category: answer,
    });
  });
};

exports.findCategory = (req, res) => {
  let categoryName = req.params["name"];
  console.log(`findCategory ${categoryName}`);
  categoryFunc.getOneCategory(conn, categoryName).then((result) => {
    if (JSON.stringify(result) != "[]") {
      categoryFunc.getCategory(conn).then((answer) => {
        res.render("../views/Category.hbs", {
          layout: false,
          category: answer,
          find_category: result,
        });
      });
    } else {
      res.writeHead(400, {
        "Content-Type": "application/json; charset=utf-8",
      });
      console.log(`Category with name ${categoryName} not found`);
      res.end(
        JSON.stringify({
          Error: `Category with name ${categoryName} not found`,
        })
      );
    }
  });
};

exports.addCategory = (req, res) => {
  let categoryObj = req.body;
  console.log("Body: ", categoryObj);
  categoryFunc
    .getOneCategory(conn, categoryObj.category_name)
    .then((result) => {
      console.log("!!! --- addCategory:");
      console.log(JSON.stringify(result));
      if (JSON.stringify(result) == "[]") {
        categoryFunc
          .addCategory(conn, categoryObj)
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
          `Category with name ${categoryObj.category_name} already exists!`
        );
        res.end(
          JSON.stringify({
            Error: `Category with name ${categoryObj.category_name} already exists!`,
          })
        );
      }
    });
};

exports.setCategory = function (req, res) {
  let categoryObj = req.body;
  console.log("Body: ", categoryObj);
  let custId = parseInt(req.body.category_id);
  categoryFunc.getOneCategoryById(conn, custId).then((result) => {
    if (JSON.stringify(result) != "[]") {
      categoryFunc
        .updateCategory(conn, categoryObj)
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
      console.log(`Category with Id ${custId} is not exists!`);
      res.end(
        JSON.stringify({
          Error: `Category with Id ${custId} is not exists!`,
        })
      );
    }
  });
};

exports.deleteCategory = function (req, res) {
  let custId = parseInt(req.params["id"]);
  categoryFunc.getOneCategoryById(conn, custId).then((result) => {
    if (JSON.stringify(result) != "[]") {
      categoryFunc.deleteCategory(conn, custId).then((result) => {
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
          Error: `Category with Id ${custId} is not exists!`,
        })
      );
    }
  });
};
