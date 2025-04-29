import React, { useState } from "react";
import { Box, Button, Input, Text, VStack, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";

export default function ChatModal({ username }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [messages, setMessages] = useState([
        // Example messages
        { id: 1, text: "Hello!", sender: "me" },
        { id: 2, text: "Hi there!", sender: "other" },
    ]);
    const [newMessage, setNewMessage] = useState("");

    const handleSend = () => {
        if (!newMessage.trim()) return;
        setMessages((prev) => [...prev, { id: Date.now(), text: newMessage, sender: "me" }]);
        setNewMessage(""); // Clear the input
    };

    return (
        <>
            <Button onClick={onOpen} colorScheme="blue">
                Message {username}
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Chat with {username}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4} align="stretch">
                            <Box p={2} h="300px" overflowY="auto" bg="gray.50" borderRadius="md">
                                {messages.map((msg) => (
                                    <Flex
                                        key={msg.id}
                                        justify={msg.sender === "me" ? "flex-end" : "flex-start"}
                                        mb={2}
                                    >
                                        <Box
                                            bg={msg.sender === "me" ? "blue.500" : "gray.300"}
                                            color={msg.sender === "me" ? "white" : "black"}
                                            px={4}
                                            py={2}
                                            borderRadius="md"
                                        >
                                            {msg.text}
                                        </Box>
                                    </Flex>
                                ))}
                            </Box>
                            <Flex>
                                <Input
                                    placeholder="Type a message..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    mr={2}
                                />
                                <Button onClick={handleSend} colorScheme="blue">
                                    Send
                                </Button>
                            </Flex>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
