// import { Box, Flex, Tooltip ,Link} from "@chakra-ui/react";
// import { AiFillHome } from "react-icons/ai";
// import { Link as RouterLink } from "react-router-dom";
// import { NotificationsLogo ,NewChatLogo} from "../../assets/constants";

// const NewChat = () => {
//   return (
//     <Tooltip
//       hasArrow
//       label={"New  Chat"}
//       placement='right'
//       ml={1}
//       openDelay={500}
//       display={{ base: "block", md: "none" }}
//     >
//       <Link
//         display={"flex"}
//         to={"/chat"}
//         as={RouterLink}
//         alignItems={"center"}
//         gap={4}
//         _hover={{ bg: "whiteAlpha.400" }}
//         borderRadius={6}
//         p={2}
//         w={{ base: 10, md: "full" }}
//         justifyContent={{ base: "center", md: "flex-start" }}
//       >
//         <NewChatLogo />
//         <Box display={{ base: "none", md: "block" }}>New Chat</Box>
//       </Link>
//     </Tooltip>
//   );
// };

// export default NewChat;


import { Box, Flex, Tooltip, Link } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { NewChatLogo } from "../../assets/constants";
import { useState } from "react";
import useAiChatActions from "../../hooks/useAiChatActions";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/useAuthStore.js";

const NewChat = () => {
  const authUser= useAuthStore(state=>state.user)
  const { createUserChat } = useAiChatActions();
  const showToast = useShowToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const user=authUser.user?authUser.user:authUser
  const userId = user._id;
  const handleNewChat = async () => {
    

    setLoading(true);

    try {
      const chatData = { text:'New Chat' }; // or whatever shape your API expects
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

  return (
    <Tooltip
      hasArrow
      label={"New Chat"}
      placement="right"
      ml={1}
      openDelay={500}
      display={{ base: "block", md: "none" }}
    >
      <Link
        display="flex"
        as="button"
        alignItems="center"
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: "full" }}
        justifyContent={{ base: "center", md: "flex-start" }}
        onClick={handleNewChat}
        isDisabled={loading}
      >
        <NewChatLogo />
        <Box display={{ base: "none", md: "block" }}>New Chat</Box>
      </Link>
    </Tooltip>
  );
};

export default NewChat;
