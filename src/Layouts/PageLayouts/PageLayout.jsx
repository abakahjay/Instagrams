import React from "react";
import Navbar from "../../components/NavBar/Navbar.jsx";
import Footer from "../../components/trys/Footer.jsx";
import { Flex,Box,Spinner } from "@chakra-ui/react";
import {SideBar} from '../../components/SideBar/SideBar.jsx'
import { useLocation } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore.js";

const PageLayout = ({ authUser, onLogout, children }) => {
    const {isLoading } = useAuthStore()
    const { pathname } = useLocation();
    let user=authUser?authUser.user||authUser:null
	const checkingUserIsAuth = !user && isLoading;
	const canRenderSidebar = pathname !== "/auth"&&user;
    const canRenderNavbar =pathname !== "/auth"&&!user;
    if (checkingUserIsAuth) return <PageLayoutSpinner />;
    return (
            <Flex flexDir={canRenderNavbar ? "column" : "row"}>
                {/* side bar on the left */}
                {canRenderSidebar?(
                <Box w={{base:'70px',md:'240px'}}>
                    <SideBar authUser={authUser} onLogout={onLogout}/>
                </Box>):null
                }
                {/* Navbar on the top */}
                {canRenderNavbar ? <Navbar authUser={authUser} onLogout={onLogout}  /> : null}

                {/* content on the right */}
                <Box flex={1} w={{base:'calc(100%-70px)',md:'calc(100%-240px)'}}>
                    {children}
                </Box>
            </Flex>
    );
};

export default PageLayout;

const PageLayoutSpinner = () => {
	return (
		<Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
			<Spinner size='xl' />
		</Flex>
	);
};
