const express = require("express");

const router = express.Router();
const productController = require("../controllers/productcontroller");

router.get("/", productController.getProducts);

router.get("/:id", productController.getProductById);

router.put("/:id", productController.updateProductById);

router.delete("/:id", productController.deleteById);

router.post("/", productController.addProduct);

module.exports = router;
