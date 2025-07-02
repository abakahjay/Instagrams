import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Textarea,
  IconButton,
  VStack,
  useBreakpointValue,
  Image,
  Spinner,
  Text,
  HStack,
} from "@chakra-ui/react";
import {
  FaMicrophone,
  FaRegImage,
  FaVolumeUp,
} from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import {
  MdContentCopy,
  MdDeleteOutline,
  MdEdit,
} from "react-icons/md";
import useShowToast from "../../hooks/useShowToast";
import { useParams } from "react-router-dom";
import useGetChat from "../../hooks/useGetChat";
import useAddMessage from "../../hooks/useAddMessage";
import useHandleMessageSend from "../../hooks/useHandleMessageSend";

const ChatPage = ({authUser}) => {
  const [messages, setMessages] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [input, setInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const showToast = useShowToast();
  const recognitionRef = useRef(null);
  const { chatId } = useParams();
  const user=authUser.user?authUser.user:authUser
  const userId = user._id;

  const { error, chats } = useGetChat(userId,chatId);
  const { addMessage} = useAddMessage();
  const { handleMessageSend } = useHandleMessageSend(); 
  
  // console.log(chats)
  // console.log(error)
  // console.log(chatId)

  // Auto-scroll and initial load
  useEffect(() => {
    setIsLoading(true);
    const firstMessage = localStorage.getItem("dashboardMessage");
    const fileInfoRaw = localStorage.getItem("fileInfo");

    setMessages(chats);

    const newMessages = [];
    let hasUserInput = false;
    setIsLoading(true);
    if (firstMessage) {
      newMessages.push({ text: firstMessage, fromUser: true });
      setIsLoading(true);
      handleMessageSend({
        userId,
        chatId,
        prompt: firstMessage || "[image]",
        file: imageFile,
        text: input.trim(),
      });
      localStorage.removeItem("dashboardMessage");
      hasUserInput = true;
    }

    if (fileInfoRaw) {
      try {
        const fileInfo = JSON.parse(fileInfoRaw);
        if (fileInfo.base64 && fileInfo.type.startsWith("image/")) {
          newMessages.push({
            image: fileInfo.base64,
            fileInfo: {
              name: fileInfo.name,
              type: fileInfo.type,
              size: fileInfo.size,
            },
            fromUser: true,
          });

          setImageFile({
            name: fileInfo.name,
            type: fileInfo.type,
            size: parseFloat(fileInfo.size),
          });

          hasUserInput = true;
        }

        localStorage.removeItem("fileInfo");
      } catch (err) {
        console.error("Invalid file info in localStorage", err);
      }
    }

    if (newMessages.length > 0) {
      setMessages(newMessages);
    }

    // if (hasUserInput) {
    //   setIsLoading(true);
    //   setTimeout(() => {
    //     setMessages((prev) => [
    //       ...prev,
    //       { text: "This is a response from AI.", fromUser: false },
    //     ]);
    //     setIsLoading(false);
    //   }, 1000);
    // }
    setIsLoading(false);
  }, [chats]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages,chats, isLoading]);

  const handleSend = async () => {
    if (!input.trim() && !imagePreview) return;

    const newMessages = [...messages];
    console.log(chats)

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
      // setMessages((prev) => [
      //   ...prev,
      //   { text: "This is a response from AI.", fromUser: false },
      // ]);
    }, 1000);
    // addMessage({userId,chatId,question:input.trim(),answer:'This is a response from AI.'})
    try {
    await handleMessageSend({
      userId,
      chatId,
      prompt: input.trim() || null,
      file: imageFile,
      text: input.trim(),
    });
  } catch (error) {
    console.error("Failed to send message:", error);
  }
    setIsLoading(false);
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
    } else {
      showToast("Error", "Please upload a valid image file.", "error");
    }
    e.target.value = "";
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    showToast("Copied", "Message copied to clipboard.", "success");
  };

  const handleDelete = (index) => {
    const updated = [...messages];
    updated.splice(index, 1);
    setMessages(updated);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingText(messages[index].text || "");
  };

  const handleSaveEdit = () => {
    const updated = [...messages];
    updated[editingIndex].text = editingText;
    setMessages(updated);
    setEditingIndex(null);
    setEditingText("");
    showToast("Updated", "Message edited successfully.", "success");
  };

  const speakMessage = (text) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
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
            <Box
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Flex justify={msg.fromUser ? "flex-end" : "flex-start"} mb={1}>
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
                  {editingIndex === idx ? (
                    <Textarea
                      size="sm"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      bg="gray.800"
                      color="white"
                      border="1px solid white"
                    />
                  ) : (
                    <>
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
                              {msg.fileInfo.name} • {msg.fileInfo.type} •{" "}
                              {msg.fileInfo.size}
                            </Text>
                          )}
                        </>
                      )}
                    </>
                  )}
                </Box>
              </Flex>

              {hoveredIndex === idx && (
                <HStack
                  spacing={2}
                  mt={1}
                  justify={msg.fromUser ? "flex-end" : "flex-start"}
                  px={2}
                >
                  <IconButton
                    icon={<MdContentCopy />}
                    size="xs"
                    aria-label="Copy"
                    variant="ghost"
                    color="white"
                    _hover={{ bg: "whiteAlpha.200" }}
                    onClick={() => handleCopy(msg.text || "")}
                  />
                  <IconButton
                    icon={<FaVolumeUp />}
                    size="xs"
                    aria-label="Read Aloud"
                    variant="ghost"
                    color="white"
                    _hover={{ bg: "whiteAlpha.200" }}
                    onClick={() => speakMessage(msg.text || "")}
                  />
                  {msg.fromUser && editingIndex !== idx && (
                    <IconButton
                      icon={<MdEdit />}
                      size="xs"
                      aria-label="Edit"
                      variant="ghost"
                      color="white"
                      _hover={{ bg: "whiteAlpha.200" }}
                      onClick={() => handleEdit(idx)}
                    />
                  )}
                  {msg.fromUser && editingIndex === idx && (
                    <IconButton
                      icon={<IoIosArrowUp />}
                      size="xs"
                      aria-label="Save"
                      variant="ghost"
                      color="white"
                      _hover={{ bg: "whiteAlpha.200" }}
                      onClick={handleSaveEdit}
                    />
                  )}
                  <IconButton
                    icon={<MdDeleteOutline />}
                    size="xs"
                    aria-label="Delete"
                    variant="ghost"
                    color="white"
                    _hover={{ bg: "whiteAlpha.200" }}
                    onClick={() => handleDelete(idx)}
                  />
                </HStack>
              )}
            </Box>
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
          <Image
            src={imagePreview}
            alt="preview"
            borderRadius="md"
            maxH="150px"
            mb={2}
          />
          {imageFile && (
            <Text fontSize="xs">
              {imageFile.name} • {imageFile.type} •{" "}
              {(imageFile.size / 1024).toFixed(1)} KB
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
            onClick={() => showToast("Mic", "You can add mic logic here", "info")}
          />

          <IconButton
            icon={<IoIosArrowUp style={{ transform: "scale(1.3)" }} />}
            isRound
            aria-label="Send"
            onClick={handleSend}
            bg={input.trim() || imagePreview ? "white" : "transparent"}
            color={input.trim() || imagePreview ? "black" : "gray.400"}
            _hover={{
              bg:
                input.trim() || imagePreview
                  ? "whiteAlpha.800"
                  : "gray.700",
            }}
          />
        </Flex>
      </Box>
    </Flex>
  );
};

