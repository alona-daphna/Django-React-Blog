import { Navbar } from '../components/Navbar';
import { useEffect, useState } from 'react';
import { Article } from '../utils/types';
import { ArticleReadCard } from '../components/ArticleReadCard';
import { GET_ARTICLES_NO_CONTENT, fetchAllArticles } from '../utils/api';
import { useQuery } from '@apollo/client';

export const AllArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchedArticles, setSearchedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { refetch } = useQuery(GET_ARTICLES_NO_CONTENT, {
    skip: true,
  });

  const handleSearch = async (e) => {
    setSearchedArticles(
      articles.filter(
        (article) =>
          article.content
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          article.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    const fetchArticles = async () => {
      // const { data } = await refetch();
      // setArticles(data.allArticles);
      // setSearchedArticles(data.allArticles);

      const result = await fetchAllArticles();
      setArticles(result.articles);
      setSearchedArticles(result.articles);
      setLoading(false);
    };

    fetchArticles();
  }, []);
  return (
    <>
      <Navbar />
      {!loading && (
        <div className="all-articles">
          <input type="text" placeholder="Search" onInput={handleSearch} />
          <div className="searched-articles">
            {searchedArticles.map((article: Article) => {
              return <ArticleReadCard key={article.id} article={article} />;
            })}
          </div>
        </div>
      )}
    </>
  );
};
