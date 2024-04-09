import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  // Check if user data exists in localStorage
  const storedUser = localStorage.getItem('user');

  return storedUser ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;