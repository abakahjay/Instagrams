import useShowToast from "./useShowToast";
import useAiChatStore from "../store/useAiChatStore";
import API from "../utils/api";
const apiUrl = import.meta.env.VITE_API_URL;

const useAddMessage = () => {
  const showToast = useShowToast();
  const { setChats, setError } = useAiChatStore();

  const addMessage = async ({ userId, chatId, question, answer }) => {
    try {
      const response = await API.patch(`/api/v1/ai/chats/${userId}/${chatId}`, {
        body: JSON.stringify({ question, answer }),
      });

      const messages = (response.data.data.history || []).map((msg) => {
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
      showToast("Success", `Message added successfully`, "success");
    } catch (err) {
      const message = err.response?.data?.error || "Failed to add message";
      setError(message);
      showToast("Error", message, "error");
    }
  };

  return { addMessage };
};

export default useAddMessage;
