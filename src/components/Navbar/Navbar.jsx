import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                toast("You logged out successfully");
            })
            .catch((error) => {
                toast(error.message);
            });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const links = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/allReviews">All Reviews</NavLink></li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm">
            {/*Left part  of Navbar */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <img className="w-9" src={logo} alt="LocalBites Logo" />
                <a className="btn btn-ghost text-xl font-bold">LocalBites</a>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>

            {/* Right part*/}
            <div className="navbar-end" ref={dropdownRef}>
                {user ? (
                    <div className="relative  mr-13">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="btn btn-ghost btn-circle avatar flex items-center justify-center"
                        >
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center">
                                <img
                                    src={user.photoURL || "https://via.placeholder.com/150"}
                                    alt="User Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        {isOpen && (
                            <ul className="absolute -right-15 mt-3 w-40 text-center bg-white shadow-lg rounded-xl p-2 z-50 border animate-fadeIn">
                                <li className="text-center font-semibold text-gray-700 border-b pb-2">
                                    {user.displayName || "User"}
                                </li>
                                <li>
                                    <Link
                                        to="/addReview"
                                        className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Add Review
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/myReviews"
                                        className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        My Reviews
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            handleSignOut();
                                            setIsOpen(false);
                                        }}
                                        className="w-full text-center  px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md"
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
                        className="btn bg-white text-green-700 border-none px-6 py-2 font-semibold hover:bg-gray-100"
                    >
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
