import { Box, Flex, Tooltip } from "@chakra-ui/react";
import { NotificationsLogo ,NewChatLogo} from "../../assets/constants";

const NewChat = () => {
  return (
    <Tooltip
      hasArrow
      label={"Notifications"}
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
      >
        <NewChatLogo />
        <Box display={{ base: "none", md: "block" }}>New Chat</Box>
      </Flex>
    </Tooltip>
  );
};

export default NewChat;
