import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { FaMoon, FaSun } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";

const Navbar = () => {
    const { user, loading, signOutUser } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };

    const handleSignOut = () => {
        signOutUser()
            .then(() => toast.success("Logged out successfully"))
            .catch(error => toast.error(error.message));
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const links = (
        <>
            <li>
                <NavLink to="/" className={({ isActive }) => `font-semibold ${isActive ? "text-green-600" : ""}`}>
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink to="/allReviews" className={({ isActive }) => `font-semibold ${isActive ? "text-green-600" : ""}`}>
                    All Reviews
                </NavLink>
            </li>

            {/* NEW: Add Review */}
            {user && (
                <li>
                    <NavLink
                        to="/addReview"
                        className={({ isActive }) => `font-semibold ${isActive ? "text-green-600" : ""}`}
                    >
                        Add Review
                    </NavLink>
                </li>
            )}

            <li>
                <NavLink to="/faq" className={({ isActive }) => `font-semibold ${isActive ? "text-green-600" : ""}`}>
                    FAQ
                </NavLink>
            </li>
        </>
    );


    return (
        <div className="navbar sticky top-0 z-50 bg-base-100/80 backdrop-blur shadow-sm px-3 md:px-6 lg:px-12">

            {/* Left */}
            <div className="navbar-start gap-2">
                <img className="w-9" src={logo} alt="LocalBites Logo" />
                <Link to="/" className="text-xl font-bold text-base-content">
                    LocalBites
                </Link>
            </div>

            {/* Center (Desktop) */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-1">{links}</ul>
            </div>

            {/* Right */}
            <div className="navbar-end flex items-center gap-2" ref={dropdownRef}>

                {/* Theme toggle */}
                <button
                    onClick={toggleTheme}
                    className="btn btn-ghost btn-circle"
                    aria-label="Toggle Theme"
                >
                    {theme === "light" ? <FaMoon /> : <FaSun />}
                </button>

                {/* Mobile Menu */}
                <div className="dropdown dropdown-end lg:hidden">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <HiMenuAlt3 size={22} />
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-xl w-44"
                    >
                        {links}
                    </ul>
                </div>

                {/* Auth Section */}
                {loading ? (
                    <div className="w-10 h-10 rounded-full bg-base-300 animate-pulse"></div>
                ) : user ? (
                    <div className="relative">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 h-10 rounded-full border border-base-300 overflow-hidden">
                                <img
                                    src={user.photoURL || "https://via.placeholder.com/150"}
                                    alt="User"
                                />
                            </div>
                        </button>

                        {isOpen && (
                            <ul className="absolute right-0 mt-3 w-48 bg-base-100 shadow-lg rounded-xl p-2 z-50">
                                <li className="font-semibold text-center border-b pb-2 mb-1">
                                    {user.displayName || "User"}
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setIsOpen(false)}
                                        className="block text-center px-4 py-2 hover:bg-base-200 rounded-lg"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            handleSignOut();
                                            setIsOpen(false);
                                        }}
                                        className="w-full px-4 py-2 text-red-600 hover:bg-base-200 rounded-lg"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="btn btn-success text-white rounded-xl px-6"
                    >
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
