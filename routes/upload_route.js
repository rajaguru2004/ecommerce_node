import { Router } from "express";
import { uploadSingleImage, uploadImage, handleUploadError } from "../controllers/uploadController.js";

const router = Router();

// Upload single image
router.post("/image", uploadSingleImage, uploadImage);

// Error handling middleware
router.use(handleUploadError);

export default router; 