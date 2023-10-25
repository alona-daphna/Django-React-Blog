import { Outlet, Navigate } from 'react-router-dom';

export const PrivateRoute = () => {
  let admin = true || localStorage.getItem('token');

  return admin ? <Outlet /> : <Navigate to={'/'} />;
};
