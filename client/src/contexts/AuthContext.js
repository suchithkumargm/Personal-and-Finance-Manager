import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isAccountVerified, setIsAccountVerified] = useState(false);

    const checkAccountVerification = async (userName) => {
        try {
            const response = await fetch('http://localhost:5000/auth/user/check-verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName }), // Stringify the body
            });

            if (response.ok) {
                const result = await response.json();
                if (result.verified) {
                    setIsAccountVerified(true);
                }
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <AuthContext.Provider value={{ isAccountVerified, setIsAccountVerified, checkAccountVerification }}>
            {children}
        </AuthContext.Provider>
    );
};
