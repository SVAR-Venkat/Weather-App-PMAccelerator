const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Weather Schema
const WeatherSchema = new mongoose.Schema({
  location: { type: String, required: true },
  startDate: { type: String, required: true },
  temperature: { type: String, required: true }
});

const Weather = mongoose.model("Weather", WeatherSchema);

// CREATE
app.post("/api/weather", async (req, res) => {
  try {
    const newRecord = new Weather(req.body);
    await newRecord.save();
    res.json({ message: "Record created successfully", record: newRecord });
  } catch (error) {
    res.status(500).json({ message: "Error creating record", error });
  }
});

// READ (with optional filters)
app.get("/api/weather", async (req, res) => {
  try {
    const { location, startDate, endDate } = req.query;
    const query = {};

    if (location) {
      query.location = { $regex: location, $options: "i" }; // fuzzy match
    }

    if (startDate && endDate) {
      query.startDate = { $gte: startDate, $lte: endDate };
    } else if (startDate) {
      query.startDate = { $gte: startDate };
    }

    const records = await Weather.find(query);
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching records", error });
  }
});

// UPDATE
app.put("/api/weather/:id", async (req, res) => {
  try {
    await Weather.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Record updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating record", error });
  }
});

// DELETE
app.delete("/api/weather/:id", async (req, res) => {
  try {
    await Weather.findByIdAndDelete(req.params.id);
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting record", error });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
