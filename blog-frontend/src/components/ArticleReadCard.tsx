import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const ArticleReadCard = ({ article }) => {
  const navigate = useNavigate();
  const formattedDate = useMemo(() => {
    return new Date(article.createdAt);
  }, [article]);

  return (
    <div
      className="article-card"
      onClick={() => navigate(`/read/${article.id}`)}
    >
      <div className="content">
        <h2>{article.title}</h2>
        <p className="description">{article.description}</p>
        <p className="date">{formattedDate.toDateString()}</p>
      </div>
    </div>
  );
};
