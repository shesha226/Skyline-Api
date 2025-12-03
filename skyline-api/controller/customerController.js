const Customer = require('../model/Customer');

exports.createCustomer = async (req, res) => {
    try {
        const { email, phone, idNumber } = req.body;
        const existingCustomer = await Customer.findOne({
            $or: [{ email }, { phone }, { idNumber }]
        });
        if (existingCustomer) {
            return res.status(400).json({ message: 'Customer already exists' });
        }

        const newCustomer = await Customer.create(req.body);
       res.status(201).json({ message: 'Customer created successfully',date: newCustomer }); 
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
    
}

//get all customers
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json({
            message: 'Customers saved successfully',
            data: customers
       })
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

//get single customer
exports.getOneCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id).populate('bookings');
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({
            message: 'Customer fetched successfully',
            data: customer
       })
    }catch (error) {
        res.status(500).json({ message: 'Server error' });
    } 
}


exports.updateCustomer = async (req, res) => {
    try {
        const customer = Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        const existingCustomer = await Customer.findOne({
            $or: [{ email }, { phone }, { idNumber }],
            _id: { $ne: customer._id }
        });
        if (existingCustomer) {
            return res.status(400).json({ message: 'Customer already exists' });
        }

        const updateCustomer = await Customer.findOneAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message: 'Customer updated successfully',
            data: updateCustomer
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
   
};

//delete customer
exports.deleteCustomer = async (req, res) => {
    try {
        const deleteCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deleteCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({
            message: 'Customer deleted successfully',
            data: deleteCustomer
        })
    }catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}