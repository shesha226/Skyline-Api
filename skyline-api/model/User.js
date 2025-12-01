const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true
    },
    number: { 
        type: String, 
        required: true,
        trim: true
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['Staff', 'Admin','Receptionist', 'Manager'], 
        default: 'Receptionist'
    },
    resetToken: String,
    resetTokenExpiration: Date

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
