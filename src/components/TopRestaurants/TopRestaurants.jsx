import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TopRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetch("/toprestaurants.json")
            .then((res) => res.json())
            .then((data) => setRestaurants(data))
            .catch(() => {
                toast.error("Failed to load data.");
            });
    }, []);

    if (!restaurants.length) return null;

    return (
        <section className="py-16 bg-green-50 px-6 md:px-12">
            <div className="max-w-6xl mx-auto text-center">

                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                    <span className="text-green-600">Local Restaurants</span> Loved by Our Reviewers
                </h2>
                <p className="text-gray-600 mb-10 max-w-3xl mx-auto">
                    These are the restaurants that keep our reviewers coming back — from
                    homestyle kitchens to modern bistros, each one has earned a special
                    place in LocalBites' heart.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {restaurants.map((r, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <img
                                src={r.image}
                                alt={r.name}
                                className="w-full h-48 object-cover"
                            />

                            <div className="p-5 text-left">
                                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                                    {r.name}
                                </h3>
                                <p className="text-sm text-green-700 font-medium mb-2">
                                    {r.cuisine} • Best Dish: {r.bestDish}
                                </p>
                                <p className="text-gray-600 text-sm mb-3">{r.popularFor}</p>
                                <button className="text-green-600 font-medium hover:underline">
                                    View Reviews →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopRestaurants;
