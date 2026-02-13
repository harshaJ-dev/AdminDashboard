import React, { useState } from 'react';

const CreateUserModal = ({ show, onHide, onCreate }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'User',
        status: 'Active'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        if (formData.name.trim() && formData.email.trim()) {
            onCreate(formData);
            setFormData({ name: '', email: '', role: 'User', status: 'Active' });
            onHide();
        }
    };

    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create New User</h5>
                        <button type="button" className="btn-close" onClick={onHide}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="userName"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter user name"
                                autoFocus
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userEmail" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="userEmail"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email address"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userRole" className="form-label">Role</label>
                            <select
                                className="form-select"
                                id="userRole"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                                <option value="Manager">Manager</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userStatus" className="form-label">Status</label>
                            <select
                                className="form-select"
                                id="userStatus"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onHide}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Create User</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUserModal;
