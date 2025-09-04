import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ProfilePageAdmin.css"; // make sure the path is correct

export default function ProfilePageAdmin() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    seatNumber: "",
    email: "",
    role: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  // Fetch user profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        if (!email) {
          navigate("/"); // redirect to login if no email found
          return;
        }
        const res = await fetch(`http://localhost:5000/api/profile/${email}`);
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          setFormData({
            fullName: data.user.fullName,
            seatNumber: data.user.seatNumber,
            email: data.user.email,
            role: data.user.role,
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user)
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        Loading profile details...
      </p>
    );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const { fullName, seatNumber, oldPassword, newPassword, confirmPassword } = formData;

      const body = { fullName, seatNumber };
      if (oldPassword || newPassword || confirmPassword) {
        body.oldPassword = oldPassword;
        body.newPassword = newPassword;
        body.confirmPassword = confirmPassword;
      }

      const res = await fetch(`http://localhost:5000/api/profile/${formData.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        setEditMode(false);
        setMessage("Profile updated successfully!");
        setFormData((prev) => ({
          ...prev,
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      } else {
        setMessage(data.message || "Update failed.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Please try again later.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
  
    <div className="profile-container">
       
      <h1>Your Profile</h1>

      {message && <p style={{ textAlign: "center", color: "green" }}>{message}</p>}

      <div className="profile-card">
        <div className="profile-details">
          {editMode ? (
            <>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
              />
              <input
                type="text"
                name="seatNumber"
                value={formData.seatNumber}
                onChange={handleChange}
                placeholder="Employee ID"
              />
              <p><strong>Email:</strong> {formData.email}</p>

              <hr style={{ margin: "1rem 0" }} />

              <h3>Change Password</h3>
              <input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                placeholder="Old Password"
              />
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="New Password"
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
              />

              <div className="profile-buttons">
                <button className="btn" onClick={handleSave}>Save</button>
                <button className="btn btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
                <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
              </div>
            </>
          ) : (
            <>
              <h2>{user.fullName}</h2>
              <p><strong>Employee ID:</strong> {user.seatNumber}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>

              <div className="profile-buttons">
                <button className="btn" onClick={() => setEditMode(true)}>Edit Profile</button>
                <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
