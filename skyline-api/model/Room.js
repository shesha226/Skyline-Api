const mongoose = require('mongoose');

const roomsSchema = new mongoose.Schema({
    

    roomNumber: {
        type: String,
        required: true,
        trim: true
    },
    roomtype: {
        type: String,
        required: true,
         trim: true
    },
    floor: {
        type: String,
        required: true,
         trim: true
    },
    capacity: {
        type: Number,
        required: true,
        
    },
    price: {
        type: Number,
        required: true,
        
    },
    category: {
        type: String,
        enum: ['Single', 'Double', 'Suite', 'Deluxe'],
        required: true,
         trim: true
    },
    status: {
        type: String,
        enum: ['Available', 'Booked', 'Checked-In', 'Checked-Out', 'Cleaning', 'Maintenance', 'Not-Available'],
        default: 'Available',
        required: true,
         trim: true
    },
    isActive: {
        type: Boolean,
        default: true,
    
    },
    images:[ {
        url: { type: String, required: true },
        description: { type: String, trim: true }
    }]
},{timestamps: true });

module.exports = mongoose.model('Room', roomsSchema);