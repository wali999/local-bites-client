import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading/Loading";

const MyFavorite = () => {
    const { user } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!user?.email) return;
            setLoading(true);
            try {
                const res = await fetch(`https://local-bites-server.vercel.app/favorites?email=${user.email}`);
                const data = await res.json();
                setFavorites(data);
            } catch (err) {
                console.error("Error loading favorites:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [user?.email]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="p-6 min-h-160">
            <div className='text-3xl md:text-4xl font-extrabold text-center text-base-content mb-2'>
                My <span className="text-green-600">Favorite</span>
            </div>

            {favorites.length === 0 ? (
                <p className="text-center mt-10">No favorites yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favorites.map(item => (
                        <div key={item._id} className="bg-base-100 shadow-lg rounded-xl p-4">
                            <img src={item.photo} alt={item.food_name} className="w-full h-40 object-cover rounded-lg" />
                            <h3 className="text-lg font-semibold mt-2">{item.food_name}</h3>
                            <p className="text-gray-500">{item.restaurant_name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyFavorite;
