import React, { useState, useMemo } from 'react';
import SEO from '../../components/SEO';
import { ArrowLeft, AlertTriangle, ShieldAlert, CheckCircle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ContaminationRiskChecker() {
  const [productType, setProductType] = useState('Raw');
  const [sharedEquipment, setSharedEquipment] = useState('Yes');
  const [validatedCleaning, setValidatedCleaning] = useState('No');
  const [allergensPresent, setAllergensPresent] = useState('None');
  const [workerCrossover, setWorkerCrossover] = useState('High');

  const riskAssessment = useMemo(() => {
    let riskScore = 0;
    const reasons: string[] = [];
    const mitigations: string[] = [];

    // Base risk by product
    if (productType === 'Raw') {
      riskScore += 30;
      reasons.push('Raw agricultural/meat products have high inherent microbial loads.');
      mitigations.push('Ensure strict physical separation from cooked/RTE areas.');
    } else if (productType === 'Cooked/RTE') {
      riskScore += 40; // Higher risk of *impacting* the consumer if contaminated
      reasons.push('Ready-to-eat products lack a consumer kill-step.');
      mitigations.push('Maintain strict positive air pressure and hygienic zoning.');
    } else {
      riskScore += 15;
      reasons.push('Feed products generally have lower human safety risk profiles.');
    }

    // Equipment & Allergens
    if (sharedEquipment === 'Yes') {
      if (allergensPresent !== 'None') {
        if (validatedCleaning === 'No') {
          riskScore += 50; // Critical condition
          reasons.push('Allergens on shared equipment without validated cleaning procedures.');
          mitigations.push('URGENT: Halt production on shared lines until allergen swab validation is complete.');
        } else {
          riskScore += 20;
          reasons.push('Shared equipment handles allergens, but cleaning is validated.');
          mitigations.push('Maintain rigorous cleaning logs and periodic swab testing verification.');
        }
      } else {
        riskScore += 10;
        reasons.push('Shared equipment used, but no major allergens present.');
        mitigations.push('Ensure standard SSOPs are followed between product changeovers.');
      }
    }

    // Worker Crossover
    if (workerCrossover === 'High') {
      riskScore += 25;
      reasons.push('High frequency of workers moving between distinct risk zones.');
      mitigations.push('Implement color-coded smocks/boots and footbaths between zones.');
    } else if (workerCrossover === 'Medium') {
      riskScore += 10;
    }

    let level = 'Low';
    let colorClass = 'bg-emerald-50 border-emerald-200 text-emerald-800';
    let icon = <CheckCircle className="w-12 h-12 text-emerald-500" />;

    if (riskScore >= 75) {
      level = 'Critical';
      colorClass = 'bg-red-50 border-red-300 text-red-900';
      icon = <ShieldAlert className="w-12 h-12 text-red-600" />;
    } else if (riskScore >= 50) {
      level = 'High';
      colorClass = 'bg-orange-50 border-orange-200 text-orange-800';
      icon = <AlertTriangle className="w-12 h-12 text-orange-500" />;
    } else if (riskScore >= 25) {
      level = 'Medium';
      colorClass = 'bg-amber-50 border-amber-200 text-amber-800';
      icon = <Info className="w-12 h-12 text-amber-500" />;
    }

    return { score: riskScore, level, colorClass, icon, reasons, mitigations };
  }, [productType, sharedEquipment, validatedCleaning, allergensPresent, workerCrossover]);

  return (
    <div className="py-12 md:py-20 bg-slate-50 min-h-full">
      <SEO 
        title="Contamination Risk Checker | Quality Hub" 
        description="Identify potential cross-contamination points in processing, storage, and handling."
        url="https://quality.ruralutilitycost.com/tools/contamination-risk-checker"
        keywords="contamination risk checker, cross-contamination, food safety hazard, allergen tracking, hazard analysis, processing risk"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Contamination Risk Checker",
          "url": "https://quality.ruralutilitycost.com/tools/contamination-risk-checker",
          "description": "Identify potential cross-contamination points in processing, storage, and handling.",
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
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Contamination Risk Checker</h1>
          <p className="mt-2 text-slate-600">Evaluate risk matrices for cross-contamination in processing areas.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-5">
            <h2 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">Production Parameters</h2>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Product Risk Category</label>
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Raw">Raw Agricultural / Meat</option>
                <option value="Cooked/RTE">Cooked / Ready-to-Eat (RTE)</option>
                <option value="Feed">Animal Feed / Non-Human</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Allergens Present in Facility</label>
              <select
                value={allergensPresent}
                onChange={(e) => setAllergensPresent(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="None">None</option>
                <option value="Major">Major (Peanuts, Dairy, Soy, Tree Nuts, etc.)</option>
                <option value="Minor">Minor / Non-Big 9</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Shared Equipment Usage</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" value="Yes" checked={sharedEquipment === 'Yes'} onChange={(e) => setSharedEquipment(e.target.value)} className="text-blue-600" /> Yes
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" value="No" checked={sharedEquipment === 'No'} onChange={(e) => setSharedEquipment(e.target.value)} className="text-blue-600" /> No
                </label>
              </div>
            </div>

            {sharedEquipment === 'Yes' && (
              <div className="pl-4 border-l-2 border-blue-200 bg-blue-50/50 p-3 rounded-r-md">
                <label className="block text-sm font-medium text-slate-700 mb-2">Is cleaning between runs mathematically validated?</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" value="Yes" checked={validatedCleaning === 'Yes'} onChange={(e) => setValidatedCleaning(e.target.value)} className="text-blue-600" /> Yes (Swab tested)
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" value="No" checked={validatedCleaning === 'No'} onChange={(e) => setValidatedCleaning(e.target.value)} className="text-blue-600" /> No (Visual only)
                  </label>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Worker Crossover Frequency</label>
              <select
                value={workerCrossover}
                onChange={(e) => setWorkerCrossover(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="High">High (Workers move freely between zones)</option>
                <option value="Medium">Medium (Occasional crossover with PPE change)</option>
                <option value="Low">Low (Strictly segregated workforce)</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`rounded-xl border p-8 ${riskAssessment.colorClass} transition-colors duration-300`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold uppercase tracking-wider">Risk Level</h3>
                {riskAssessment.icon}
              </div>
              <div className="text-5xl font-black mb-2">{riskAssessment.level}</div>
              <p className="text-sm font-medium opacity-90">Calculated Risk Score: {riskAssessment.score}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                <h3 className="font-semibold text-slate-900">Analysis & Mitigation</h3>
              </div>
              <div className="p-6">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">Risk Factors Identified</h4>
                <ul className="space-y-2 mb-6">
                  {riskAssessment.reasons.map((reason, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-700">
                      <span className="text-slate-400">•</span> {reason}
                    </li>
                  ))}
                </ul>

                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">Required Actions</h4>
                <ul className="space-y-3">
                  {riskAssessment.mitigations.map((action, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-800 bg-slate-50 p-3 rounded-md border border-slate-100">
                      <CheckCircle className="w-5 h-5 text-blue-500 shrink-0" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
