import { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard/FoodCard";
import FoodCardSkeleton from "../components/FoodCard/FoodCardSkeleton";
import { toast } from "react-toastify";

const AllReviews = () => {
    const [allReviews, setAllReviews] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchReviews = async (search = "") => {
        try {
            setLoading(true);
            const res = await fetch(
                `https://local-bites-server.vercel.app/allReviews?search=${search}`
            );
            const data = await res.json();
            setAllReviews(data);
        } catch (error) {
            toast.error("Failed to fetch reviews", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchReviews(searchTerm.trim());
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    return (
        <div className="my-10 min-h-screen px-4 md:px-8 lg:px-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-2">
                All <span className="text-green-600">Reviews</span>
            </h2>

            <p className="text-center text-gray-600 md:text-lg mb-6">
                Discover reviews from food lovers across the city.
            </p>

            {/* Search */}
            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    placeholder="Search by food name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered w-64 md:w-96"
                />
            </div>

            {/* Cards */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                {loading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <FoodCardSkeleton key={i} />
                    ))
                    : allReviews.length > 0
                        ? allReviews.map((review) => (
                            <FoodCard key={review._id} review={review} />
                        ))
                        : (
                            <p className="col-span-full text-center text-gray-500 text-lg">
                                No reviews found.
                            </p>
                        )}
            </div>
        </div>
    );
};

export default AllReviews;
