import { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard/FoodCard";
import FoodCardSkeleton from "../components/FoodCard/FoodCardSkeleton";
import { toast } from "react-toastify";

const ITEMS_PER_PAGE = 6;

const AllReviews = () => {
    const [allReviews, setAllReviews] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    const [sortOption, setSortOption] = useState("");

    const [ratingFilter, setRatingFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [locationFilter, setLocationFilter] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

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
            setCurrentPage(1);
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    // Filters
    const filteredReviews = allReviews.filter((review) => {
        const ratingMatch = ratingFilter
            ? review.rating >= Number(ratingFilter)
            : true;

        const locationMatch = locationFilter
            ? review.restaurant_location === locationFilter
            : true;

        const dateMatch = (() => {
            if (!dateFilter) return true;
            const reviewDate = new Date(review.created_at);
            const now = new Date();

            if (dateFilter === "7") {
                return now - reviewDate <= 7 * 24 * 60 * 60 * 1000;
            }
            if (dateFilter === "30") {
                return now - reviewDate <= 30 * 24 * 60 * 60 * 1000;
            }
            return true;
        })();

        return ratingMatch && locationMatch && dateMatch;
    });

    // Sorting
    const sortedReviews = [...filteredReviews].sort((a, b) => {
        if (sortOption === "date_desc") {
            return new Date(b.created_at) - new Date(a.created_at);
        }
        if (sortOption === "date_asc") {
            return new Date(a.created_at) - new Date(b.created_at);
        }
        if (sortOption === "rating_desc") {
            return b.rating - a.rating;
        }
        if (sortOption === "rating_asc") {
            return a.rating - b.rating;
        }
        return 0;
    });

    // Pagination 
    const totalPages = Math.ceil(sortedReviews.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedReviews = sortedReviews.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    // unique locations
    const locations = [...new Set(allReviews.map(r => r.restaurant_location))];

    return (

        <div className="my-10 min-h-screen px-4 md:px-8 lg:px-16">

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-base-content mb-3">
                All <span className="text-green-600">Reviews</span>
            </h2>

            <p className="text-center text-base-content/70 mb-8">
                Discover reviews from food lovers across the city
            </p>

            {/* Search + Filters + Sort */}
            <div className="bg-base-100 rounded-2xl shadow-sm p-4 md:p-6 mb-10">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search food..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input input-bordered w-full"
                    />

                    {/* Sort */}
                    <select
                        className="select select-bordered w-full"
                        value={sortOption}
                        onChange={(e) => {
                            setSortOption(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="">Sort By</option>
                        <option value="date_desc">Newest</option>
                        <option value="date_asc">Oldest</option>
                        <option value="rating_desc">Top Rated</option>
                        <option value="rating_asc">Lowest Rated</option>
                    </select>

                    {/* Rating */}
                    <select
                        className="select select-bordered w-full"
                        value={ratingFilter}
                        onChange={(e) => {
                            setRatingFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="">Rating</option>
                        <option value="4">4★ & above</option>
                        <option value="3">3★ & above</option>
                        <option value="2">2★ & above</option>
                    </select>

                    {/* Date */}
                    <select
                        className="select select-bordered w-full"
                        value={dateFilter}
                        onChange={(e) => {
                            setDateFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="">Date</option>
                        <option value="7">Last 7 days</option>
                        <option value="30">Last 30 days</option>
                    </select>

                    {/* Location */}
                    <select
                        className="select select-bordered w-full"
                        value={locationFilter}
                        onChange={(e) => {
                            setLocationFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="">Location</option>
                        {locations.map(loc => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Cards */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                {loading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <FoodCardSkeleton key={i} />
                    ))
                    : paginatedReviews.length > 0
                        ? paginatedReviews.map(review => (
                            <FoodCard key={review._id} review={review} />
                        ))
                        : (
                            <p className="col-span-full text-center text-base-content/60">
                                No reviews found.
                            </p>
                        )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex flex-wrap justify-center items-center gap-2 mt-12">

                    <button
                        className="btn btn-sm btn-outline"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                    >
                        Prev
                    </button>

                    {[...Array(totalPages).keys()].map(num => (
                        <button
                            key={num}
                            className={`btn btn-sm ${currentPage === num + 1
                                ? "btn bg-green-600 text-white"
                                : "btn-outline"
                                }`}
                            onClick={() => setCurrentPage(num + 1)}
                        >
                            {num + 1}
                        </button>
                    ))}

                    <button
                        className="btn btn-sm btn-outline"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => p + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>

    );
};

export default AllReviews;
