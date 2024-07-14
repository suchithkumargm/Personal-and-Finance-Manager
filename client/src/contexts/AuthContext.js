import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isLoginPinSet, setIsLoginPinSet] = useState(false);

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
                return result.verified;
            } else {
                console.log(response.json())
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    const checkLoginPinSetStatus = async () => {
        try {
            const response = await fetch('http://localhost:5000/auth/user/check-login-pin-status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken')
                }
            });

            if (response.ok) {
                const result = await response.json();
                if (result.pinSet) {
                    setIsLoginPinSet(true);
                } else {
                    setIsLoginPinSet(false);
                }
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <AuthContext.Provider value={{ checkAccountVerification, isLoginPinSet, setIsLoginPinSet, checkLoginPinSetStatus }}>
            {children}
        </AuthContext.Provider>
    );
};
