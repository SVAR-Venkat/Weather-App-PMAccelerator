import React from "react";
import ForecastCard from "./ForecastCard";

function WeatherDisplay({ forecastData }) {
  if (!forecastData || forecastData.length === 0) return null;

  const isTodayOnly = forecastData.length === 1;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isTodayOnly ? "1fr" : "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1rem",
        marginTop: "1rem",
      }}
    >
      {forecastData.map((forecast, index) => (
        <ForecastCard key={index} forecast={forecast} />
      ))}
    </div>
  );
}

export default WeatherDisplay;
