import { useEffect, useState } from "react";
import axios from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Event() {
  const [events, setEvents] = useState([]);
  const [form, setFrom] = useState({
    name: "",
    date: "",
    location: "",
    available_seats: 0,
  });

  const fetchEvent = async () => {
    const response = await axios.get("/events/all");
    setEvents(response.data.events);
  };

  const createEvent = async () => {
    await axios.post("/events/create", form);
    fetchEvent();
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <div>
      <h2>All Event</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Location</th>
            <th>Available Seats</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.date}</td>
              <td>{event.location}</td>
              <td>{event.available_seats}</td>
              <td>
                <a class="btn btn-warning me-3">Update</a>
                <a class="btn btn-danger">Delete</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="card">
        <div className="card-header">
          <h3 class="card-title">Create Event</h3>
        </div>
        <div className="card-body">
          <input
            placeholder="Event Name"
            type="text"
            class="form-control mt-2"
            onChange={(e) => setFrom({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Date"
            type="date"
            class="form-control mt-2"
            onChange={(e) => setFrom({ ...form, date: e.target.value })}
          />
          <input
            placeholder="Location"
            type="text"
            class="form-control mt-2"
            onChange={(e) => setFrom({ ...form, location: e.target.value })}
          />
          <input
            placeholder="Avialable Seats"
            type="text"
            class="form-control mt-2"
            onChange={(e) =>
              setFrom({ ...form, available_seats: e.target.value })
            }
          />
          <button class="btn btn-outline-success mt-2" onClick={createEvent}>Create</button>
        </div>
      </div>
    </div>
  );
}
export default Event;
