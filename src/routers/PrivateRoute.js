// PrivateRoute.jsx
import React from 'react';
import {  Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserTable from '../components/UsersManagment/UserTable';

const PrivateRoute = () => {
  const {authReducer} = useSelector((state) => state);

  return authReducer.logout ? <UserTable /> : <Navigate to="/login" />;
};

export default PrivateRoute;
