import React, { useEffect } from "react";
import {
  Box,
  Heading,
  VStack,
  Text,
  IconButton,
  HStack,
  Spacer,
  Spinner
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import useAiChatActions from "../../hooks/useAiChatActions";
import useAiChatStore from "../../store/useAiChatStore";
import useShowToast from "../../hooks/useShowToast";

const MessagesPage = ({ authUser }) => {
  const user=authUser.user?authUser.user:authUser
  const userId = user._id;

  const { fetchUserChats, removeUserChat, isLoading } = useAiChatActions();
  const { userChats } = useAiChatStore();
  const navigate = useNavigate();
  const showToast = useShowToast();

  useEffect(() => {
    if (userId) {
      fetchUserChats(userId);
    }
  }, [userId]);

  const handleDelete = async (chatId) => {
    try {
      console.log(chatId)
      await removeUserChat(userId,chatId);
      showToast("Deleted", "Chat has been removed", "success");
    } catch (err) {
      showToast("Error", "Failed to delete chat", "error");
    }
  };

  const handleOpenChat = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <Box p={{ base: 2, md: 4 }} bg="#000" minH="100vh" color="white">
      <Heading size="lg" mb={4} textAlign="center">
        AI Chat History
      </Heading>

      <Box
        maxH="80vh"
        overflowY="auto"
        border="1px solid #333"
        borderRadius="md"
        p={2}
      >
        {isLoading ? (
          <Spinner color="white" />
        ) : userChats.length === 0 ? (
          <Text color="gray.400" textAlign="center">
            No chats yet.
          </Text>
        ) : (
          <VStack spacing={1} align="stretch">
            {userChats.map((conv) => (
              <Box
                key={conv._id}
                px={3}
                py={1}
                borderWidth="1px"
                borderColor="gray.700"
                borderRadius="md"
                bg="gray.900"
                _hover={{ bg: "gray.800", cursor: "pointer" }}
                onClick={() => handleOpenChat(conv.chatId)}
              >
                <HStack>
                  <Text fontWeight="bold" noOfLines={1} fontSize="sm">
                    {conv.title || conv.latestMessage?.text?.slice(0, 25) || "Untitled Chat"}
                  </Text>
                  <Spacer />
                  <IconButton
                    icon={<DeleteIcon />}
                    aria-label="Delete conversation"
                    colorScheme="red"
                    size="xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(conv.chatId);

                    }}
                  />
                </HStack>
                <Text fontSize="xs" color="gray.400" textAlign="right" mt="1px">
                  {new Date(conv.createdAt).toLocaleString()}
                </Text>
              </Box>
            ))}
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default MessagesPage;