export default ChatPage;


// import React, { useState, useEffect, useRef } from "react";
// import {
//   Box, Flex, Textarea, IconButton, VStack,
//   useBreakpointValue, Image, Spinner, Text, HStack
// } from "@chakra-ui/react";
// import { FaMicrophone, FaRegImage } from "react-icons/fa";
// import { IoIosArrowUp } from "react-icons/io";
// import { MdContentCopy, MdDeleteOutline, MdEdit } from "react-icons/md";
// import useShowToast from "../../hooks/useShowToast";
// import useAiChatActions from "../../hooks/useAiChatActions";

// const ChatPage = ({ authUser }) => {
//   const user=authUser.user?authUser.user:authUser
//   const userId = user._id;
//   const showToast = useShowToast();

//   const {
//     createUserChat,
//     sendMessage,
//     uploadImage,
//     fetchChatMessages,
//     addMessage,
//     setChats
//   } = useAiChatActions();

//   const [chatId, setChatId] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [hoveredIndex, setHoveredIndex] = useState(null);
//   const [input, setInput] = useState("");
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [editingText, setEditingText] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const fileInputRef = useRef(null);
//   const messagesEndRef = useRef(null);
//   const isMobile = useBreakpointValue({ base: true, md: false });

//   useEffect(() => {
//     // If entered via existing chat URL, you can fetch messages here
//     // Example: if chatId prop or param exists...
//   }, []);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isLoading]);

//   const handleSend = async () => {
//     if (!input.trim() && !imagePreview) return;
//     setIsLoading(true);

//     try {
//       let currentChatId = chatId;
//       if (!currentChatId) {
//         const res = await createUserChat(userId, { text: input || "Image Upload" });
//         currentChatId = res.savedChat._id;
//         setChatId(currentChatId);
//       }

//       if (input.trim()) {
//         await sendMessage(userId, currentChatId, input.trim());
//         const newMsg = { text: input.trim(), fromUser: true };
//         setMessages((prev) => [...prev, newMsg]);
//       }

//       if (imageFile) {
//         const formData = new FormData();
//         formData.append("file", imageFile);
//         formData.append("text", input.trim());
//         await uploadImage(userId, currentChatId, formData);

//         const imgMsg = {
//           image: imagePreview,
//           fromUser: true,
//           fileInfo: {
//             name: imageFile.name,
//             type: imageFile.type,
//             size: (imageFile.size / 1024).toFixed(1) + " KB",
//           },
//         };
//         setMessages((prev) => [...prev, imgMsg]);
//       }

