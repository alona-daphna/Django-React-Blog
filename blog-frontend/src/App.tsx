import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { Home } from './views/Home';
import { AdminLogin } from './views/AdminLogin';
import { ArticleMeta } from './views/ArticleMeta';
import { ArticlePreview } from './views/ArticlePreview';
import { ArticleRead } from './views/ArticleRead';
import { Markdown } from './views/Markdown';
import { PrivateRoute } from './utils/PrivateRoute';
import { IdRoute } from './utils/IdRoute';
import { AllArticles } from './views/AllArticles';
import { ArticleEditProvider } from './context/ArticleEditContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ArticleEditProvider>
          <Routes>
            <Route element={<PrivateRoute />}>
              {/* creating new article */}
              <Route path="/edit/markdown" element={<Markdown />} />
              <Route path="/edit/meta" element={<ArticleMeta />} />
              <Route path="/edit/preview" element={<ArticlePreview />} />
              {/* editing existing article */}
              <Route element={<IdRoute />}>
                <Route
                  path="/edit/markdown/:articleId"
                  element={<Markdown />}
                />
                <Route path="/edit/meta/:articleId" element={<ArticleMeta />} />
                <Route
                  path="/edit/preview/:articleId"
                  element={<ArticlePreview />}
                />
              </Route>
            </Route>

            <Route path="/" element={<Home />} />
            <Route path="/read" element={<AllArticles />} />
            <Route element={<IdRoute />}>
              <Route path="/read/:articleId" element={<ArticleRead />} />
            </Route>
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="*" element={<Navigate to={'/'} />} />
          </Routes>
        </ArticleEditProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
