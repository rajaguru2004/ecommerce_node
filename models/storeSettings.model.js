const mongoose = require("mongoose");
const { Schema } = mongoose;

const StoreSettingsSchema = new Schema({
    _id: { type: String, default: 'store-1' },
    storeName: { type: String, required: true },
    description: { type: String },
    address: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String }
});

const StoreSettings = mongoose.model('StoreSettings', StoreSettingsSchema);
module.exports = StoreSettings; 