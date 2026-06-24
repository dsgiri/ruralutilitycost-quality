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

// Tools
import BatchConsistencyTracker from './pages/tools/BatchConsistencyTracker';
import QCInspectionChecklist from './pages/tools/QCInspectionChecklist';
import SamplingPlanBuilder from './pages/tools/SamplingPlanBuilder';
import SupplierQualityScorecard from './pages/tools/SupplierQualityScorecard';
import ContaminationRiskChecker from './pages/tools/ContaminationRiskChecker';
import ReleaseReadinessChecklist from './pages/tools/ReleaseReadinessChecklist';
import ProductStandardsTracker from './pages/tools/ProductStandardsTracker';
import QALogbook from './pages/tools/QALogbook';

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
            
            {/* Tool Routes */}
            <Route path="tools/batch-consistency-tracker" element={<BatchConsistencyTracker />} />
            <Route path="tools/qc-inspection-checklist" element={<QCInspectionChecklist />} />
            <Route path="tools/sampling-plan-builder" element={<SamplingPlanBuilder />} />
            <Route path="tools/supplier-quality-scorecard" element={<SupplierQualityScorecard />} />
            <Route path="tools/contamination-risk-checker" element={<ContaminationRiskChecker />} />
            <Route path="tools/release-readiness-checklist" element={<ReleaseReadinessChecklist />} />
            <Route path="tools/product-standards-tracker" element={<ProductStandardsTracker />} />
            <Route path="tools/qa-logbook" element={<QALogbook />} />
            
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
