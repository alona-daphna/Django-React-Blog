import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ArticleEditContext } from '../context/ArticleEditContext';

export const EditWrapper = ({
  previous,
  handleNextClick,
  prevTitle,
  nextTitle,
  resetContent = false,
  children,
}) => {
  const navigate = useNavigate();
  const { setContentModified, setContent, setDescription, reset } =
    useContext(ArticleEditContext)!;

  const handleBackClick = () => {
    if (resetContent) {
      reset();
    }
    navigate(previous);
  };

  return (
    <div className="edit-wrapper">
      <div className="edit-nav">
        <h1 onClick={handleBackClick}>&lt; {prevTitle}</h1>
      </div>
      {children}
      <div className="bottom-action">
        <button onClick={handleNextClick}>{nextTitle} &gt;</button>
      </div>
    </div>
  );
};
