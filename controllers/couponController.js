import Coupon from "../models/coupon_model.js";

// Get all coupons
export async function getCoupons(req, res) {
    try {
        const coupons = await Coupon.find({});
        res.status(200).json({
            success: true,
            data: coupons,
            count: coupons.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Get coupon by ID
export async function getCouponById(req, res) {
    try {
        const coupon = await Coupon.findById(req.params.id);
        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found"
            });
        }
        res.status(200).json({
            success: true,
            data: coupon
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Get coupon by code
export async function getCouponByCode(req, res) {
    try {
        const { code } = req.params;
        const coupon = await Coupon.findOne({ code });

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found"
            });
        }

        // Check if coupon is expired
        if (new Date() > coupon.expiryDate) {
            return res.status(400).json({
                success: false,
                message: "Coupon has expired"
            });
        }

        // Check if usage limit exceeded
        if (coupon.usageCount >= coupon.usageLimit) {
            return res.status(400).json({
                success: false,
                message: "Coupon usage limit exceeded"
            });
        }

        res.status(200).json({
            success: true,
            data: coupon
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Create new coupon
export async function createCoupon(req, res) {
    try {
        const coupon = await Coupon.create(req.body);
        res.status(201).json({
            success: true,
            message: "Coupon created successfully",
            data: coupon
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Update coupon by ID
export async function updateCoupon(req, res) {
    try {
        const id = req.params.id;
        const coupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Coupon updated successfully",
            data: coupon
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Delete coupon by ID
export async function deleteCoupon(req, res) {
    try {
        const id = req.params.id;
        const coupon = await Coupon.findByIdAndDelete(id);

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Coupon deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Increment coupon usage count
export async function useCoupon(req, res) {
    try {
        const { code } = req.params;
        const coupon = await Coupon.findOne({ code });

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found"
            });
        }

        if (coupon.usageCount >= coupon.usageLimit) {
            return res.status(400).json({
                success: false,
                message: "Coupon usage limit exceeded"
            });
        }

        if (new Date() > coupon.expiryDate) {
            return res.status(400).json({
                success: false,
                message: "Coupon has expired"
            });
        }

        coupon.usageCount += 1;
        await coupon.save();

        res.status(200).json({
            success: true,
            message: "Coupon used successfully",
            data: coupon
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
} 