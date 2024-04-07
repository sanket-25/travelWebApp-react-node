// routes/itineraryRoutes.js
import express from 'express';
import { generateItinerary } from '../controllers/itineraryController.js';

const router = express.Router();

// Route for generating itinerary automatically
router.post('/generate', generateItinerary);




export default router;
