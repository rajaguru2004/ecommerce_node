import { Router } from "express";
const router = Router();
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";

// GET /api/customers - Get all customers
router.get("/", getCustomers);

// GET /api/customers/:id - Get customer by ID
router.get("/:id", getCustomerById);

// POST /api/customers - Create new customer
router.post("/", createCustomer);

// PUT /api/customers/:id - Update customer by ID
router.put("/:id", updateCustomer);

// DELETE /api/customers/:id - Delete customer by ID
router.delete("/:id", deleteCustomer);

export default router;
