import React, { useState, useEffect } from "react";

function WeatherForm({ onSearch, defaultLocation }) {
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (defaultLocation) {
      setLocation(defaultLocation);
    }
  }, [defaultLocation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location) {
      alert("Please enter a location.");
      return;
    }

    onSearch({ location }); // ⬅️ Only pass location
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "1rem 0" }}>
      <div style={{ marginBottom: "0.5rem" }}>
        <label>Location: </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city name"
          required
        />
      </div>

      <button type="submit">Get Forecast</button>
    </form>
  );
}

export default WeatherForm;
