import { Link } from "react-router-dom";    

function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                <li>
                    <Link to="/events">Manage Event</Link>
                </li>
                <li>
                    <Link to="/registrations">View Registration</Link>
                </li>
            </ul>
        </div>
    );
}
export default Dashboard;