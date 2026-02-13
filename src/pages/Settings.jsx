import React from 'react';
import {
    User,
    Lock,
    Bell,
    Shield,
    Monitor,
    Save,
    ShieldAlert,
    Trash2,
    Download,
    Check
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Section Component for consistency
const SettingsSection = ({ title, icon: Icon, children }) => (
    <div className="custom-card p-4 mb-4">
        <div className="d-flex align-items-center mb-4">
            <div className="p-3 rounded-circle bg-primary bg-opacity-10 text-primary me-3">
                <Icon size={24} />
            </div>
            <h5 className="mb-0 fw-bold">{title}</h5>
        </div>
        {children}
    </div>
);

const Settings = () => {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <div className="container-fluid p-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="h3 mb-1 fw-bold">Settings</h1>
                    <p className="text-muted small">Manage your account settings and preferences</p>
                </div>
                <button className="btn btn-primary d-flex align-items-center gap-2">
                    <Save size={18} /> Save All Changes
                </button>
            </div>

            <div className="row">
                <div className="col-12 col-xl-8">
                    {/* Profile Settings */}
                    <SettingsSection title="Profile Settings" icon={User}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label small fw-bold">First Name</label>
                                <input type="text" className="form-control rounded-pill px-3" defaultValue="Harsha" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label small fw-bold">Last Name</label>
                                <input type="text" className="form-control rounded-pill px-3" defaultValue="J" />
                            </div>
                            <div className="col-12">
                                <label className="form-label small fw-bold">Email Address</label>
                                <input type="email" className="form-control rounded-pill px-3" defaultValue="harsha@example.com" />
                            </div>
                            <div className="col-12">
                                <label className="form-label small fw-bold">Biography</label>
                                <textarea className="form-control" rows="3" style={{ borderRadius: '15px' }} defaultValue="Full stack developer passionate about admin dashboards."></textarea>
                            </div>
                        </div>
                    </SettingsSection>

                    {/* Roles & Permissions */}
                    <SettingsSection title="Roles & Permissions" icon={Shield}>
                        <div className="table-responsive">
                            <table className="table table-borderless align-middle">
                                <thead>
                                    <tr className="border-bottom">
                                        <th className="text-muted small">ROLE</th>
                                        <th className="text-muted small">DASHBOARD</th>
                                        <th className="text-muted small">USERS</th>
                                        <th className="text-muted small">SETTINGS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-bottom">
                                        <td><span className="badge bg-primary px-3 py-2 rounded-pill">Administrator</span></td>
                                        <td><Check size={18} className="text-success" /></td>
                                        <td><Check size={18} className="text-success" /></td>
                                        <td><Check size={18} className="text-success" /></td>
                                    </tr>
                                    <tr className="border-bottom">
                                        <td><span className="badge bg-info px-3 py-2 rounded-pill">Editor</span></td>
                                        <td><Check size={18} className="text-success" /></td>
                                        <td><Check size={18} className="text-success" /></td>
                                        <td><div className="text-muted">—</div></td>
                                    </tr>
                                    <tr>
                                        <td><span className="badge bg-secondary px-3 py-2 rounded-pill">Viewer</span></td>
                                        <td><Check size={18} className="text-success" /></td>
                                        <td><div className="text-muted">—</div></td>
                                        <td><div className="text-muted">—</div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button className="btn btn-outline-primary btn-sm mt-2 rounded-pill px-3">Manage Custom Roles</button>
                    </SettingsSection>

                    {/* Security Settings */}
                    <SettingsSection title="Security Settings" icon={Lock}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label small fw-bold">Current Password</label>
                                <input type="password" class="form-control rounded-pill px-3" placeholder="••••••••" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label small fw-bold">New Password</label>
                                <input type="password" class="form-control rounded-pill px-3" placeholder="••••••••" />
                            </div>
                            <div className="col-12 d-flex align-items-center justify-content-between mt-4">
                                <div>
                                    <p className="mb-0 fw-bold">Two-Factor Authentication</p>
                                    <p className="text-muted small mb-0">Add an extra layer of security to your account.</p>
                                </div>
                                <div className="form-check form-switch cursor-pointer">
                                    <input className="form-check-input" type="checkbox" style={{ width: '40px', height: '20px' }} />
                                </div>
                            </div>
                        </div>
                    </SettingsSection>
                </div>

                <div className="col-12 col-xl-4">
                    {/* Appearance */}
                    <SettingsSection title="Appearance" icon={Monitor}>
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <div>
                                <p className="mb-0 fw-bold">Dark Mode</p>
                                <p className="text-muted small mb-0">Adjust how AdminDashboard looks.</p>
                            </div>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={darkMode}
                                    onChange={toggleTheme}
                                    style={{ width: '40px', height: '20px' }}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-bold">Language</label>
                            <select className="form-select rounded-pill px-3">
                                <option>English (US)</option>
                                <option>Spanish</option>
                                <option>French</option>
                                <option>German</option>
                            </select>
                        </div>
                    </SettingsSection>

                    {/* Notification Preferences */}
                    <SettingsSection title="Notifications" icon={Bell}>
                        <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-center justify-content-between">
                                <span className="small fw-bold">Email Notifications</span>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" defaultChecked />
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <span className="small fw-bold">Push Notifications</span>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" />
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <span className="small fw-bold">Weekly Digest</span>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" defaultChecked />
                                </div>
                            </div>
                        </div>
                    </SettingsSection>

                    {/* System & Danger Zone */}
                    <div className="custom-card p-4 mb-4 border border-danger border-opacity-10">
                        <div className="d-flex align-items-center mb-4 text-danger">
                            <ShieldAlert className="me-3" size={24} />
                            <h5 className="mb-0 fw-bold">Danger Zone</h5>
                        </div>
                        <div className="d-flex flex-column gap-3">
                            <button className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center gap-2 rounded-pill">
                                <Download size={16} /> Export Account Data
                            </button>
                            <button className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center gap-2 rounded-pill">
                                <Trash2 size={16} /> Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
