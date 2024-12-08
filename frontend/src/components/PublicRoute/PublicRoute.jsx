import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return user ? <Navigate to="/boards" replace /> : children;
};

export default PublicRoute;