import { FaStar, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router";

const TopFoodCard = ({ review }) => {
    const {
        _id,
        food_description,
        food_name,
        photo,
        restaurant_name,
        restaurant_location,
        reviewer_name,
        rating,
    } = review;

    const handleTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="card bg-base-200 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
            {/* Image */}
            <figure>
                <img
                    src={photo}
                    alt={food_name}
                    className="h-56 w-full object-cover"
                />
            </figure>

            {/* Body */}
            <div className="card-body p-4 sm:p-5 text-left">
                {/* Title */}
                <h2 className="card-title text-lg sm:text-xl font-semibold">
                    {food_name}
                </h2>

                {/* Description */}
                <p className="text-sm text-base-content/70">
                    {food_description.split(" ").length > 14
                        ? `${food_description
                            .split(" ")
                            .slice(0, 14)
                            .join(" ")}...`
                        : food_description}
                </p>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-base-content/70 mt-1">
                    <FaMapMarkerAlt className="text-error" />
                    <span>
                        {restaurant_name}, {restaurant_location}
                    </span>
                </div>

                {/* Reviewer & Rating */}
                <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-2 text-sm">
                        <FaUser className="text-success" />
                        <span>{reviewer_name}</span>
                    </div>

                    <div className="flex items-center gap-1 text-warning text-sm font-medium">
                        <FaStar />
                        <span>{rating}</span>
                    </div>
                </div>

                {/* Action */}
                <div className="card-actions mt-4">
                    <Link
                        onClick={handleTop}
                        to={`/foodCardDetails/${_id}`}
                        className="w-full"
                    >
                        <button className="btn bg-green-600 w-full rounded-xl">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TopFoodCard;
