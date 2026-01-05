import { Link, NavLink, Outlet } from "react-router";
import logo from "../assets/logo.png";
import {
    FaTachometerAlt,
    FaUser,
    FaStar,
    FaHeart,
} from "react-icons/fa";


const Dashboard = () => {
    return (
        <div className="drawer lg:drawer-open min-h-screen max-w-7xl mx-auto">

            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            {/* Main Content */}
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar bg-base-100 shadow-sm px-4">
                    {/* Mobile menu button */}
                    <label
                        htmlFor="dashboard-drawer"
                        className="btn btn-ghost btn-circle lg:hidden"
                    >
                        ☰
                    </label>

                    <img className="w-9 ml-2" src={logo} alt="LocalBites Logo" />
                    <Link to="/" className="text-xl md:text-2xl font-bold ml-2">
                        LocalBites
                    </Link>
                </div>

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-6 bg-base-100">
                    <Outlet />
                </main>
            </div>

            {/* Sidebar */}
            <div className="drawer-side z-40">
                <label
                    htmlFor="dashboard-drawer"
                    className="drawer-overlay"
                ></label>

                <aside className="menu w-64 min-h-full bg-base-200 p-4">
                    <h2 className="text-xl font-bold mb-4">Dashboard</h2>

                    <ul className="menu rounded-box gap-1">
                        <li>
                            <NavLink
                                to="overview"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 ${isActive ? "active font-semibold" : ""
                                    }`
                                }
                            >
                                <FaTachometerAlt className="text-lg" />
                                <span>Overview</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="profile"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 ${isActive ? "active font-semibold" : ""
                                    }`
                                }
                            >
                                <FaUser className="text-lg" />
                                <span>Profile</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="my-reviews"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 ${isActive ? "active font-semibold" : ""
                                    }`
                                }
                            >
                                <FaStar className="text-lg" />
                                <span>My Reviews</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="my-favorite"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 ${isActive ? "active font-semibold" : ""
                                    }`
                                }
                            >
                                <FaHeart className="text-lg " />
                                <span>My Favorites</span>
                            </NavLink>
                        </li>
                    </ul>

                </aside>
            </div>
        </div>
    );
};

export default Dashboard;
