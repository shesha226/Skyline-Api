const OtherServices = require("../model/OtherServices");

// Create Other Service
exports.createOtherService = async (req, res) => {
    try {
        const newService = await OtherServices.create(req.body);
        res.status(201).json({
            message: "Other Service created successfully",
            data: newService
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Services
exports.getAllOtherServices = async (req, res) => {
    try {
        const services = await OtherServices.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get One Service by ID
exports.getOneOtherService = async (req, res) => {
    try {
        const service = await OtherServices.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Service
exports.updateOtherService = async (req, res) => {
    try {
        const updated = await OtherServices.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.status(200).json({
            message: "Service updated successfully",
            data: updated
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Service
exports.deleteOtherService = async (req, res) => {
    try {
        const deleted = await OtherServices.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
