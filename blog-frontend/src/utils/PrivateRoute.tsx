import { Outlet, Navigate } from 'react-router-dom';

export const PrivateRoute = () => {
  let admin = true;

  return admin ? <Outlet /> : <Navigate to={'/'} />;
};
