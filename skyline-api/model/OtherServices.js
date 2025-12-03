const mongoose = require('mongoose');

const OtherServicesSchema = new mongoose.Schema({
    servicesName: {
        type: String,
        required: true,
        trim: true
    },
    discription: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
    }


},{ timestamps: true });

module.exports = mongoose.model('OtherServices', OtherServicesSchema);
