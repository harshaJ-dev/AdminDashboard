import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area
} from "recharts";
import { Users, DollarSign, ShoppingCart, Activity, ArrowUp, ArrowDown } from "lucide-react";
import StatCard from "../components/StatCard";
import { fetchStats, fetchChartData } from "../services/api";

const iconMap = {
    Users: Users,
    DollarSign: DollarSign,
    ShoppingCart: ShoppingCart,
    Activity: Activity,
};

// Mock Data for Leaders/Sales List
const salesList = [
    { name: "Anam Wp", profit: "$337", sales: "$1256", img: "https://i.pravatar.cc/150?u=1" },
    { name: "Reza Rahardian", profit: "$789", sales: "$1256", img: "https://i.pravatar.cc/150?u=2" },
    { name: "Firman Jabbar", profit: "$459", sales: "$1256", img: "https://i.pravatar.cc/150?u=3" },
];

const Dashboard = () => {
    const [stats, setStats] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const statsData = await fetchStats();
                const chartDataResponse = await fetchChartData();
                setStats(statsData);
                setChartData(chartDataResponse);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
    }

    return (
        <div className="container-fluid p-0">
            <div className="row g-4">
                {/* Main Content Area (Left 8/9 cols) */}
                <div className="col-12 col-xl-9">
                    {/* Stats Row */}
                    <div className="row g-4 mb-4">
                        {stats.slice(0, 3).map((stat, index) => { // Showing only 3 main cards for layout match
                            const Icon = iconMap[stat.icon];
                            return (
                                <div className="col-12 col-md-4" key={index}>
                                    <StatCard
                                        title={stat.title.replace("Total ", "")} // Simplifying titles
                                        value={stat.value}
                                        icon={Icon}
                                        color={stat.color}
                                        subValue="$2464" // Mock subvalue
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Sales Figures Chart */}
                    <div className="custom-card p-4 mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="fw-bold mb-0">Sales Figures</h5>
                            <div className="d-flex gap-3">
                                <div className="d-flex align-items-center"><span className="rounded-circle bg-primary me-2" style={{ width: 8, height: 8 }}></span> <small>Marketing</small></div>
                                <div className="d-flex align-items-center"><span className="rounded-circle bg-danger me-2" style={{ width: 8, height: 8 }}></span> <small>Cases Sales</small></div>
                            </div>
                        </div>
                        <div style={{ width: '100%', height: 350 }}>
                            <ResponsiveContainer>
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4e73df" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#4e73df" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#e74a3b" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#e74a3b" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="uv" stroke="#4e73df" strokeWidth={3} fillOpacity={1} fill="url(#colorUv)" />
                                    <Area type="monotone" dataKey="pv" stroke="#e74a3b" strokeWidth={3} fillOpacity={1} fill="url(#colorPv)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar (Right 3/4 cols) */}
                <div className="col-12 col-xl-3">
                    {/* Sales List */}
                    <div className="custom-card p-4 mb-4">
                        <h5 className="fw-bold mb-2">Sales List</h5>
                        <p className="text-muted small mb-4">This is the sales sales data with the most revenue for this month</p>

                        <div className="d-flex flex-column gap-3">
                            {salesList.map((item, i) => (
                                <div key={i} className="d-flex align-items-center p-2 rounded bg-light">
                                    <img src={item.img} alt={item.name} className="rounded-circle me-3" style={{ width: 40, height: 40 }} />
                                    <div className="flex-grow-1">
                                        <h6 className="mb-0 fw-bold fs-6">{item.name}</h6>
                                        <div className="d-flex gap-3 small">
                                            <span className="text-primary fw-bold"><ArrowUp size={12} /> {item.sales}</span>
                                            <span className="text-warning fw-bold"><ArrowDown size={12} /> {item.profit}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sales Report (Vertical Bars) */}
                    <div className="custom-card p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="fw-bold mb-0">Sales Report</h5>
                            <button className="btn btn-sm btn-outline-secondary rounded-pill">This Years</button>
                        </div>
                        <div style={{ width: '100%', height: 200 }}>
                            <ResponsiveContainer>
                                <BarChart data={chartData.slice(0, 5)}>
                                    <Bar dataKey="uv" fill="#4e73df" radius={[5, 5, 5, 5]} barSize={6} />
                                    <Bar dataKey="pv" fill="#f6c23e" radius={[5, 5, 5, 5]} barSize={6} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
