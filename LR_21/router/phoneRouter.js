const express = require("express");
const db = require("../DB/DBController");

let Router = express.Router();

Router.get("/", (req, res) => {
  res.render("index", {
    unlockOthers: true,
    phones: db.getPhones(),
  });
});

Router.get("/add", (req, res) => {
  res.render("add", {
    unlockOthers: false,
    phones: db.getPhones(),
    helpers: { goBack: () => "window.location.href = '/'" },
  });
});

Router.get("/update", (req, res) => {
  res.render("update", {
    unlockOthers: false,
    phones: db.getPhones(),
    targetPhone: db.getPhoneById(req.query.id),
    helpers: { goBack: () => "window.location.href = '/'" },
  });
});

Router.post("/add", (req, res) => {
  res.json(db.addPhone(req.body));
});

Router.post("/update", (req, res) => {
  res.json(db.updatePhone(req.body));
});

Router.post("/delete", (req, res) => {
  res.json(db.deletePhone(req.body));
});

module.exports = Router;
