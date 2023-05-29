const express = require("express");
const contactRouter = express.Router();
const contactController = require("../controllers/contacts.controller");

contactRouter.get("/", contactController.getAllContacts);
contactRouter.post("/", contactController.addContact);
contactRouter.put("/", contactController.editContact);
contactRouter.delete("/", contactController.deleteContact);

module.exports = contactRouter;
