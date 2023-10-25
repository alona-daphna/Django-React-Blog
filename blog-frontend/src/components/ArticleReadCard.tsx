import { useNavigate } from 'react-router-dom';

export const ArticleReadCard = ({ article }) => {
  const navigate = useNavigate();

  return (
    <div
      className="article-card"
      onClick={() => navigate(`/read/${article.id}`)}
    >
      {' '}
      <img src="./src/assets/thumbnail.jpg" />
      <div className="content">
        <h3>{article.title}</h3>
        <p className="description">{article.description}</p>
      </div>
    </div>
  );
};
