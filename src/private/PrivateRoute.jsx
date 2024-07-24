// PrivateRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const {authReducer} = useSelector((state) => state);
    console.log(authReducer);
  return (
    <React.Fragment>
    <Route
      {...rest}
      element={!authReducer.logout ? <Element /> : <Navigate to="/" />}
    />
    </React.Fragment>
  );
};

export default PrivateRoute;
