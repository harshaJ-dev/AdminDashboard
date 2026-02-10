import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const success = await login(username, password);
        if (success) {
            navigate("/");
        } else {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light-subtle">
            <div className="card shadow-sm" style={{ width: "100%", maxWidth: "400px" }}>
                <div className="card-body p-4">
                    <h2 className="card-title text-center mb-4">Admin Dashboard Login</h2>
                    {error && <div className="alert alert-danger text-center">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="form-control"
                                placeholder="admin or user"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                placeholder="admin or user"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
