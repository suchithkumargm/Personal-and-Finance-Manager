import React from 'react';

import { DialogProvider } from './contexts/DialogContext.js';
import { AuthProvider } from './contexts/AuthContext.js';

const AppProviders = ({ children }) => {
    return (
        <AuthProvider>
            <DialogProvider>
                {children}
            </DialogProvider>
        </AuthProvider>
    );
};

export default AppProviders;
