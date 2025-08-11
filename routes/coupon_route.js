import { Router } from "express";
const router = Router();
import {
  getCoupons,
  getCouponById,
  getCouponByCode,
  createCoupon,
  updateCoupon,
  useCoupon,
  deleteCoupon,
} from "../controllers/couponController.js";

// GET /api/coupons - Get all coupons
router.get("/", getCoupons);

// GET /api/coupons/:id - Get coupon by ID
router.get("/:id", getCouponById);

// GET /api/coupons/code/:code - Get coupon by code
router.get("/code/:code", getCouponByCode);

// POST /api/coupons - Create new coupon
router.post("/", createCoupon);

// PUT /api/coupons/:id - Update coupon by ID
router.put("/:id", updateCoupon);

// PATCH /api/coupons/:code/use - Use coupon (increment usage count)
router.patch("/:code/use", useCoupon);

// DELETE /api/coupons/:id - Delete coupon by ID
router.delete("/:id", deleteCoupon);

export default router;
