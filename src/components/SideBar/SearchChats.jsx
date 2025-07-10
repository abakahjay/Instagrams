import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
  Text,
  VStack,
  HStack,
    IconButton,
    Spacer,
} from "@chakra-ui/react";
import { SearchLogos } from "../../assets/constants";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { useSearchChats } from "../../hooks/useSearchChats";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAiChatActions from "../../hooks/useAiChatActions";
import useShowToast from "../../hooks/useShowToast";


const SearchChats = ({authUser}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const showToast = useShowToast();
  const { removeUserChat } = useAiChatActions();


  const user=authUser.user?authUser.user:authUser
  const userId = user._id;
  const [hasSearched, setHasSearched] = useState(false);


  const {
    chats,
    isLoading,
    searchChatsByTitle,
    setChats,
  } = useSearchChats(userId);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchRef.current.value;
    if (query.trim()) {
      setHasSearched(true);
      searchChatsByTitle(query.trim());
    }
  };

  return (
    <>
      <Tooltip
        hasArrow
        label={"Search Chats"}
        placement='right'
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <SearchLogos />
          <Box display={{ base: "none", md: "block" }}>Search Chat</Box>
        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
        <ModalOverlay />
        <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
          <ModalHeader>Search Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSearch}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input placeholder='Enter chat title...' ref={searchRef} />
              </FormControl>

              <Flex w={"full"} justifyContent={"flex-end"}>
                <Button
                  type='submit'
                  ml={"auto"}
                  size={"sm"}
                  my={4}
                  isLoading={isLoading}
                >
                  Search
                </Button>
              </Flex>
            </form>

            <VStack align="stretch" spacing={2}>
  {hasSearched && !isLoading && chats.length === 0 && (
    <Text color="gray.500">No similar chats found</Text>
  )}

  {hasSearched && chats.length > 0 &&
  chats.map((chat) => (
    <Box
      key={chat.chatId}
      px={3}
      py={1}
      borderWidth="1px"
      borderColor="gray.700"
      borderRadius="md"
      bg="gray.900"
      _hover={{ bg: "gray.800", cursor: "pointer" }}
      onClick={() => {
        window.location.href = `/chat/${chat.chatId}`;
        onClose();
      }}
    >
      <HStack>
        <Text fontWeight="bold" noOfLines={1} fontSize="sm">
          {chat.title || "Untitled Chat"}
        </Text>
        <Spacer />
        <IconButton
          icon={<DeleteIcon />}
          aria-label="Delete conversation"
          colorScheme="red"
          size="xs"
          onClick={async (e) => {
            e.stopPropagation();
            try {
              await removeUserChat(userId, chat.chatId);
              showToast("Deleted", "Chat removed", "success");
              // Optional: filter it from local state too
              setChats(prev => prev.filter(c => c.chatId !== chat.chatId));
            } catch (err) {
              showToast("Error", "Failed to delete chat", "error");
            }
          }}
        />
      </HStack>
      <Text fontSize="xs" color="gray.400" textAlign="right" mt="1px">
        {new Date(chat.createdAt).toLocaleString()}
      </Text>
    </Box>
))}

</VStack>

          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchChats;



// import {
//   Box,
//   Button,
//   Flex,
//   FormControl,
//   FormLabel,
//   Input,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalHeader,
//   ModalOverlay,
//   Tooltip,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { SearchLogos } from "../../assets/constants";
// import { useSearchUser } from "../../hooks/useSearchUser";
// import { useRef } from "react"
// import SuggestedUser from "../SuggestedUsers/SuggestedUser";

// const SearchChats = () => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const searchRef = useRef(null);
//   const { user, isLoading, getUserProfile, setUser } = useSearchUser();

//   const handleSearchUser = (e) => {
//     e.preventDefault();
//     getUserProfile(searchRef.current.value);
//   };

//   return (
//     <>
//       <Tooltip
//         hasArrow
//         label={"Notifications"}
//         placement='right'
//         ml={1}
//         openDelay={500}
//         display={{ base: "block", md: "none" }}
//       >
//         <Flex
//           alignItems={"center"}
//           gap={4}
//           _hover={{ bg: "whiteAlpha.400" }}
//           borderRadius={6}
//           p={2}
//           w={{ base: 10, md: "full" }}
//           justifyContent={{ base: "center", md: "flex-start" }}
//           onClick={onOpen}
//         >
//           <SearchLogos />
//           <Box display={{ base: "none", md: "block" }}>Search Chat</Box>
//         </Flex>
//       </Tooltip>

//       <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
//         <ModalOverlay />
//         <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
//           <ModalHeader>Search Chat</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody pb={6}>
//             <form onSubmit={handleSearchUser}>
//               <FormControl>
//                 <FormLabel>Title</FormLabel>
//                 <Input placeholder='Enter chat title...' ref={searchRef} />
//               </FormControl>

//               <Flex w={"full"} justifyContent={"flex-end"}>
//                 <Button type='submit' ml={"auto"} size={"sm"} my={4} isLoading={isLoading}>
//                   Search
//                 </Button>
//               </Flex>
//             </form>
//             {user && <SuggestedUser user={user} setUser={setUser} />}
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// export default SearchChats;
