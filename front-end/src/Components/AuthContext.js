import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [user, setUser] = useState(() => localStorage.getItem('userEmail') || '');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setLoggedIn(true);
    }
  }, []);


 
  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
