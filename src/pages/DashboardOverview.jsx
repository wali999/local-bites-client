import { useContext, useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from "recharts";
import { AuthContext } from "../context/AuthContext";

const DashboardOverview = () => {
    const { user } = useContext(AuthContext);

    const [stats, setStats] = useState([]);
    const [monthly, setMonthly] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (!user?.email) return;

        fetch(`https://local-bites-server.vercel.app/dashboard/stats?email=${user.email}`)
            .then(res => res.json())
            .then(setStats);

        fetch("https://local-bites-server.vercel.app/dashboard/reviews-per-month")
            .then(res => res.json())
            .then(setMonthly);

        fetch("https://local-bites-server.vercel.app/dashboard/ratings")
            .then(res => res.json())
            .then(setRatings);

        fetch("https://local-bites-server.vercel.app/dashboard/recent-reviews")
            .then(res => res.json())
            .then(setReviews);
    }, [user]);

    const COLORS = ["#22c55e", "#16a34a", "#4ade80", "#86efac"];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Dashboard Overview</h1>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((item, i) => (
                    <div key={i} className="card bg-base-200 p-4">
                        <p className="text-sm opacity-70">{item.label}</p>
                        <p className="text-2xl font-bold">{item.value}</p>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="card bg-base-200 p-4">
                    <h3 className="font-semibold mb-2">Reviews Per Month</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={monthly}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="reviews" fill="#22c55e" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="card bg-base-200 p-4">
                    <h3 className="font-semibold mb-2">Rating Distribution</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={ratings}
                                dataKey="value"
                                nameKey="rating"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                            >
                                {ratings.map((_, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Food</th>
                            <th>Restaurant</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map(r => (
                            <tr key={r._id}>
                                <td>{r.food_name}</td>
                                <td>{r.restaurant_name}</td>
                                <td>{r.rating}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardOverview;
