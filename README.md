# 🌦️ Weather App PMAccelerator

A full-featured weather forecasting application built using **React.js**, **Node.js**, **Express**, and **MongoDB**, allowing users to:

- View today's weather and 5-day forecasts
- Search weather by location
- Create, Read, Update, and Delete weather records
- Export forecast data to JSON and CSV
- Lookup records by location and date range

---

## 📸 Features

- 🌍 Get **current weather** and **5-day forecast** using the OpenWeatherMap API
- 📍 Fetch weather based on **user's current location**
- 🔎 Search weather by city name
- 📝 **CRUD operations** for custom weather entries using MongoDB
- 🧠 **Validation** for dates and fuzzy location input
- 🔍 Lookup records based on **location and date range**
- 💾 Export forecast data in **JSON** or **CSV**
- 💡 Interactive, responsive UI with clean design

---

## 🛠️ Tech Stack

| Frontend         | Backend         | Database    | APIs                  |
|------------------|------------------|-------------|------------------------|
| React.js         | Node.js + Express| MongoDB     | OpenWeatherMap         |
| HTML + CSS       | RESTful API      | Mongoose    | Geolocation API        |

---

## 🚀 Getting Started

### 📦 Clone the repository

```bash
git clone https://github.com/SVAR-Venkat/Weather-App-PMaccelerator.git
cd Weather-App-PMaccelerator
```

### 🔧 Install dependencies

#### For Frontend (React)
```bash
cd client
npm install
```

#### For Backend (Node.js)
```bash
cd server
npm install
```

### 🌐 Set up environment variables

Create a `.env` file in the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your actual MongoDB URI.

---

## ✅ Running the App

### 🔄 Run both servers

You can run the frontend and backend using separate terminals:

**Terminal 1 (Frontend):**

npm start

**Terminal 2 (Backend):**
```bash
cd server
node server.js
```

Or use tools like `concurrently` to run both from one command.

---

## 📁 Folder Structure



---

## 🧪 Future Enhancements

- 🌐 Add support for more export formats (PDF, XML)
- 📱 Mobile responsive improvements
- 📈 Add charts for temperature and humidity trends
- 🔐 Authentication for user-specific data

---

## 📬 Contact

**Sanampudi Venkatappa Reddy**  
📧 Email: vs23i@fsu.edu  
🔗 [LinkedIn](https://www.linkedin.com/in/sanampudi-venkatappa/)  
🐙 [GitHub](https://github.com/SVAR-Venkat)

---

## 📄 License

This project is licensed under the MIT License.
