import React, { useState } from 'react';
import SEO from '../../components/SEO';
import { ArrowLeft, Search, Plus, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LogEntry {
  id: string;
  timestamp: string;
  type: string;
  reporter: string;
  description: string;
  status: 'Open' | 'Closed';
}

export default function QALogbook() {
  const [entries, setEntries] = useState<LogEntry[]>([
    { id: 'LOG-001', timestamp: new Date().toISOString(), type: 'Deviation', reporter: 'J. Smith', description: 'Line 2 metal detector false-positive rate > 5%', status: 'Open' }
  ]);
  const [type, setType] = useState('Deviation');
  const [reporter, setReporter] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reporter || !description) return;

    setEntries([{
      id: `LOG-${String(entries.length + 1).padStart(3, '0')}`,
      timestamp: new Date().toISOString(),
      type,
      reporter,
      description,
      status: 'Open'
    }, ...entries]);

    setReporter('');
    setDescription('');
  };

  const toggleStatus = (id: string) => {
    setEntries(entries.map(e => e.id === id ? { ...e, status: e.status === 'Open' ? 'Closed' : 'Open' } : e));
  };

  return (
    <div className="py-12 md:py-20 bg-slate-50 min-h-full">
      <SEO 
        title="QA Logbook | Quality Hub" 
        description="Centralized digital log for recording deviations, corrective actions, and QA alerts."
        url="https://quality.ruralutilitycost.com/tools/qa-logbook"
        keywords="QA logbook, quality assurance log, corrective actions, CAPA tracking, deviation tracker, quality alerts"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "QA Logbook",
          "url": "https://quality.ruralutilitycost.com/tools/qa-logbook",
          "description": "Centralized digital log for recording deviations, corrective actions, and QA alerts.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "All"
        }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">QA Logbook</h1>
              <p className="mt-2 text-slate-600">Secure digital log for tracking deviations and corrective actions.</p>
            </div>
            <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-lg font-medium border border-amber-200">
              {entries.filter(e => e.status === 'Open').length} Open Issues
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                New Entry
              </h2>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Incident Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Deviation">Process Deviation</option>
                    <option value="Audit Finding">Audit Finding</option>
                    <option value="Customer Complaint">Customer Complaint</option>
                    <option value="Safety Incident">Safety Incident</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Reported By</label>
                  <input
                    type="text"
                    required
                    value={reporter}
                    onChange={(e) => setReporter(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Operator name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Details of the event..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Record Entry
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {entries.map(entry => (
              <div key={entry.id} className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-opacity ${entry.status === 'Closed' ? 'opacity-60' : ''}`}>
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-700">{entry.id}</span>
                    <span className="text-xs text-slate-500">{new Date(entry.timestamp).toLocaleString()}</span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${entry.type === 'Deviation' ? 'bg-orange-100 text-orange-800' : entry.type === 'Customer Complaint' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                    {entry.type}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-slate-800 whitespace-pre-wrap">{entry.description}</p>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-sm text-slate-500">Logged by: <span className="font-medium text-slate-700">{entry.reporter}</span></span>
                    <button 
                      onClick={() => toggleStatus(entry.id)}
                      className={`text-sm font-medium px-3 py-1 rounded-md transition-colors ${entry.status === 'Open' ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'}`}
                    >
                      {entry.status === 'Open' ? 'Mark Resolved' : 'Re-open'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
