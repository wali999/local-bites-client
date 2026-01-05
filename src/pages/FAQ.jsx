import React from "react";

const FAQ = () => {
    return (
        <div className="min-h-screen py-14 md:py-18 px-4 sm:px-6 md:px-10 lg:px-16 bg-base-200/50">
            <div className="max-w-4xl mx-auto">

                {/* Page Heading */}
                <h2 className="text-3xl md:text-4xl font-extrabold text-center text-base-content mb-4">
                    Frequently Asked <span className="text-green-600">Questions</span>
                </h2>

                <p className="text-center text-base-content/70 mb-10 text-sm sm:text-base">
                    Find answers to the most common questions about using LocalBites.
                </p>

                {/* FAQ Items */}
                <div className="space-y-4">

                    <div className="collapse collapse-arrow bg-base-100 shadow-md rounded-xl">
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-semibold text-base-content">
                            What is LocalBites?
                        </div>
                        <div className="collapse-content text-base-content/70">
                            <p>
                                LocalBites is a community-driven food review platform where users
                                can discover local restaurants, read honest reviews, and share
                                their own food experiences.
                            </p>
                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 shadow-md rounded-xl">
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-semibold text-base-content">
                            Who can write a review?
                        </div>
                        <div className="collapse-content text-base-content/70">
                            <p>
                                Any registered user can write a review. You must be logged in
                                to add, edit, or delete your own reviews.
                            </p>
                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 shadow-md rounded-xl">
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-semibold text-base-content">
                            How does the rating system work?
                        </div>
                        <div className="collapse-content text-base-content/70">
                            <p>
                                Ratings are given on a scale (for example, 1 to 5 stars).
                                Higher ratings indicate better overall food quality and experience.
                            </p>
                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 shadow-md rounded-xl">
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-semibold text-base-content">
                            Can I filter and sort reviews?
                        </div>
                        <div className="collapse-content text-base-content/70">
                            <p>
                                Yes! You can filter reviews by rating, date, and location,
                                and sort them by newest, oldest, or highest-rated.
                            </p>
                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 shadow-md rounded-xl">
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-semibold text-base-content">
                            Can I edit or delete my review?
                        </div>
                        <div className="collapse-content text-base-content/70">
                            <p>
                                Yes. Logged-in users can edit or delete only their own reviews
                                from the “My Reviews” section.
                            </p>
                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 shadow-md rounded-xl">
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-semibold text-base-content">
                            Do I need an account to browse reviews?
                        </div>
                        <div className="collapse-content text-base-content/70">
                            <p>
                                No account is required to browse reviews.
                                However, creating an account is required to add reviews
                                and manage favorites.
                            </p>
                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 shadow-md rounded-xl">
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-semibold text-base-content">
                            Is LocalBites free to use?
                        </div>
                        <div className="collapse-content text-base-content/70">
                            <p>
                                Yes, LocalBites is completely free to browse, review,
                                and discover local restaurants.
                            </p>
                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 shadow-md rounded-xl">
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-semibold text-base-content">
                            Does LocalBites support dark mode?
                        </div>
                        <div className="collapse-content text-base-content/70">
                            <p>
                                Yes. You can switch between light and dark mode using the
                                theme toggle in the navigation bar.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FAQ;
