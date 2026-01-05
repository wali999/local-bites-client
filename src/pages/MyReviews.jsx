import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyReviews = () => {
    const { user } = use(AuthContext);
    const [myReviews, setMyReviews] = useState([])

    useEffect(() => {
        if (user?.email) {
            fetch(`https://local-bites-server.vercel.app/myReviews?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setMyReviews(data);
                })
        }
    }, [user?.email])


    const handleDeleteReviews = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#43A047",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://local-bites-server.vercel.app/myReviews/${_id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your review has been deleted.",
                                icon: "success"
                            });

                            //remove from ui
                            const remainingReview = myReviews.filter(myReview => myReview._id !== _id);
                            setMyReviews(remainingReview);
                        }
                    })



            }
        });
    }


    return (
        <div className='my-7 min-h-147'>
            <div className='text-3xl md:text-4xl font-extrabold text-center text-base-content mb-2'>
                My Reviews: <span className="text-green-600">{myReviews.length}</span>
            </div>

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
                                        <button className="btn btn-outline btn-xs mr-4"><Link to={`/editReview/${myReview._id}`}>Edit</Link></button>
                                        <button onClick={() => handleDeleteReviews(myReview._id)} className="btn btn-outline btn-xs">Delete</button>
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