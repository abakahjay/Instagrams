import { Box, Link, Tooltip } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import { HistoryLogo } from "../../assets/constants.jsx";

const HistoryLink = () => {
    return (
        <Tooltip
            hasArrow
            label={"History"}
            placement='right'
            ml={1}
            openDelay={500}
            display={{ base: "block", md: "none" }}
        >
            <Link
                display={"flex"}
                to={"/history"}
                as={RouterLink}
                alignItems={"center"}
                gap={4}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
            >
                <HistoryLogo/>
                {/* This is for the logo since the one on top doesnt work */}
                {/* <svg
                    width="24"
                    height="24"
                    viewBox="0 0 48 48"
                    fill="none">
                    <rect width="48px" height="48px" fill="none" fillopacity="0.01" />
                    <path d="M5.81824 6.72729V14H13.091" stroke="rgb(245, 245, 245)" strokeWidth='3' strokelinecap="round" strokelinejoin="round" />
                    <path d="M4 24C4 35.0457 12.9543 44 24 44V44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C16.598 4 10.1351 8.02111 6.67677 13.9981" stroke="rgb(245, 245, 245)" strokeWidth='3' strokelinecap="round" strokelinejoin="round" />
                    <path d="M24.005 12L24.0038 24.0088L32.4832 32.4882" stroke="rgb(245, 245, 245)" strokeWidth='3' strokelinecap="round" strokelinejoin="round" />
                </svg> */}
                <Box display={{ base: "none", md: "block" }}>History</Box>
            </Link>
        </Tooltip>
    );
};

export default HistoryLink;
