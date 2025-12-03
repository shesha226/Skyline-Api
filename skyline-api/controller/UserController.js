const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');



const JWT_SECRET = process.env.JWT_SECRET;

// User Registration
exports.registerUser = async (req, res) => {
    try { 
        const { name, email, number, password, role } = req.body;
        
        const exists = await User.findOne({ email });
        if (exists) 
            return res.status(400).json({ message: 'User already exists' });
        
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            name,
            email,
            number,
            password: hashedPassword,
            role
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: newUser });

        

    }
    catch (error) { 
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// User Login
exports.loginUser = async (req, res) => { 
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid Email' });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ message: 'Invalid Password' });
        

        const token = jwt.sign(
            { id: user._id, role: user.role }, JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({
            message: 'Login successful', token, user
        });
    }
    catch (error) { res.status(500).json({ message: 'Server error' }); }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users =  await User.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (error) { 
        res.status(500).json({ message: 'Server error' });
    }
};
 // Get Single User
exports.getUser = async (req, res) => { 
    try {
        const user  = await User.findById(req.params.id);
        if (!user ) return res.status(404).json({ message: 'User not found' });
        res.json(user );
    } catch (error) { 
        res.status(500).json({ message: 'Server error' });
    }
};

//Update User
exports.updateUser = async (req, res) => { 
    try {
        const data = req.body;
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 12);
        }

        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            data,
            { new: true }
        );
        if(!updateUser) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User updated successfully', user: updateUser });
     }
    catch (error) { 
        res.status(500).json({ message: 'Server error' });
    }
};

//Delete User
exports.deleteUser = async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        if(!deleteUser) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
     }
    catch (error) { 
        res.status(500).json({ message: 'Server error' });
    }
};
 
//Genarate Reset Token
exports.generateResetToken = async (req, res) => {
    try {
        const { email } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const token = crypto.randomBytes(32).toString('hex');
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;

        await user.save();
        res.json({ message: 'Reset token generated successfully', token });

    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};