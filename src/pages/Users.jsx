import { useEffect, useState } from "react";
import UserTable from "../components/UserTable";
import { fetchUsers } from "../services/api";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
    }

    return (
        <div className="container-fluid p-0">
            <h1 className="h3 mb-4 text-gray-800">User Management</h1>
            <UserTable data={users} />
        </div>
    );
};

export default Users;
