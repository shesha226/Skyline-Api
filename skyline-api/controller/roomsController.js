const Room = require('../model/Room');

// Create a new room
exports.createRoom = async (req, res) => {
    try {
        const { roomNumber, roomtype, floor, capacity, price, category, isActive, images, status } = req.body;

        const exists = await Room.findOne({ roomNumber });
        if (exists) {
            return res.status(400).json({ message: 'Room already exists' });
        }

        const newRoom = new Room({
            roomNumber,
            roomtype,
            floor,
            capacity,
            price,
            category,
            isActive,
            images,
            status
        });
        await newRoom.save();

        res.status(201).json({ message: 'Room created successfully', room: newRoom });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
// Get all rooms

exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find().sort({ createdAt: -1 });
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get room by ID

exports.getOneRoom = async (req, res) => { 
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ message: 'Room not found' });
        res.json(room);
    }catch (error) { 
        res.status(500).json({ message: 'Server error' });
    }
};

// Update room by ID

exports.updateRoom = async (req, res) => {

    try {
        const updateRoom = await Room.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if(!updateRoom)return res.status(404).json({ message: 'Room not found' });
        res.json({ message: 'Room updated successfully', room: updateRoom });

    }catch (error) { 
        res.status(500).json({ message: 'Server error' });
    }   
};
 
// Delete room by ID

exports.deleteRoom = async (req, res) => { 
    try {
        const deleteRoom = await Room.findByIdAndDelete(req.params.id);
        if(!deleteRoom)return res.status(404).json({ message: 'Room not found' });
        res.json({ message: 'Room deleted successfully' });
    }catch (error) { 
        res.status(500).json({ message: 'Server error' });
    }
};