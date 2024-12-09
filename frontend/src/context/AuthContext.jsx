import React, { createContext, useState, useEffect } from 'react';
import SnackbarMessage from '../components/SnackBar/SnackBar';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

   const showMessage = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

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
        showMessage('Successful login!', 'success');
        resetForm();
        navigate('/boards');
      } else {
        const errorData = await response.json();
        showMessage(errorData.message, 'error');
      }
    } catch (error) {
        showMessage(error, 'error');
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
        showMessage('Successful logout!', 'success');
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        const errorData = await response.json();
        showMessage(errorData.message, 'error');
      }
    } catch (error) {
        showMessage(error, 'error');
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
    <AuthContext.Provider value={{ user, setUser, loginUser, logoutUser, loading, showMessage }}>
      {children}
      <SnackbarMessage
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </AuthContext.Provider>
  );
};
