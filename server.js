const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const userRoutes = require('./skyline-api/routes/userRoutes');
const roomRoutes = require('./skyline-api/routes/roomRoutes');
const bookingRoutes = require('./skyline-api/routes/bookingRoute');
const customerRoutes = require('./skyline-api/routes/customerRoute');
const otherServiceRoutes = require('./skyline-api/routes/otherServiceRoute');
const paymentRoutes = require('./skyline-api/routes/paymentRoute');

const app = express();
app.use(cors());
app.use(express.json());

// Register all routes
app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/otherservices', otherServiceRoutes); 
app.use('/api/payments', paymentRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
