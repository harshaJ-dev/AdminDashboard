import { useState } from 'react';
import { Users, ChevronRight } from 'lucide-react';

const Leaderboard = () => {
    const [members, setMembers] = useState([
        { id: 1, name: 'Alice Johnson', avatar: 'AJ', status: 'unassigned' },
        { id: 2, name: 'Bob Smith', avatar: 'BS', status: 'unassigned' },
        { id: 3, name: 'Charlie Brown', avatar: 'CB', status: 'unassigned' },
        { id: 4, name: 'Diana Prince', avatar: 'DP', status: 'in-progress' },
        { id: 5, name: 'Ethan Hunt', avatar: 'EH', status: 'in-progress' },
        { id: 6, name: 'Fiona Gallagher', avatar: 'FG', status: 'completed' },
    ]);

    const [draggedMember, setDraggedMember] = useState(null);

    const sections = [
        { id: 'unassigned', title: 'Unassigned', color: 'secondary' },
        { id: 'in-progress', title: 'In Progress', color: 'warning' },
        { id: 'completed', title: 'Completed', color: 'success' },
    ];

    const handleDragStart = (member) => {
        setDraggedMember(member);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (sectionId) => {
        if (draggedMember) {
            setMembers(members.map(m =>
                m.id === draggedMember.id ? { ...m, status: sectionId } : m
            ));
            setDraggedMember(null);
        }
    };

    const getMembersForSection = (sectionId) => {
        return members.filter(m => m.status === sectionId);
    };

    return (
        <div className="container-fluid p-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 className="fw-bold mb-1">Team Board</h3>
                    <p className="text-muted small mb-0">Drag and drop members to assign them to different stages</p>
                </div>
                <div className="badge bg-primary-subtle text-primary fw-normal px-3 py-2">
                    <Users size={16} className="me-2" />
                    {members.length} Members
                </div>
            </div>

            <div className="row g-4">
                {sections.map(section => (
                    <div key={section.id} className="col-12 col-md-4">
                        <div
                            className="custom-card p-4 h-100"
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop(section.id)}
                            style={{ minHeight: '500px' }}
                        >
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="fw-bold mb-0">{section.title}</h5>
                                <span className={`badge bg-${section.color}-subtle text-${section.color}`}>
                                    {getMembersForSection(section.id).length}
                                </span>
                            </div>

                            <div className="d-flex flex-column gap-3">
                                {getMembersForSection(section.id).map(member => (
                                    <div
                                        key={member.id}
                                        draggable
                                        onDragStart={() => handleDragStart(member)}
                                        className="card border-0 shadow-sm p-3 cursor-move"
                                        style={{
                                            cursor: 'grab',
                                            transition: 'transform 0.2s, box-shadow 0.2s'
                                        }}
                                        onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
                                        onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
                                    >
                                        <div className="d-flex align-items-center">
                                            <div
                                                className="rounded-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center me-3"
                                                style={{ width: '40px', height: '40px', fontSize: '0.8rem' }}
                                            >
                                                {member.avatar}
                                            </div>
                                            <div className="flex-grow-1">
                                                <p className="mb-0 fw-medium">{member.name}</p>
                                                <small className="text-muted">Team Member</small>
                                            </div>
                                            <ChevronRight size={16} className="text-muted" />
                                        </div>
                                    </div>
                                ))}

                                {getMembersForSection(section.id).length === 0 && (
                                    <div className="text-center text-muted py-5">
                                        <p className="small mb-0">No members in this section</p>
                                        <p className="small">Drag members here</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;
