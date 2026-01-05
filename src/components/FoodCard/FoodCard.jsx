import { useContext, useEffect, useState } from "react";
import { FaStar, FaMapMarkerAlt, FaUser, FaHeart } from "react-icons/fa";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const FoodCard = ({ review }) => {
    const { user } = useContext(AuthContext);
    const [isFavorite, setIsFavorite] = useState(false);

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

    useEffect(() => {
        const checkIfFavorited = async () => {
            if (!user?.email) return;
            try {
                const res = await fetch(
                    `https://local-bites-server.vercel.app/favorites?email=${user.email}`
                );
                const favorites = await res.json();
                const exists = favorites.some(fav => fav.originalId === _id);
                if (exists) setIsFavorite(true);
            } catch {
                toast.error("Failed to load favorites");
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
            const response = await fetch(
                "https://local-bites-server.vercel.app/favorites",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...favoriteData,
                        originalId: _id,
                        userEmail: user?.email,
                    }),
                }
            );

            if (response.ok) {
                setIsFavorite(true);
                toast.success("Added to favorites ❤️");
            } else {
                toast.error("Failed to add favorite");
            }
        } catch {
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
            {/* Image */}
            <figure className="relative">
                <img
                    src={photo}
                    alt={food_name}
                    className="h-56 w-full object-cover"
                />

                {/* Favorite Button */}
                <button
                    onClick={handleFavorite}
                    disabled={isFavorite}
                    className={`absolute top-3 right-3 btn btn-circle btn-sm bg-base-100/80 backdrop-blur border-none
                        ${isFavorite ? "cursor-not-allowed" : ""}`}
                >
                    <FaHeart
                        className={`text-lg transition-colors ${isFavorite
                            ? "text-error"
                            : "text-base-content/40 hover:text-error"
                            }`}
                    />
                </button>
            </figure>

            {/* Body */}
            <div className="card-body p-4 sm:p-5">
                {/* Title */}
                <h2 className="card-title text-lg sm:text-xl font-semibold">
                    {food_name}
                </h2>

                {/* Description */}
                <p className="text-sm text-base-content/70">
                    {food_description.split(" ").length > 14
                        ? `${food_description.split(" ").slice(0, 14).join(" ")}...`
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

export default FoodCard;
