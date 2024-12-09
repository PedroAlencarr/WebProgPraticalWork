import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserCurrent = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/api/users/current`, {
        credentials: 'include',
      });

      if (response.ok) {
        const userData = await response.json();
        setUserId(userData);
        fetchUser(userData._id)
      } else {
        setUserId(null);
      }
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        setUserId(null);
    } finally {
        setLoading(false);
    }
  };

  const fetchUser = async (userId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/api/users/${userId}`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error('Erro ao buscar o nome do usuário');
      }
    } catch (error) {
      console.error('Erro ao buscar o nome do usuário:', error);
    }
  };

  useEffect(() => {
    fetchUserCurrent();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, fetchUserCurrent }}>
      {children}
    </AuthContext.Provider>
  );
};
