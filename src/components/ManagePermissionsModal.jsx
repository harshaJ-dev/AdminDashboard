import React, { useState } from 'react';

const ManagePermissionsModal = ({ show, onHide }) => {
    // Mock users data
    const initialUsers = [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Viewer' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Admin' },
    ];

    const [users, setUsers] = useState(initialUsers);

    const handleRoleChange = (userId, newRole) => {
        setUsers(users.map(user =>
            user.id === userId ? { ...user, role: newRole } : user
        ));
    };

    const handleSaveChanges = () => {
        // Here you would typically make an API call to save changes
        console.log('Saved permissions:', users);
        onHide();
    };

    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Manage Permissions</h5>
                        <button type="button" className="btn-close" onClick={onHide}></button>
                    </div>
                    <div className="modal-body">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>User</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.id}>
                                            <td className="fw-medium">{user.name}</td>
                                            <td className="text-muted">{user.email}</td>
                                            <td>
                                                <select
                                                    className="form-select form-select-sm"
                                                    value={user.role}
                                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                >
                                                    <option value="Viewer">Viewer</option>
                                                    <option value="Editor">Editor</option>
                                                    <option value="Admin">Admin</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="alert alert-info small mb-0">
                            <i className="bi bi-info-circle me-2"></i>
                            Changes will apply to all sections in this workspace.
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onHide}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagePermissionsModal;
