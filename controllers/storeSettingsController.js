const StoreSettings = require("../models/storeSettings.model");

// Get store settings
exports.getStoreSettings = async (req, res) => {
    try {
        let settings = await StoreSettings.findById('store-1');

        if (!settings) {
            // Create default settings if none exist
            settings = await StoreSettings.create({
                _id: 'store-1',
                storeName: 'My Store',
                description: 'Default store description',
                address: '',
                contactEmail: '',
                contactPhone: ''
            });
        }

        res.status(200).json({
            success: true,
            data: settings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Create store settings
exports.createStoreSettings = async (req, res) => {
    try {
        const settings = await StoreSettings.create({
            _id: 'store-1',
            ...req.body
        });

        res.status(201).json({
            success: true,
            message: "Store settings created successfully",
            data: settings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update store settings
exports.updateStoreSettings = async (req, res) => {
    try {
        const settings = await StoreSettings.findByIdAndUpdate(
            'store-1',
            req.body,
            { new: true, runValidators: true, upsert: true }
        );

        res.status(200).json({
            success: true,
            message: "Store settings updated successfully",
            data: settings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete store settings
exports.deleteStoreSettings = async (req, res) => {
    try {
        const settings = await StoreSettings.findByIdAndDelete('store-1');

        if (!settings) {
            return res.status(404).json({
                success: false,
                message: "Store settings not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Store settings deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}; 