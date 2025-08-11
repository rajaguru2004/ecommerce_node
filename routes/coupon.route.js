const express = require("express");
const router = express.Router();
const couponController = require("../controllers/couponController");

// GET /api/coupons - Get all coupons
router.get("/", couponController.getCoupons);

// GET /api/coupons/:id - Get coupon by ID
router.get("/:id", couponController.getCouponById);

// GET /api/coupons/code/:code - Get coupon by code
router.get("/code/:code", couponController.getCouponByCode);

// POST /api/coupons - Create new coupon
router.post("/", couponController.createCoupon);

// PUT /api/coupons/:id - Update coupon by ID
router.put("/:id", couponController.updateCoupon);

// PATCH /api/coupons/:code/use - Use coupon (increment usage count)
router.patch("/:code/use", couponController.useCoupon);

// DELETE /api/coupons/:id - Delete coupon by ID
router.delete("/:id", couponController.deleteCoupon);

module.exports = router; 