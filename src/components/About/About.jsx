import React from "react";
import { FaUtensils, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

const About = () => {
    return (
        <section className="py-14 md:py-18 px-4 sm:px-6 md:px-10 lg:px-16 bg-base-200/50 rounded-2xl mt-12 mb-12">
            <div className="max-w-6xl mx-auto text-center">

                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-base-content mb-4">
                    About <span className="text-green-600">LocalBites</span>
                </h2>

                <p className="text-base-content/70 max-w-3xl mx-auto mb-10 text-sm sm:text-base">
                    LocalBites is your trusted food review hub for discovering hidden gems
                    and local favorites around town. We bring honest reviews from real food
                    lovers — helping you find the best bites, from cozy street stalls to
                    fine dining restaurants, all in one place.
                </p>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

                    <div className="flex flex-col items-center bg-base-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <FaUtensils className="text-green-600 text-4xl mb-3" />
                        <h3 className="font-semibold text-lg mb-2 text-base-content">
                            Discover Local Flavor
                        </h3>
                        <p className="text-base-content/70 text-sm text-center">
                            Explore authentic dishes from nearby restaurants and hidden local spots.
                        </p>
                    </div>

                    <div className="flex flex-col items-center bg-base-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <FaMapMarkerAlt className="text-red-500 text-4xl mb-3" />
                        <h3 className="font-semibold text-lg mb-2 text-base-content">
                            Find Places Easily
                        </h3>
                        <p className="text-base-content/70 text-sm text-center">
                            Get quick info on restaurant locations, ambiance, and specialties.
                        </p>
                    </div>

                    <div className="flex flex-col items-center bg-base-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <FaUsers className="text-yellow-500 text-4xl mb-3" />
                        <h3 className="font-semibold text-lg mb-2 text-base-content">
                            Share Your Experience
                        </h3>
                        <p className="text-base-content/70 text-sm text-center">
                            Join our community by adding your own reviews and rating your favorite bites.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
