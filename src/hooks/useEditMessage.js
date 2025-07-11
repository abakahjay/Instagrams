import { useState } from "react";
import API from "../utils/api";
import useShowToast from "./useShowToast";
import useAiChatStore from "../store/useAiChatStore";

const useEditMessage = () => {
    const [loading, setLoading] = useState(false);
    const showToast = useShowToast();
    const apiUrl = import.meta.env.VITE_API_URL
    const { setChats, setError } = useAiChatStore();


    const editMessage = async ({ userId, chatId, messageIndex, newText }) => {
        try {
            setLoading(true);

            // 1. PATCH the user message
            const patchRes = await API.patch(
                `/api/v1/ai/chats/${userId}/${chatId}/${messageIndex}`,
                { newText }
            );

            const updatedChat = patchRes?.data?.updatedChat;
            const userMessage = updatedChat?.history?.[messageIndex];

            if (!userMessage || !userMessage.parts?.[0]?.text) {
                throw new Error("Edited message is invalid");
            }

            const prompt = userMessage.parts[0].text;

            // 2. Re-ask the AI with the updated prompt
            const askRes = await API.post("/api/v1/ai/ask", { prompt });

            const aiReply = askRes?.data?.response;

            if (!aiReply) {
                throw new Error("Failed to get response from AI");
            }

            // 3. PATCH the next message (AI's reply)
            const aiIndex = parseInt(messageIndex) + 1;
            const aiPatchRes = await API.patch(
                `/api/v1/ai/chats/${userId}/${chatId}/${aiIndex}`,
                { newText: aiReply }
            );
            // console.log(aiPatchRes.data.updatedChat)

            const messages = (aiPatchRes?.data?.updatedChat?.history || []).map((msg) => {
                if (msg.img) {
                return {
                    type: "image",
                    image: `${apiUrl}/api/v1/ai/image/${msg.img}`,
                    text: msg.parts?.[0]?.text || "",
                    fromUser: msg.role === "user",
                    fileId: msg.img,
                };
                }
                return {
                type: "text",
                text: msg.parts?.[0]?.text || "",
                fromUser: msg.role === "user",
                };
            });
            setChats(messages);
            showToast("Updated", "Message and AI reply updated.", "success");

            return aiPatchRes.data.updatedChat; // return updated full chat
        } catch (err) {
            console.error("Edit and regenerate error:", err);
            showToast("Error", "Failed to update and regenerate AI reply", "error");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { editMessage, loading };
};

export default useEditMessage;