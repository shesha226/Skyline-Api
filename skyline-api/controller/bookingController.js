const Booking = require('../model/Booking');

//Create a new booking
exports.createBooking = async (req, res) => {
    try {
        const { customerId, roomId, checkInDate, checkOutDate, totalAmount, status } = req.body;
        if (!customerId || !roomId || !checkInDate || !checkOutDate || !totalAmount || !status)
        { return res.status(400).json({ message: 'All fields are required' }); }

        if (new Date(checkInDate) <= new Date(checkOutDate)) {
            return res.status(400).json({ message: 'Check-in date must be before check-out date' });
        }

        const newBooking = new Booking({
            customerId,
            roomId,
            checkInDate,
            checkOutDate,
            totalAmount,
            status
        
        });
        await newBooking.save();
        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

};

//Get all bookings

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('customerId', 'name email')
            .populate('roomId', 'roomNumber')
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

//Get one booking

exports.getBookingById = async (req, res) => {
    try { 
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.json(booking);

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

//Update a booking

exports.updateBooking = async (req, res) => { 
    try {
        const updateBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if(!updateBooking)return res.status(404).json({ message: 'Booking not found' });
        res.json({ message: 'Booking updated successfully', booking: updateBooking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

//Delete a booking

exports.deleteBooking = async (req, res) => {
    try {
        const deleteBooking = await Booking.findOneAndDelete(req.params.id);
        if (!deleteBooking) return res.status(404).json({ message: 'Booking not found' });
        res.json({ message: 'Booking deleted successfully' });
     
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};