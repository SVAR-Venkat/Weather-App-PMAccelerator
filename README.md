# Weather Forecast App with CRUD and Data Export

This project is a full-stack weather forecast application built using **React** for the frontend and **Node.js/Express** with **MongoDB Atlas** for the backend. It allows users to:

- 🔍 Search weather by city
- 🌐 Use geolocation to fetch weather automatically
- 📆 View today's and 5-day weather forecasts
- 💾 Save, update, and delete weather records (CRUD)
- 📤 Export forecast data to JSON and CSV

---

## 🔧 Tech Stack

### Frontend

- React
- JavaScript
- CSS

### Backend

- Node.js
- Express
- MongoDB (Atlas)
- Mongoose

### APIs

- [OpenWeatherMap API](https://openweathermap.org/api)

---

## 🚀 Features

### ✅ Forecast

- Fetch today's forecast from OpenWeatherMap
- Fetch 5-day forecast (3-hour intervals grouped by day)
- View temperature, humidity, pressure, wind, clouds, and description
- Dynamic icons

### ✅ CRUD Functionality

- Add weather records manually (location, date, temperature, etc.)
- View all records in a table
- Update and delete individual records

### ✅ Data Export

- Export forecast or CRUD records to **JSON**
- Export forecast or CRUD records to **CSV**

---

## 📁 Project Structure

```
weather-app-pmaccelerator/
├── client/                   # React frontend
│   ├── src/
│   │   ├── components/       # UI Components
│   │   ├── utils/            # Export utilities
│   │   └── App.js            # Main component
├── server.js                # Express backend
├── models/Weather.js        # Mongoose schema
├── .env                     # MongoDB URI and config
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/weather-app-pmaccelerator.git
cd weather-app-pmaccelerator
```

### 2. Setup Backend

```bash
npm install
```

Create a `.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

Start backend server:

```bash
node server.js
```

### 3. Setup Frontend (inside client folder)

```bash
cd client
npm install
npm start
```

---

## 🔑 Environment Variables

| Variable     | Description                         |
| ------------ | ----------------------------------- |
| MONGODB\_URI | MongoDB Atlas connection URI        |
| PORT         | Backend server port (default: 5000) |

---

## 🧠 Future Improvements

- Add user authentication
- Paginate records
- Deploy to Vercel (frontend) and Render/Heroku (backend)

---

## 🙋 About Me

**Sanampudi Venkatappa Reddy**\
📫 Reach me at: [vs23i@fsu.edu](mailto\:vs23i@fsu.edu)\
🔗 GitHub: [SVAR-Venkat](https://github.com/SVAR-Venkat)\
🔗 LinkedIn: [sanampudi-venkatappa](https://www.linkedin.com/in/sanampudi-venkatappa/)

---

Happy forecasting! ☀️🌦❄️

