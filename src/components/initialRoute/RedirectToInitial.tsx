// src/components/RedirectToInitial.tsx
import { Navigate } from 'react-router-dom';

const RedirectToInitial = () => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
};

export default RedirectToInitial;
