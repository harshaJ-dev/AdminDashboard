import React, { useState } from 'react';

const CreateSectionModal = ({ show, onHide, onCreate }) => {
    const [sectionTitle, setSectionTitle] = useState('');

    const handleSubmit = () => {
        if (sectionTitle.trim()) {
            onCreate(sectionTitle);
            setSectionTitle('');
            onHide();
        }
    };

    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create New Section</h5>
                        <button type="button" className="btn-close" onClick={onHide}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="sectionTitle" className="form-label">Section Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="sectionTitle"
                                value={sectionTitle}
                                onChange={(e) => setSectionTitle(e.target.value)}
                                placeholder="Enter section title"
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onHide}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateSectionModal;
