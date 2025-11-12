import React, { useEffect, useState } from 'react';
import FoodCard from '../components/FoodCard/FoodCard';

const AllReviews = () => {
    const [allReviews, setAllReviews] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    const fetchReviews = async (search = "") => {
        try {
            const res = await fetch(`http://localhost:3000/allReviews?search=${search}`);
            const data = await res.json();
            setAllReviews(data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
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
        <div className='my-7 min-h-147'>
            <div className='text-2xl text-center font-bold mb-2'>All Reviews</div>
            <p className='text-center mb-5'>Explore All User's Review.</p>

            {/* search option */}
            <div className="flex justify-center mb-6 gap-2">
                <input
                    type="text"
                    placeholder="Search by food name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered w-64 md:w-80"
                />
            </div>

            {/* food card section */}
            <div className="grid justify-around gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {allReviews.length > 0 ? (
                    allReviews.map((review) => (
                        <FoodCard key={review._id} review={review} />
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full">
                        No reviews found.
                    </p>
                )}
            </div>

        </div>
    );
};

export default AllReviews;