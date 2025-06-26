// hooks/useAddImageMessage.js
import useShowToast from "./useShowToast";
import useAiChatStore from "../store/useAiChatStore";
import API from "../utils/api";

const useAddImageMessage = () => {
    const showToast = useShowToast();
    const { setChats, setError } = useAiChatStore();
    const apiUrl = import.meta.env.VITE_API_URL;

    const addImageMessage = async ({ userId, chatId, imageFile, text = "" }) => {
        try {
            const formData = new FormData();
            formData.append("file", imageFile);
            formData.append("text", text); // Optional caption

            const response = await API.post(
                `/api/v1/ai/upload/${userId}/${chatId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const messages = (response.data.chat?.history || []).map((msg) => {
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
            showToast("Success", "Image uploaded successfully", "success");
        } catch (err) {
            const message =
                err.response?.data?.error || "Failed to upload image message";
            setError(message);
            showToast("Error", message, "error");
        }
    };

    return { addImageMessage };
};

export default useAddImageMessage;
