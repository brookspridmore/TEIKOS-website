import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { DocsLayout } from './pages/docs/DocsLayout';
import { DocsIndexPage } from './pages/docs/DocsIndexPage';
import { DocsSectionPage } from './pages/docs/DocsSectionPage';
import { IntegrationLandingPage } from './pages/integrations/IntegrationLandingPage';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/integrations/:slug" element={<IntegrationLandingPage />} />
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<DocsIndexPage />} />
          <Route path="*" element={<DocsSectionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
