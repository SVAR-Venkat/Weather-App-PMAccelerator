import React, { useState } from "react";
import WeatherForm from "./components/WeatherForm";
import WeatherDisplay from "./components/WeatherDisplay";
import LocationButton from "./components/LocationButton";
import FooterAboutMe from "./components/FooterAboutMe";
import WeatherRecords from "./components/WeatherRecords";

import {
  exportToJSON,
  exportToCSV
} from "./utils/exportUtils";

function App() {
  const [forecast, setForecast] = useState([]);
  const [defaultLocation, setDefaultLocation] = useState('');
  const [showExtended, setShowExtended] = useState(false);
  const [savedLocation, setSavedLocation] = useState('');

  const apiKey = "87f9450d849481415ab6d3e32a02d606";

  const handleSearch = async ({ location }) => {
    setSavedLocation(location);
    setShowExtended(false);

    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
      const today = new Date().toISOString().split("T")[0];

      const currentRes = await fetch(currentUrl);
      const currentData = await currentRes.json();


      const todayEntry = {
        date: today,
        temp: currentData.main.temp,
        feels_like: currentData.main.feels_like,
        weather: currentData.weather[0].main,
        description: currentData.weather[0].description,
        humidity: currentData.main.humidity,
        pressure: currentData.main.pressure,
        wind_speed: currentData.wind.speed,
        wind_deg: currentData.wind.deg,
        clouds: currentData.clouds.all,
        icon: currentData.weather[0].icon
      };

      setForecast([todayEntry]);
    } catch (err) {
      console.error("Error fetching today's weather:", err);
      alert("Failed to fetch weather data.");
    }
  };

  const handleShow5DayForecast = async () => {
    if (!savedLocation) return;

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${savedLocation}&appid=${apiKey}&units=metric`;

    try {
      const today = new Date().toISOString().split("T")[0];

      const forecastRes = await fetch(forecastUrl);
      const forecastData = await forecastRes.json();

      const seen = new Set();
      const futureForecasts = [];

      forecastData.list.forEach((entry) => {
        const date = entry.dt_txt.split(" ")[0];
        if (date > today && !seen.has(date)) {
          seen.add(date);
          futureForecasts.push({
            date: date,
            temp: entry.main.temp,
            feels_like: entry.main.feels_like,
            weather: entry.weather[0].main,
            description: entry.weather[0].description,
            humidity: entry.main.humidity,
            pressure: entry.main.pressure,
            wind_speed: entry.wind.speed,
            wind_deg: entry.wind.deg,
            clouds: entry.clouds.all,
            icon: entry.weather[0].icon
          });
        }
      });

      setForecast(prev => [...prev, ...futureForecasts.slice(0, 5)]);
      setShowExtended(true);
    } catch (err) {
      console.error("Error fetching 5-day forecast:", err);
      alert("Failed to fetch forecast.");
    }
  };

  const handleLocationFetched = (locationName) => {
    setDefaultLocation(locationName);
    alert(`Detected Location: ${locationName}`);
  };

  

  return (
    <div className="App" style={{ padding: "2rem" }}>
      <h1>Weather Forecast App</h1>
      <LocationButton onLocationFetched={handleLocationFetched} />
      <WeatherForm onSearch={handleSearch} defaultLocation={defaultLocation} />
      <WeatherDisplay forecastData={forecast} />





      {!showExtended && forecast.length === 1 && (
        <button onClick={handleShow5DayForecast} style={{ marginTop: "1rem" }}>
          Show 5-Day Forecast
        </button>
      )}

      {forecast.length > 1 && showExtended && (
  <div style={{ marginTop: "1rem" }}>
    <h4>Export 5-Day Forecast</h4>
    <button onClick={() => exportToJSON(forecast.slice(1))}>Download JSON</button>
    <button onClick={() => exportToCSV(forecast.slice(1))}>Download CSV</button>
  </div>
)}

      

             <div className="App" style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Weather Record Management
      </h1>
      <WeatherRecords />
    </div>

    


      <FooterAboutMe />
    </div>
    
  );
}

export default App;
