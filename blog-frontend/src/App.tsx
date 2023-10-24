import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { Home } from './views/Home';
import { AdminLogin } from './views/AdminLogin';
import { ArticleMeta } from './views/ArticleMeta';
import { ArticlePreview } from './views/ArticlePreview';
import { ArticleRead } from './views/ArticleRead';
import { Markdown } from './views/Markdown';
import { PrivateRoute } from './utils/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/edit/markdown" element={<Markdown />} />
          <Route path="/edit/meta" element={<ArticleMeta />} />
          <Route path="/edit/preview" element={<ArticlePreview />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/read/:ArticleId" element={<ArticleRead />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
