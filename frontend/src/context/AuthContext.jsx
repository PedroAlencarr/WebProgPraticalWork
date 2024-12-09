import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  const loginUser = async (email, password, resetForm, navigate) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (response.ok) {
        fetchUserCurrent()
        console.log('Login realizado com sucesso:');
        resetForm();
        navigate('/boards');
      } else {
        const errorData = await response.json();
        console.log('Erro no login:', errorData.message);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async (navigate) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/api/users/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        console.log('Logout realizado com sucesso');
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        const errorData = await response.json();
        console.log('Erro no logout:', errorData.message);
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setLoading(false);
    }
  };

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
    <AuthContext.Provider value={{ user, setUser, loginUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
