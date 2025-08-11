import Customer from "../models/customer_model.js";

// Get all customers
export async function getCustomers(req, res) {
    try {
        const customers = await Customer.find({});
        res.status(200).json({
            success: true,
            data: customers,
            count: customers.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Get customer by ID
export async function getCustomerById(req, res) {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }
        res.status(200).json({
            success: true,
            data: customer
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Create new customer
export async function createCustomer(req, res) {
    try {
        const customer = await Customer.create(req.body);
        res.status(201).json({
            success: true,
            message: "Customer created successfully",
            data: customer
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Update customer by ID
export async function updateCustomer(req, res) {
    try {
        const id = req.params.id;
        const customer = await Customer.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Customer updated successfully",
            data: customer
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Delete customer by ID
export async function deleteCustomer(req, res) {
    try {
        const id = req.params.id;
        const customer = await Customer.findByIdAndDelete(id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Customer deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
} 