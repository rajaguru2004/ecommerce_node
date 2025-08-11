import { Router } from "express";

const router = Router();
import {
  getProducts,
  getProductById,
  updateProductById,
  deleteById,
  addProduct,
} from "../controllers/productcontroller.js";

router.get("/", getProducts);

router.get("/:id", getProductById);

router.put("/:id", updateProductById);

router.delete("/:id", deleteById);

router.post("/", addProduct);

export default router;
