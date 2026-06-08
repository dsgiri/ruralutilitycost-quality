export default function About() {
  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight">About Quality</h1>
        
        <div className="prose prose-slate prose-emerald max-w-none">
          <p className="text-xl text-slate-600 leading-relaxed mb-8">
            The Quality app is a dedicated hub within the Rural Utility Cost master ecosystem. Our focus is squarely on providing pragmatic quality assurance, quality control, and product standards tools for food, feed, and agricultural outputs.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Our Goal</h2>
          <p className="text-slate-600 mb-6">
            We exist to help users make practical quality decisions with clear, simple tools. Quality management shouldn't require bloated enterprise software or messy spreadsheets. Rural producers, farm operators, and small processors need standardized, accessible tools to log batch consistencies, evaluate supplier inputs, and ensure release readiness.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Part of the Ecosystem</h2>
          <p className="text-slate-600 mb-6">
            While deeply focused on QA/QC metrics, the Quality app shares the foundational philosophy of the main Rural Utility Cost site: transparency, ease of use, and operational utility without unnecessary complexity. Account settings, planning integrations, and predictive modeling connect back to the core ecosystem to provide a unified operational dashboard.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 mt-12">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Who is this for?</h3>
            <ul className="space-y-2 text-slate-600 list-disc pl-5">
              <li>Feed and food producers tracking variations</li>
              <li>Small processors needing routine QC logs</li>
              <li>QA/QC and lab staff validating product standards</li>
              <li>Agricultural decision-makers measuring operational compliance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
