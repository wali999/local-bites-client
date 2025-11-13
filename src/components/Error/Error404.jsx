import React from "react";
import { useNavigate } from "react-router";
import notfoundImg from '../../assets/404.png'

const Error404 = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center pt-10 pb-20 bg-gray-50 p-6 text-center">
            <img
                src={notfoundImg}
                alt="404 Not Found"
                className="w-full max-w-3xl mb-10"
            />

            <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">
                Oops! Page Not Found
            </h1>
            <p className="text-gray-600 mb-6">
                The page you're looking for doesn't exist or has been moved.
            </p>

            <button
                onClick={() => navigate(-1)}
                className="btn bg-green-600 hover:bg-green-700 text-white px-6 py-2 mb-6 rounded-lg shadow-md transition-all"
            >
                Go Back
            </button>
        </div>
    );
};

export default Error404;
