import { useState } from "react";
import "../styles/AdminDashboard.css";
import ProfilePageAdmin from "./admin/ProfilePageAdmin"; // Import your Profile.jsx component
import NewChallenge from "./admin/NewChallenge"; // You can create this later
import ViewChallenges from "./admin/ViewChallenges";

export default function AdminDashboard() {
  const [active, setActive] = useState("dashboard");

  const renderContent = () => {
    switch (active) {
      case "new-challenge":
        return <NewChallenge />; // Shows the New Challenge form
      case "profile":
        return <ProfilePageAdmin />; // Shows the Profile page inside the main panel
      case "view-challenges":
      return <ViewChallenges />;
        default:
        return (
          <div className="admin-welcome">
            <h1>Welcome, Admin!</h1>
            <p>Select an option from the sidebar to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul className="sidebar-menu">
          <li
            className={active === "new-challenge" ? "active" : ""}
            onClick={() => setActive("new-challenge")}
          >
            ➕ New Challenge
          </li>
          <li
            className={active === "profile" ? "active" : ""}
            onClick={() => setActive("profile")}
          >
            👤 Profile
          </li>
          <li
  className={active === "view-challenges" ? "active" : ""}
  onClick={() => setActive("view-challenges")}
>
  📋 View Challenges
</li>

        </ul>
      </aside>

      {/* Main Content */}
      <main className="admin-main">{renderContent()}</main>
    </div>
  );
}
