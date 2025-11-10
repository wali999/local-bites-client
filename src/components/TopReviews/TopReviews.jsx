import React, { useEffect, useState } from 'react';
// import { useLoaderData } from 'react-router';
import FoodCard from '../FoodCard/FoodCard';

const TopReviews = () => {
    const [topReviews, setTopReviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/topReviews')
            .then(res => res.json())
            .then(data => setTopReviews(data))
            .catch(err => console.error("Failed to load top reviews:", err));
    }, []);


    return (
        <div className='my-7'>
            <div className='text-2xl text-center font-bold'>Top Reviews</div>
            <p className='text-center mb-5'>Explore Top Reviews Food.</p>
            <div className='grid justify-around gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    topReviews.map(review => <FoodCard key={review._id} review={review}></FoodCard>)
                }
            </div>

        </div>
    );
};

export default TopReviews;