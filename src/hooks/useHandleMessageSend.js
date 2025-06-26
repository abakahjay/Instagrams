import API from "../utils/api";
import useShowToast from "./useShowToast";
import useAddMessage from "./useAddMessage";
import useAddImageMessage from "./useAddImageMessage";

const useHandleMessageSend = () => {
    const showToast = useShowToast();
    const { addMessage } = useAddMessage();
    const { addImageMessage } = useAddImageMessage();

    const handleMessageSend = async ({
        userId,
        chatId,
        prompt,
        file, // optional: File object if it's an image
        text = "", // optional: if file has a caption
    }) => {
        try {
            // 🔹 Step 1: Send prompt to AI
            const response = await API.post("/api/v1/ai/ask", { prompt });
            // console.log(response)

            const answer = response?.data?.response;
            if (!answer) {  
                throw new Error("Server Error");
            }
            // console.log(answer)

            // 🔹 Step 2: Add to DB
            if (file) {
                await addImageMessage({ userId, chatId, imageFile: file, text });
            } else {
                await addMessage({ userId, chatId, question: prompt, answer });
            }
        } catch (err) {
            const message =
                err.response?.data?.error || "Failed to send message to AI";
            showToast("Error", message, "error");
        }
    };

    return { handleMessageSend };
};

export default useHandleMessageSend;
