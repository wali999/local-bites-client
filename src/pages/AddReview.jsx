import React, { use, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";

const AddReview = () => {
    const { user } = use(AuthContext);

    const [reviewData, setReviewData] = useState({
        food_name: "",
        food_description: "",
        photo: "",
        restaurant_name: "",
        restaurant_location: "",
        reviewer_name: "",
        rating: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReviewData({ ...reviewData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            food_name: e.target.food_name.value,
            food_description: e.target.food_description.value,
            photo: e.target.photo.value,
            restaurant_name: e.target.restaurant_name.value,
            restaurant_location: e.target.restaurant_location.value,
            reviewer_name: user.displayName,
            email: user.email,
            rating: parseFloat(e.target.rating.value),
            created_at: new Date(),
        }


        const { food_name, photo, restaurant_name, rating } = reviewData;

        if (!food_name || !photo || !restaurant_name || !rating) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const numericRating = parseFloat(rating);
        if (isNaN(numericRating) || numericRating < 0 || numericRating > 5) {
            toast.error("Rating must be between 0 and 5.");
            return;
        }

        fetch('https://local-bites-server.vercel.app/addReview', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId || data.success) {
                    toast.success(" Review added successfully!");
                } else {
                    toast.info("Review submission did not complete. Try again!");
                }
            })
            .catch((error) => {
                toast.error("Failed to add review. Please check your connection.", error);
            });


        // Reset form
        setReviewData({
            food_name: "",
            food_description: "",
            photo: "",
            restaurant_name: "",
            restaurant_location: "",
            reviewer_name: "",
            rating: "",
        });
    };

    return (
        <div className="flex justify-center items-center bg-gray-50 p-4">
            <div className="card bg-white shadow-lg rounded-2xl w-full max-w-lg p-6">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Add Your <span className="text-green-600">Food Review</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Food Name */}
                    <div>
                        <label className="block font-semibold mb-1">Food Name *</label>
                        <input
                            type="text"
                            name="food_name"
                            value={reviewData.food_name}
                            onChange={handleChange}
                            placeholder="Enter food name"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Food Description */}
                    <div>
                        <label className="block font-semibold mb-1">Your Review in Details</label>
                        <textarea
                            name="food_description"
                            value={reviewData.food_description}
                            onChange={handleChange}
                            placeholder="Describe the food..."
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
                            value={reviewData.photo}
                            onChange={handleChange}
                            placeholder="https://example.com/photo.jpg"
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
                            value={reviewData.restaurant_name}
                            onChange={handleChange}
                            placeholder="Restaurant name"
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
                            value={reviewData.restaurant_location}
                            onChange={handleChange}
                            placeholder="Dhanmondi, Dhaka"
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
                            value={reviewData.rating}
                            onChange={handleChange}
                            placeholder="4.8"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn w-full bg-green-600 hover:bg-green-700 text-white mt-4"
                    >
                        Submit Review
                    </button>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};

export default AddReview;
