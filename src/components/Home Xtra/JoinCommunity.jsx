import { Link } from "react-router";

const JoinCommunity = () => {
    return (
        <section className="py-14 md:py-18 px-4 sm:px-6 md:px-10 lg:px-16 bg-base-200/60">
            <div className="max-w-6xl mx-auto text-center rounded-3xl bg-base-100 shadow-lg p-8 md:p-12">

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-base-content mb-4">
                    Join the <span className="text-green-600">LocalBites</span> Community
                </h2>

                <p className="text-base-content/70 max-w-2xl mx-auto mb-8 text-sm sm:text-base">
                    Share your food experiences, rate restaurants, and help others
                    discover the best local bites around them.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        to="/register"
                        className="btn bg-green-600 px-8 rounded-xl"
                    >
                        Get Started
                    </Link>

                    <Link
                        to="/allReviews"
                        className="btn btn-outline btn-success hover:bg-green-600 px-8 rounded-xl"
                    >
                        Explore Reviews
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default JoinCommunity;
