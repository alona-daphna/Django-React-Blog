import { Outlet, Navigate, useParams } from 'react-router-dom';

export const IdRoute = () => {
  const { articleId } = useParams();
  return Number(articleId) ? <Outlet /> : <Navigate to={'/'} />;
};
