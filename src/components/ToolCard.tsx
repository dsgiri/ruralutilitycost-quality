import { QualityTool } from '../types';
import { Heart, ChevronRight, CheckCircle2, AlertTriangle, ListChecks, FileBox } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface ToolCardProps {
  tool: QualityTool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoritesStr = localStorage.getItem('quality_favorites');
    if (favoritesStr) {
      const favorites = JSON.parse(favoritesStr);
      setIsFavorite(favorites.includes(tool.id));
    }
  }, [tool.id]);

  const toggleFavorite = () => {
    const favoritesStr = localStorage.getItem('quality_favorites');
    let favorites: string[] = favoritesStr ? JSON.parse(favoritesStr) : [];
    
    if (favorites.includes(tool.id)) {
      favorites = favorites.filter(id => id !== tool.id);
      setIsFavorite(false);
    } else {
      favorites.push(tool.id);
      setIsFavorite(true);
    }
    
    localStorage.setItem('quality_favorites', JSON.stringify(favorites));
    // Dispatch a custom event so other components (like the favorites page) can update
    window.dispatchEvent(new Event('favorites_updated'));
  };

  const getCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes('risk') || category.toLowerCase().includes('contamination')) {
      return <AlertTriangle size={18} className="text-amber-500" />;
    }
    if (category.toLowerCase().includes('check') || category.toLowerCase().includes('readiness')) {
      return <ListChecks size={18} className="text-emerald-500" />;
    }
    if (category.toLowerCase().includes('batch') || category.toLowerCase().includes('traceability')) {
      return <FileBox size={18} className="text-blue-500" />;
    }
    return <CheckCircle2 size={18} className="text-slate-500" />;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col h-full group">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-xs font-medium text-slate-600">
            {getCategoryIcon(tool.category)}
            {tool.category}
          </div>
          <button 
            onClick={toggleFavorite}
            className={`p-1.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${isFavorite ? 'text-rose-500 bg-rose-50 hover:bg-rose-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
            aria-label={isFavorite ? `Remove ${tool.title} from favorites` : `Add ${tool.title} to favorites`}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart size={20} className={isFavorite ? "fill-current" : ""} />
          </button>
        </div>
        
        <h3 className="text-xl font-semibold text-slate-900 mb-2">{tool.title}</h3>
        <p className="text-slate-600 text-sm flex-1">{tool.description}</p>
        
        <div className="mt-6 pt-4 border-t border-slate-100">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-1">Primary Outcome</span>
          <span className="text-slate-800 text-sm font-medium">{tool.primaryOutcome}</span>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
        <Link 
          to={`/tools/${tool.id}`}
          className="w-full flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 py-2.5 px-4 rounded-lg font-medium text-sm hover:bg-slate-50 hover:border-slate-400 group-hover:border-emerald-500 group-hover:text-emerald-700 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          Launch Tool <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}
