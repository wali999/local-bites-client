import { FaStar, FaUserCheck, FaSearchLocation } from "react-icons/fa";

const WhyChooseLocalBites = () => {
    return (
        <section className="py-14 md:py-18 px-4 sm:px-6 md:px-10 lg:px-16 bg-base-100">
            <div className="max-w-7xl mx-auto text-center">

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-base-content mb-4">
                    Why Choose <span className="text-green-600">LocalBites</span>?
                </h2>

                <p className="text-base-content/70 max-w-3xl mx-auto mb-10 text-sm sm:text-base">
                    LocalBites is built for food lovers who want authentic, reliable,
                    and community-driven reviews — not paid promotions.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

                    <div className="bg-base-200/50 p-6 rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-1">
                        <FaStar className="text-green-600 text-4xl mb-3 mx-auto" />
                        <h3 className="text-lg font-semibold text-base-content mb-2">
                            Honest Reviews
                        </h3>
                        <p className="text-base-content/70 text-sm">
                            Real feedback from real food lovers — no sponsored or fake reviews.
                        </p>
                    </div>

                    <div className="bg-base-200/50 p-6 rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-1">
                        <FaUserCheck className="text-blue-500 text-4xl mb-3 mx-auto" />
                        <h3 className="text-lg font-semibold text-base-content mb-2">
                            Community Driven
                        </h3>
                        <p className="text-base-content/70 text-sm">
                            Anyone can contribute, rate, and help others discover great food.
                        </p>
                    </div>

                    <div className="bg-base-200/50 p-6 rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-1">
                        <FaSearchLocation className="text-purple-500 text-4xl mb-3 mx-auto" />
                        <h3 className="text-lg font-semibold text-base-content mb-2">
                            Discover Nearby Gems
                        </h3>
                        <p className="text-base-content/70 text-sm">
                            Easily find popular restaurants and hidden local favorites.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyChooseLocalBites;
