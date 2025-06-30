import { Link,Box, chakra, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";
import { ChatGptLogo1 } from "../../assets/constants";
import { Link as RouterLink } from "react-router-dom";
//Everything is in pixels

export function AuthForm({ onAuth }) {
    const [isLogin, setIsLogin] = useState(true);
    const ChatGptLogos = chakra(ChatGptLogo1)

    return (
        <>
            <Box border={"1px solid gray"} borderRadius={4} padding={5}>
                <VStack spacing={4}>
                    <Flex alignItems={'center'} justifyContent={'center'}  padding='25px'>
                        <Link
                            to={"/"}
                            display={"flex"}
                            as={RouterLink}
                            cursor={'pointer'}
                            alignItems={"center"}
                            justifyContent={"center"}
                            whiteSpace="nowrap"
                            gap={2}
                        >
                            <ChatGptLogos boxSize='48px' />
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

                    {isLogin ? <Login onAuth={onAuth} /> : <Signup onAuth={onAuth} />}

                    {/* ---------------- OR -------------- */}
                    <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
                        <Box flex={2} h={"1px"} bg={"gray.400"} />
                        <Text mx={1} color={"white"}>
                            OR
                        </Text>
                        <Box flex={2} h={"1px"} bg={"gray.400"} />
                    </Flex>

                    <GoogleAuth prefix={isLogin ? "Log in" : "Sign up"} />
                </VStack>
            </Box>

            <Box border={"1px solid gray"} borderRadius={4} padding={3}>
                <Flex alignItems={"center"} justifyContent={"center"}>
                    <Box mx={2} fontSize={14}>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                    </Box>
                    <Box onClick={() => setIsLogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
                        {isLogin ? "Sign up" : "Log in"}
                    </Box>
                </Flex>
            </Box>
        </>
    );
};

