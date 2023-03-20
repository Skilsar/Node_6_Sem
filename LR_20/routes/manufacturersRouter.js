const exp = require("express");

const manufacturersController = require("../controllers/manufacturersController");

const router = exp.Router();

router.get("/", manufacturersController.getManufacturer);
router.get("/:name", manufacturersController.findManufacturer);
router.post("/", manufacturersController.addManufacturer);
router.put("/", manufacturersController.setManufacturer);
router.delete("/:id", manufacturersController.deleteManufacturer);

module.exports = router;
