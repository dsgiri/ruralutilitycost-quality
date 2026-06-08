import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useEffect } from 'react';
import { trackPageView } from '../utils/analytics';

export default function NotFound() {
  useEffect(() => {
    trackPageView('/404');
  }, []);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-slate-50">
      <h1 className="text-9xl font-bold text-slate-200 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Page Not Found</h2>
      <p className="text-lg text-slate-600 mb-8 text-center max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        <Home size={20} />
        Back to Homepage
      </Link>
    </div>
  );
}
