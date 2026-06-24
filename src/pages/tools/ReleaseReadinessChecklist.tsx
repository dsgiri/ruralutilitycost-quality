import React, { useState } from 'react';
import SEO from '../../components/SEO';
import { ArrowLeft, CheckCircle2, Lock, Unlock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ReleaseReadinessChecklist() {
  const [checks, setChecks] = useState({
    labResults: false,
    qaSignOff: false,
    labelAccuracy: false,
    metalDetection: false,
    tempLog: false,
  });

  const handleToggle = (key: keyof typeof checks) => {
    setChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isReady = Object.values(checks).every(Boolean);

  return (
    <div className="py-12 md:py-20 bg-slate-50 min-h-full">
      <SEO 
        title="Release Readiness Checklist | Quality Hub" 
        description="Final verification steps to ensure product meets all criteria before shipping."
        url="https://quality.ruralutilitycost.com/tools/release-readiness-checklist"
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Release Readiness Checklist</h1>
          <p className="mt-2 text-slate-600">Boolean gate verification for positive product release.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className={`p-8 text-center text-white transition-colors duration-500 ${isReady ? 'bg-emerald-600' : 'bg-slate-800'}`}>
            <div className="flex justify-center mb-4">
              {isReady ? <Unlock className="w-16 h-16" /> : <Lock className="w-16 h-16" />}
            </div>
            <h2 className="text-3xl font-black tracking-tight mb-2 uppercase">
              {isReady ? 'READY FOR RELEASE' : 'PRODUCT ON HOLD'}
            </h2>
            <p className="text-white/80 font-medium">
              {isReady 
                ? 'All critical control points verified. Product is cleared to ship.' 
                : 'Pending critical verification steps. Do not release.'}
            </p>
          </div>

          <div className="p-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Verification Gates</h3>
            
            <div className="space-y-3">
              <button 
                onClick={() => handleToggle('labResults')}
                className={`w-full flex items-center justify-between p-4 rounded-lg border-2 text-left transition-all ${checks.labResults ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-slate-200 hover:border-slate-300 text-slate-700'}`}
              >
                <div>
                  <div className="font-semibold text-lg mb-1">Laboratory Results Received & Passed</div>
                  <div className="text-sm opacity-80">Microbial and chemical analysis COA is attached to batch record.</div>
                </div>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${checks.labResults ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                  {checks.labResults && <CheckCircle2 className="w-5 h-5" />}
                </div>
              </button>

              <button 
                onClick={() => handleToggle('qaSignOff')}
                className={`w-full flex items-center justify-between p-4 rounded-lg border-2 text-left transition-all ${checks.qaSignOff ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-slate-200 hover:border-slate-300 text-slate-700'}`}
              >
                <div>
                  <div className="font-semibold text-lg mb-1">QA Manager Sign-off</div>
                  <div className="text-sm opacity-80">Authorized signature applied to the final batch production record.</div>
                </div>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${checks.qaSignOff ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                  {checks.qaSignOff && <CheckCircle2 className="w-5 h-5" />}
                </div>
              </button>

              <button 
                onClick={() => handleToggle('metalDetection')}
                className={`w-full flex items-center justify-between p-4 rounded-lg border-2 text-left transition-all ${checks.metalDetection ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-slate-200 hover:border-slate-300 text-slate-700'}`}
              >
                <div>
                  <div className="font-semibold text-lg mb-1">CCP: Metal Detection Passed</div>
                  <div className="text-sm opacity-80">100% of units passed through calibrated metal detector at end of line.</div>
                </div>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${checks.metalDetection ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                  {checks.metalDetection && <CheckCircle2 className="w-5 h-5" />}
                </div>
              </button>

              <button 
                onClick={() => handleToggle('labelAccuracy')}
                className={`w-full flex items-center justify-between p-4 rounded-lg border-2 text-left transition-all ${checks.labelAccuracy ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-slate-200 hover:border-slate-300 text-slate-700'}`}
              >
                <div>
                  <div className="font-semibold text-lg mb-1">Labeling & Coding Verified</div>
                  <div className="text-sm opacity-80">Lot codes, use-by dates, and allergen statements physically verified.</div>
                </div>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${checks.labelAccuracy ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                  {checks.labelAccuracy && <CheckCircle2 className="w-5 h-5" />}
                </div>
              </button>

              <button 
                onClick={() => handleToggle('tempLog')}
                className={`w-full flex items-center justify-between p-4 rounded-lg border-2 text-left transition-all ${checks.tempLog ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-slate-200 hover:border-slate-300 text-slate-700'}`}
              >
                <div>
                  <div className="font-semibold text-lg mb-1">Cold Chain / Storage Temp Verified</div>
                  <div className="text-sm opacity-80">Continuous temperature logs reviewed for entire holding period.</div>
                </div>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${checks.tempLog ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                  {checks.tempLog && <CheckCircle2 className="w-5 h-5" />}
                </div>
              </button>
            </div>
          </div>
        </div>

        {!isReady && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 text-amber-800">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">Missing dependencies must be resolved before the Positive Release certificate can be generated.</p>
          </div>
        )}
      </div>
    </div>
  );
}
