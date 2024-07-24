// AppRouter.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute />} />
      <Route path="/login" element={<PublicRoute />} />
      <Route path="/userManagement" element={<PrivateRoute />} />
    </Routes>
  );
};

export default AppRouter;
