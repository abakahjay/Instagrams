import { useState } from "react";
import API from "../utils/api";


export const useSearchChats = (userId) => {
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const searchChatsByTitle = async (query) => {
        if (!query) return;
        setIsLoading(true);
        try {
            const res = await API.get(
                `/api/v1/ai/userchats/${userId}/search-by-similarity?query=${encodeURIComponent(query)}`
            );
            setChats(res.data.data || []);
        } catch (err) {
            console.error("Search error:", err);
            setChats([]);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        chats,
        isLoading,
        searchChatsByTitle,
        setChats,
    };
};
