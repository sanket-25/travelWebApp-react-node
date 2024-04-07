import React, { useRef, useState } from "react";
import "./weather-bar.css";
import { Col, Form, FormGroup } from "reactstrap";
import { BASE_URL } from "../utils/config";

const WeatherBar = () => {
  const cityRef = useRef("");
  const startDateRef = useRef("");
  const endDateRef = useRef("");
  const [weather, setWeather] = useState(null); // State variable to store weather data

  const searchHandler = async () => {
    const city = cityRef.current.value;
    const startDate = startDateRef.current.value;
    const endDate = endDateRef.current.value;

    if (city === "" || startDate === "" || endDate === "") {
      return alert("All fields are required!");
    }

    try {
      // Fetch weather data for the specified city
      const res = await fetch(`${BASE_URL}/weather?city=${city}&startDate=${startDate}&endDate=${endDate}`);
      const weatherData = await res.json();
      setWeather(weatherData.data);

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Col lg="12">
      <div className="search_bar">
        <h2>Weather Search</h2>
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form_group form_group-fast">
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>City</h6>
              <input type="text" placeholder="Enter city name" ref={cityRef} />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form_group form_group-fast">
            <span>
              <i className="ri-calendar-line"></i>
            </span>
            <div>
              <h6>Start Date</h6>
              <input type="date" ref={startDateRef} />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form_group form_group-fast">
            <span>
              <i className="ri-calendar-line"></i>
            </span>
            <div>
              <h6>End Date</h6>
              <input type="date" ref={endDateRef} />
            </div>
          </FormGroup>
          <span className="search_icon" type="submit" onClick={searchHandler}>
            <i className="ri-search-line"></i>
          </span>
        </Form>
      </div>
      {/* Render weather data */}
      <div className="weather-cards">
        {weather && <WeatherCardGroup weather={weather} />}
      </div>
    </Col>
  );
};

const WeatherCardGroup = ({ weather }) => {
  // Group weather data by city
  const weatherByCity = weather.reduce((acc, cur) => {
    acc[cur.city] = acc[cur.city] || [];
    acc[cur.city].push(cur);
    return acc;
  }, {});

  return (
    <>
      {Object.entries(weatherByCity).map(([city, cityWeather]) => (
        <div key={city} className="weather-card-row">
          <h3>{city}</h3>
          <div className="weather-card-container">
            {cityWeather.map((weatherItem, index) => (
              <WeatherCard key={index} weather={weatherItem} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

const WeatherCard = ({ weather }) => {
  const { date, weather: weatherData } = weather;

  return (
    <div className="weather-card">
      <img src={weatherData.image} alt="Weather" />
      <p className="date">Date: {new Date(date).toLocaleDateString()}</p>
      <p className="temperature">Temperature: {weatherData.temperature}°C</p>
      <p className="humidity">Humidity: {weatherData.humidity}%</p>
      <p className="pressure">Pressure: {weatherData.pressure} hPa</p>
    </div>
  );
};

export default WeatherBar;
