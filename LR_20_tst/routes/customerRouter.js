const exp = require("express");

const customerController = require("../controllers/customerController");

const router = exp.Router();

router.get("/", customerController.getCustomers);
router.get("/:name", customerController.findCustomer);
router.post("/", customerController.addCustomer);
router.put("/", customerController.setCustomers);
router.delete("/:id", customerController.deleteCustomers);

module.exports = router;
