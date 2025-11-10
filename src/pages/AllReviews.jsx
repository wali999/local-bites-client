import React from 'react';
import { useLoaderData } from 'react-router';
import FoodCard from '../components/FoodCard/FoodCard';

const AllReviews = () => {
    const allReviews = useLoaderData()


    return (
        <div className='my-7'>
            <div className='text-2xl text-center font-bold'>All Reviews</div>
            <p className='text-center mb-5'>Explore All Users Review.</p>
            <div className='grid justify-around gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    allReviews.map(review => <FoodCard key={review._id} review={review}></FoodCard>)
                }
            </div>

        </div>
    );
};

export default AllReviews;