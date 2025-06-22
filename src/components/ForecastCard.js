import React from "react";

function getWindDirection(degree) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(degree / 45) % 8];
}

function ForecastCard({ forecast }) {
  const {
    date,
    temp,
    feels_like,
    weather,
    description,
    humidity,
    pressure,
    wind_speed,
    wind_deg,
    clouds,
    icon
  } = forecast;

  return (
    <div
      className="forecast-card"
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "1rem",
        marginBottom: "1rem",
        backgroundColor: "#f0f8ff",
        maxWidth: "400px"
      }}
    >
      <h3>{date}</h3>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        style={{ width: "80px", height: "80px" }}
      />
      <p>
        <strong>{weather}</strong> ({description})
      </p>
      <p>🌡️ Temp: {temp}°C (Feels like: {feels_like}°C)</p>
      <p>💧 Humidity: {humidity}%</p>
      <p>🔽 Pressure: {pressure} hPa</p>
      <p>💨 Wind: {wind_speed} m/s, {getWindDirection(wind_deg)}</p>
      <p>☁️ Cloud Cover: {clouds}%</p>
    </div>
  );
}

export default ForecastCard;
