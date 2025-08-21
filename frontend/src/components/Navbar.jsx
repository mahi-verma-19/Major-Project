import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/dashboard/challenges">Challenges</Link>
      <Link to="/dashboard/submissions">Submissions</Link>
      <Link to="/dashboard/profile">Profile</Link>
    </div>
  );
}
