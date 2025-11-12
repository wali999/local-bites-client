import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const MyReviews = () => {
    const { user } = use(AuthContext);
    const [myReviews, setMyReviews] = useState([])

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/myReviews?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setMyReviews(data);
                })
        }
    }, [user?.email])


    return (
        <div>
            <h3 className='text-3xl'>My Reviews: {myReviews.length}</h3>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Food Name</th>
                            <th>Restaurant Name</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myReviews.map((myReview, index) =>
                                <tr key={myReview._id}>
                                    {/* 1st collumn */}
                                    <td>{index + 1} </td>

                                    {/* 2nd column */}
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={myReview.photo}
                                                        alt={myReview.food_name} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{myReview.food_name}</div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* 3rd column */}
                                    <td>{myReview.restaurant_name}</td>

                                    {/* 4th column */}
                                    <td>
                                        {new Date(myReview.created_at).toLocaleString('en-GB', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                            hour12: false
                                        })}
                                    </td>


                                    {/* 5th column */}
                                    <th className='flex justify-start items-center py-6'>
                                        <button className="btn btn-outline btn-xs mr-4">Update</button>
                                        <button className="btn btn-outline btn-xs">Delete</button>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default MyReviews;