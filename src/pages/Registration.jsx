import { useEffect, useState } from "react";
import axios from "../api/axios";

function Registration() {
  const [registrations, setRegistrations] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("/registrations/all");
      console.log("Response:", res.data);
      setRegistrations(Array.isArray(res.data) ? res.data : []);
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

      <h3>Register for Event</h3>
    </div>
  );
}

export default Registration;
