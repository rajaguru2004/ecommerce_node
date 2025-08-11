import { Router } from "express";
const router = Router();
import {
  login,
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";

// POST /api/users/login - Login user (public route)
router.post("/login", login);

// POST /api/users - Create new user (admin only)
router.post("/", authenticateToken, requireAdmin, createUser);

// GET /api/users - Get all users (authenticated users)
router.get("/", authenticateToken, getUsers);

// GET /api/users/:id - Get user by ID (authenticated users)
router.get("/:id", authenticateToken, getUserById);

// PUT /api/users/:id - Update user by ID (admin only)
router.put("/:id", authenticateToken, requireAdmin, updateUser);

// DELETE /api/users/:id - Delete user by ID (admin only)
router.delete("/:id", authenticateToken, requireAdmin, deleteUser);

export default router;
