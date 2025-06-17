import React from "react";
import {
  Box,
  Heading,
  VStack,
  Text,
  IconButton,
  HStack,
  Spacer
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export default function MessagesPage() {
  const navigate = useNavigate();

  const conversations = [
    { id: "chat123", title: "Product Inquiry", datetime: "2025-06-12 14:30" },
    { id: "chat456", title: "Order Support", datetime: "2025-06-11 09:15" },
    { id: "chat789", title: "Shipping Delay", datetime: "2025-06-10 16:00" },
    { id: "chat101", title: "Billing Question", datetime: "2025-06-09 11:45" },
  ];

  const handleDelete = (chatId) => {
    navigate(`/chat/${chatId}`);
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
        <VStack spacing={1} align="stretch">
          {conversations.map((conv) => (
            <Box
              key={conv.id}
              minH="40px" // reduced individual chat height
              px={3}
              py={1}
              borderWidth="1px"
              borderColor="gray.700"
              borderRadius="md"
              bg="gray.900"
              _hover={{ bg: "gray.800", cursor: "pointer" }}
              onClick={() => handleOpenChat(conv.id)}
            >
              <HStack>
                <Text fontWeight="bold" noOfLines={1} fontSize="sm">
                  {conv.title}
                </Text>
                <Spacer />
                <IconButton
                  icon={<DeleteIcon />}
                  aria-label="Delete conversation"
                  colorScheme="red"
                  size="xs"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleDelete(conv.id);
                  }}
                />
              </HStack>
              <Text
                fontSize="xs"
                color="gray.400"
                textAlign="right"
                mt="1px"
              >
                {conv.datetime}
              </Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
}
