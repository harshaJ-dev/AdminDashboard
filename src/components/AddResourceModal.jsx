import React, { useState } from 'react';

const AddResourceModal = ({ show, onHide, onAdd }) => {
    const [resourceName, setResourceName] = useState('');

    const handleSubmit = () => {
        if (resourceName.trim()) {
            onAdd(resourceName);
            setResourceName('');
            onHide();
        }
    };

    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Resource</h5>
                        <button type="button" className="btn-close" onClick={onHide}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="resourceName" className="form-label">Resource Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="resourceName"
                                value={resourceName}
                                onChange={(e) => setResourceName(e.target.value)}
                                placeholder="Enter document or resource name"
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onHide}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Add Resource</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddResourceModal;
