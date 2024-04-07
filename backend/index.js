import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import BookingRoute from './routes/Bookings.js';
import WeatherRoute from './routes/weatherRoutes.js';
import ItineraryRoute from './routes/itineraryRoutes.js';
import contactRoute from "./routes/contact.js";
import blogRoute from "./routes/blog.js";
import commentRoute from "./routes/comment.js";





dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin:true,
    credentials:true
}

// Database connection
mongoose.set("strictQuery", false);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB database connected');
    } catch (err) {
        console.error('MongoDB database connection failed:', err.message);
    }
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/Booking', BookingRoute);
app.use('/api/v1/Weather', WeatherRoute);
app.use('/api/v1/Itinerary', ItineraryRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comment", commentRoute);


app.listen(port, () => {
    connect();
    console.log('Server is listening on port', port);
});
