import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../../assets/logo.png'
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { user, signOutUser } = use(AuthContext);

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                toast('You logged out successfully');
            })
            .catch((error) => {
                toast(error.message);
            })
    }

    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/allReviews'>All Reviews</NavLink></li>
    </>

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <img className='w-9' src={logo} alt="" />
                <a className="btn btn-ghost text-xl font-bold">LocalBites</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {/* <Link to='/register' className="btn bg-green-600 hover:bg-green-700 text-white">Login</Link> */}
                {user && (
                    <div >
                        <img
                            className="w-12 h-12 rounded-full border border-gray-400"
                            src={user.photoURL}
                            alt="User Avatar"
                        />
                    </div>
                )}

                {user ? (
                    <button
                        onClick={handleSignOut}
                        className="btn bg-white text-[#a61e4d] border-none px-6 py-2 font-semibold hover:bg-gray-100"
                    >
                        Logout
                    </button>
                ) : (

                    <Link
                        to="/login"
                        className="btn bg-white text-[#1c7ed6] border-none px-6 py-2 font-semibold hover:bg-gray-100"
                    >
                        Login
                    </Link>


                )}
            </div>
        </div>
    );
};

export default Navbar;