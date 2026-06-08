import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 text-white p-4 z-[60] shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm">
          We use cookies and similar technologies to help personalize content, tailor and measure ads, and provide a better experience. By clicking accept, you agree to this, as outlined in our Cookie Policy.
        </div>
        <div className="flex shrink-0 gap-3">
          <button 
            onClick={handleAccept}
            className="whitespace-nowrap px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded text-sm transition-colors focus:ring-2 focus:ring-emerald-400 focus:outline-none"
          >
            Accept Cookies
          </button>
        </div>
      </div>
    </div>
  );
}
