import React from 'react';

import { DialogProvider } from '../contexts/DialogContext.js';
import { AuthProvider } from '../contexts/AuthContext.js';
import { UserProvider } from '../contexts/UserContext.js'

const AppProviders = ({ children }) => {
    return (
        <UserProvider>
            <AuthProvider>
                <DialogProvider>
                    {children}
                </DialogProvider>
            </AuthProvider>
        </UserProvider>
    );
};

export default AppProviders;
