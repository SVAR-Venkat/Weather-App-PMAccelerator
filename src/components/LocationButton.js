import React from 'react';

const LocationButton = ({ onLocationFetched }) => {
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const apiKey = '87f9450d849481415ab6d3e32a02d606';

      try {
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`
        );
        const data = await res.json();
        if (data && data[0]) {
          onLocationFetched(data[0].name);
        } else {
          alert("Couldn't determine location.");
        }
      } catch (err) {
        alert("Error getting location.");
        console.error(err);
      }
    }, (err) => {
      alert("Geolocation error: " + err.message);
    });
  };

  return (
    <button onClick={getLocation} style={{ marginBottom: '1rem' }}>
      Use My Current Location
    </button>
  );
};

export default LocationButton;
