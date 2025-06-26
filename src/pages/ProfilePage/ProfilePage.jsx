import {
	Box,
	Flex,
	Text,
	Avatar,
	VStack,
	HStack,
	Divider,
	Button,
	useBreakpointValue,
	Stack,
	Link,
	useDisclosure,
} from "@chakra-ui/react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { MdEmail, MdEdit } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import { useGetUser } from "../../hooks/useGetUser";
import { ProfileUrl } from "../../utils/imageUrl";
import useAuthStore from "../../store/useAuthStore";
import EditProfile from "../../components/Profile/EditProfile";

export function ProfilePage({ authUser }) {
	// console.log("Auth User:", authUser);
	const user=authUser.user?authUser.user:authUser
	const url =user.profile_picture_id?ProfileUrl(user.profile_picture_id):'';
	const { username } = useParams();
	const { isLoading, userProfile } = useGetUser(username);
	// console.log(userProfile)
	const { isOpen, onOpen, onClose } = useDisclosure();
	const isMobile = useBreakpointValue({ base: true, md: false });

	// Fallback: use authUser if no userProfile is fetched yet
	const profile = userProfile || authUser;
	const isOwnProfile = user.username === profile?.user?.username;
	if (!isLoading && !userProfile) return <UserNotFound />;

	return (
		<Flex direction="column" p={4} w="100%" maxW="900px" mx="auto" h="100vh">
			<Box
				bg="gray.900"
				borderRadius="xl"
				boxShadow="md"
				p={isMobile ? 4 : 8}
				w="100%"
			>
				<Flex justify="space-between" align="center" mb={6}>
					<Text fontSize="2xl" fontWeight="bold">
						Account
					</Text>
					{isOwnProfile && (
						<Button
							leftIcon={<MdEdit />}
							size="sm"
							variant="outline"
							onClick={onOpen}
						>
							Update Profile
						</Button>
					)}
				</Flex>

				<Stack
					direction={{ base: "column", md: "row" }}
					spacing={8}
					align="flex-start"
				>
					{/* Sidebar */}
					<VStack
						align="flex-start"
						spacing={4}
						w={{ base: "100%", md: "200px" }}
					>
						<Text fontWeight="bold" fontSize="md">
							Manage your account info.
						</Text>
						<Box>
							<Text
								fontWeight="medium"
								color="blue.400"
								borderLeft="3px solid white"
								cursor={'pointer'}
								pl={2}
							>
								Profile
							</Text>
							<Text pl={2} mt={2} color="gray.400" cursor={'pointer'}>
								Security
							</Text>
						</Box>
					</VStack>

					{/* Profile Info */}
					<Box flex={1}>
						<Text fontSize="xl" fontWeight="semibold" mb={4}>
							Profile details
						</Text>

						<HStack spacing={4} mb={4}>
							<Avatar
								size="lg"
								name={user.fullname || user.username}
								src={url}
							/>
							<Box>
								<Text fontWeight="bold">
									{user.firstName} {user.lastName}
								</Text>
								<Text fontSize="sm" color="gray.400">
									@{user.username}
								</Text>
							</Box>
						</HStack>

						<Divider my={4} borderColor="gray.600" />

						<Box mb={6}>
							<Text fontSize="sm" color="gray.400" mb={1}>
								Email addresses
							</Text>
							<HStack spacing={2}>
								<MdEmail />
								<Text fontSize="md">{user.email}</Text>
								<Text fontSize="xs" color="gray.400">
									Primary
								</Text>
							</HStack>
						</Box>

						<Divider my={4} borderColor="gray.600" />

						<Box>
							<Text fontSize="sm" color="gray.400" mb={1}>
								Connected accounts
							</Text>
							<HStack spacing={2}>
								<FaGoogle />
								<Text fontSize="md">{user.email}</Text>
							</HStack>
						</Box>
					</Box>
				</Stack>
			</Box>

			{isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
		</Flex>
	);
}

const UserNotFound = () => {
	return (
		<Flex flexDir="column" textAlign="center" mx="auto" mt={10}>
			<Text fontSize="2xl">User Not Found</Text>
			<Link
				as={RouterLink}
				to="/"
				color="blue.500"
				w="max-content"
				mx="auto"
				mt={2}
			>
				Go home
			</Link>
		</Flex>
	);
};
