import React, { useState, useMemo } from 'react';
import SEO from '../../components/SEO';
import { ArrowLeft, Plus, AlertCircle, CheckCircle, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BatchRecord {
  id: string;
  batchId: string;
  date: string;
  targetWeight: number;
  actualWeight: number;
  temperature: number;
  phLevel: number;
  visualScore: number; // 1-10
}

export default function BatchConsistencyTracker() {
  const [batches, setBatches] = useState<BatchRecord[]>([]);
  
  const [batchId, setBatchId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [targetWeight, setTargetWeight] = useState('');
  const [actualWeight, setActualWeight] = useState('');
  const [temperature, setTemperature] = useState('');
  const [phLevel, setPhLevel] = useState('');
  const [visualScore, setVisualScore] = useState('10');

  const handleAddBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchId || !targetWeight || !actualWeight) return;

    const newBatch: BatchRecord = {
      id: crypto.randomUUID(),
      batchId,
      date,
      targetWeight: parseFloat(targetWeight),
      actualWeight: parseFloat(actualWeight),
      temperature: parseFloat(temperature) || 0,
      phLevel: parseFloat(phLevel) || 7,
      visualScore: parseInt(visualScore, 10) || 10,
    };

    setBatches([...batches, newBatch]);
    
    // Reset some fields but keep target weight and date for convenience
    setBatchId('');
    setActualWeight('');
    setTemperature('');
    setPhLevel('');
    setVisualScore('10');
  };

  const deleteBatch = (id: string) => {
    setBatches(batches.filter(b => b.id !== id));
  };

  // Calculations
  const stats = useMemo(() => {
    if (batches.length === 0) return null;

    let totalVariance = 0;
    let outOfBoundsCount = 0;
    
    // Check for drift: 3 consecutive batches drifting in the same direction from mean
    // Just a simple check: are the last 3 variances consistently increasing or decreasing?
    
    const processedBatches = batches.map((b, index) => {
      const variance = ((b.actualWeight - b.targetWeight) / b.targetWeight) * 100;
      const isOutOfBounds = Math.abs(variance) > 2; // +/- 2% acceptable
      if (isOutOfBounds) outOfBoundsCount++;
      totalVariance += variance;
      
      let status = 'Pass';
      if (isOutOfBounds) {
        status = Math.abs(variance) > 5 ? 'Reject' : 'Review';
      }

      return { ...b, variance, isOutOfBounds, status };
    });

    const meanVariance = totalVariance / batches.length;
    const consistencyScore = Math.max(0, 100 - (outOfBoundsCount / batches.length) * 100);

    let driftWarning = false;
    if (processedBatches.length >= 3) {
      const last3 = processedBatches.slice(-3);
      const isConsistentDriftUp = last3[0].variance < last3[1].variance && last3[1].variance < last3[2].variance && last3[2].variance > 0;
      const isConsistentDriftDown = last3[0].variance > last3[1].variance && last3[1].variance > last3[2].variance && last3[2].variance < 0;
      if (isConsistentDriftUp || isConsistentDriftDown) {
        driftWarning = true;
      }
    }

    return {
      processedBatches,
      consistencyScore,
      meanVariance,
      driftWarning
    };

  }, [batches]);

  return (
    <div className="py-12 md:py-20 bg-slate-50 min-h-full">
      <SEO 
        title="Batch Consistency Tracker | Quality Hub" 
        description="Monitor variations across production batches to ensure uniform quality standards."
        url="https://quality.ruralutilitycost.com/tools/batch-consistency-tracker"
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Batch Consistency Tracker</h1>
          <p className="mt-2 text-slate-600">Monitor variations across production batches to ensure uniform quality standards.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Data Entry Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Log New Batch</h2>
              <form onSubmit={handleAddBatch} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Batch ID</label>
                  <input
                    type="text"
                    required
                    value={batchId}
                    onChange={(e) => setBatchId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="e.g., BATCH-001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Production Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Target Wt/Vol</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={targetWeight}
                      onChange={(e) => setTargetWeight(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Actual Wt/Vol</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={actualWeight}
                      onChange={(e) => setActualWeight(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Temp (°C/F)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">pH Level</label>
                    <input
                      type="number"
                      step="0.1"
                      value={phLevel}
                      onChange={(e) => setPhLevel(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Visual Inspection Score (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    required
                    value={visualScore}
                    onChange={(e) => setVisualScore(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Batch Record
                </button>
              </form>
            </div>
          </div>

          {/* Results & Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {stats ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                    <h3 className="text-sm font-medium text-slate-500 mb-1">Consistency Score</h3>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold text-slate-900">{stats.consistencyScore.toFixed(0)}%</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                    <h3 className="text-sm font-medium text-slate-500 mb-1">Mean Variance</h3>
                    <div className="flex items-end gap-2">
                      <span className={`text-3xl font-bold ${Math.abs(stats.meanVariance) > 2 ? 'text-red-600' : 'text-slate-900'}`}>
                        {stats.meanVariance > 0 ? '+' : ''}{stats.meanVariance.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                    <h3 className="text-sm font-medium text-slate-500 mb-1">Total Batches</h3>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold text-slate-900">{batches.length}</span>
                    </div>
                  </div>
                </div>

                {stats.driftWarning && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-amber-800">
                    <TrendingDown className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-900">Trend Warning</h4>
                      <p className="text-sm mt-1">The last 3 batches show a consistent drift from the target mean. Check equipment calibration or raw material variations.</p>
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-200">
                    <h3 className="font-semibold text-slate-900">Batch History</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                          <th className="px-6 py-3 font-medium">Batch ID</th>
                          <th className="px-6 py-3 font-medium">Variance</th>
                          <th className="px-6 py-3 font-medium">Status</th>
                          <th className="px-6 py-3 font-medium">Visual</th>
                          <th className="px-6 py-3 font-medium text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-sm">
                        {stats.processedBatches.map((batch) => (
                          <tr key={batch.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium text-slate-900">{batch.batchId}</div>
                              <div className="text-xs text-slate-500">{batch.date}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`font-medium ${batch.isOutOfBounds ? 'text-red-600' : 'text-green-600'}`}>
                                {batch.variance > 0 ? '+' : ''}{batch.variance.toFixed(2)}%
                              </span>
                              <div className="text-xs text-slate-500">
                                {batch.actualWeight} / {batch.targetWeight}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {batch.status === 'Pass' && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <CheckCircle className="w-3 h-3" />
                                  Pass
                                </span>
                              )}
                              {batch.status === 'Review' && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                  <AlertCircle className="w-3 h-3" />
                                  Review
                                </span>
                              )}
                              {batch.status === 'Reject' && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  <AlertCircle className="w-3 h-3" />
                                  Reject
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-slate-900">{batch.visualScore}/10</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <button 
                                onClick={() => deleteBatch(batch.id)}
                                className="text-slate-400 hover:text-red-600 transition-colors"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">No batches logged yet</h3>
                <p className="text-slate-500 max-w-sm">
                  Add your first batch record using the form to see consistency metrics, variance analysis, and trend warnings.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
