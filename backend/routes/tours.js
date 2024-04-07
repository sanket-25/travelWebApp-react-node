import express from 'express';
import {
    createTour,
    updateTour,
    deleteTour,
    getSingleTour,
    getAllTour,
    getTourBySearch,
    getFeaturedTour,
    getTourCount,
} from '../controllers/tourController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// Create a new tour
router.post("/", verifyAdmin, createTour);

// Update a tour
router.put("/:id", verifyAdmin , updateTour);

// Delete a tour
router.delete("/:id", verifyAdmin , deleteTour);

// Get a single tour
router.get("/:id", getSingleTour);

// Get all tours
router.get('/', getAllTour);

// Get tours by search
router.get("/search/getTourBySearch", getTourBySearch);

router.get("/search/getFeaturedTours", getFeaturedTour);

router.get("/search/getTourCount", getTourCount);

export default router;
