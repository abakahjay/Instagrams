import React from "react";
import { Box, Heading, VStack, Text, Avatar, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function MessagesPage() {
    const conversations = [
        // Example data, replace with actual data from your backend
        { id: 1, username: "john_doe", lastMessage: "Hey, how's it going?", avatar: "/path/to/avatar1.jpg" },
        { id: 2, username: "jane_smith", lastMessage: "Are you available tomorrow?", avatar: "/path/to/avatar2.jpg" },
    ];

    return (
        <Box p={4}>
            <Heading size="lg" mb={4}>
                Messages
            </Heading>
            <VStack spacing={4} align="stretch">
                {conversations.map((conv) => (
                    <Link as={RouterLink} to={`/messages/${conv.id}`} key={conv.id}>
                        <Box p={4} borderWidth="1px" borderRadius="md" _hover={{ bg: "gray.100" }} display="flex" alignItems="center">
                            <Avatar src={conv.avatar} size="md" mr={4} />
                            <Box>
                                <Text fontWeight="bold">{conv.username}</Text>
                                <Text color="gray.500" fontSize="sm" isTruncated>
                                    {conv.lastMessage}
                                </Text>
                            </Box>
                        </Box>
                    </Link>
                ))}
            </VStack>
        </Box>
    );
}
