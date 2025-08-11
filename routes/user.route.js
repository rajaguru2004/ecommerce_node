const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken, requireAdmin } = require("../middleware/auth");

// POST /api/users/login - Login user (public route)
router.post("/login", userController.login);

// POST /api/users - Create new user (admin only)
router.post("/", authenticateToken, requireAdmin, userController.createUser);

// GET /api/users - Get all users (authenticated users)
router.get("/", authenticateToken, userController.getUsers);

// GET /api/users/:id - Get user by ID (authenticated users)
router.get("/:id", authenticateToken, userController.getUserById);

// PUT /api/users/:id - Update user by ID (admin only)
router.put("/:id", authenticateToken, requireAdmin, userController.updateUser);

// DELETE /api/users/:id - Delete user by ID (admin only)
router.delete("/:id", authenticateToken, requireAdmin, userController.deleteUser);

module.exports = router; 