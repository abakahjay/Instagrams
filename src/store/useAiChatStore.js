import { create } from "zustand";

const useAiChatStore = create((set) => ({
    userChats: [],  // list of chat rooms or conversations
    chats: [],      // list of messages in a selected conversation

    // USER CHATS HANDLERS
    setUserChats: (userChats) => set({ userChats }),

    addUserChat: (chat) => set((state) => ({
        userChats: [chat, ...state.userChats],
    })),

    deleteUserChat: (chatId) => set((state) => ({
        userChats: state.userChats.filter((chat) => chat._id !== chatId),
    })),

    updateUserChat: (updatedChat) => set((state) => ({
        userChats: state.userChats.map((chat) =>
            chat._id === updatedChat._id ? updatedChat : chat
        ),
    })),

    // CHATS (MESSAGES) HANDLERS
    setChats: (chats) => set({ chats }),

    addMessage: (message) => set((state) => ({
        chats: [...state.chats, message],
    })),

    deleteMessage: (messageId) => set((state) => ({
        chats: state.chats.filter((msg) => msg._id !== messageId),
    })),

    updateMessage: (updatedMessage) => set((state) => ({
        chats: state.chats.map((msg) =>
            msg._id === updatedMessage._id ? updatedMessage : msg
        ),
    })),

    // (OPTIONAL) add AI reply to a message thread (if you're threading replies)
    addAiReply: (parentMessageId, aiReply) => set((state) => ({
        chats: state.chats.map((msg) => {
            if (msg._id === parentMessageId) {
                return {
                    ...msg,
                    replies: [...(msg.replies || []), aiReply],
                };
            }
            return msg;
        }),
    })),
}));

export default useAiChatStore;
