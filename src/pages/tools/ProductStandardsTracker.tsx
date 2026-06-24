import React, { useState, useMemo } from 'react';
import SEO from '../../components/SEO';
import { ArrowLeft, SlidersHorizontal, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PRODUCT_SPECS = {
  'Premium Flour': { moistureMax: 14.0, proteinMin: 11.5, ashMax: 0.55 },
  'Standard Feed': { moistureMax: 12.0, proteinMin: 16.0, ashMax: 8.00 },
  'Organic Oats': { moistureMax: 13.5, proteinMin: 13.0, ashMax: 2.00 },
};

export default function ProductStandardsTracker() {
  const [product, setProduct] = useState<keyof typeof PRODUCT_SPECS>('Premium Flour');
  const [moisture, setMoisture] = useState('');
  const [protein, setProtein] = useState('');
  const [ash, setAsh] = useState('');

  const evaluation = useMemo(() => {
    const spec = PRODUCT_SPECS[product];
    const m = parseFloat(moisture);
    const p = parseFloat(protein);
    const a = parseFloat(ash);

    if (isNaN(m) || isNaN(p) || isNaN(a)) return null;

    const mPass = m <= spec.moistureMax;
    const pPass = p >= spec.proteinMin;
    const aPass = a <= spec.ashMax;

    const allPass = mPass && pPass && aPass;
    const deviations = [];

    if (!mPass) deviations.push(`Moisture ${m}% exceeds max ${spec.moistureMax}%`);
    if (!pPass) deviations.push(`Protein ${p}% is below min ${spec.proteinMin}%`);
    if (!aPass) deviations.push(`Ash ${a}% exceeds max ${spec.ashMax}%`);

    return { mPass, pPass, aPass, allPass, deviations, spec };
  }, [product, moisture, protein, ash]);

  return (
    <div className="py-12 md:py-20 bg-slate-50 min-h-full">
      <SEO 
        title="Product Standards Tracker | Quality Hub" 
        description="Log and compare key product metrics against required baseline standards."
        url="https://quality.ruralutilitycost.com/tools/product-standards-tracker"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Product Standards Tracker</h1>
          <p className="mt-2 text-slate-600">Compare lab results directly against master product specifications.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-blue-600" />
              Input Lab Results
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Product Category</label>
                <select
                  value={product}
                  onChange={(e) => setProduct(e.target.value as keyof typeof PRODUCT_SPECS)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.keys(PRODUCT_SPECS).map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <label className="block text-sm font-medium text-slate-700 mb-1">Moisture Content (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={moisture}
                  onChange={(e) => setMoisture(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Max: ${PRODUCT_SPECS[product].moistureMax}%`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Protein Content (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Min: ${PRODUCT_SPECS[product].proteinMin}%`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ash Content (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={ash}
                  onChange={(e) => setAsh(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Max: ${PRODUCT_SPECS[product].ashMax}%`}
                />
              </div>
            </div>
          </div>

          <div>
            {evaluation ? (
              <div className="space-y-6">
                <div className={`p-6 rounded-xl border ${evaluation.allPass ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                  <h3 className={`text-xl font-bold mb-2 ${evaluation.allPass ? 'text-emerald-800' : 'text-red-800'}`}>
                    {evaluation.allPass ? 'Meets Spec' : 'Out of Specification'}
                  </h3>
                  <p className={`text-sm ${evaluation.allPass ? 'text-emerald-600' : 'text-red-600'}`}>
                    {evaluation.allPass 
                      ? 'Product matches or exceeds all quality baselines. Eligible for premium tier.' 
                      : 'Product fails to meet baseline specs. Review deviations below.'}
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Parameter Breakdown</h3>
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center pb-3 border-b border-slate-100">
                      <div>
                        <span className="text-sm font-medium text-slate-900 block">Moisture (≤ {evaluation.spec.moistureMax}%)</span>
                        <span className="text-lg font-bold">{moisture}%</span>
                      </div>
                      {evaluation.mPass ? <CheckCircle2 className="text-emerald-500 w-6 h-6" /> : <XCircle className="text-red-500 w-6 h-6" />}
                    </li>
                    <li className="flex justify-between items-center pb-3 border-b border-slate-100">
                      <div>
                        <span className="text-sm font-medium text-slate-900 block">Protein (≥ {evaluation.spec.proteinMin}%)</span>
                        <span className="text-lg font-bold">{protein}%</span>
                      </div>
                      {evaluation.pPass ? <CheckCircle2 className="text-emerald-500 w-6 h-6" /> : <XCircle className="text-red-500 w-6 h-6" />}
                    </li>
                    <li className="flex justify-between items-center">
                      <div>
                        <span className="text-sm font-medium text-slate-900 block">Ash (≤ {evaluation.spec.ashMax}%)</span>
                        <span className="text-lg font-bold">{ash}%</span>
                      </div>
                      {evaluation.aPass ? <CheckCircle2 className="text-emerald-500 w-6 h-6" /> : <XCircle className="text-red-500 w-6 h-6" />}
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 flex flex-col items-center justify-center text-center h-full">
                <p className="text-slate-500 text-sm">
                  Enter lab metrics to see specification comparison.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
