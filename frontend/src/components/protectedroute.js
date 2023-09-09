import React from 'react';
import {Navigate } from 'react-router-dom';

const ProtectedRoute = ({ Component}) => {
  const token = localStorage.getItem('usertoken')
  return (
    token ? <Component /> : <Navigate to="/login" />
  );
};

export default ProtectedRoute;
