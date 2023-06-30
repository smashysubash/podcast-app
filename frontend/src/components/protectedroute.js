import React from 'react';
import {Navigate } from 'react-router-dom';

const ProtectedRoute = ({ Component, token }) => {
  console.log("hiii"+token+"  g")
  return (
    token ? <Component /> : <Navigate to="/login" />
  );
};

export default ProtectedRoute;
