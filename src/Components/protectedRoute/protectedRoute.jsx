import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) =>{
    const { user } = useSelector((state) => state.user); // Assuming auth state contains user data

    return user ? children : <Navigate to="/" />;
}

export default ProtectedRoute

