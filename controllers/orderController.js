import Order from "../models/order_model.js";

// Get all orders
export async function getOrders(req, res) {
    try {
        const orders = await Order.find({})
            .populate('customerId', 'name email')
            .populate('items.productId', 'name price sku');

        res.status(200).json({
            success: true,
            data: orders,
            count: orders.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Get order by ID
export async function getOrderById(req, res) {
    try {
        const order = await Order.findById(req.params.id)
            .populate('customerId', 'name email')
            .populate('items.productId', 'name price sku');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Create new order
export async function createOrder(req, res) {
    try {
        const order = await Order.create(req.body);
        const populatedOrder = await Order.findById(order._id)
            .populate('customerId', 'name email')
            .populate('items.productId', 'name price sku');

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: populatedOrder
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Update order by ID
export async function updateOrder(req, res) {
    try {
        const id = req.params.id;
        const order = await Order.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
            .populate('customerId', 'name email')
            .populate('items.productId', 'name price sku');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Delete order by ID
export async function deleteOrder(req, res) {
    try {
        const id = req.params.id;
        const order = await Order.findByIdAndDelete(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Update order status
export async function updateOrderStatus(req, res) {
    try {
        const id = req.params.id;
        const { status } = req.body;

        if (!['pending', 'processing', 'completed', 'cancelled'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status. Must be one of: pending, processing, completed, cancelled"
            });
        }

        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        ).populate('customerId', 'name email')
            .populate('items.productId', 'name price sku');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
} 