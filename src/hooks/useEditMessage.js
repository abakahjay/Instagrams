import { useState } from "react";
import API from "../utils/api";

const useEditMessage = () => {
    const [loading, setLoading] = useState(false);

    const editMessage = async ({ userId, chatId, messageIndex, newText }) => {
        try {
            setLoading(true);
            const res = await API.patch(
                `/api/v1/ai/chats/${userId}/${chatId}/${messageIndex}`,
                { newText }
            );
            return res.data;
        } catch (err) {
            console.error("Edit message error:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { editMessage, loading };
};

export default useEditMessage;
