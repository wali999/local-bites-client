import { useContext, useEffect, useState } from "react";
import { FaStar, FaMapMarkerAlt, FaUser, FaHeart } from "react-icons/fa";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const FoodCard = ({ review }) => {
    const { user } = useContext(AuthContext);
    const [isFavorite, setIsFavorite] = useState(false);

    const { _id, food_description, food_name, photo, restaurant_name, restaurant_location, reviewer_name, rating } = review;

    useEffect(() => {
        const checkIfFavorited = async () => {
            if (!user?.email) return;

            try {
                const res = await fetch(`http://localhost:3000/favorites?email=${user.email}`);
                const favorites = await res.json();

                const exists = favorites.some((fav) => fav._id === _id);
                if (exists) setIsFavorite(true);
            } catch (err) {
                console.error("Error fetching favorites:", err);
            }
        };
        checkIfFavorited();
    }, [user?.email, _id]);



    const handleTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleFavorite = async () => {
        if (isFavorite) return;

        try {
            const { _id, ...favoriteData } = review;

            const response = await fetch("http://localhost:3000/favorites", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...favoriteData, originalId: _id, userEmail: user?.email }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsFavorite(true);
                toast.success("Added to favorites ❤️");
            } else {
                toast.error(data.message || "Failed to add favorite");
            }
        } catch (error) {
            console.error("Error adding favorite:", error);
            toast.error("Something went wrong!");
        }
    };



    return (
        <div className="max-w-sm bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img
                src={photo}
                alt={food_name}
                className="w-full h-56 object-cover"
            />

            <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">{food_name}</h2>

                    <button
                        onClick={handleFavorite}
                        disabled={isFavorite}
                        className={`text-xl focus:outline-none ml-2 ${isFavorite ? "cursor-not-allowed" : "cursor-pointer"
                            }`}
                    >
                        <FaHeart
                            className={`text-2xl transition-colors duration-300 ${isFavorite ? "text-red-500" : "text-gray-300 hover:text-red-400"
                                }`}
                        />
                    </button>
                </div>
                <p className="text-gray-600 text-sm">
                    {food_description.split(" ").length > 14
                        ? `${food_description.split(" ").slice(0, 14).join(" ")}...`
                        : food_description}
                </p>

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

export default FoodCard;
