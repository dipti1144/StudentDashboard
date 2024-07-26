import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import AllStudents from "./Pages/AllStudents";
import { Route, Routes } from "react-router-dom";
import StudentProfile from "./Components/StudentProfile";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <div>
      <div className="mainAppDiv">
        <Navbar />
      </div>
      <div className="bodyComponent">
        <div className="sidebarComp">
          <Sidebar />
        </div>

        <div className="RouteDiv">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/student" element={<AllStudents />} />
            <Route path="/student/:id" element={<StudentProfile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
