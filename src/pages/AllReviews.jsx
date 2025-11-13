import React, { useEffect, useState } from 'react';
import FoodCard from '../components/FoodCard/FoodCard';

const AllReviews = () => {
    const [allReviews, setAllReviews] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchReviews = async (search = "") => {
        try {
            const res = await fetch(`https://local-bites-server.vercel.app/allReviews?search=${search}`);
            const data = await res.json();
            setAllReviews(data);
        } catch (error) {
            // console.error("Error fetching reviews:", error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchReviews(searchTerm.trim());
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    return (
        <div className='my-10 min-h-screen px-4 md:px-8 lg:px-16'>
            <div className='text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-2'>
                All <span className="text-green-600">Reviews</span>
            </div>
            <p className='text-center text-gray-600 md:text-lg mb-6'>
                Discover reviews from food lovers across the city — find the best dishes, restaurants, and flavors at a glance!
            </p>

            {/* Search Option */}
            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    placeholder="Search by food name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered w-64 md:w-96 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            {/* Food Cards */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                {allReviews.length > 0 ? (
                    allReviews.map((review) => (
                        <FoodCard key={review._id} review={review} />
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full text-lg">
                        No reviews found. Try searching for something else!
                    </p>
                )}
            </div>
        </div>
    );
};

export default AllReviews;
