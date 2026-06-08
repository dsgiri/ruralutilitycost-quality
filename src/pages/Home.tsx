import { TOOLS } from '../data';
import ToolCard from '../components/ToolCard';
import AdContainer from '../components/AdContainer';
import SEO from '../components/SEO';
import { trackClick } from '../utils/analytics';
import { ShieldCheck, Target, ArrowRight } from 'lucide-react';

export default function Home() {
  const handleToolsClick = () => {
    trackClick('explore_tools_btn');
  };

  return (
    <div className="w-full">
      <SEO 
        title="Quality Tools & Checklists" 
        description="Standardize your quality operations with practical tools designed for feed, food, and agricultural producers."
        url="https://quality.ruralutilitycost.com/"
      />
      {/* Hero Section */}
      <section className="bg-slate-900 bg-opacity-95 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djI2SDI0VjM0SDFWMjJoMjNWMGgxMnYyMmgzNXYxMkgzNnoiLz48L2c+PC9nPjwvc3ZnPg==')] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <ShieldCheck size={18} />
              Quality Assurance & Control Hub
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Track standards. Prevent risk. Ensure consistency.
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
              Standardize your quality operations with practical tools designed for feed, food, and agricultural producers. Maintain batch consistency and prepare for confident releases.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#tools" onClick={handleToolsClick} className="inline-flex items-center min-h-[48px] justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-slate-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-emerald-500 transition-colors shadow-sm">
                Explore Quality Tools
              </a>
              <a href="/about" onClick={() => trackClick('learn_how_quality_works_btn')} className="inline-flex items-center min-h-[48px] justify-center px-6 py-3 border border-slate-600 text-base font-medium rounded-lg text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500 transition-colors">
                Learn How Quality Works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 md:flex md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Active Quality Checklists & Trackers</h2>
              <p className="text-lg text-slate-600">Standardized operational tools to log inspections, track compliance, and generate auditable quality records.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <a href="/favorites" className="inline-flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700 transition-colors group">
                View my saved tools <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {TOOLS.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          <div className="mt-12">
            <AdContainer slotId="home-tools-bottom" format="auto" />
          </div>
        </div>
      </section>

      {/* Explainer Section */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">How the Quality Hub Works</h2>
            <p className="text-lg text-slate-600">Built specifically for the rigorous demands of rural and agricultural operations, our quality modules integrate directly with the greater Rural Utility Cost ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 shadow-sm border border-blue-100">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">1. Select Standard</h3>
              <p className="text-slate-600">Choose the appropriate inspection template, sampling plan, or standard operating procedure tracker for your product line.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 shadow-sm border border-emerald-100">
                <CheckSquare size={32} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">2. Log Floor Data</h3>
              <p className="text-slate-600">Perform the checks on the floor, logging batch consistencies, verifying supplier inputs, and ensuring baseline metrics map to targets.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center mb-6 text-slate-700 shadow-sm border border-slate-200">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">3. Verify Release</h3>
              <p className="text-slate-600">Review readiness indicators before product leaves the facility. All outputs are estimate-based and serve as a reliable operational guide.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Ensure CheckSquare is available for the explainer section
import { CheckSquare } from 'lucide-react';
