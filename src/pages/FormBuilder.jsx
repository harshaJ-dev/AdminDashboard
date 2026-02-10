import { useState } from "react";
import { Plus, Trash2, GripVertical, Save } from "lucide-react";

const fieldTypes = [
    { type: "text", label: "Text Input" },
    { type: "number", label: "Number Input" },
    { type: "checkbox", label: "Checkbox" },
    { type: "select", label: "Dropdown" },
];

const FormBuilder = () => {
    const [formFields, setFormFields] = useState([]);
    const [formName, setFormName] = useState("New Form");

    const addField = (type) => {
        setFormFields([...formFields, { id: Date.now(), type, label: `New ${type} field`, required: false }]);
    };

    const removeField = (id) => {
        setFormFields(formFields.filter(field => field.id !== id));
    };

    const updateField = (id, key, value) => {
        setFormFields(formFields.map(field => field.id === id ? { ...field, [key]: value } : field));
    };

    return (
        <div className="container-fluid p-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 className="fw-bold mb-1">Form Builder</h3>
                    <p className="text-muted">Create custom forms for your team</p>
                </div>
                <button className="btn btn-primary d-flex align-items-center gap-2">
                    <Save size={18} /> Save Form
                </button>
            </div>

            <div className="row">
                {/* Sidebar - Toolbox */}
                <div className="col-12 col-md-3">
                    <div className="custom-card p-4">
                        <h6 className="fw-bold text-uppercase text-muted mb-3" style={{ fontSize: '0.75rem' }}>Toolbox</h6>
                        <div className="d-grid gap-2">
                            {fieldTypes.map(ft => (
                                <button
                                    key={ft.type}
                                    className="btn btn-outline-secondary d-flex align-items-center justify-content-start gap-2"
                                    onClick={() => addField(ft.type)}
                                >
                                    <Plus size={16} /> {ft.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Canvas */}
                <div className="col-12 col-md-9">
                    <div className="custom-card p-5 min-vh-50" style={{ minHeight: "500px" }}>
                        <div className="mb-4">
                            <label className="form-label text-muted small">Form Title</label>
                            <input
                                type="text"
                                className="form-control form-control-lg fw-bold border-0 ps-0"
                                value={formName}
                                onChange={(e) => setFormName(e.target.value)}
                                style={{ fontSize: '2rem' }}
                            />
                        </div>

                        {formFields.length === 0 ? (
                            <div className="text-center py-5 text-muted border border-dashed rounded bg-light">
                                <p>Drag and drop items here or click from toolbox</p>
                            </div>
                        ) : (
                            <div className="d-flex flex-column gap-3">
                                {formFields.map((field) => (
                                    <div key={field.id} className="card p-3 border position-relative">
                                        <div className="d-flex justify-content-between align-items-start">
                                            <div className="d-flex align-items-center gap-2 mb-2 w-100 me-3">
                                                <GripVertical className="text-muted cursor-move" size={20} />
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm fw-bold border-0"
                                                    value={field.label}
                                                    onChange={(e) => updateField(field.id, "label", e.target.value)}
                                                />
                                            </div>
                                            <button className="btn btn-sm text-danger" onClick={() => removeField(field.id)}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        <div className="ps-4">
                                            {field.type === 'text' && <input disabled className="form-control bg-light" placeholder="Text input placeholder" />}
                                            {field.type === 'number' && <input disabled type="number" className="form-control bg-light" placeholder="0" />}
                                            {field.type === 'checkbox' && (
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" disabled />
                                                    <label className="form-check-label text-muted">Checkbox option</label>
                                                </div>
                                            )}
                                            {field.type === 'select' && (
                                                <select className="form-select bg-light" disabled>
                                                    <option>Option 1</option>
                                                    <option>Option 2</option>
                                                </select>
                                            )}
                                        </div>

                                        <div className="form-check form-switch mt-2 ms-4">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={field.required}
                                                onChange={(e) => updateField(field.id, "required", e.target.checked)}
                                            />
                                            <label className="form-check-label small text-muted">Required</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormBuilder;
