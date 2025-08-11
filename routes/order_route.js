import { Router } from "express";
const router = Router();
import { getOrders, getOrderById, createOrder, updateOrder, updateOrderStatus, deleteOrder } from "../controllers/orderController.js";

// GET /api/orders - Get all orders
router.get("/", getOrders);

// GET /api/orders/:id - Get order by ID
router.get("/:id", getOrderById);

// POST /api/orders - Create new order
router.post("/", createOrder);

// PUT /api/orders/:id - Update order by ID
router.put("/:id", updateOrder);

// PATCH /api/orders/:id/status - Update order status
router.patch("/:id/status", updateOrderStatus);

// DELETE /api/orders/:id - Delete order by ID
router.delete("/:id", deleteOrder);

export default router; 