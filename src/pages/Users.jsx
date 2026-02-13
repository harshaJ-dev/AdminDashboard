import { useEffect, useState } from "react";
import UserTable from "../components/UserTable";
import CreateUserModal from "../components/CreateUserModal";
import { fetchUsers } from "../services/api";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users", error);
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, []);

    const handleCreateUser = (userData) => {
        const newUser = {
            id: users.length + 1,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            status: userData.status
        };
        setUsers([...users, newUser]);
    };

    if (loading) {
        return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
    }

    return (
        <div className="container-fluid p-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3 mb-0 text-gray-800">User Management</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowCreateModal(true)}
                >
                    + Create User
                </button>
            </div>
            <UserTable data={users} />

            <CreateUserModal
                show={showCreateModal}
                onHide={() => setShowCreateModal(false)}
                onCreate={handleCreateUser}
            />
        </div>
    );
};

export default Users;
