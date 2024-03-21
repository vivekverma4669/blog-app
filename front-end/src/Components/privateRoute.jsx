import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children}) => {
  const { loggedIn , user } = useContext(AuthContext);
 
  if (user=='') {
    alert("Login first");
    return <Navigate to="/login" />;
  }
    return children;
  
};

export default PrivateRoute;