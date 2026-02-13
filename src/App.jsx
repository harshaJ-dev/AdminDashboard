import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./layouts/Layout";
import Users from "./pages/Users";
import Calendar from "./pages/Calendar";
import FormBuilder from "./pages/FormBuilder";
import SectionList from "./pages/SectionList";
import Leaderboard from "./pages/Leaderboard";
import Settings from "./pages/Settings";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/sales" element={<FormBuilder />} /> {/* Using FormBuilder as placeholder for Sales/Forms */}
                <Route path="/spreadsheets" element={<SectionList />} /> {/* Using SectionList as placeholder */}
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
