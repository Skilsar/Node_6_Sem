const exp = require("express");

const customerController = require("../controllers/customerController");
const storeController = require("../controllers/storeController");
const categoryController = require("../controllers/categoryController");

const router = exp.Router();

router.get("/customer", customerController.getHTMLCustomers);
router.get("/store", storeController.getHTMLStore);
router.get("/category", categoryController.getHTMLCategory);

module.exports = router;
