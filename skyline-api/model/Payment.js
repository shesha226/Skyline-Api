const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({

    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
        default: 'Pending'
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer', 'Cash'],
        default: 'Credit Card'
    },
   
    paymentDate: {
        type: Date,
        default: Date.now
    },
   invoiceNumber: {
        type: String,
        required: true, 
        unique: true, 
        trim: true
    },
    amount: {
        type: Number,
        required: true
    }

},{timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);