const exp = require("express");

const customerController = require("../controllers/customerController");
const storeController = require("../controllers/storeController");
const categoryController = require("../controllers/categoryController");
const manufacturersController = require("../controllers/manufacturersController");
const productsController = require("../controllers/productsController");
const deliveryController = require("../controllers/deliveriesController");

const router = exp.Router();

router.get("/customer", customerController.getHTMLCustomers);
router.get("/store", storeController.getHTMLStore);
router.get("/category", categoryController.getHTMLCategory);
router.get("/manufacturers", manufacturersController.getHTMLManufacturer);
router.get("/products", productsController.getHTMLProduct);
router.get("/delivery", deliveryController.getHTMLDelivery);

module.exports = router;
