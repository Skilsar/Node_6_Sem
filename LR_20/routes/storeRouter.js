const exp = require("express");

const storeController = require("../controllers/storeController");

const router = exp.Router();

router.get("/", storeController.getStore);
router.get("/:name", storeController.findStore);
router.post("/", storeController.addStore);
router.put("/", storeController.setStore);
router.delete("/:id", storeController.deleteStore);

module.exports = router;
