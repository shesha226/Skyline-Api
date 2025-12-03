const mongoose = require('mongoose');

const customersSchema = new mongoose.Schema({
  
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        sparse: true
    },
    phone: {
        type: String,
        required: true,
    },
   address: {
        type: String,
       required: true,
         trim: true,
    },
    idType: {
        type: String,
        enum: ["NIC", "Passport", "Driving-License"],
        default: "NIC",
        required: true
    },

    idNumber: {
        type: String,
        required: true,
        trim: true
    },
    booking: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking'
        }
    ],
    notes: {
        type: String,
         trim: true,
    },
    resetToken: String,
    resetTokenExpiration: Date


}, { timestamps: true });

module.exports = mongoose.model('Customer', customersSchema);