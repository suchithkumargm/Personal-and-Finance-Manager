import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [currentLoggedInUser, setCurrentLoggedInUser] = useState("");

    return (
        <UserContext.Provider value={{ currentLoggedInUser, setCurrentLoggedInUser }}>
            {children}
        </UserContext.Provider>
    );
};
