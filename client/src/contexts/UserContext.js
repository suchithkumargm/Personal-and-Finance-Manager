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

    const fetchUserDetails = async () => {
        try {
            const response = await fetch('http://localhost:5000/user/fetch-user-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken')
                }
            });

            if (response.ok) {
                const result = await response.json();
                setCurrentLoggedInUser(result)

            } else {
                console.log("User does not exist");
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    const userLogout = () => {
        localStorage.clear();
        setCurrentLoggedInUser({
            name: "",
            userName: "",
            email: "",
            profilePhoto: "",
            verified: ""
        })
    }

    return (
        <UserContext.Provider value={{ currentLoggedInUser, setCurrentLoggedInUser, fetchUserDetails, userLogout }}>
            {children}
        </UserContext.Provider>
    );
};
