import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [notes, setNotes] = useState([
        { id: 1, text: "Team meeting at 10 AM", date: "2024-02-15" },
        { id: 2, text: "Project deadline review", date: "2024-02-20" },
    ]);
    const [newNote, setNewNote] = useState("");

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const addNote = () => {
        if (newNote.trim() && selectedDate) {
            setNotes([...notes, { id: Date.now(), text: newNote, date: selectedDate }]);
            setNewNote("");
        }
    };

    const handleDateClick = (day) => {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setSelectedDate(dateStr);
    };

    const getNotesForDate = (dateStr) => {
        return notes.filter(note => note.date === dateStr);
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(n => n.id !== id));
    };

    const renderCalendarDays = () => {
        const days = [];
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="text-center py-3"></div>);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const isToday = i === new Date().getDate() && currentDate.getMonth() === new Date().getMonth();
            const isSelected = dateStr === selectedDate;
            const hasNotes = getNotesForDate(dateStr).length > 0;

            days.push(
                <div
                    key={i}
                    className={`text-center py-3 rounded cursor-pointer position-relative ${isToday ? 'bg-primary text-white fw-bold' :
                            isSelected ? 'bg-info text-white' :
                                'hover-bg-light'
                        }`}
                    onClick={() => handleDateClick(i)}
                    style={{ cursor: 'pointer' }}
                >
                    {i}
                    {hasNotes && !isToday && !isSelected && (
                        <div style={{ position: 'absolute', top: '5px', right: '5px', width: '6px', height: '6px', backgroundColor: '#ff7e5f', borderRadius: '50%' }}></div>
                    )}
                </div>
            );
        }
        return days;
    };

    return (
        <div className="container-fluid p-0">
            <div className="row g-4">
                {/* Calendar Section */}
                <div className="col-12 col-md-8">
                    <div className="custom-card p-4 h-100">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="fw-bold mb-0">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h4>
                            <div className="btn-group">
                                <button className="btn btn-outline-secondary btn-sm" onClick={prevMonth}><ChevronLeft size={20} /></button>
                                <button className="btn btn-outline-secondary btn-sm" onClick={nextMonth}><ChevronRight size={20} /></button>
                            </div>
                        </div>

                        <div className="d-grid text-center fw-bold text-muted mb-2" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
                            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
                        </div>
                        <div className="d-grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
                            {renderCalendarDays()}
                        </div>
                    </div>
                </div>

                {/* Notes Section */}
                <div className="col-12 col-md-4">
                    <div className="custom-card p-4 h-100 bg-light-subtle">
                        <h5 className="fw-bold mb-3">
                            {selectedDate ? `Notes for ${new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` : 'Select a date'}
                        </h5>

                        {selectedDate && (
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control border-0 shadow-sm"
                                    placeholder="Add a new note..."
                                    value={newNote}
                                    onChange={(e) => setNewNote(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && addNote()}
                                />
                                <button className="btn btn-primary" onClick={addNote}><Plus size={20} /></button>
                            </div>
                        )}

                        <div className="d-flex flex-column gap-2" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {selectedDate && getNotesForDate(selectedDate).map(note => (
                                <div key={note.id} className="card border-0 shadow-sm p-3">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <p className="mb-1 small">{note.text}</p>
                                        <button className="btn btn-sm text-danger p-0 ms-2" onClick={() => deleteNote(note.id)}>
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                    <small className="text-muted" style={{ fontSize: '0.7rem' }}>{note.date}</small>
                                </div>
                            ))}
                            {selectedDate && getNotesForDate(selectedDate).length === 0 && <p className="text-center text-muted small mt-3">No notes for this date.</p>}
                            {!selectedDate && <p className="text-center text-muted small mt-3">Click a date to view or add notes.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
