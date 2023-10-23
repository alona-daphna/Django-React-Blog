import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ARTICLE } from './api.js';

export type Article = {
  id: Number;
  title: string;
  content: string;
};

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currArticle, setCurrArticle] = useState<Article | null>(null);
  const { refetch } = useQuery(GET_ARTICLE, {
    skip: true,
  });

  const handleClick = async () => {
    try {
      const result = await refetch({ id: 2 });
      setCurrArticle(result.data.articleById);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('http://localhost:8000/blog');
      const json = await response.json();
      setArticles(json.articles);
    };

    fetchArticles();
  }, []);

  return (
    <>
      <h1>React + Django Blog App</h1>
      <button onClick={handleClick}>fetch single article</button>
      {articles.map((article: Article) => (
        <p key={article.id}>{article.title}</p>
      ))}
      <br />
      {currArticle && <p>{currArticle.content}</p>}
    </>
  );
}

export default App;
