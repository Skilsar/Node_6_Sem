const exp = require("express");

const deliveryController = require("../controllers/deliveriesController");

const router = exp.Router();

router.get("/", deliveryController.getDelivery);
router.get("/:id", deliveryController.findDelivery);
router.post("/", deliveryController.addDelivery);
router.put("/", deliveryController.setDelivery);
router.delete("/:id", deliveryController.deleteDelivery);

module.exports = router;
