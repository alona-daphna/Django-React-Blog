import { useNavigate, useParams } from 'react-router-dom';
import { EditWrapper } from '../components/EditWrapper';
import { useContext, useEffect } from 'react';
import { ArticleEditContext } from '../context/ArticleEditContext';
import { fetchArticleById } from '../utils/api';

export const ArticleMeta = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const {
    title,
    setTitle,
    description,
    setDescription,
    contentModified,
    setContentModified,
  } = useContext(ArticleEditContext)!;

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
        previous={`/edit/markdown/${articleId ? articleId : ''}`}
        handleNextClick={() =>
          navigate(`/edit/preview/${articleId ? articleId : ''}`)
        }
        prevTitle="Markdown"
        nextTitle="Preview"
      >
        <div className="edit-meta">
          <form>
            <div className="input-group">
              <label>Title</label>
              <input
                className="title"
                type="text"
                value={title}
                onInput={(e) => {
                  setTitle(e.target.value);
                  setContentModified(true);
                }}
              />
            </div>

            <div className="input-group">
              <label>Description</label>
              <textarea
                className="description"
                value={description}
                onInput={(e) => {
                  setDescription(e.target.value);
                  setContentModified(true);
                }}
              />
            </div>

            <div className="input-group">
              <label>Thumbnail</label>
              <input
                className="thumbnail"
                type="file"
                accept=".jpg,.png,.webp"
              />
            </div>
          </form>
        </div>
      </EditWrapper>
    </>
  );
};
