import {
    Box,
    Flex,
    Heading,
    Text,
    IconButton,
    SimpleGrid,
    useToast,
    Switch,
    VStack,
} from "@chakra-ui/react";
import { FaMicrophone, FaFan, FaLightbulb, FaCog } from "react-icons/fa";
import { useState } from "react";

const GPIOCard = ({ label, isOn, onToggle, icon }) => (
    <Box
        bg="gray.800"
        borderRadius="2xl"
        boxShadow="md"
        p={5}
        textAlign="center"
        color="white"
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

    const toast = useToast();

    const toggleGPIO = (pin) => {
        const newState = { ...gpioStates, [pin]: !gpioStates[pin] };
        setGpioStates(newState);

        toast({
            title: `Toggled ${pin.toUpperCase()}`,
            description: newState[pin] ? "Turned ON" : "Turned OFF",
            status: "info",
            duration: 2000,
            isClosable: true,
        });

        // 🔹 Send state to backend
        fetch("/api/v1/gpio/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pin, state: newState[pin] }),
        });
    };

    return (
        <Box p={5}>
            <Flex justify="space-between" align="center" mb={5}>
                <Heading size="lg" color="white">
                    🧠 AI-Controlled GPIO Dashboard
                </Heading>
                <IconButton
                    icon={<FaMicrophone />}
                    colorScheme="pink"
                    aria-label="Voice Input"
                    borderRadius="full"
                    size="lg"
                    onClick={() => alert("🎤 Microphone feature in progress...")}
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
        </Box>
    );
}




// import React, { useState } from "react";
// import axios from "axios";

// export default function Control() {
//   const [status, setStatus] = useState("");

//   const sendCommand = async (cmd) => {
//     try {
//       const formData = new FormData();
//       formData.append("command", cmd);

//       const res = await axios.post("http://localhost:500/control", formData);
//       setStatus(res.data.message || res.data.error);
//     } catch (err) {
//       setStatus("Error sending command");
//     }
//   };

//   return (
//     <div>
//       <h2>GPIO Control Panel</h2>
//       <button onClick={() => sendCommand("ON")}>Turn ON</button>
//       <button onClick={() => sendCommand("OFF")}>Turn OFF</button>
//       <button onClick={() => sendCommand("TOGGLE")}>Toggle</button>
//       <p>Status: {status}</p>
//     </div>
//   );
// }
