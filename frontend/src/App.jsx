import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import StudentDashboardPage from "./pages/StudentDashboardPage";
import ChallengesPage from "./pages/ChallengesPage";
import SubmissionsPage from "./pages/SubmissionsPage";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboard from "./pages/AdminDashboard";
import NewChallenge from "./pages/admin/NewChallenge";
import ProfilePageAdmin from "./pages/admin/ProfilePageAdmin";
import ViewChallenges from "./pages/admin/ViewChallenges";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Dashboard + Sub-pages */}
        <Route path="/dashboard" element={<StudentDashboardPage />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/submissions" element={<SubmissionsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/newchallenge" element={<NewChallenge />} />
        <Route path="/admin/profilepageadmin" element={<ProfilePageAdmin />} />
        <Route path="/admin/viewchallenges" element={<ViewChallenges />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
