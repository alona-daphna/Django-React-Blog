import { useNavigate } from 'react-router-dom';
import { ArticleEditContext } from '../context/ArticleEditContext';
import { useContext } from 'react';

export const Navbar = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('token');
  const { setFromPage } = useContext(ArticleEditContext)!;

  const handleCreateClick = () => {
    setFromPage(window.location.pathname);
    navigate('/edit/markdown/');
  };

  return (
    <div className="nav-home">
      <h1 onClick={() => navigate('/')}>Self2.0</h1>
      <ul>
        <li onClick={() => navigate('/read')}>Read</li>
        <li>
          <button>Subscribe</button>
        </li>
        {isAdmin && (
          <li>
            <button onClick={handleCreateClick} className="btn-create">
              Create
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};
