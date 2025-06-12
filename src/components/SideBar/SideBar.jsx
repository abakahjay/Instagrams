import { Box,
        Flex,
        Link,
        Tooltip,
        Button,
        chakra,
        Text,
        ChakraProvider,
        VStack,
        Icon,
        Avatar,
        useDisclosure,
        Drawer,
        DrawerOverlay,
        DrawerContent,
        DrawerHeader,
        DrawerBody,
        IconButton,
        Spacer,
        InputGroup,
        InputLeftElement,
        Input,
        AbsoluteCenter,
        Circle,
        HStack,
        Stack,
    } from '@chakra-ui/react'
import { Link as RouterLink } from "react-router-dom";
import { ChatGptLogo1 } from '../../assets/constants.jsx'
import { BiLogOut } from "react-icons/bi";
import { FiSearch, FiBookOpen, FiGrid, FiMenu, FiPlus } from 'react-icons/fi';
// import useLogout from "../../hooks/useLogout";
import SidebarItems from "./SidebarItems";
import { useSidebarContext } from './sidebar-context';
import useLogout from '../../hooks/useLogout.js';
const ChatGptLogo = chakra(ChatGptLogo1)
export function SideBar({ authUser, onLogout }) {
    const user = authUser ? authUser.user || authUser : ''
    // const { sideBarVisible, toggleSidebar } = useSidebarContext();

    const { isLoading } = useLogout()
    return (
        <Box
            height={'100vh'}
            borderRight={'1px solid'}
            borderColor={'whiteAlpha.300'}
            py={8}
            position={'sticky'}
            top={0}
            left={0}
            px={{ base: 2, md: 4 }}
        >
            <Flex direction={'column'} gap={10} w={'full'} height={'full'}>
                <Flex direction={"row"} gap={2} cursor={"pointer"} alignItems={"center"} display={{ base: "none", md: "flex" }}>
                    <Link to={"/"} as={RouterLink} pl={2} display={{ base: "none", md: "block" }} cursor='pointer' >
                        <ChatGptLogo boxSize='40px' overflow="hidden" />
                    </Link>
                    <Link to={"/"} as={RouterLink} pl={2} display={{ base: "none", md: "block" }} cursor='pointer' >
                        <Text
                            cursor="pointer"
                            fontSize="2xl"
                            whiteSpace="nowrap"
                            bgGradient="linear(to-r, #ce1126, #fcd116, #007940)" // Red → Yellow → Green
                            bgClip="text"
                            fontWeight="bold"
                        >
                            GH-GPT
                        </Text>
                    </Link>
                </Flex>
                <Link
                    to={"/"}
                    as={RouterLink}
                    p={2}
                    display={{ base: "block", md: "none" }}
                    borderRadius={6}
                    _hover={{
                        bg: "whiteAlpha.200",
                    }}
                    w={10}
                    cursor='pointer'
                >
                    <ChatGptLogo boxSize='40px'  borderRadius="full"/>
                </Link>

                <Flex direction={"column"} gap={5} cursor={"pointer"}>
                    <SidebarItems authUser={authUser} onLogout={onLogout} />
                </Flex>


                {/* Logout */}
                <Tooltip
                    hasArrow
                    label={"Logout"}
                    placement='right'
                    ml={1}
                    openDelay={500}
                    display={{ base: "block", md: "none" }}
                >
                    <Flex
                        onClick={() => { onLogout(user._id) }}
                        alignItems={"center"}
                        gap={4}
                        _hover={{ bg: "whiteAlpha.400" }}
                        borderRadius={6}
                        p={2}
                        w={{ base: 10, md: "full" }}
                        mt={"auto"}
                        justifyContent={{ base: "center", md: "flex-start" }}
                    >
                        <BiLogOut size={25} />
                        <Button
                            display={{ base: "none", md: "block" }}
                            variant={"ghost"}
                            _hover={{ bg: "transparent" }}
                            isLoading={isLoading}
                        >
                            Logout
                        </Button>
                    </Flex>
                </Tooltip>
            </Flex>


        </Box>
    )
}