import { useState } from "react";
import { ChevronDown, ChevronRight, Folder, FileText } from "lucide-react";

const sectionsData = [
    {
        id: 1,
        title: "Marketing Dept",
        items: ["Campaign Q1", "Social Media Assets", "Email Templates"]
    },
    {
        id: 2,
        title: "Development Team",
        items: ["Frontend Repo", "Backend API Specs", "Deployment Scripts"]
    },
    {
        id: 3,
        title: "HR Documents",
        items: ["Employee Handbook", "Onboarding Checklist", "Holiday Policy"]
    }
];

const SectionList = () => {
    const [expanded, setExpanded] = useState({});

    const toggleSection = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="container-fluid p-0">
            <h3 className="mb-4 fw-bold">Sections & Resources</h3>

            <div className="row">
                <div className="col-12 col-lg-8">
                    <div className="custom-card p-4">
                        {sectionsData.map(section => (
                            <div key={section.id} className="mb-3 border-bottom pb-3 last-border-none">
                                <div
                                    className="d-flex align-items-center cursor-pointer p-2 rounded hover-bg-light"
                                    onClick={() => toggleSection(section.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {expanded[section.id] ? <ChevronDown size={20} className="me-2 text-primary" /> : <ChevronRight size={20} className="me-2 text-muted" />}
                                    <Folder size={20} className="me-3 text-warning" />
                                    <h5 className="mb-0 fw-bold">{section.title}</h5>
                                    <span className="badge bg-light text-dark ms-auto">{section.items.length} items</span>
                                </div>

                                {expanded[section.id] && (
                                    <div className="ms-4 mt-2 ps-3 border-start">
                                        {section.items.map((item, idx) => (
                                            <div key={idx} className="d-flex align-items-center p-2 mb-1">
                                                <FileText size={16} className="me-2 text-muted" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-12 col-lg-4">
                    <div className="custom-card p-4 bg-primary text-white">
                        <h5 className="fw-bold mb-3">Quick Actions</h5>
                        <button className="btn btn-light w-100 mb-2 text-primary fw-bold text-start">Create New Section</button>
                        <button className="btn btn-outline-light w-100 text-start">Manage Permissions</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SectionList;
