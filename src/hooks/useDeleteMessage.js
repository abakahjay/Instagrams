import { useState } from "react";
import useAiChatStore from "../store/useAiChatStore";
import useShowToast from "./useShowToast";
import API from "../utils/api";
const useDeleteMessage = () => {
  const [loadingg, setLoading] = useState(false);
  const showToast = useShowToast();
  const { setChats, setError } = useAiChatStore();
  const handleMessageDelete = async ({
    fileId,
    userId,
    chatId,
    messageIndex
  }) => {
    try {
      setLoading(true);
      let answer;
      let response;

      if (fileId) {
        response = await API.delete(`/api/v1/ai/chats/image/${chatId}/${fileId}`);
        answer = response?.data?.updatedChat;
      } else {
        response = await API.delete(`/api/v1/ai/chats/${userId}/${chatId}/${messageIndex}`);
        answer = response?.data?.updatedChat;
      }

      if (!answer) {
        throw new Error("Server Error");
      }

      // console.log(answer)
      const messages = (answer.history || []).map((msg) => {
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
    } catch (err) {
      const message =
        err?.response?.data?.error || err.message;
      showToast("Error", message, "error");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return { handleMessageDelete, loadingg };
}

export default useDeleteMessage