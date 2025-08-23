import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const API_URL = "https://chillzone-tif5.onrender.com";

const MyComponent = ({ group }) => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChats = async () => {
            setLoading(true);
            setError(null);
            const config = {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            };
            try {
                const response = await axios.get(`${API_URL}/user/getMyChats`, config);
                setChats(response.data.transformedChats || []);
            } catch (err) {
                setError("Failed to fetch chats. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchChats();
    }, [group]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            {chats.length > 0 ? (
                <ul>
                    {chats.map((chat) => (
                        <Navigate to={`/chat/${chat._id}`}>
                            <li key={chat._id}>{chat.name}</li>
                        </Navigate>
                    ))}
                </ul>
            ) : (
                <div>No chats available</div>
            )}
        </div>
    );
};

export default MyComponent;
