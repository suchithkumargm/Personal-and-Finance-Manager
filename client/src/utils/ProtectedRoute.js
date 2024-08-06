import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext.js'

const ProtectedRoute = ({ children }) => {
    const { currentLoggedInUser } = useContext(UserContext);

    if (currentLoggedInUser.userName === "") {
        // Redirect to login page
        return <Navigate to="/auth/user/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
