const StatCard = ({ title, value, icon: Icon, color, subValue }) => {
    // Map color names to hex values for the 'dot' or progress bar
    const colorMap = {
        "bg-primary": "#4e73df",
        "bg-success": "#1cc88a",
        "bg-warning": "#f6c23e",
        "bg-danger": "#e74a3b",
        "bg-info": "#36b9cc"
    };

    const hexColor = colorMap[color] || "#4e73df";

    return (
        <div className="custom-card p-4 h-100 position-relative overflow-hidden">
            <div className="d-flex align-items-center mb-3">
                <div className={`rounded-circle p-2 me-3 d-flex align-items-center justify-content-center`} style={{ backgroundColor: `${hexColor}20`, width: 45, height: 45 }}>
                    <Icon size={20} style={{ color: hexColor }} />
                </div>
                <h6 className="mb-0 fw-bold">{title}</h6>
            </div>

            <h3 className="mb-2 fw-bold">{value}</h3>
            <small className="text-muted d-block mb-3">Compared To ({subValue} Last Month)</small>

            {/* Simple Progress Bar visual */}
            <div className="progress" style={{ height: "6px" }}>
                <div className="progress-bar rounded-pill" role="progressbar" style={{ width: "70%", backgroundColor: hexColor }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
    );
};

export default StatCard;
