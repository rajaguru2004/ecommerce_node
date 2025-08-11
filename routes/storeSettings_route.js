import { Router } from "express";
const router = Router();
import {
  getStoreSettings,
  createStoreSettings,
  updateStoreSettings,
  deleteStoreSettings,
} from "../controllers/storeSettingsController.js";

// GET /api/store-settings - Get store settings
router.get("/", getStoreSettings);

// POST /api/store-settings - Create store settings
router.post("/", createStoreSettings);

// PUT /api/store-settings - Update store settings
router.put("/", updateStoreSettings);

// DELETE /api/store-settings - Delete store settings
router.delete("/", deleteStoreSettings);

export default router;
