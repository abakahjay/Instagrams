import API from "../utils/api";
import useShowToast from "./useShowToast";
import useAddMessage from "./useAddMessage";
import useAddImageMessage from "./useAddImageMessage";

const useHandleMessageSend = () => {
    const formData = new FormData();
    const showToast = useShowToast();
    const { addMessage } = useAddMessage();
    const { addImageMessage } = useAddImageMessage();
    console.log('Starting')
 const handleMessageSend = async ({
    userId,
    chatId,
    prompt,
    file, // optional image file
    text = "", // optional caption
}) => {
    try {
        let answer;

        if (file) {
            const formData = new FormData();
            formData.append("prompt", prompt);
            formData.append("image", file); // ✅ real File object
            formData.append("text", text);  // optional

            const response = await API.post("/api/v1/ai/ask", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            answer = response?.data?.response;
        } else {
            const response = await API.post("/api/v1/ai/ask", { prompt });
            answer = response?.data?.response;
        }

        if (!answer) {
            throw new Error("Server Error");
        }

        // ✅ Save to your DB — only now
        if (file) {
            await addImageMessage({ userId, chatId, imageFile: file, text, responses: answer });
        } else {
            await addMessage({ userId, chatId, question: prompt, answer });
        }

    } catch (err) {
        const message =
            err?.response?.data?.error || "Failed to send message to AI";
        showToast("Error", message, "error");
    }
};

    return { handleMessageSend };
};

export default useHandleMessageSend;
