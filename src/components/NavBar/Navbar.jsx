// import { Button, Container, Flex, Image,chakra,Text } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// import { Link as RouterLink } from "react-router-dom";
// import { ChatGptLogo1 } from '../../assets/constants.jsx'
// const ChatGptLogo = chakra(ChatGptLogo1)


// const Navbar = () => {
// 	return (
// 		<Container maxW={"container.lg"} my={4} mx={0} >
// 			<Flex w={"full"} justifyContent={{ base: "center", sm: "space-between" }} alignItems={"center"}>
// 				<Flex direction={"row"} gap={2} cursor={"pointer"} alignItems={"center"} display={{ base: "flex", md: "flex" }} >
// 					<Link to={"/"} as={RouterLink} pl={2} display={{ base: "none", md: "block" }} cursor='pointer' >
// 						<ChatGptLogo boxSize='40px' overflow="hidden" />
// 					</Link>
// 					<Link to={"/"} as={RouterLink} pl={2} display={{ base: "none", md: "block" }} cursor='pointer' >
// 						<Text
// 							cursor="pointer"
// 							fontSize="2xl"
// 							whiteSpace="nowrap"
// 							bgGradient="linear(to-r, #ce1126, #fcd116, #007940)" // Red → Yellow → Green
// 							bgClip="text"
// 							fontWeight="bold"
// 							mx={2}

// 						>
// 							GH-GPT
// 						</Text>
// 					</Link>
// 				</Flex>
// 				<Flex gap={4}>
// 					<Link to='/auth'>
// 						<Button colorScheme={"blue"} size={"sm"}>
// 							Login
// 						</Button>
// 					</Link>
// 					<Link to='/auth'>
// 						<Button variant={"outline"} size={"sm"}>
// 							Signup
// 						</Button>
// 					</Link>
// 				</Flex>
// 			</Flex>
// 		</Container>
// 	);
// };

// export default Navbar;
import {
	Button,
	Container,
	Box,
	Flex,
	chakra,
	Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ChatGptLogo1 } from '../../assets/constants.jsx';
import ProfileLink from '../SideBar/ProfileLink'; // adjust path as needed

// Dummy authUser for testing. Replace with actual prop, context, or store.
const ChatGptLogo = chakra(ChatGptLogo1);

const Navbar = ({authUser} ) => {
	const isLoggedIn = !!authUser?.user || !!authUser?.username;

	return (
		<Box w="100%" my={4} mx={0} px={4} >
			<Flex
				w="full"
				mx='auto'
				align='center'
				justify='space-between'
					// justifyContent={{ base: "center", sm: "space-between" }}
					// alignItems="center"
			>
				{/* Logo + Title */}
				<Flex direction="row" gap={2} alignItems="center">
					<RouterLink to="/" pl={2}>
						<ChatGptLogo boxSize="40px" />
					</RouterLink>

					<RouterLink to="/" pl={2}>
						<Text
							fontSize="2xl"
							whiteSpace="nowrap"
							bgGradient="linear(to-r, #ce1126, #fcd116, #007940)"
							bgClip="text"
							fontWeight="bold"
							mx={2}
						>
							GH-GPT
						</Text>
					</RouterLink>
				</Flex>

				{/* Right side: Auth or Profile */}
				<Flex gap={4} alignItems="center">
					{isLoggedIn ? (
						<ProfileLink authUser={authUser} onLogout={() => console.log("logout")} />
					) : (
						<>
							<Button as={RouterLink} to="/auth" colorScheme="blue" size="sm">
								Login
							</Button>
							<Button as={RouterLink} to="/auth" variant="outline" size="sm">
								Signup
							</Button>
						</>
					)}
				</Flex>
			</Flex>
		</Box>
	);
};

export default Navbar;