import express from 'express';
import { getWeatherForecast } from '../controllers/weatherController.js'; // Correct function name

const router = express.Router();

router.get('/', getWeatherForecast); // Use the imported function

export default router;
