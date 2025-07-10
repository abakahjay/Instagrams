import React, { useState, useRef } from "react";
import {
  Box,
  Flex,
  Text,
  Textarea,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { FaMicrophone } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { IoIosArrowRoundUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useAiChatActions from "../../hooks/useAiChatActions";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/useAuthStore.js";
import useHandleMessageSend from "../../hooks/useHandleMessageSend";
const Dashboard = () => {
  const [input, setInput] = useState("");
  const [fileInfo, setFileInfo] = useState(null);
  const [transcript, setTranscript] = useState("");
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);
    const authUser= useAuthStore(state=>state.user)
    const { createUserChat } = useAiChatActions();
    const showToast = useShowToast();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
  
    const user=authUser.user?authUser.user:authUser
    const userId = user._id;
    const { handleMessageSend } = useHandleMessageSend();
    const handleNewChat = async (trimmed) => {
      
  
      setLoading(true);
  
      try {
        const chatData = { text: "New Chat" }; // or whatever shape your API expects
        const newChat = await createUserChat(userId, chatData, true); // Pass true to return newChat
        if (newChat?._id) {
          navigate(`/chat/${newChat._id}`);
        }
      } catch (err) {
        showToast("Error", "Could not create chat", "error");
      } finally {
        setLoading(false);
      }
    };
  
  
  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed && !fileInfo) return;

    if (trimmed) {
      localStorage.setItem("dashboardMessage", trimmed);
    }

    if (fileInfo) {
      localStorage.setItem("fileInfo", JSON.stringify(fileInfo));
    }

    handleNewChat(trimmed)
    setInput("");
    setTranscript("");
    setFileInfo(null);
  };

  const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const size = (file.size / 1024).toFixed(1); // in KB

  const reader = new FileReader();
  reader.onload = () => {
    const base64 = reader.result;

    // Save both fileInfo and base64 content
    const fileDetails = {
      name: file.name,
      type: file.type,
      size: `${size} KB`,
      base64: base64,
    };

    setFileInfo(fileDetails);
    localStorage.setItem("fileInfo", JSON.stringify(fileDetails)); // 🧠 Save to localStorage
  };

  reader.readAsDataURL(file); // Convert image to Base64 string
};


  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {};
    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
    };
    recognition.onend = () => {};

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setInput(transcript);
    setTranscript("");
  };

  const cancelListening = () => {
    recognitionRef.current?.abort();
    setTranscript("");
  };

  return (
    <Flex h="100vh" bg="#000" justify="center" align="center" px={4}>
      <Box w={{ base: "100%", md: "60%" }} maxW="700px">
        <Text fontSize="2xl" fontWeight="bold" mb={6} color="white" textAlign="center">
          What can I help with?
        </Text>

        <Flex
          direction="column"
          bg="#121212"
          borderRadius="xl"
          px={4}
          py={4}
          boxShadow="lg"
        >
          {fileInfo && (
            <Box mb={3} color="gray.300" fontSize="sm">
              <Text>📄 {fileInfo.name}</Text>
              <Text>Type: {fileInfo.type || "Unknown"}</Text>
              <Text>Size: {fileInfo.size}</Text>
            </Box>
          )}

          {transcript && (
            <Flex
              justify="space-between"
              align="center"
              bg="gray.700"
              px={3}
              py={2}
              borderRadius="md"
              mb={3}
              color="white"
              fontSize="sm"
              wrap="wrap"
            >
              <Text flex="1">{transcript}</Text>
              <Button
                size="sm"
                colorScheme="green"
                borderRadius="full"
                mr={2}
                onClick={stopListening}
              >
                Correct
              </Button>
              <Button
                size="sm"
                colorScheme="red"
                borderRadius="full"
                onClick={cancelListening}
              >
                Close
              </Button>
            </Flex>
          )}

          <Flex
            align="center"
            gap={2}
            borderRadius="md"
            px={2}
            py={2}
            border="1px solid gray"
            bg="transparent"
          >
            <input
              type="file"
              hidden
              ref={fileInputRef}
              onChange={handleFileChange}
            />

            <IconButton
              icon={<FiPlus />}
              variant="ghost"
              aria-label="Add File"
              fontSize="lg"
              color="gray.300"
              onClick={() => fileInputRef.current.click()}
            />

            <Textarea
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              resize="none"
              maxHeight="150px"
              overflowY="auto"
              color="white"
              bg="transparent"
              border="1px solid transparent"
              flex={1}
              whiteSpace="pre-wrap"
              _focus={{
                borderColor: "white",
              }}
              css={{
                "&::-webkit-scrollbar": {
                  width: "4px",
                },
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
              color="gray.300"
              bg="transparent"
              _hover={{ bg: "gray.700" }}
              onClick={startListening}
            />

            <IconButton
              icon={
                <Box transform="translateY(-2px)">
                  <IoIosArrowRoundUp style={{ fontSize: "28px", fontWeight: "bold" }} />
                  <Box
                    w="2px"
                    h="8px"
                    bg={input.trim() || fileInfo ? "black" : "gray.400"}
                    mx="auto"
                    mt="-4px"
                    borderRadius="full"
                  />
                </Box>
              }
              aria-label="Send"
              onClick={handleSend}
              isRound
              bg={input.trim() || fileInfo ? "white" : "transparent"}
              color={input.trim() || fileInfo ? "black" : "gray.400"}
              _hover={
                input.trim() || fileInfo
                  ? { bg: "whiteAlpha.800" }
                  : { bg: "gray.700" }
              }
            />
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Dashboard;