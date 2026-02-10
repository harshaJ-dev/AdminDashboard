// Mock Data
const MOCK_USERS = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User", status: "Inactive" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "User", status: "Active" },
    { id: 4, name: "Diana Prince", email: "diana@example.com", role: "Manager", status: "Active" },
    { id: 5, name: "Evan Wright", email: "evan@example.com", role: "User", status: "Active" },
    { id: 6, name: "Fiona Gallagher", email: "fiona@example.com", role: "User", status: "Inactive" },
    { id: 7, name: "George Martin", email: "george@example.com", role: "User", status: "Active" },
    { id: 8, name: "Hannah Abbott", email: "hannah@example.com", role: "Admin", status: "Active" },
];

const MOCK_STATS = [
    { title: "Total Users", value: "1,245", color: "bg-blue-500", icon: "Users" },
    { title: "Total Revenue", value: "$45,231", color: "bg-green-500", icon: "DollarSign" },
    { title: "New Orders", value: "345", color: "bg-yellow-500", icon: "ShoppingCart" },
    { title: "Bounce Rate", value: "24.5%", color: "bg-red-500", icon: "Activity" },
];

const MOCK_CHART_DATA = [
    { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
    { name: "May", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
];

export const fetchUsers = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_USERS), 500);
    });
};

export const fetchStats = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_STATS), 500);
    });
};

export const fetchChartData = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_CHART_DATA), 500);
    });
};
