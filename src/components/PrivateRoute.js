import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('authToken');  
  if (!token) {
    // Si no hay token, redirige al login
    return <Navigate to="/" replace />;
  }
  return element;
};

export default PrivateRoute;
