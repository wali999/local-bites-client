const FoodCardSkeleton = () => {
    return (
        <div className="w-full bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">

            {/* Image */}
            <div className="w-full h-56 bg-gray-200" />

            <div className="p-5 space-y-3">

                {/* Title + Heart */}
                <div className="flex items-center justify-between">
                    <div className="h-5 w-2/3 bg-gray-200 rounded" />
                    <div className="h-6 w-6 bg-gray-200 rounded-full" />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <div className="h-3 w-full bg-gray-200 rounded" />
                    <div className="h-3 w-5/6 bg-gray-200 rounded" />
                </div>

                {/* Location */}
                <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 bg-gray-200 rounded-full" />
                    <div className="h-3 w-2/3 bg-gray-200 rounded" />
                </div>

                {/* User & Rating */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 bg-gray-200 rounded-full" />
                        <div className="h-3 w-20 bg-gray-200 rounded" />
                    </div>

                    <div className="flex items-center space-x-1">
                        <div className="h-4 w-4 bg-gray-200 rounded" />
                        <div className="h-3 w-6 bg-gray-200 rounded" />
                    </div>
                </div>

                {/* Button */}
                <div className="h-10 w-full bg-gray-300 rounded-xl mt-4" />
            </div>
        </div>
    );
};

export default FoodCardSkeleton;
