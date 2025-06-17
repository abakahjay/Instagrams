import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Textarea,
  IconButton,
  VStack,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  useBreakpointValue,
  Image,
  Spinner,
  Text,
  HStack,
} from "@chakra-ui/react";
import { FaMicrophone, FaRegImage } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import useShowToast from "../../hooks/useShowToast";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const showToast = useShowToast(); // Show toast notifications

  // Load first message from Dashboard
  useEffect(() => {
    const firstMessage = localStorage.getItem("dashboardMessage");
    if (firstMessage) {
      setMessages([{ text: firstMessage, fromUser: true }]);
      localStorage.removeItem("dashboardMessage");
    }
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!input.trim() && !imagePreview) return;

    const newMessages = [...messages];

    if (input.trim()) {
      newMessages.push({ text: input.trim(), fromUser: true });
    }

    if (imagePreview) {
      newMessages.push({
        image: imagePreview,
        fileInfo: {
          name: imageFile.name,
          type: imageFile.type,
          size: (imageFile.size / 1024).toFixed(1) + " KB",
        },
        fromUser: true,
      });
      setImagePreview(null);
      setImageFile(null);
    }

    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "This is a response from AI.", fromUser: false },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  }
  else{
    showToast("Error", "Please upload a valid image file."	, "error");
  }

  // Reset the input so selecting the same file again works
  e.target.value = "";
};


  return (
    <Flex direction="column" h="100vh" bg="#000" color="white">
      <VStack
        spacing={4}
        p={4}
        flex={1}
        overflowY="auto"
        align="center"
        maxH="calc(100vh - 100px)"
      >
        <Box w="100%" maxW={{ base: "100%", md: "75%" }}>
          {messages.map((msg, idx) => (
            <Flex
              key={idx}
              justify={msg.fromUser ? "flex-end" : "flex-start"}
              mb={2}
            >
              <Box
                bg={msg.fromUser ? "blue.600" : "gray.700"}
                px={4}
                py={2}
                borderRadius="xl"
                fontSize={isMobile ? "sm" : "md"}
                wordBreak="break-word"
                whiteSpace="pre-wrap"
                maxW="80%"
              >
                {msg.text}
                {msg.image && (
                  <>
                    <Image
                      src={msg.image}
                      alt="uploaded"
                      mt={2}
                      borderRadius="md"
                      maxH="200px"
                    />
                    {msg.fileInfo && (
                      <Text fontSize="xs" mt={1}>
                        {msg.fileInfo.name} • {msg.fileInfo.type} • {msg.fileInfo.size}
                      </Text>
                    )}
                  </>
                )}
              </Box>
            </Flex>
          ))}

          {isLoading && (
            <Box mb={2}>
              <Spinner size="sm" color="gray.400" />
            </Box>
          )}

          <div ref={messagesEndRef} />
        </Box>
      </VStack>

      {imagePreview && (
        <Box
          maxW={{ base: "100%", md: "75%" }}
          w="100%"
          mx="auto"
          mb={2}
          p={2}
          bg="gray.800"
          borderRadius="md"
        >
          <Image src={imagePreview} alt="preview" borderRadius="md" maxH="150px" mb={2} />
          {imageFile && (
            <Text fontSize="xs">
              {imageFile.name} • {imageFile.type} • {(imageFile.size / 1024).toFixed(1)} KB
            </Text>
          )}
        </Box>
      )}

      <Box p={3} borderTop="1px solid #333" bg="#000">
        <Flex
          align="center"
          bg="gray.800"
          borderRadius="lg"
          px={3}
          py={2}
          gap={2}
          maxW={{ base: "100%", md: "75%" }}
          w="100%"
          mx="auto"
        >
          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <IconButton
            icon={<FaRegImage />}
            variant="ghost"
            aria-label="Upload Image"
            color="gray.400"
            _hover={{ bg: "gray.700" }}
            onClick={() => fileInputRef.current.click()}
          />

          <Textarea
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            resize="none"
            overflowY="auto"
            maxHeight="120px"
            border="none"
            bg="transparent"
            color="white"
            flex={1}
            fontSize={isMobile ? "sm" : "md"}
            _focus={{ border: "1px solid white" }}
            css={{
              "&::-webkit-scrollbar": { width: "4px" },
              "&::-webkit-scrollbar-thumb": {
                background: "#888",
                borderRadius: "6px",
              },
            }}
          />

          <IconButton
            icon={<FaMicrophone />}
            variant="ghost"
            aria-label="Mic"
            color="gray.400"
            _hover={{ bg: "gray.700" }}
          />

          <IconButton
            icon={<IoIosArrowUp style={{ transform: "scale(1.3)" }} />}
            isRound
            aria-label="Send"
            onClick={handleSend}
            bg={input.trim() || imagePreview ? "white" : "transparent"}
            color={input.trim() || imagePreview ? "black" : "gray.400"}
            _hover={{ bg: input.trim() || imagePreview ? "whiteAlpha.800" : "gray.700" }}
          />
        </Flex>
      </Box>
    </Flex>
  );
};

export default ChatPage;

const ChatPageSkeleton = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex direction="column" h="100vh" bg="#000" color="white">
      <VStack
        spacing={4}
        p={4}
        flex={1}
        overflowY="auto"
        align="center"
        maxH="calc(100vh - 100px)"
      >
        <Box w="100%" maxW={{ base: "100%", md: "75%" }}>
          {[...Array(5)].map((_, idx) => (
            <Flex
              key={idx}
              justify={idx % 2 === 0 ? "flex-start" : "flex-end"}
              mb={2}
            >
              <Box
                bg="gray.700"
                px={4}
                py={2}
                borderRadius="xl"
                maxW="80%"
              >
                <SkeletonText
                  noOfLines={isMobile ? 2 : 3}
                  spacing="2"
                  skeletonHeight="2"
                />
              </Box>
            </Flex>
          ))}
        </Box>
      </VStack>

      <Box p={3} borderTop="1px solid #333" bg="#000">
        <Flex
          align="center"
          bg="gray.800"
          borderRadius="lg"
          px={3}
          py={2}
          gap={2}
          maxW={{ base: "100%", md: "75%" }}
          w="100%"
          mx="auto"
        >
          <SkeletonCircle size="8" />
          <Skeleton height="10" flex="1" borderRadius="md" />
          <SkeletonCircle size="8" />
          <SkeletonCircle size="8" />
        </Flex>
      </Box>
    </Flex>
  );
};

