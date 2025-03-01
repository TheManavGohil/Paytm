import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/api/v1/user/bulk?filter=" + filter)
            .then(response => setUsers(response.data.user));
    }, [filter]);

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-3">Users</h2>
            <input 
                onChange={(e) => setFilter(e.target.value)} 
                type="text" 
                placeholder="Search users..." 
                className="w-full px-2 py-1 border rounded-md mb-4"
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {users.map(user => <User key={user._id} user={user} />)}
            </div>
        </div>
    );
};

function User({ user }) {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between bg-gray-200 p-3 rounded-md">
            <div className="flex items-center">
                <div className="rounded-full h-8 w-8 text-white bg-blue-500 flex justify-center items-center mr-2">
                    {user.firstName[0]}{user.lastName[0]}
                </div>
                <div className="text-sm">{user.firstName} {user.lastName}</div>
            </div>
            <button 
                onClick={() => navigate("/send?id=" + user._id + "&name=" + user.firstName)}
                className="bg-black text-white text-sm px-3 py-1 rounded-md">
                Send
            </button>
        </div>
    );
}
