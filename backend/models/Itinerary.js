// itinerary.model.js
import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema({
  source: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  durationInDays: {
    type: Number,
    required: true
  },
  itineraryText: {
    type: String,
    required: true
  }
});

export default mongoose.model("Itinerary", itinerarySchema);