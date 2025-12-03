const Payment = require('../model/Payment');

//Create payment
exports.createpayment = async (req, res) => {
    try {
        const payment = await Payment.create(req.body);
        res.status(201).json({
            message: "Payment created successfully",
            data: payment
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get All payments
exports.getAllpayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get One payment
exports.getOnePayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Delete payment
exports.deletePayment = async (req, res) => {
    try {
        const deleted = await Payment.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.status(200).json({ message: "Payment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Update payment
exports.updatePayment = async (req, res) => {
    try {
        const updated = await Payment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.status(200).json({
            message: "Payment updated successfully",
            data: updated
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};