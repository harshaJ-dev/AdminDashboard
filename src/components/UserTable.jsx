import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

const UserTable = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const filteredData = useMemo(() => {
        return data.filter(
            (user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [data, searchTerm]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(start, start + itemsPerPage);
    }, [filteredData, currentPage]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="card shadow-sm">
            <div className="card-header bg-white py-3 d-flex align-items-center justify-content-between">
                <h5 className="m-0 font-weight-bold text-primary">Users</h5>
                <div className="input-group" style={{ maxWidth: "300px" }}>
                    <span className="input-group-text bg-light border-end-0">
                        <Search size={18} className="text-muted" />
                    </span>
                    <input
                        type="text"
                        className="form-control border-start-0 ps-0"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th className="py-3 ps-4">ID</th>
                                <th className="py-3">Name</th>
                                <th className="py-3">Email</th>
                                <th className="py-3">Role</th>
                                <th className="py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((user) => (
                                    <tr key={user.id}>
                                        <td className="ps-4 text-muted">#{user.id}</td>
                                        <td className="fw-medium">{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <span
                                                className={`badge rounded-pill ${user.status === "Active"
                                                    ? "bg-success-subtle text-success"
                                                    : "bg-danger-subtle text-danger"
                                                    }`}
                                            >
                                                {user.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-muted">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="card-footer bg-white d-flex align-items-center justify-content-between py-3">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="btn btn-outline-secondary btn-sm"
                >
                    <ChevronLeft size={18} />
                </button>
                <span className="text-muted small">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="btn btn-outline-secondary btn-sm"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default UserTable;
