import { useState,useEffect } from "react";
import useAiChatStore from "../store/useAiChatStore";
import useShowToast from "./useShowToast";
import API from "../utils/api";

const apiUrl = import.meta.env.VITE_API_URL;

const useGetChat = (userId, chatId) => {
  const showToast = useShowToast(); // Show toast notifications
  const [isLoading, setLoading] = useState(true);
  const {error,chats,setChats,setError} = useAiChatStore();


  useEffect(() => {
    const controller = new AbortController();
    const getChat = async () => {
      setLoading(true); // Set loading state to true
      try {
        // Send login request to the backend
        const response = await API.get(`/api/v1/ai/chats/${userId}/${chatId}`, {
          signal: controller.signal,
        })
        // Save user info to Zustand and local storage
        // console.log(response)
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
        // console.log(messages)
        setChats(messages);
        setError(null)
        showToast("Success", `Chat: ${chatId} Found successful`, "success");
      } catch (err) {
        console.log(err)
        const message = err.response?.data?.error||err.message;
        setError(message); // Update Zustand error state
        if(message&&message!=='canceled'){
          showToast("Error", message, "error");
        }

      } finally {
        setLoading(false); // Reset loading state
      }
    };
    getChat()

    return () => {//This is a cleanup function
      controller.abort();
    }
  }, [chatId,userId,showToast])

  return { isLoading, error, chats };
}

export default useGetChat