import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, Users, Settings, LogOut, FileText, Calendar, Table } from "lucide-react";

const Sidebar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const links = [
        { name: "Overview", path: "/", icon: LayoutDashboard },
        { name: "Leaderboard", path: "/leaderboard", icon: Table }, // Placeholder
        { name: "Spreadsheets", path: "/spreadsheets", icon: FileText }, // Placeholder
        { name: "Administration", path: "/users", icon: Users, role: "admin" },
        { name: "Sales", path: "/sales", icon: FileText }, // Placeholder
        { name: "Schedule", path: "/calendar", icon: Calendar }, // Placeholder
        { name: "Settings", path: "/settings", icon: Settings },
    ];

    return (
        <div className="d-flex flex-column flex-shrink-0 p-4 text-white sidebar-gradient" style={{ width: "280px", minHeight: "100vh", borderRadius: "0 30px 30px 0" }}>
            <a href="/" className="d-flex align-items-center mb-5 text-white text-decoration-none">
                <div className="bg-white text-danger rounded-circle p-2 me-3" style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="fw-bold"></span>
                </div>
                <span className="fs-4 fw-bold">Data</span>
            </a>

            <div className="mb-3 text-white-50 small text-uppercase">Main</div>

            <ul className="nav nav-pills flex-column mb-auto gap-2">
                {links.map((link) => {
                    if (link.role && user.role !== link.role) return null;
                    const Icon = link.icon;
                    const isActive = location.pathname === link.path;
                    return (
                        <li className="nav-item" key={link.path}>
                            <Link to={link.path} className={`nav-link d-flex align-items-center px-3 ${isActive ? "bg-white text-danger shadow" : "text-white-50"}`} style={{ borderRadius: "15px" }}>
                                <Icon className="me-3" size={20} />
                                {link.name}
                            </Link>
                        </li>
                    )
                })}
            </ul>

            <div className="mt-auto pt-4 border-top border-white-50">
                <div className="d-flex align-items-center mb-3">
                    <div className="bg-white rounded-circle me-2" style={{ width: 32, height: 32 }}></div>
                    <div>
                        <div className="small fw-bold">{user?.username}</div>
                        <div className="small text-white-50" style={{ fontSize: "0.7rem" }}>View Profile</div>
                    </div>
                </div>
                <button onClick={logout} className="btn btn-sm btn-outline-light w-100 rounded-pill">
                    <LogOut size={14} className="me-2" /> Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
