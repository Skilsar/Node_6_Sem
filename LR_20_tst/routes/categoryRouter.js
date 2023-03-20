const exp = require("express");

const categoryController = require("../controllers/categoryController");

const router = exp.Router();

router.get("/", categoryController.getCategory);
router.get("/:id", categoryController.findCategory);
router.post("/", categoryController.addCategory);
router.put("/", categoryController.setCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
