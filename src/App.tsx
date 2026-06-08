import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import About from './pages/About';
import Legal from './pages/Legal';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { trackPageView } from './utils/analytics';

function PageTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);
  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <PageTracker />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="about" element={<About />} />
            <Route path="legal" element={<Legal />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
