const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({

    reportType: {
        type: String,
        required: true,
        enum: [
            "Daily Bookings",
            "Weekly Bookings",
            "Monthly Bookings",
            "Revenue Report",
            "Occupancy Rate",
            "Room Statistics",
            "Customer Statistics"
        ]
    },
    generatedAt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
      periodFrom: { type: Date, required: true },
    periodTo: { type: Date, required: true },

    fileUrl: { type: String }, 
    notes: { type: String, trim: true }
},{ timestamps: true });

module.exports = mongoose.model('Report', ReportSchema);