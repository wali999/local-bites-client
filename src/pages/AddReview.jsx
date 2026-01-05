import { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";

const AddReview = () => {
    const { user } = useContext(AuthContext);

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
        };

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

        fetch("https://local-bites-server.vercel.app/addReview", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId || data.success) {
                    toast.success("Review added successfully!");
                } else {
                    toast.info("Review submission did not complete. Try again!");
                }
            })
            .catch(() => {
                toast.error("Failed to add review. Please check your connection.");
            });

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
        <div className="flex justify-center items-start min-h-screen p-4 sm:p-6 bg-base-200 dark:bg-base-300">
            <div className="card w-full max-w-lg bg-base-100 dark:bg-gray-800 shadow-lg dark:shadow-xl rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
                    Add Your <span className="text-green-600 dark:text-green-400">Food Review</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Food Name */}
                    <div>
                        <label className="block font-semibold mb-1 text-gray-900 dark:text-gray-100">Food Name *</label>
                        <input
                            type="text"
                            name="food_name"
                            value={reviewData.food_name}
                            onChange={handleChange}
                            placeholder="Enter food name"
                            className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                            required
                        />
                    </div>

                    {/* Food Description */}
                    <div>
                        <label className="block font-semibold mb-1 text-gray-900 dark:text-gray-100">Your Review</label>
                        <textarea
                            name="food_description"
                            value={reviewData.food_description}
                            onChange={handleChange}
                            placeholder="Describe the food..."
                            className="textarea textarea-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                            rows={3}
                        />
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="block font-semibold mb-1 text-gray-900 dark:text-gray-100">Photo URL *</label>
                        <input
                            type="url"
                            name="photo"
                            value={reviewData.photo}
                            onChange={handleChange}
                            placeholder="https://example.com/photo.jpg"
                            className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                            required
                        />
                    </div>

                    {/* Restaurant Name */}
                    <div>
                        <label className="block font-semibold mb-1 text-gray-900 dark:text-gray-100">Restaurant Name *</label>
                        <input
                            type="text"
                            name="restaurant_name"
                            value={reviewData.restaurant_name}
                            onChange={handleChange}
                            placeholder="Restaurant name"
                            className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                            required
                        />
                    </div>

                    {/* Restaurant Location */}
                    <div>
                        <label className="block font-semibold mb-1 text-gray-900 dark:text-gray-100">Restaurant Location</label>
                        <input
                            type="text"
                            name="restaurant_location"
                            value={reviewData.restaurant_location}
                            onChange={handleChange}
                            placeholder="Dhanmondi, Dhaka"
                            className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                        />
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="block font-semibold mb-1 text-gray-900 dark:text-gray-100">
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
                            className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white mt-4 transition-colors"
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
