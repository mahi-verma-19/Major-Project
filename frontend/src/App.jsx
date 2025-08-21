import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import StudentDashboardPage from "./pages/StudentDashboardPage";
import ChallengesPage from "./pages/ChallengesPage";
import SubmissionsPage from "./pages/SubmissionsPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Dashboard + Sub-pages */}
        <Route path="/dashboard" element={<StudentDashboardPage />} />
        <Route path="/dashboard/challenges" element={<ChallengesPage />} />
        <Route path="/dashboard/submissions" element={<SubmissionsPage />} />
        <Route path="/dashboard/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
