const express = require("express");
const router = express.Router();
const storeSettingsController = require("../controllers/storeSettingsController");

// GET /api/store-settings - Get store settings
router.get("/", storeSettingsController.getStoreSettings);

// POST /api/store-settings - Create store settings
router.post("/", storeSettingsController.createStoreSettings);

// PUT /api/store-settings - Update store settings
router.put("/", storeSettingsController.updateStoreSettings);

// DELETE /api/store-settings - Delete store settings
router.delete("/", storeSettingsController.deleteStoreSettings);

module.exports = router; 