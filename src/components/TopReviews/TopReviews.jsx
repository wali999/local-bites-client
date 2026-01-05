import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import TopFoodCard from "../TopFoodCard/TopFoodCard";
import TopFoodCardSkeleton from "../TopFoodCard/TopFoodCardSkeleton";
import { toast } from "react-toastify";

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
        <section className="py-14 md:py-18 px-4 sm:px-6 md:px-10 lg:px-16 bg-base-200/50">
            <div className="max-w-7xl mx-auto text-center">

                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-base-content mb-3">
                    Top Reviews from{" "}
                    <span className="text-green-600">Local Food Lovers</span>
                </h2>

                <p className="text-base-content/70 mb-10 max-w-3xl mx-auto text-sm sm:text-base">
                    Dive into honest opinions and flavorful stories shared by our
                    passionate reviewers.
                </p>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                    {loading
                        ? Array.from({ length: 3 }).map((_, i) => (
                            <TopFoodCardSkeleton key={i} />
                        ))
                        : topReviews.map(review => (
                            <TopFoodCard key={review._id} review={review} />
                        ))}
                </div>

                {/* CTA */}
                {!loading && (
                    <div className="mt-12 flex justify-center">
                        <NavLink
                            to="/allReviews"
                            onClick={handleShowAll}
                            className="btn btn-success px-8 sm:px-10 rounded-xl shadow-md hover:shadow-lg transition"
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
