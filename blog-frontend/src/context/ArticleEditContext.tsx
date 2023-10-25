import { createContext, useContext, useState } from 'react';

interface ArticleEditData {
  content: string;
  title: string;
  description: string;
  contentModified: boolean;
  fromPage: string;
  setContent: (content: string) => void;
  setTitle: (title: string) => void;
  setDescription: (title: string) => void;
  setContentModified: (contentModified: boolean) => void;
  setFromPage: (fromPage: string) => void;
  reset: () => void;
}

export const ArticleEditContext = createContext<ArticleEditData | undefined>(
  undefined
);

export const ArticleEditProvider = ({ children }) => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contentModified, setContentModified] = useState(false);
  const [fromPage, setFromPage] = useState('/');

  const reset = () => {
    setContent('');
    setTitle('');
    setDescription('');
    setContentModified(false);
  };

  const articleEditData: ArticleEditData = {
    content,
    title,
    description,
    contentModified,
    fromPage,
    setContent,
    setTitle,
    setDescription,
    setContentModified,
    setFromPage,
    reset,
  };

  return (
    <ArticleEditContext.Provider value={articleEditData}>
      {children}
    </ArticleEditContext.Provider>
  );
};

export const useArticleDataContext = (): ArticleEditData => {
  const context = useContext(ArticleEditContext);

  if (context === undefined) {
    throw new Error(
      'useArticleDataContext must be used within an ArticleEditProvider'
    );
  }

  return context;
};
