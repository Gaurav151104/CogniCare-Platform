import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('mockUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    if(!email || !password) return false;
    const mockUserData = { id: 1, name: 'John Doe', email };
    localStorage.setItem('mockUser', JSON.stringify(mockUserData));
    setUser(mockUserData);
    return true;
  };

  const register = (userData) => {
    const mockUserData = { id: 2, ...userData };
    localStorage.setItem('mockUser', JSON.stringify(mockUserData));
    setUser(mockUserData);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('mockUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
