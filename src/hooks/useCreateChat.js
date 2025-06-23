import { useState } from "react";
import useAiChatStore from "../store/useAiChatStore";
import useShowToast from "./useShowToast";

const apiUrl = import.meta.env.VITE_API_URL;
const useCreateChat = (userId, chatData) => {
     const showToast = useShowToast(); // Show toast notifications
    const [isLoading, setLoading] = useState(true);
    const [profileImageUrl, setProfileImageUrl] = useState(null); // To store the profile image URL
    const [imageLoading, setImageLoading] = useState(false); // To track image loading status
    const [imageError, setImageError] = useState(null); // To track image errors
    const {
        userChats,
        chats,
        setUserChats,
        addUserChat,
        updateUserChat,
        setChats,
        addMessage,
        updateMessage
    } = useAiChatStore();

    useEffect(() => {
        const controller = new AbortController();

        const createUserChat = async () => {
            setLoading(true); // Set loading state to true
            setProfileImageUrl(null); // Reset the profile image URL
            try {
                const response = await API.post(`/api/v1/ai/chats/${userId}`, {
                    signal: controller.signal,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(chatData),
                });
                const userChats = response.userChats?.chats || [];
                const savedChat = response.savedChat;

                setUserChats(userChats);
                setChats(savedChat.history || []);
                showToast("Success", "New chat created", "success");
                // Fetch the profile image URL if the user has a profile_picture_id
                if (user.profile_picture_id) {
                    setImageLoading(true);
                    try {
                        const imageURL = await fetchImage(user.profile_picture_id);
                        setProfileImageUrl(imageURL);
                    } catch (err) {
                        console.error("Failed to fetch profile image:", err);
                        setImageError(err);
                    } finally {
                        setImageLoading(false);
                    }
                }
            } catch (err) {
                const message = err.response?.data?.error || err.message || "Chat not created";
                if (err.message === "canceled") {
                    return;
                }
                showToast("Error", message, "error");
            } finally {
                setLoading(false); // Reset loading state
                
            }
        };

        createUserChat();

        return () => {
            // This is a cleanup function
            controller.abort();
        };
    }, [userId, showToast]);


    return {
        isLoading,
        createUserChat,
        removeUserChat,
        modifyUserChat,
        fetchChatMessages,
        sendMessage,
        removeImageMessage,
    };
}

export default useCreateChat