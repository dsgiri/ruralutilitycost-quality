import React, { useState, useMemo } from 'react';
import SEO from '../../components/SEO';
import { ArrowLeft, Star, TrendingUp, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SupplierQualityScorecard() {
  const [supplierName, setSupplierName] = useState('');
  const [totalUnits, setTotalUnits] = useState('');
  const [rejectedUnits, setRejectedUnits] = useState('');
  const [onTimeDelivery, setOnTimeDelivery] = useState('100');
  const [docAccuracy, setDocAccuracy] = useState('5'); // 1-5 scale

  const scoreData = useMemo(() => {
    const units = parseFloat(totalUnits) || 0;
    const rejected = parseFloat(rejectedUnits) || 0;
    const delivery = parseFloat(onTimeDelivery) || 0;
    const docs = parseInt(docAccuracy, 10) || 0;

    if (units === 0) return null;

    // Sub-scores
    const defectRate = (rejected / units) * 100;
    // Map defect rate to a 0-100 score. Assuming >5% defect is 0 score. 0% defect is 100 score.
    const defectScoreRaw = 100 - (defectRate * 20); 
    const defectScore = Math.max(0, Math.min(100, defectScoreRaw));

    const deliveryScore = Math.max(0, Math.min(100, delivery));
    
    // Map 1-5 to 0-100
    const docScore = (docs / 5) * 100;

    // Weighted Total: Defect (50%), Delivery (30%), Docs (20%)
    const finalScore = (defectScore * 0.5) + (deliveryScore * 0.3) + (docScore * 0.2);

    let grade = 'D';
    let recommendation = 'Requires Probation & Immediate Corrective Action';
    let colorClass = 'text-red-600 bg-red-50 border-red-200';

    if (finalScore >= 90) {
      grade = 'A';
      recommendation = 'Approved Vendor - Excellent Performance';
      colorClass = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    } else if (finalScore >= 80) {
      grade = 'B';
      recommendation = 'Approved Vendor - Acceptable Variance';
      colorClass = 'text-blue-700 bg-blue-50 border-blue-200';
    } else if (finalScore >= 70) {
      grade = 'C';
      recommendation = 'Conditional Approval - Audit Recommended';
      colorClass = 'text-amber-700 bg-amber-50 border-amber-200';
    }

    return {
      defectRate,
      defectScore,
      deliveryScore,
      docScore,
      finalScore,
      grade,
      recommendation,
      colorClass
    };

  }, [totalUnits, rejectedUnits, onTimeDelivery, docAccuracy]);

  return (
    <div className="py-12 md:py-20 bg-slate-50 min-h-full">
      <SEO 
        title="Supplier Quality Scorecard | Quality Hub" 
        description="Evaluate and track vendor performance based on defect rates and compliance."
        url="https://quality.ruralutilitycost.com/tools/supplier-quality-scorecard"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Supplier Quality Scorecard</h1>
          <p className="mt-2 text-slate-600">Evaluate and grade vendor performance (Defects, Delivery, Docs).</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Supplier Metrics Period</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Supplier / Vendor Name</label>
                <input
                  type="text"
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="e.g. Acme AgriCorp"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Total Units Received</label>
                  <input
                    type="number"
                    min="0"
                    value={totalUnits}
                    onChange={(e) => setTotalUnits(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Units Rejected</label>
                  <input
                    type="number"
                    min="0"
                    value={rejectedUnits}
                    onChange={(e) => setRejectedUnits(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 flex justify-between">
                  <span>On-Time Delivery (%)</span>
                  <span className="text-blue-600 font-medium">{onTimeDelivery}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={onTimeDelivery}
                  onChange={(e) => setOnTimeDelivery(e.target.value)}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Documentation Accuracy (1-5)</label>
                <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-200">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setDocAccuracy(star.toString())}
                      className="p-2 transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star 
                        className={`w-8 h-8 ${parseInt(docAccuracy) >= star ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} 
                      />
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-1 text-center">1 = Missing/Poor, 5 = Flawless COAs & BOLs</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {scoreData ? (
              <>
                <div className={`rounded-xl border p-6 flex flex-col items-center justify-center text-center ${scoreData.colorClass}`}>
                  <h3 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Final Grade</h3>
                  <div className="text-7xl font-black mb-2">{scoreData.grade}</div>
                  <div className="text-2xl font-semibold opacity-90 mb-4">{scoreData.finalScore.toFixed(1)}%</div>
                  <div className="bg-white/50 backdrop-blur px-4 py-2 rounded-full text-sm font-bold">
                    {scoreData.recommendation}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide">Score Breakdown</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">Defect/Quality (50% weight)</span>
                        <span className="font-medium text-slate-900">{scoreData.defectScore.toFixed(0)} / 100</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${scoreData.defectScore}%` }}></div>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Defect rate: {scoreData.defectRate.toFixed(2)}%</p>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">Delivery (30% weight)</span>
                        <span className="font-medium text-slate-900">{scoreData.deliveryScore.toFixed(0)} / 100</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${scoreData.deliveryScore}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">Documentation (20% weight)</span>
                        <span className="font-medium text-slate-900">{scoreData.docScore.toFixed(0)} / 100</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${scoreData.docScore}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 flex flex-col items-center justify-center text-center h-full">
                <TrendingUp className="w-12 h-12 text-slate-300 mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">Scorecard Pending</h3>
                <p className="text-slate-500 text-sm">
                  Enter supplier unit data to generate a weighted performance scorecard and vendor recommendation.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