//       setInput("");
//       setImageFile(null);
//       setImagePreview(null);
//     } catch (err) {
//       showToast("Error", err.message || "Failed to send", "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file || !file.type.startsWith("image/")) {
//       return showToast("Error", "Please upload a valid image", "error");
//     }

//     setImageFile(file);
//     const reader = new FileReader();
//     reader.onload = () => setImagePreview(reader.result);
//     reader.readAsDataURL(file);
//     e.target.value = "";
//   };

//   const handleCopy = (text) => {
//     navigator.clipboard.writeText(text);
//     showToast("Copied", "Message copied", "success");
//   };

//   const handleDelete = (idx) => {
//     setMessages((prev) => prev.filter((_, i) => i !== idx));
//   };

//   const handleEdit = (idx) => {
//     setEditingIndex(idx);
//     setEditingText(messages[idx].text || "");
//   };

//   const handleSaveEdit = () => {
//     setMessages((prev) =>
//       prev.map((msg, i) =>
//         i === editingIndex ? { ...msg, text: editingText } : msg
//       )
//     );
//     setEditingIndex(null);
//     setEditingText("");
//     showToast("Updated", "Message updated", "success");
//   };

//   return (
//     <Flex direction="column" h="100vh" bg="#000" color="white">
//       <VStack p={4} flex={1} overflowY="auto" align="center">
//         <Box w="100%" maxW={{ base: "100%", md: "75%" }}>
//           {messages.map((msg, idx) => (
//             <Box key={idx} onMouseEnter={() => setHoveredIndex(idx)} onMouseLeave={() => setHoveredIndex(null)} mb={2}>
//               <Flex justify={msg.fromUser ? "flex-end" : "flex-start"}>
//                 <Box bg={msg.fromUser ? "blue.600" : "gray.700"} px={4} py={2} borderRadius="xl" fontSize={isMobile ? "sm" : "md"} maxW="80%" wordBreak="break-word" whiteSpace="pre-wrap">
//                   {editingIndex === idx ? (
//                     <Textarea
//                       size="sm"
//                       value={editingText}
//                       onChange={(e) => setEditingText(e.target.value)}
//                       bg="gray.800"
//                       color="white"
//                       border="1px solid white"
//                     />
//                   ) : (
//                     <>
//                       {msg.text}
//                       {msg.image && (
//                         <>
//                           <Image src={msg.image} alt="upload" mt={2} borderRadius="md" maxH="200px" />
//                           {msg.fileInfo && (
//                             <Text fontSize="xs" mt={1}>
//                               {msg.fileInfo.name} • {msg.fileInfo.type} • {msg.fileInfo.size}
//                             </Text>
//                           )}
//                         </>
//                       )}
//                     </>
//                   )}
//                 </Box>
//               </Flex>

//               {hoveredIndex === idx && (
//                 <HStack justify={msg.fromUser ? "flex-end" : "flex-start"} spacing={2} mt={1}>
//                   <IconButton icon={<MdContentCopy />} size="xs" variant="ghost" onClick={() => handleCopy(msg.text || "")} />
//                   {msg.fromUser && editingIndex !== idx && (
//                     <IconButton icon={<MdEdit />} size="xs" variant="ghost" onClick={() => handleEdit(idx)} />
//                   )}
//                   {msg.fromUser && editingIndex === idx && (
//                     <IconButton icon={<IoIosArrowUp />} size="xs" variant="ghost" onClick={handleSaveEdit} />
//                   )}
//                   <IconButton icon={<MdDeleteOutline />} size="xs" variant="ghost" onClick={() => handleDelete(idx)} />
//                 </HStack>
//               )}
//             </Box>
//           ))}
//           {isLoading && <Spinner color="gray.400" />}
//           <div ref={messagesEndRef} />
//         </Box>
//       </VStack>

//       {imagePreview && (
//         <Box p={2} bg="gray.800">
//           <Image src={imagePreview} alt="preview" borderRadius="md" maxH="150px" mb={1} />
//           {imageFile && <Text fontSize="xs">{imageFile.name} • {imageFile.type} • {(imageFile.size / 1024).toFixed(1)} KB</Text>}
//         </Box>
//       )}

//       <Box p={3} borderTop="1px solid #333" bg="#000">
//         <Flex align="center" bg="gray.800" borderRadius="lg" px={3} py={2} gap={2}>
//           <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} />
//           <IconButton icon={<FaRegImage />} variant="ghost" aria-label="Upload Image" onClick={() => fileInputRef.current.click()} />
//           <Textarea
//             placeholder="Type your message..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
//             resize="none"
//             maxHeight="120px"
//             bg="transparent"
//             flex={1}
//             _focus={{ borderColor: "white" }}
//           />
//           <IconButton icon={<FaMicrophone />} variant="ghost" aria-label="Mic" />
//           <IconButton icon={<IoIosArrowUp />} isRound aria-label="Send" onClick={handleSend} bg={input.trim() || imagePreview ? "white" : "transparent"} />
//         </Flex>
//       </Box>
//     </Flex>
//   );
// };

// export default ChatPage;
