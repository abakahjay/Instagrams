import { Box, Flex, Tooltip ,Link} from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import { NotificationsLogo ,NewChatLogo} from "../../assets/constants";

const NewChat = () => {
  return (
    <Tooltip
      hasArrow
      label={"New  Chat"}
      placement='right'
      ml={1}
      openDelay={500}
      display={{ base: "block", md: "none" }}
    >
      <Link
        display={"flex"}
        to={"/chat"}
        as={RouterLink}
        alignItems={"center"}
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: "full" }}
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        <NewChatLogo />
        <Box display={{ base: "none", md: "block" }}>New Chat</Box>
      </Link>
    </Tooltip>
  );
};

export default NewChat;
