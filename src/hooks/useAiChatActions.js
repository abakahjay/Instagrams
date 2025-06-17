import { useState } from "react";
import useAiChatStore from "../store/useAiChatStore";
import useShowToast from "./useShowToast";

const apiUrl = import.meta.env.VITE_API_URL;

const useAiChatActions = () => {
    const [isLoading, setIsLoading] = useState(false);
    const showToast = useShowToast();

    const {
        setUserChats,
        addUserChat,
        deleteUserChat,
        updateUserChat,
        setChats,
        addMessage,
        deleteMessage,
        updateMessage
    } = useAiChatStore();

    const fetchUserChats = async (userId) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/ai/userchats/${userId}`);
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setUserChats(data.userChats);
            showToast("Success", "User chats loaded", "success");
        } catch (err) {
            showToast("Error", err.message, "error");
        } finally {
            setIsLoading(false);
        }
    };

    const createUserChat = async (userId, chatData) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/ai/userchats/${userId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(chatData)
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            addUserChat(data.newChat);
            showToast("Success", "New chat created", "success");
        } catch (err) {
            showToast("Error", err.message, "error");
        } finally {
            setIsLoading(false);
        }
    };

    const removeUserChat = async (chatId) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/ai/userchats/${chatId}`, {
                method: "DELETE"
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            deleteUserChat(chatId);
            showToast("Success", "Chat deleted", "success");
        } catch (err) {
            showToast("Error", err.message, "error");
        } finally {
            setIsLoading(false);
        }
    };

    const modifyUserChat = async (chatId, updatedData) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/ai/userchats/${chatId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData)
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            updateUserChat(data.updatedChat);
            showToast("Success", "Chat updated", "success");
        } catch (err) {
            showToast("Error", err.message, "error");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchChatMessages = async (chatId) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/ai/chats/${chatId}`);
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setChats(data.messages);
            showToast("Success", "Messages loaded", "success");
        } catch (err) {
            showToast("Error", err.message, "error");
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessage = async (chatId, text) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/ai/send/${chatId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text })
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            addMessage(data.newMessage);
            showToast("Success", "Message sent", "success");
        } catch (err) {
            showToast("Error", err.message, "error");
        } finally {
            setIsLoading(false);
        }
    };

    const modifyMessage = async (messageId, updatedContent) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/ai/chats/${messageId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedContent)
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            updateMessage(data.updatedMessage);
            showToast("Success", "Message updated", "success");
        } catch (err) {
            showToast("Error", err.message, "error");
        } finally {
            setIsLoading(false);
        }
    };

    const removeMessage = async (messageId) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/ai/chats/${messageId}`, {
                method: "DELETE"
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            deleteMessage(messageId);
            showToast("Success", "Message deleted", "success");
        } catch (err) {
            showToast("Error", err.message, "error");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        fetchUserChats,
        createUserChat,
        removeUserChat,
        modifyUserChat,
        fetchChatMessages,
        sendMessage,
        modifyMessage,
        removeMessage
    };
};

export default useAiChatActions;
