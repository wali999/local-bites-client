import { FaStar, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router";

const TopFoodCard = ({ review }) => {
    const { _id, food_name, photo, restaurant_name, restaurant_location, reviewer_name, rating } = review;

    const handleTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="max-w-sm bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img
                src={photo}
                alt={food_name}
                className="w-full h-56 object-cover"
            />

            <div className="p-5 space-y-3">
                <h2 className="text-xl font-semibold text-gray-800">
                    {food_name}
                </h2>
                {/* <p className="text-gray-600 text-sm">{food_description}</p> */}

                <div className="flex items-center text-sm text-gray-500 mt-2">
                    <FaMapMarkerAlt className="text-red-500 mr-1" />
                    <span>{restaurant_name}, {restaurant_location}</span>
                </div>

                <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center space-x-2 text-gray-700">
                        <FaUser className="text-green-600" />
                        <span className="text-sm">{reviewer_name}</span>
                    </div>

                    <div className="flex items-center text-yellow-500">
                        <FaStar />
                        <span className="ml-1 font-medium text-gray-700">{rating}</span>
                    </div>
                </div>


                <Link onClick={handleTop} to={`/foodCardDetails/${_id}`}>
                    <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-xl transition-colors">
                        View Details
                    </button>
                </Link>

            </div>
        </div>
    );
};

export default TopFoodCard;
