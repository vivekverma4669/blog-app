// import React, { useContext } from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { AuthContext } from './AuthContext';

// const PrivateRoute = ({ element }) => {
//   const { loggedIn } = useContext(AuthContext);

//   if (loggedIn) {
//     return element;
//   }else {
//     alert("login first ");
//     return <Navigate to="/login" />;
//   }
// };

// export default PrivateRoute;
import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children}) => {
  const { loggedIn } = useContext(AuthContext);

  if (!loggedIn) {
    alert("Login first");
    return <Navigate to="/login" />;
  }
    return children;
  
};

export default PrivateRoute;