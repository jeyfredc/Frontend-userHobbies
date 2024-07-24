// PublicRoute.jsx
import React from 'react';
import {  Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../containers/Login';

const PublicRoute = () => {
  const {authReducer} = useSelector((state) => state);

  console.log(authReducer);
  return authReducer.logout ? <Navigate to="/userManagement" /> : <Login />;
};

export default PublicRoute;
