import SEO from '../components/SEO';

export default function Legal() {
  return (
    <div className="py-16 md:py-24 bg-white">
      <SEO 
        title="Legal & Disclaimers" 
        description="Important legal information, terms of use, privacy policy, and disclaimers for the Quality tools on Rural Utility Cost."
        url="https://quality.ruralutilitycost.com/legal"
        keywords="legal, terms of use, privacy policy, disclaimers, quality hub legal"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Legal & Disclaimers | Rural Utility Cost",
          "url": "https://quality.ruralutilitycost.com/legal",
          "description": "Important legal information, terms of use, privacy policy, and disclaimers for the Quality tools on Rural Utility Cost."
        }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight">Legal & Disclaimers</h1>
        
        <div className="prose prose-slate max-w-none text-slate-600">
          <p className="lead text-lg mb-8">
            The Quality app is a functional sub-module of the Rural Utility Cost network. The following terms outline the use of quality tracking, risk assessment, and standard checklists provided on this site.
          </p>

          <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-6 mb-10">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              Important Disclaimer
            </h2>
            <p className="mb-0">
              All tracker outputs, consistency reports, and checklist results provided natively on this site are informational and directional only. They <strong>do not replace formal laboratory testing, accredited third-party audits, or official regulatory review</strong>. Quality scores and risk indicators are structured as estimate-based operational support tools. Always verify important compliance decisions independently utilizing certified channels.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mt-10 mb-4">Terms of Use</h3>
          <p className="mb-4">
            By utilizing the tools provided on quality.ruralutilitycost.com, users agree to the global Terms of Service established by the master Rural Utility Cost domain. These tools are provided "as-is" to assist in operations but carry no warranty of compliance fitness regarding USDA, FDA, EPA, or localized agricultural regulations.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-10 mb-4">Privacy & Data Handling</h3>
          <p className="mb-4">
            Your saved tools ("My favorites") are currently configured to persist via local browser storage (`localStorage`). This data is not actively transferred to our servers unless integrated with an overarching Rural Utility Cost authenticated account.
          </p>
          
          <h3 className="text-xl font-bold text-slate-900 mt-10 mb-4">License</h3>
          <p className="mb-4">
            The concepts, UI structures, and operational calculators presented here are part of the broader, shared Rural Utility Cost environment. Specific code availability or open-source licensing details can be found on our associated GitHub repositories.
          </p>
        </div>
      </div>
    </div>
  );
}
