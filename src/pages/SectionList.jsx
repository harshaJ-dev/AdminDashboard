

import { useState } from "react";
import { ChevronDown, ChevronRight, Folder, FileText } from "lucide-react";
import CreateSectionModal from "../components/CreateSectionModal";
import ManagePermissionsModal from "../components/ManagePermissionsModal";
import AddResourceModal from "../components/AddResourceModal";

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
    const [sections, setSections] = useState(sectionsData);
    const [expanded, setExpanded] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showPermissionsModal, setShowPermissionsModal] = useState(false);
    const [showAddResourceModal, setShowAddResourceModal] = useState(false);
    const [activeSectionId, setActiveSectionId] = useState(null);

    const handleCreateSection = (title) => {
        const newSection = {
            id: sections.length + 1,
            title: title,
            items: []
        };
        setSections([...sections, newSection]);
    };

    const toggleSection = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleAddResourceClick = (sectionId, e) => {
        e.stopPropagation(); // prevent toggling section
        setActiveSectionId(sectionId);
        setShowAddResourceModal(true);
    };

    const handleAddResource = (resourceName) => {
        setSections(sections.map(section => {
            if (section.id === activeSectionId) {
                return { ...section, items: [...section.items, resourceName] };
            }
            return section;
        }));
    };

    return (
        <div className="container-fluid p-0">
            <h3 className="mb-4 fw-bold">Sections & Resources</h3>

            <div className="row">
                <div className="col-12 col-lg-8">
                    <div className="custom-card p-4">
                        {sections.map(section => (
                            <div key={section.id} className="mb-3 border-bottom pb-3 last-border-none">
                                <div
                                    className="d-flex align-items-center cursor-pointer p-2 rounded hover-bg-light"
                                    onClick={() => toggleSection(section.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {expanded[section.id] ? <ChevronDown size={20} className="me-2 text-primary" /> : <ChevronRight size={20} className="me-2 text-muted" />}
                                    <Folder size={20} className="me-3 text-warning" />
                                    <h5 className="mb-0 fw-bold">{section.title}</h5>
                                    <div className="ms-auto d-flex align-items-center">
                                        <button
                                            className="btn btn-sm btn-light me-2 fw-bold text-primary"
                                            onClick={(e) => handleAddResourceClick(section.id, e)}
                                            style={{ fontSize: '0.8rem' }}
                                        >
                                            + Add
                                        </button>
                                        <span className="badge bg-light text-dark">{section.items.length} items</span>
                                    </div>
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
                        <button
                            className="btn btn-light w-100 mb-2 text-primary fw-bold text-start"
                            onClick={() => setShowModal(true)}
                        >
                            Create New Section
                        </button>
                        <button
                            className="btn btn-outline-light w-100 text-start"
                            onClick={() => setShowPermissionsModal(true)}
                        >
                            Manage Permissions
                        </button>
                    </div>
                </div>
            </div>

            <CreateSectionModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onCreate={handleCreateSection}
            />

            <ManagePermissionsModal
                show={showPermissionsModal}
                onHide={() => setShowPermissionsModal(false)}
            />

            <AddResourceModal
                show={showAddResourceModal}
                onHide={() => setShowAddResourceModal(false)}
                onAdd={handleAddResource}
            />
        </div>
    );
};

export default SectionList;
