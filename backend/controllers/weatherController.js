import axios from "axios";
import moment from "moment";
import WeatherForecast from "../models/WeatherForecast.js";

export const getWeatherForecast = async (req, res) => {
  try {
    const { city, startDate, endDate } = req.query;
    
    // Parse start and end dates using moment
    const parsedStartDate = moment(startDate).toDate();
    const parsedEndDate = moment(endDate).toDate();

    // Validate date range
    if (parsedStartDate > parsedEndDate) {
      return res.status(400).json({ error: "Start date must be before end date" });
    }

    const apiKey = "29d59a639acae276d7c8ac8fe6b4d060"; // Replace with your OpenWeatherMap API key

    const forecasts = [];

    let currentDate = moment(parsedStartDate);
    while (currentDate.isSameOrBefore(parsedEndDate)) {
      try {
        const formattedDate = currentDate.format('DD-MMM-YYYY'); // Format the date as day-month-year
        
        const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&dt=${currentDate.unix()}&appid=${apiKey}`;
        const response = await axios.get(APIUrl);
        
        // Check if weather data is available
        if (response.data && response.data.main) {
          const temperatureCelsius = response.data.main.temp; // Temperature in Celsius
          const humidity = response.data.main.humidity; // Humidity
          const pressure = response.data.main.pressure; // Pressure

          forecasts.push({
            city,
            date: formattedDate,
            weather: {
              temperature: temperatureCelsius.toFixed(2),
              humidity,
              pressure,
              // Add other weather data as needed
            },
          });
        } else {
          // Weather data not available for this date
          forecasts.push({ city, date: formattedDate, weather: null });
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        // Push null for the date with error
        forecasts.push({ city, date: formattedDate, weather: null });
      }
      currentDate.add(1, "days");
    }

    // Respond with the forecast data
    res.json({ data: forecasts });

  } catch (error) {
    console.error("Error handling weather forecast request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
