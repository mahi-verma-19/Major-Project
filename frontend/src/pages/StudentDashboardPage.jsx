import NavbarStudent from "../components/NavbarStudent";
import "../styles/StudentDashboard.css";

export default function StudentDashboard() {
  return (
    <div>
      <NavbarStudent />
      <div className="dashboard-container">
        <h1>Student Dashboard</h1>
        <p>Welcome to your dashboard! Select a section from the navbar above.</p>
        {/* Optional dashboard cards can go here */}
      </div>
    </div>
  );
}
