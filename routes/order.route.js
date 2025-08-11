const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// GET /api/orders - Get all orders
router.get("/", orderController.getOrders);

// GET /api/orders/:id - Get order by ID
router.get("/:id", orderController.getOrderById);

// POST /api/orders - Create new order
router.post("/", orderController.createOrder);

// PUT /api/orders/:id - Update order by ID
router.put("/:id", orderController.updateOrder);

// PATCH /api/orders/:id/status - Update order status
router.patch("/:id/status", orderController.updateOrderStatus);

// DELETE /api/orders/:id - Delete order by ID
router.delete("/:id", orderController.deleteOrder);

module.exports = router; 