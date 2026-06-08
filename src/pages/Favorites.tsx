import { useState, useEffect } from 'react';
import { TOOLS } from '../data';
import ToolCard from '../components/ToolCard';
import SEO from '../components/SEO';
import { QualityTool } from '../types';
import { Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const [favoriteTools, setFavoriteTools] = useState<QualityTool[]>([]);

  const loadFavorites = () => {
    const favoritesStr = localStorage.getItem('quality_favorites');
    if (favoritesStr) {
      const favoriteIds = JSON.parse(favoritesStr);
      const tools = TOOLS.filter(tool => favoriteIds.includes(tool.id));
      setFavoriteTools(tools);
    } else {
      setFavoriteTools([]);
    }
  };

  useEffect(() => {
    loadFavorites();
    
    // Listen for custom event from ToolCard
    window.addEventListener('favorites_updated', loadFavorites);
    return () => {
      window.removeEventListener('favorites_updated', loadFavorites);
    };
  }, []);

  return (
    <div className="py-12 md:py-20 bg-slate-50 min-h-full">
      <SEO 
        title="My Favorites" 
        description="Your saved quality assurance and control tools from the Rural Utility Cost hub."
        url="https://quality.ruralutilitycost.com/favorites"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-6">
            <ArrowLeft size={16} /> Back to all tools
          </Link>
          <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
            <div className="p-3 bg-rose-50 text-rose-500 rounded-xl">
              <Heart size={28} className="fill-current" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Favorites</h1>
              <p className="text-slate-600 mt-1">Your saved quality assurance and control tools.</p>
            </div>
          </div>
        </div>

        {favoriteTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteTools.map((tool) => (
              <ToolCard key={`fav-${tool.id}`} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 border-dashed rounded-2xl p-12 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No favorites yet</h3>
            <p className="text-slate-500 mb-6">
              You haven't saved any quality tools to your favorites list. Click the heart icon on any tool card to save it here for quick access later.
            </p>
            <Link to="/" className="inline-flex justify-center items-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors">
              Browse Tools
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
