import { useParams, useNavigate } from 'react-router-dom';
import { EditWrapper } from '../components/EditWrapper';
import { useContext, useEffect } from 'react';
import { ArticleEditContext } from '../context/ArticleEditContext';
import { CREATE_ARTICLE, UPDATE_ARTICLE, fetchArticleById } from '../utils/api';
import { useMutation } from '@apollo/client';
import ReactMarkdown from 'react-markdown';

export const ArticlePreview = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const {
    title,
    setTitle,
    description,
    setDescription,
    content,
    contentModified,
    reset,
  } = useContext(ArticleEditContext)!;
  const [updateArticle] = useMutation(UPDATE_ARTICLE);
  const [createArticle] = useMutation(CREATE_ARTICLE);

  const handleUpload = async (e) => {
    if (articleId) {
      try {
        const { data } = await updateArticle({
          variables: {
            input: {
              id: articleId,
              title,
              description,
              content,
            },
          },
        });

        reset();
        navigate(`/read/${articleId}`);
      } catch (error) {
        console.log('GraphQL Update Mutation Error: ' + error);
      }
    } else {
      try {
        const { data } = await createArticle({
          variables: {
            input: {
              title,
              description,
              content,
            },
          },
        });
        reset();
        console.log(data.createArticle.article.id);
        navigate(`/read/${data.createArticle.article.id}`);
      } catch (error) {
        console.log('GraphQL Create Mutation Error: ' + error);
      }
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      const article = await fetchArticleById(+articleId!);
      setTitle(article.title);
      setDescription(article.description);
    };

    if (!contentModified && articleId) {
      fetchArticle();
    }
  }, []);

  return (
    <>
      <EditWrapper
        previous={`/edit/meta/${articleId ? articleId : ''}`}
        handleNextClick={handleUpload}
        prevTitle="Meta"
        nextTitle="Upload"
      >
        <div className="preview-page">
          <h1>Preview</h1>
          <div className="container">
            <h1 className="title">{title}</h1>
            <div className="description">{description}</div>
            <hr />
            <div className="content">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </EditWrapper>
    </>
  );
};
