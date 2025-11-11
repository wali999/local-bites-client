import { useEffect, useState } from "react";
import { FaStar, FaMapMarkerAlt, FaUser, FaUtensils } from "react-icons/fa";
import { useLoaderData, useNavigate, useParams } from "react-router";

const FoodCardDetails = () => {
    const data = useLoaderData();
    const { id } = useParams();
    const navigate = useNavigate();

    const [review, setReview] = useState({});

    useEffect(() => {
        const revieDetails = data.find((singleReview) => singleReview._id == id);
        setReview(revieDetails);
    }, [data, id]);

    const handleBack = () => {
        navigate(-1);
    };


    return (
        <div className=" bg-gray-50 flex justify-center items-center py-10 px-4">
            <div className="max-w-4xl bg-white rounded-3xl shadow-lg overflow-hidden">

                <div className="w-full h-80 md:h-96">
                    <img
                        src={review.photo}
                        alt={review.food_name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-8 space-y-6">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                        <FaUtensils className="text-green-600 mr-3" />
                        {review.food_name}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-gray-600">
                        <div className="flex items-center">
                            <FaMapMarkerAlt className="text-red-500 mr-2" />
                            <span className="font-medium">
                                {review.restaurant_name}, {review.restaurant_location}
                            </span>
                        </div>

                        <div className="flex items-center">
                            <FaStar className="text-yellow-500 mr-2" />
                            <span className="font-semibold">{review.rating}</span>
                        </div>

                        <div className="flex items-center">
                            <FaUser className="text-green-500 mr-2" />
                            <span>Reviewed by {review.reviewer_name}</span>
                        </div>
                    </div>

                    <p className="text-gray-700 text-lg leading-relaxed">
                        {review.food_description}
                    </p>

                    <div className="flex justify-end">
                        <button onClick={handleBack} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                            Back to Reviews
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCardDetails;
