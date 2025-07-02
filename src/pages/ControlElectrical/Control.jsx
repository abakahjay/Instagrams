import {
    Box,
    Flex,
    Heading,
    Text,
    IconButton,
    SimpleGrid,
    Switch,
    VStack,
    useToast,
    Divider,
    HStack,
    Badge,
    Spinner,
} from "@chakra-ui/react";
import { FaMicrophone, FaFan, FaLightbulb, FaCog, FaHistory } from "react-icons/fa";
import { useState, useEffect } from "react";

const API_BASE = "http://localhost:5000/api/v1/gpio"; // 🔁 Use your actual backend URL

const GPIOCard = ({ label, isOn, onToggle, icon }) => (
    <Box
        bg="gray.800"
        borderRadius="2xl"
        boxShadow="lg"
        p={5}
        textAlign="center"
        color="white"
        transition="0.3s"
        _hover={{ transform: "scale(1.02)" }}
    >
        <Flex justify="center" fontSize="4xl" mb={3}>
            {icon}
        </Flex>
        <Heading fontSize="xl" mb={2}>
            {label}
        </Heading>
        <Switch isChecked={isOn} onChange={onToggle} colorScheme="green" size="lg" />
        <Text mt={2}>{isOn ? "ON" : "OFF"}</Text>
    </Box>
);

export default function Control() {
    const [gpioStates, setGpioStates] = useState({
        led: false,
        fan: false,
        motor: false,
    });
    const [logs, setLogs] = useState([]);
    const [loadingLogs, setLoadingLogs] = useState(true);
    const toast = useToast();

    const toggleGPIO = async (pin) => {
        const newState = !gpioStates[pin];
        setGpioStates({ ...gpioStates, [pin]: newState });

        toast({
            title: `Toggled ${pin.toUpperCase()}`,
            description: newState ? "Turned ON" : "Turned OFF",
            status: "info",
            duration: 2000,
            isClosable: true,
        });

        try {
            await fetch(`${API_BASE}/update`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pin, state: newState, source: "dashboard" }),
            });

            // Refresh logs
            fetchLogs();
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to update GPIO state",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    };

    const fetchLogs = async () => {
        try {
            setLoadingLogs(true);
            const res = await fetch(`${API_BASE}/logs`);
            const data = await res.json();
            setLogs(data.logs || []);
        } catch (err) {
            console.error("Failed to load logs:", err);
        } finally {
            setLoadingLogs(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const formatDate = (dateString) =>
        new Date(dateString).toLocaleString("en-GB", {
            dateStyle: "short",
            timeStyle: "short",
        });

    return (
        <Box p={5} color="white">
            <Flex justify="space-between" align="center" mb={5}>
                <Heading size="lg">🧠 AI-Controlled GPIO Dashboard</Heading>
                <IconButton
                    icon={<FaMicrophone />}
                    colorScheme="pink"
                    aria-label="Voice Input"
                    borderRadius="full"
                    size="lg"
                    onClick={() => alert("🎤 Voice control coming soon!")}
                />
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
                <GPIOCard
                    label="LED"
                    icon={<FaLightbulb />}
                    isOn={gpioStates.led}
                    onToggle={() => toggleGPIO("led")}
                />
                <GPIOCard
                    label="Fan"
                    icon={<FaFan />}
                    isOn={gpioStates.fan}
                    onToggle={() => toggleGPIO("fan")}
                />
                <GPIOCard
                    label="Motor"
                    icon={<FaCog />}
                    isOn={gpioStates.motor}
                    onToggle={() => toggleGPIO("motor")}
                />
            </SimpleGrid>

            <Box mt={10}>
                <Flex align="center" gap={2} mb={4}>
                    <FaHistory />
                    <Heading size="md">Recent GPIO Activity</Heading>
                </Flex>

                {loadingLogs ? (
                    <Spinner />
                ) : (
                    <VStack align="stretch" spacing={3}>
                        {logs.length === 0 && <Text>No logs found</Text>}
                        {logs.map((log) => (
                            <Box
                                key={log._id}
                                bg="gray.700"
                                p={4}
                                borderRadius="lg"
                                boxShadow="sm"
                                _hover={{ bg: "gray.600" }}
                            >
                                <HStack justify="space-between">
                                    <Text>
                                        <strong>{log.pin.toUpperCase()}</strong> turned{" "}
                                        <strong>{log.state ? "ON" : "OFF"}</strong>
                                    </Text>
                                    <Badge colorScheme="purple" variant="solid">
                                        {log.source}
                                    </Badge>
                                </HStack>
                                <Text fontSize="sm" mt={1} color="gray.300">
                                    {formatDate(log.createdAt)}
                                </Text>
                            </Box>
                        ))}
                    </VStack>
                )}
            </Box>
        </Box>
    );
}
