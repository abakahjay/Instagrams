import {
    ChakraProvider,
    Box,
    VStack,
    Text,
    Icon,
    Avatar,
    Flex,
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
} from '@chakra-ui/react';
import { FiSearch, FiBookOpen, FiGrid, FiMenu, FiPlus } from 'react-icons/fi';

function SidebarContent({ onClick }) {
    return (
        <VStack align="start" spacing={5} w="full">
            {/* New Chat Icon */}
            <Flex
                align="center"
                gap={3}
                w="full"
                py={2}
                px={3}
                bg="gray.700"
                borderRadius="md"
                cursor="pointer"
                _hover={{ bg: "gray.600" }}
                onClick={onClick}
            >
                <Icon as={FiPlus} />
                <Text fontWeight="medium">New Chat</Text>
            </Flex>

            {/* Search Bar */}
            <InputGroup>
                <InputLeftElement pointerEvents="none">
                    <FiSearch color="gray.400" />
                </InputLeftElement>
                <Input
                    placeholder="Search"
                    variant="filled"
                    size="sm"
                    bg="gray.700"
                    border="none"
                    _hover={{ bg: "gray.600" }}
                    _focus={{ bg: "gray.600" }}
                />
            </InputGroup>

            {/* Menu Items */}
            <Flex align="center" gap={3} onClick={onClick}>
                <Icon as={FiGrid} />
                <Text>Explore GPTs</Text>
            </Flex>
            <Flex align="center" gap={3} onClick={onClick}>
                <Icon as={FiBookOpen} />
                <Text>Library</Text>
                <Box bg="gray.600" px={2} py={0.5} rounded="md" fontSize="sm">
                    1
                </Box>
            </Flex>

            <Spacer />

            {/* User Profile */}
            <Box pt={4} borderTop="1px solid" borderColor="gray.700" w="full">
                <Flex align="center" gap={3}>
                    <Avatar size="sm" name="Joshua Abakah" />
                    <Text fontSize="sm">Joshua Abakah</Text>
                </Flex>
            </Box>
        </VStack>
    );
}

function Try1() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <ChakraProvider>
            <Flex h="100vh" bg="gray.900" color="white" overflow="hidden">
                {/* Desktop Sidebar */}
                <Box
                    w={{ base: '0', md: '260px' }}
                    p={4}
                    bg="gray.800"
                    display={{ base: 'none', md: 'block' }}
                >
                    <SidebarContent />
                </Box>

                {/* Mobile Header with Menu Button */}
                <Box
                    display={{ base: 'flex', md: 'none' }}
                    p={4}
                    w="full"
                    alignItems="center"
                    justifyContent="space-between"
                    bg="gray.800"
                    position="fixed"
                    top="0"
                    zIndex="overlay"
                >
                    <Text fontWeight="bold">ChatGPT</Text>
                    <IconButton
                        aria-label="Open menu"
                        icon={<FiMenu />}
                        onClick={onOpen}
                        variant="outline"
                        colorScheme="whiteAlpha"
                    />
                </Box>

                {/* Mobile Sidebar Drawer */}
                <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                    <DrawerOverlay />
                    <DrawerContent bg="gray.800" color="white">
                        <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
                        <DrawerBody>
                            <SidebarContent onClick={onClose} />
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>

                {/* Main Content */}
                <Box
                    flex="1"
                    p={{ base: 4, md: 6 }}
                    mt={{ base: '60px', md: 0 }}
                    overflowY="auto"
                >
                    <Text fontSize="xl">Main Content Here</Text>
                </Box>
            </Flex>
        </ChakraProvider>
    );
}

export default Try1;