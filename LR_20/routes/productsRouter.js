const exp = require("express");

const productsController = require("../controllers/productsController");

const router = exp.Router();

router.get("/", productsController.getProduct);
router.get("/:name", productsController.findProduct);
router.post("/", productsController.addProduct);
router.put("/", productsController.setProduct);
router.delete("/:id", productsController.deleteProduct);

module.exports = router;
