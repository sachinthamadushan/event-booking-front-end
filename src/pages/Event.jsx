import { useEffect, useState } from "react";
import axios from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Event() {
  const [events, setEvents] = useState([]);
  const [showModal,setShowModal] = useState(false)
  const [form, setFrom] = useState({
    name: "",
    date: "",
    location: "",
    available_seats: 0,
  });

  const [selectdEvent,setSelectedEvent] = useState({
    _id:"",
    name:"",
    date:"",
    location:"",
    available_seats:""
});

const openUpdateModal = (event)=>{
  setSelectedEvent(event)
  setShowModal(true)
};

  const fetchEvent = async () => {
    const response = await axios.get("/events/all");
    setEvents(response.data.events);
  };

  const createEvent = async () => {
    await axios.post("/events/create", form);
    fetchEvent();
  };

  const deleteEvent = async (id) => {
    if (window.confirm("Are you sure to delete this event?")) {
      await axios.delete(`/events/delete/${id}`);
      fetchEvent();
    }
  };

  const updateEvent = async (id) => {
    try {
      await axios.put(`/events/update/${selectdEvent._id}`,selectdEvent);
      setShowModal(false);
      fetchEvent();
    } catch (error) {
      alert('Update Fail');
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <div className="container">
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
                <a onClick={() => openUpdateModal(event)} class="btn btn-warning me-3">Update</a>
                <a onClick={() => deleteEvent(event._id)} class="btn btn-danger">Delete</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Update Event</h4>
                  </div>
                  <div className="modal-body">
                    <input 
                    type="text"
                    placeholder="Event Name"
                    className="form-control"
                    value={selectdEvent.name}
                    onChange={
                      e => setSelectedEvent(
                        { ...selectdEvent, name: e.target.value }
                      )} 
                    />
                  </div>
                  <div className="modal-body">
                    <input 
                    type="date"
                    placeholder="Select Date"
                    className="form-control"
                    value={selectdEvent.date}
                    onChange={
                      e => setSelectedEvent(
                        { ...selectdEvent, date: e.target.value }
                      )} 
                    />
                  </div>
                  <div className="modal-body">
                    <input 
                    type="text"
                    placeholder="Location"
                    className="form-control"
                    value={selectdEvent.location}
                    onChange={
                      e => setSelectedEvent(
                        { ...selectdEvent, location: e.target.value }
                      )} 
                    />
                  </div>
                  <div className="modal-body">
                    <input 
                    type="number"
                    placeholder="Available Seats"
                    className="form-control"
                    value={selectdEvent.available_seats}
                    onChange={
                      e => setSelectedEvent(
                        { ...selectdEvent, available_seats: e.target.value }
                      )} 
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary" 
                    onClick={() => updateEvent(selectdEvent._id)}>Update</button>
                    <button type="button" className="btn btn-secondary" 
                    onClick={() => setShowModal(false)}>Close</button>
                  </div>
                </div>
              </div>
          </div>
        )
      }

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
          <button class="btn btn-outline-success mt-2" onClick={createEvent}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
export default Event;
