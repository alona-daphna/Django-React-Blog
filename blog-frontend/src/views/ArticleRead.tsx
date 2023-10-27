import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Article } from '../utils/types';
import { DELETE_ARTICLE, fetchArticleById } from '../utils/api';
import { ArticleEditContext } from '../context/ArticleEditContext';
import { useMutation } from '@apollo/client';
import ReactMarkdown from 'react-markdown';

export const ArticleRead = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article>();
  const { setFromPage } = useContext(ArticleEditContext)!;
  const [deleteArticle] = useMutation(DELETE_ARTICLE);

  let admin = localStorage.getItem('token');

  useEffect(() => {
    const fetchArticle = async () => {
      const article = await fetchArticleById(+articleId!);
      setArticle(article);
    };

    fetchArticle();
  }, []);

  const handleEditClick = () => {
    setFromPage(window.location.pathname);
    navigate(`/edit/markdown/${articleId}`);
  };

  const handleDeleteClick = async () => {
    try {
      await deleteArticle({
        variables: {
          id: articleId,
        },
      });

      navigate('/read');
    } catch (error) {
      console.log('GraphQL Delete Mutation Error: ' + error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="article-read">
        {admin && (
          <div className="admin-action">
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={handleDeleteClick}>Delete</button>
          </div>
        )}
        <h1 className="title">{article?.title}</h1>
        <div className="description">{article?.description}</div>
        <div className="actions">
          <p className="date">Oct 24, 2023</p>
          <div>
            <span>👏 131</span>
          </div>
        </div>
        {/* should be markdown */}
        <div className="content">
          <ReactMarkdown>{article?.content}</ReactMarkdown>
        </div>
      </div>
    </>
  );
};
