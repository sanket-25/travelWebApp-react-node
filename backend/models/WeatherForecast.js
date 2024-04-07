import mongoose from "mongoose";

const WeatherForecastSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  weather: {
    type: Object,
    required: true
  }
});

export default mongoose.model("WeatherForecast", WeatherForecastSchema); // Export as default
