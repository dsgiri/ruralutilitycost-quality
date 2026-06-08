import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, CheckSquare } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: 'https://ruralutilitycost.com' },
    { name: 'Plan', href: 'https://plan.ruralutilitycost.com' },
    { name: 'Forecast', href: 'https://forecast.ruralutilitycost.com' },
    { name: 'What If', href: 'https://whatif.ruralutilitycost.com' },
    { name: 'Predictor', href: 'https://predictor.ruralutilitycost.com' },
    { name: 'Quality', href: '/', isLocal: true },
    { name: 'My favorites', href: '/favorites', isLocal: true },
    { name: 'About', href: '/about', isLocal: true },
    { name: 'Contact', href: '/contact', isLocal: true },
    { name: 'Legal', href: '/legal', isLocal: true },
    { name: 'License', href: '/legal', isLocal: true },
    { name: 'GitHub', href: 'https://github.com/ruralutilitycost', isLocal: false },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="flex items-center gap-2 group">
                  <div className="bg-emerald-700 text-white p-1.5 rounded-md group-hover:bg-emerald-800 transition-colors">
                    <CheckSquare size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg leading-tight text-slate-900 tracking-tight">Rural Utility Cost</span>
                    <span className="text-xs text-emerald-700 font-medium tracking-wide uppercase">Quality Assurance</span>
                  </div>
                </Link>
              </div>
              <nav className="hidden md:ml-8 md:flex md:space-x-1 lg:space-x-4 items-center">
                {navLinks.map((link) => (
                  link.isLocal ? (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={`inline-flex items-center px-2 py-1.5 text-sm font-medium rounded-md transition-colors ${
                        location.pathname === link.href
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      key={link.name}
                      href={link.href}
                      className="inline-flex items-center px-2 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                    >
                      {link.name}
                    </a>
                  )
                ))}
              </nav>
            </div>
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200">
            <div className="pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                link.isLocal ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                      location.pathname === link.href
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                        : 'border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800'
                    }`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800"
                  >
                    {link.name}
                  </a>
                )
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <CheckSquare size={24} className="text-emerald-500" />
                <span className="font-semibold text-lg text-white">Rural Utility Cost</span>
              </div>
              <p className="text-sm text-slate-400 mb-4">
                Practical, clear, and dependable tools for rural agricultural decision-makers. Quality assurance, forecasting, and planning made accessible.
              </p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Ecosystem</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="https://ruralutilitycost.com" className="hover:text-white transition-colors">Home Master Site</a></li>
                <li><a href="https://plan.ruralutilitycost.com" className="hover:text-white transition-colors">Plan</a></li>
                <li><a href="https://forecast.ruralutilitycost.com" className="hover:text-white transition-colors">Forecast</a></li>
                <li><a href="https://predictor.ruralutilitycost.com" className="hover:text-white transition-colors">Predictor</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Quality Hub</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">Quality Tools</Link></li>
                <li><Link to="/favorites" className="hover:text-white transition-colors">My Favorites</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About Quality</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Legal</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/legal" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/legal" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/legal" className="hover:text-white transition-colors">Disclaimer</Link></li>
                <li><Link to="/legal" className="hover:text-white transition-colors">License</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-sm grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <p>&copy; {new Date().getFullYear()} Rural Utility Cost. All rights reserved.</p>
            <div className="flex md:justify-end gap-6">
              <a href="https://github.com/ruralutilitycost" className="text-slate-400 hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
