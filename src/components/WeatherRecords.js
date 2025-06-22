import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const API = "http://localhost:5000/api/weather";
Modal.setAppElement("#root");

const WeatherRecords = () => {
  const [form, setForm] = useState({
    location: "",
    startDate: "",
    temperature: ""
  });
  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState({
    location: "",
    startDate: "",
    endDate: ""
  });

  // Fetch all records on first render
  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async (query = "") => {
    const res = await fetch(`${API}${query}`);
    const data = await res.json();
    setRecords(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.location) params.append("location", search.location);
    if (search.startDate) params.append("startDate", search.startDate);
    if (search.endDate) params.append("endDate", search.endDate);

    await fetchRecords(`?${params.toString()}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API}/${editingId}` : API;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const result = await res.json();
    setMessage(result.message);
    setForm({ location: "", startDate: "", temperature: "" });
    setEditingId(null);
    setIsModalOpen(false);
    await fetchRecords();
  };

  const handleEdit = (record) => {
    const { _id, location, startDate, temperature } = record;
    setForm({ location, startDate, temperature });
    setEditingId(_id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    await fetchRecords();
  };

  const handleClearSearch = async () => {
    setSearch({ location: "", startDate: "", endDate: "" });
    await fetchRecords();
  };

  return (
    <div style={{ marginTop: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2>🌦️ Weather Record CRUD & Lookup</h2>

      {/* ✅ Search Section */}
      <form onSubmit={handleSearch} style={{ marginBottom: "1rem", marginTop: "1rem" }}>
        <h4>🔍 Search Records</h4>
        <input
          name="location"
          placeholder="Location"
          value={search.location}
          onChange={handleSearchChange}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          name="startDate"
          type="date"
          value={search.startDate}
          onChange={handleSearchChange}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          name="endDate"
          type="date"
          value={search.endDate}
          onChange={handleSearchChange}
          style={{ marginRight: "0.5rem" }}
        />
        <button type="submit">Search</button>
        <button
          type="button"
          onClick={handleClearSearch}
          style={{ marginLeft: "0.5rem" }}
        >
          Clear
        </button>
      </form>

      {/* ✅ Create Form (only show if not editing) */}
      {!editingId && (
        <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
          <h4>➕ Add New Record</h4>
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
            style={{ marginRight: "0.5rem" }}
          />
          <input
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
            required
            style={{ marginRight: "0.5rem" }}
          />
          <input
            name="temperature"
            placeholder="Temperature"
            value={form.temperature}
            onChange={handleChange}
            required
            style={{ marginRight: "0.5rem" }}
          />
          <button type="submit">Create</button>
        </form>
      )}

      {/* ✅ Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit Record"
        style={{
          content: { maxWidth: "400px", margin: "auto" }
        }}
      >
        <h3>✏️ Edit Weather Record</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
            style={{ marginBottom: "0.5rem", width: "100%" }}
          />
          <input
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
            required
            style={{ marginBottom: "0.5rem", width: "100%" }}
          />
          <input
            name="temperature"
            placeholder="Temperature"
            value={form.temperature}
            onChange={handleChange}
            required
            style={{ marginBottom: "0.5rem", width: "100%" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* ✅ Table Display */}
      <h4>📄 Weather Records</h4>
      <table border="1" cellPadding="8" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Location</th>
            <th>Date</th>
            <th>Temperature</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((rec) => (
              <tr key={rec._id}>
                <td>{rec.location}</td>
                <td>{rec.startDate}</td>
                <td>{rec.temperature}</td>
                <td>
                  <button onClick={() => handleEdit(rec)}>Edit</button>
                  <button
                    onClick={() => handleDelete(rec._id)}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No records found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
};

export default WeatherRecords;
