import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Search, Bell } from "lucide-react";

const Layout = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="d-flex" style={{ backgroundColor: "var(--bg-color)", minHeight: "100vh" }}>
            <Sidebar />
            <div className="flex-grow-1 d-flex flex-column vh-100 overflow-hidden">
                {/* Header / Top Bar */}
                <header className="navbar navbar-expand-lg px-4 py-3 custom-navbar">
                    <div className="d-flex align-items-center w-100">
                        <div className="d-flex align-items-center">
                            <h4 className="fw-bold mb-0 me-3">Hello, Team</h4>
                        </div>

                        <div className="mx-auto position-relative d-none d-md-block" style={{ width: "400px" }}>
                            <Search className="position-absolute text-muted" style={{ left: "15px", top: "50%", transform: "translateY(-50%)" }} size={18} />
                            <input type="text" className="form-control search-input ps-5" placeholder="Search..." />
                        </div>

                        <div className="d-flex align-items-center gap-3 ms-auto">
                            <button className="btn btn-light rounded-circle shadow-sm p-2">
                                <Bell size={20} className="text-muted" />
                            </button>
                            <button className="btn btn-light rounded-circle shadow-sm p-2" onClick={toggleTheme}>
                                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex-grow-1 overflow-auto px-4 pb-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
