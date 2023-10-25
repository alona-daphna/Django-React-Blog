import { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { EditWrapper } from '../components/EditWrapper';
import { fetchArticleById } from '../utils/api';
import { ArticleEditContext } from '../context/ArticleEditContext';

export const Markdown = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const {
    content,
    setContent,
    setTitle,
    contentModified,
    setContentModified,
    fromPage,
  } = useContext(ArticleEditContext)!;

  const handleInputChange = (e) => {
    setContent(e.target.value);
    setContentModified(true);
  };

  useEffect(() => {
    const fetchArticle = async () => {
      const article = await fetchArticleById(+articleId!);
      setContent(article.content);
      setTitle(article.title);
    };

    if (!contentModified && articleId) {
      fetchArticle();
    }
  }, []);

  return (
    <>
      <EditWrapper
        previous={fromPage}
        handleNextClick={() =>
          navigate(`/edit/meta/${articleId ? articleId : ''}`)
        }
        prevTitle="Back"
        nextTitle="Edit meta stuff"
        resetContent={true}
      >
        <div className="article-markdown">
          <textarea
            className="editor"
            value={content}
            onInput={handleInputChange}
          ></textarea>
          <div className="preview article">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      </EditWrapper>
    </>
  );
};
