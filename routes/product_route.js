import { Router } from "express";
import {
  getProducts,
  getProductById,
  updateProductById,
  deleteById,
  addProduct,
  addProductWithImage,
  updateProductByIdWithImage,
} from "../controllers/productcontroller.js";
import { uploadSingleImage } from "../controllers/uploadController.js";

const router = Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.put("/:id", updateProductById);

// Update product with image upload
router.put("/:id/with-image", uploadSingleImage, updateProductByIdWithImage);

router.delete("/:id", deleteById);

router.post("/", addProduct);

// Create product with image upload
router.post("/with-image", uploadSingleImage, addProductWithImage);

export default router;
