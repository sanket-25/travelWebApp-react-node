import express from 'express';
import { createBooking, getAllBookings, getBooking } from '../controllers/BookingController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const bookingRoute = express.Router();

// Create a new booking
bookingRoute.post('/', createBooking);

// Get a single booking by ID
bookingRoute.get('/:id', getBooking);

// Get all bookings (requires admin verification)
bookingRoute.get('/', verifyAdmin, getAllBookings);

export default bookingRoute;
