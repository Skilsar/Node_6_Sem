const { PrismaClient } = require("@prisma/client");
const { json } = require("express");
const conn = new PrismaClient();

const customerModel = require("../models/customerModel");
const customerFunc = new customerModel();

exports.getCustomers = (req, res) => {
  customerFunc.getCustomer(conn).then((result) => {
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
    });
    res.end(JSON.stringify(result));
  });
};

exports.getHTMLCustomers = (req, res) => {
  customerFunc.getCustomer(conn).then((answer) => {
    res.render("../views/Customer.hbs", {
      layout: false,
      customers: answer,
    });
  });
};

exports.findCustomer = (req, res) => {
  let custName = req.params["name"];
  customerFunc.getOneCustomer(conn, custName).then((result) => {
    if (JSON.stringify(result) != "[]") {
      res.render("../views/Customer.hbs", {
        layout: false,
        customers: result,
      });
    } else {
      res.writeHead(400, {
        "Content-Type": "application/json; charset=utf-8",
      });
      res.end(
        JSON.stringify({ Error: `Customer with name ${custName} not found` })
      );
    }
  });
};

exports.addCustomer = (req, res) => {
  let custObj = req.body;
  console.log("Body: ", custObj);
  console.log("Body Object info: ", custObj.company_name, custObj.abbreviation);
  customerFunc.getOneCustomer(conn, custObj.company_name).then((result) => {
    if (JSON.stringify(result) == "[]") {
      customerFunc
        .addCustomer(conn, custObj)
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
      console.log(`Customer with name ${custObj.company_name} already exists!`);
      res.end(
        JSON.stringify({
          Error: `Customer with name ${custObj.company_name} already exists!`,
        })
      );
    }
  });
};

exports.setCustomers = function (req, res) {
  let custObj = req.body;
  console.log("Set Body: ", custObj);
  let custId = parseInt(req.body.customer_id);
  customerFunc.getOneCustomerById(conn, custId).then((result) => {
    if (JSON.stringify(result) != "[]") {
      customerFunc
        .updateCustomer(conn, custObj)
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
      console.log(`Customer with Id ${custId} is not exists!`);
      res.end(
        JSON.stringify({
          Error: `Customer with Id ${custId} is not exists!`,
        })
      );
    }
  });
};

exports.deleteCustomers = function (req, res) {
  let custId = parseInt(req.params["id"]);
  customerFunc.getOneCustomerById(conn, custId).then((result) => {
    if (JSON.stringify(result) != "[]") {
      customerFunc.deleteCustomer(conn, custId).then((result) => {
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
          Error: `Customer with Id ${custId} is not exists!`,
        })
      );
    }
  });
};
