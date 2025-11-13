import { FaStar, FaMapMarkerAlt, FaUser, FaUtensils } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router";

const FoodCardDetails = () => {
    const data = useLoaderData();
    const review = data.result;
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="bg-gray-50 flex justify-center items-center pt-10 pb-30 px-4 sm:px-6 lg:px-10">
            <div className="max-w-5xl w-full bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col lg:flex-row">

                <div className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-auto">
                    <img
                        src={review.photo}
                        alt={review.food_name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="w-full lg:w-1/2 p-6 sm:p-8 space-y-5 flex flex-col justify-between">
                    <div className="space-y-4">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center flex-wrap">
                            <FaUtensils className="text-green-600 mr-2 sm:mr-3 text-xl sm:text-2xl" />
                            {review.food_name}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm sm:text-base">
                            <div className="flex items-center">
                                <FaMapMarkerAlt className="text-red-500 mr-1 sm:mr-2" />
                                <span className="font-medium">
                                    {review.restaurant_name}, {review.restaurant_location}
                                </span>
                            </div>

                            <div className="flex items-center">
                                <FaStar className="text-yellow-500 mr-1 sm:mr-2" />
                                <span className="font-semibold">{review.rating}</span>
                            </div>

                            <div className="flex items-center">
                                <FaUser className="text-green-500 mr-1 sm:mr-2" />
                                <span>By {review.reviewer_name}</span>
                            </div>
                        </div>

                        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                            {review.food_description}
                        </p>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            onClick={handleBack}
                            className="bg-green-600 hover:bg-green-700 text-white px-5 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-colors w-full sm:w-auto"
                        >
                            Back to Reviews
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCardDetails;
