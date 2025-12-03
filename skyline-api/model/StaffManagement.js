const mongoose = require('mongoose');

const staffManegementSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        sparse: true
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['Staff', 'Admin', 'Receptionist', 'Manager', 'Passenger'],
        default: 'Receptionist'
    },
    password: {
        type: String,
        required: true
    },
    activeLogs: [{
        date: { type: Date, default: Date.now },
        status: { type: String, enum: ['Present', 'Absent'],default: 'Present', required: true }
    }]
}, { timestamps: true });

module.exports = mongoose.model('StaffManagement', staffManegementSchema);