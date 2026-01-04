import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import TopFoodCard from "../TopFoodCard/TopFoodCard";
import { toast } from "react-toastify";
import TopFoodCardSkeleton from "../TopFoodCard/TopFoodCardSkeleton";

const TopReviews = () => {
    const [topReviews, setTopReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopReviews = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    "https://local-bites-server.vercel.app/topReviews"
                );
                const data = await res.json();
                setTopReviews(data);
            } catch (error) {
                toast.error("Failed to load top reviews", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopReviews();
    }, []);

    const handleShowAll = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section className="py-16 px-6 md:px-12 bg-green-50 mb-10 mt-5">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                    Top Reviews from{" "}
                    <span className="text-green-600">Local Food Lovers</span>
                </h2>

                <p className="text-gray-600 mb-10 max-w-3xl mx-auto">
                    Dive into honest opinions and flavorful stories shared by our
                    passionate reviewers.
                </p>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {loading
                        ? Array.from({ length: 3 }).map((_, i) => (
                            <TopFoodCardSkeleton key={i} />
                        ))
                        : topReviews.map((review) => (
                            <TopFoodCard key={review._id} review={review} />
                        ))}
                </div>

                {/* Show all */}
                {!loading && (
                    <div className="mt-10 flex justify-center">
                        <NavLink
                            onClick={handleShowAll}
                            to="/allReviews"
                            className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-xl transition-colors shadow-md hover:shadow-lg"
                        >
                            Show All Reviews
                        </NavLink>
                    </div>
                )}
            </div>
        </section>
    );
};

export default TopReviews;
