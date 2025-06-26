import { useEffect, useState } from "react";
import axios from "../api/axios";

function Registration() {
  const [registrations, setRegistrations] = useState([]);
  const [userName, setUserName] = useState("");
  const [selectEventId, setSelectEventId] = useState("");
  const [events, setEvents] = useState([]);

  const fetchData = async () => {
    try {
      const [regRes, eventsRes] = await Promise.all([
        axios.get("/registrations/all"),
        axios.get("/events/all"),
      ]);
      setRegistrations(Array.isArray(regRes.data) ? regRes.data : []);
      setEvents(
        Array.isArray(eventsRes.data.events) ? eventsRes.data.events : []
      );
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const handleRegister = async () => {
    if (!userName || !selectEventId) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const response = await axios.post("/registrations/create", {
        user_name: userName,
        event_id: selectEventId,
      });
      alert("Registration successful");
      setUserName("");
      setSelectEventId("");
      fetchData();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h3 className="mt-4">All Registrations</h3>
      <table className="table table-bordered table-striped mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Event Name</th>
            <th>Date</th>
            <th>Location</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {registrations.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">
                No registrations found
              </td>
            </tr>
          ) : (
            registrations.map((r, index) => (
              <tr key={r._id}>
                <td>{index + 1}</td>
                <td>{r.user_name}</td>
                <td>{r.event_id?.name || "No event name"}</td>
                <td>{r.event_id?.date || "Data not set"}</td>
                <td>{r.event_id?.location || "No location"}</td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="card p-3 shadow">
        <div className="card-header">
          <h3 className="card-title text-center">Register for Event</h3>
        </div>
        <div className="card-body">
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Select Event</label>
            <select
              className="form-select"
              value={selectEventId}
              onChange={(e) => setSelectEventId(e.target.value)}
            >
              <option value="">--- Select ---</option>
              {events.map((e) => (
                <option key={e._id} value={e._id}>
                  {e.name} - Available Seats: {e.available_seats}
                </option>
              ))}
            </select>
          </div>
          <button
            className="btn btn-primary"
            onClick={handleRegister}
            disabled={!userName || !selectEventId}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Registration;
