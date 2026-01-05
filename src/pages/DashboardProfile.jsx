import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const DashboardProfile = () => {
    const { user } = useContext(AuthContext);
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(user?.displayName || "");

    const handleSave = () => {

        setEditing(false);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">My Profile</h1>

            <div className="card bg-base-200 p-6 space-y-4">
                <div className="flex items-center gap-4">
                    <img
                        src={user?.photoURL}
                        alt="User"
                        className="w-24 h-24 rounded-full object-cover"
                    />
                    <div>
                        <h2 className="text-xl font-semibold">{user?.displayName}</h2>
                        <p className="opacity-70">{user?.email}</p>
                    </div>
                </div>

                <div>
                    <label className="label">Display Name</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={!editing}
                    />
                </div>

                <div className="flex justify-end gap-2">
                    {editing ? (
                        <button onClick={handleSave} className="btn btn-success">
                            Save
                        </button>
                    ) : (
                        <button onClick={() => setEditing(true)} className="btn">
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardProfile;
