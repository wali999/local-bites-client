import React from 'react';
import { useLoaderData } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

const EditReview = () => {
    const data = useLoaderData()
    const review = data.result

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            food_name: e.target.food_name.value,
            food_description: e.target.food_description.value,
            photo: e.target.photo.value,
            restaurant_name: e.target.restaurant_name.value,
            restaurant_location: e.target.restaurant_location.value,
            rating: parseFloat(e.target.rating.value),

        }

        const { food_name, photo, restaurant_name, rating } = review;

        if (!food_name || !photo || !restaurant_name || !rating) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const numericRating = parseFloat(rating);
        if (isNaN(numericRating) || numericRating < 0 || numericRating > 5) {
            toast.error("Rating must be between 0 and 5.");
            return;
        }

        fetch(`https://local-bites-server.vercel.app/editReviews/${review._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0 || data.success) {
                    toast.success("Review updated successfully!");
                } else {
                    toast.info("No changes were made.");
                }
            })
            .catch((error) => {
                toast.error("Failed to update review. Please try again.", error);
            });



    };



    return (
        <div className="flex justify-center items-center bg-gray-50 p-4">
            <div className="card bg-white shadow-lg rounded-2xl w-full max-w-lg p-6">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Edit Your <span className="text-green-600">Food Review</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Food Name */}
                    <div>
                        <label className="block font-semibold mb-1">Food Name *</label>
                        <input
                            type="text"
                            name="food_name"
                            defaultValue={review.food_name}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Food Description */}
                    <div>
                        <label className="block font-semibold mb-1">Your Review in Details</label>
                        <textarea
                            name="food_description"
                            defaultValue={review.food_description}
                            className="textarea textarea-bordered w-full"
                            rows={3}
                        ></textarea>
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="block font-semibold mb-1">Photo URL *</label>
                        <input
                            type="url"
                            name="photo"
                            defaultValue={review.photo}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Restaurant Name */}
                    <div>
                        <label className="block font-semibold mb-1">Restaurant Name *</label>
                        <input
                            type="text"
                            name="restaurant_name"
                            defaultValue={review.restaurant_name}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Restaurant Location */}
                    <div>
                        <label className="block font-semibold mb-1">Restaurant Location</label>
                        <input
                            type="text"
                            name="restaurant_location"
                            defaultValue={review.restaurant_location}
                            className="input input-bordered w-full"
                        />
                    </div>


                    {/* Rating  */}
                    <div>
                        <label className="block font-semibold mb-1">
                            Rating (0.0 - 5.0) *
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            name="rating"
                            defaultValue={review.rating}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn w-full bg-green-600 hover:bg-green-700 text-white mt-4"
                    >
                        Update Review
                    </button>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};

export default EditReview;