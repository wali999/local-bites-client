import React from 'react';
import { FaUtensils, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

const About = () => {
    return (
        <section className="bg-green-50 py-12 px-5 md:px-10 rounded-2xl mt-10 mb-10">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    About <span className="text-green-600">LocalBites</span>
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto mb-10">
                    LocalBites is your trusted food review hub for discovering hidden gems and local favorites around town.
                    We bring honest reviews from real food lovers — helping you find the best bites, from cozy street stalls
                    to fine dining restaurants, all in one place.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">

                    <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300">
                        <FaUtensils className="text-green-600 text-4xl mb-3" />
                        <h3 className="font-semibold text-lg mb-2">Discover Local Flavor</h3>
                        <p className="text-gray-500 text-sm">
                            Explore authentic dishes from nearby restaurants and hidden local spots.
                        </p>
                    </div>

                    <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300">
                        <FaMapMarkerAlt className="text-red-500 text-4xl mb-3" />
                        <h3 className="font-semibold text-lg mb-2">Find Places Easily</h3>
                        <p className="text-gray-500 text-sm">
                            Get quick info on restaurant locations, ambiance, and specialties.
                        </p>
                    </div>

                    <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300">
                        <FaUsers className="text-yellow-500 text-4xl mb-3" />
                        <h3 className="font-semibold text-lg mb-2">Share Your Experience</h3>
                        <p className="text-gray-500 text-sm">
                            Join our community by adding your own reviews and rating your favorite bites.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;