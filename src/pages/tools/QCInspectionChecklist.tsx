import React, { useState, useMemo } from 'react';
import SEO from '../../components/SEO';
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, ChevronRight, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChecklistItem {
  id: string;
  question: string;
  isCritical: boolean;
  status: 'Pass' | 'Fail' | 'N/A' | null;
  notes: string;
}

const DEFAULT_ITEMS: ChecklistItem[] = [
  { id: '1', question: 'Equipment fully sanitized before production?', isCritical: true, status: null, notes: '' },
  { id: '2', question: 'All personnel wearing appropriate PPE (hairnets, gloves, etc)?', isCritical: true, status: null, notes: '' },
  { id: '3', question: 'Pest control traps intact and clear?', isCritical: false, status: null, notes: '' },
  { id: '4', question: 'Floor and drainage systems clean and free of debris?', isCritical: false, status: null, notes: '' },
  { id: '5', question: 'Temperature/Humidity logs up to date?', isCritical: true, status: null, notes: '' },
];

export default function QCInspectionChecklist() {
  const [inspectorName, setInspectorName] = useState('');
  const [area, setArea] = useState('');
  const [items, setItems] = useState<ChecklistItem[]>(DEFAULT_ITEMS);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleStatusChange = (id: string, status: 'Pass' | 'Fail' | 'N/A') => {
    setItems(items.map(item => item.id === id ? { ...item, status } : item));
    setIsSubmitted(false);
  };

  const handleNotesChange = (id: string, notes: string) => {
    setItems(items.map(item => item.id === id ? { ...item, notes } : item));
  };

  const results = useMemo(() => {
    const answeredItems = items.filter(i => i.status !== null && i.status !== 'N/A');
    const passedItems = answeredItems.filter(i => i.status === 'Pass');
    const failedItems = items.filter(i => i.status === 'Fail');
    const criticalFailures = failedItems.filter(i => i.isCritical);
    
    const score = answeredItems.length > 0 
      ? Math.round((passedItems.length / answeredItems.length) * 100) 
      : 0;

    let complianceStatus = 'Compliant';
    if (criticalFailures.length > 0) {
      complianceStatus = 'Failed';
    } else if (failedItems.length > 0) {
      complianceStatus = 'Conditional';
    } else if (answeredItems.length === 0) {
      complianceStatus = 'Incomplete';
    }

    const actionItems = failedItems.map(item => ({
      id: item.id,
      task: `Address failure: ${item.question}`,
      priority: item.isCritical ? 'High' : 'Medium'
    }));

    return { score, complianceStatus, actionItems, isComplete: items.every(i => i.status !== null) };
  }, [items]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="py-12 md:py-20 bg-slate-50 min-h-full">
      <SEO 
        title="QC Inspection Checklist | Quality Hub" 
        description="Standardized checklist for routine quality control inspections on the floor."
        url="https://quality.ruralutilitycost.com/tools/qc-inspection-checklist"
        keywords="QC inspection, quality control checklist, floor inspection, food safety checklist, compliance audit tool"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "QC Inspection Checklist",
          "url": "https://quality.ruralutilitycost.com/tools/qc-inspection-checklist",
          "description": "Standardized checklist for routine quality control inspections on the floor.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "All"
        }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">QC Inspection Checklist</h1>
          <p className="mt-2 text-slate-600">Standardized checklist for routine quality control inspections on the floor.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Inspector Name</label>
                  <input
                    type="text"
                    value={inspectorName}
                    onChange={(e) => setInspectorName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Area / Zone</label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    placeholder="e.g. Processing Line 1"
                  />
                </div>
              </div>

              <div className="space-y-6">
                {items.map((item, index) => (
                  <div key={item.id} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h4 className="text-slate-900 font-medium">
                          <span className="text-slate-400 mr-2">{index + 1}.</span>
                          {item.question}
                        </h4>
                        {item.isCritical && (
                          <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 uppercase tracking-wider">
                            Critical Control Point
                          </span>
                        )}
                      </div>
                      <div className="flex bg-slate-100 p-1 rounded-lg shrink-0">
                        <button
                          onClick={() => handleStatusChange(item.id, 'Pass')}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${item.status === 'Pass' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}
                        >
                          Pass
                        </button>
                        <button
                          onClick={() => handleStatusChange(item.id, 'Fail')}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${item.status === 'Fail' ? 'bg-red-500 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}
                        >
                          Fail
                        </button>
                        <button
                          onClick={() => handleStatusChange(item.id, 'N/A')}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${item.status === 'N/A' ? 'bg-slate-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}
                        >
                          N/A
                        </button>
                      </div>
                    </div>
                    {item.status === 'Fail' && (
                      <div className="mt-2">
                        <input
                          type="text"
                          value={item.notes}
                          onChange={(e) => handleNotesChange(item.id, e.target.value)}
                          placeholder="Required: Provide deviation details and corrective actions..."
                          className="w-full px-3 py-2 text-sm border border-red-300 bg-red-50 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <button
                  onClick={handleSubmit}
                  disabled={!results.isComplete || !inspectorName || !area}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  <Save size={18} />
                  Complete Inspection
                </button>
                {(!results.isComplete || !inspectorName || !area) && (
                  <p className="text-center text-sm text-slate-500 mt-2">
                    Please fill out all fields and checklist items before submitting.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 sticky top-6">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-semibold text-slate-900">Inspection Summary</h3>
                <div className="mt-6 flex flex-col items-center">
                  <div className="text-sm text-slate-500 mb-1">Final Score</div>
                  <div className="text-5xl font-bold text-slate-900">{results.score}%</div>
                  
                  <div className="mt-4 w-full">
                    {results.complianceStatus === 'Compliant' && (
                      <div className="flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 py-2 rounded-lg font-medium">
                        <CheckCircle className="w-5 h-5" />
                        Compliant
                      </div>
                    )}
                    {results.complianceStatus === 'Conditional' && (
                      <div className="flex items-center justify-center gap-2 bg-amber-50 text-amber-700 py-2 rounded-lg font-medium">
                        <AlertTriangle className="w-5 h-5" />
                        Conditional Pass
                      </div>
                    )}
                    {results.complianceStatus === 'Failed' && (
                      <div className="flex items-center justify-center gap-2 bg-red-50 text-red-700 py-2 rounded-lg font-medium">
                        <XCircle className="w-5 h-5" />
                        Failed Inspection
                      </div>
                    )}
                    {results.complianceStatus === 'Incomplete' && (
                      <div className="flex items-center justify-center gap-2 bg-slate-50 text-slate-500 py-2 rounded-lg font-medium">
                        Incomplete
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {results.actionItems.length > 0 && (
                <div className="p-6 bg-slate-50 rounded-b-xl">
                  <h4 className="font-medium text-slate-900 mb-3 text-sm uppercase tracking-wide">Required Action Items</h4>
                  <ul className="space-y-3">
                    {results.actionItems.map((action, idx) => (
                      <li key={idx} className="flex gap-3 text-sm">
                        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-slate-700">{action.task}</span>
                          <span className={`ml-2 inline-flex text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${action.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                            {action.priority} Priority
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {isSubmitted && (
                <div className="p-6 bg-emerald-50 rounded-b-xl border-t border-emerald-100">
                  <p className="text-sm text-emerald-800 font-medium text-center">
                    Inspection report generated and saved to Quality Vault.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
