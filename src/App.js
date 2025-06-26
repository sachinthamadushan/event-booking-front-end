import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Event from "./pages/Event";
import Registration from "./pages/Registration";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<Event />} />
          <Route path="/registrations" element={<Registration />} />
        </Routes>
      </Router>
  );
}

export default App;