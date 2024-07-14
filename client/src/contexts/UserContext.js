import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [currentLoggedInUser, setCurrentLoggedInUser] = useState({
        name: "",
        userName: "",
        email: "",
        profilePhoto: "",
        verified: ""
    });

    useEffect(() => {

    }, [])


    return (
        <UserContext.Provider value={{ currentLoggedInUser, setCurrentLoggedInUser }}>
            {children}
        </UserContext.Provider>
    );
};
