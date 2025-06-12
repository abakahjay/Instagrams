import { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [sideBarVisible, setSideBarVisible] = useState(false);

    const toggleSidebar = () => {
        setSideBarVisible(prev => !prev);
    };

    return (
        <SidebarContext.Provider value={{ sideBarVisible, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebarContext = () => {
    return useContext(SidebarContext);
};
