import { useParams } from 'react-router-dom';

import { Navbar } from '../components/Navbar';
import { Navigate } from 'react-router-dom';

export const ArticleRead = () => {
  const { ArticleId } = useParams();

  return (
    <>
      {!Number(ArticleId) ? (
        <Navigate to={'/'} />
      ) : (
        <>
          <Navbar />
          <div>ArticleRead</div>
        </>
      )}
    </>
  );
};
