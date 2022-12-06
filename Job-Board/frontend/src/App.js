import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Home from "./pages/Home/Home";
import Signup from "./pages/SignUp";
import Main from "./pages/Jobs/Main";
import Profile from "./pages/Profile";
import Employee from "./pages/Employee/Employee";
import Employer from "./pages/Employer/Employer";
import CreateJob from "./pages/Employer/CreateJob";
import EmployerApproval from "./pages/Approvals/EmployerApproval";
import JobReview from "./pages/JobResonse/JobReview";
import EmployeeView from "./pages/Employee/EmployeeView";
import AnalyticsMain from "./pages/Analytics/AnalyticsMain";
import Updates from "./pages/Updates/Updates";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Main />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/approval/employers" element={<EmployerApproval />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/employer" element={<Employer />} />
        <Route path="/job-review" element={<JobReview />} />
        <Route path="/employee/:each" element={<EmployeeView />} />
        <Route path="/analytics" element={<AnalyticsMain />} />
        <Route path="/updates" element={<Updates />} />
      </Routes>
    </Router>
  );
}

export default App;
