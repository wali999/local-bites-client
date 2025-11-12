import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const MyFavorite = () => {
    const { user } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/favorites?email=${user.email}`)
                .then(res => res.json())
                .then(data => setFavorites(data))
                .catch(err => console.error("Error loading favorites:", err));
        }
    }, [user]);

    return (
        <div className="p-6 min-h-160">
            <h1 className="text-2xl font-semibold mb-4">My Favorites</h1>

            {favorites.length === 0 ? (
                <p>No favorites yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favorites.map(item => (
                        <div key={item._id} className="bg-white shadow rounded-xl p-4">
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
