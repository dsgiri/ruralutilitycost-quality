import { Mail, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';

export default function Contact() {
  return (
    <div className="py-16 md:py-24 bg-white">
      <SEO 
        title="Contact" 
        description="Get in touch with the Quality hub team at Rural Utility Cost for questions or support regarding our agricultural QA tools."
        url="https://quality.ruralutilitycost.com/contact"
        keywords="contact quality hub, support rural utility cost, quality assurance support, QA tool help"
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Quality Hub | Rural Utility Cost",
          "url": "https://quality.ruralutilitycost.com/contact",
          "description": "Get in touch with the Quality hub team at Rural Utility Cost for questions or support regarding our agricultural QA tools."
        }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight">Contact</h1>
        
        <p className="text-xl text-slate-600 leading-relaxed mb-12">
          Have questions about the Quality tools or need help integrating them into your operations? We're part of the main Rural Utility Cost support network and happy to assist.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-100 text-slate-700">
              <Mail size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Email Support</h3>
            <p className="text-slate-600 mb-6">For direct questions regarding the QA/QC toolset or feature requests.</p>
            <a href="mailto:support@ruralutilitycost.com" className="text-emerald-600 font-medium hover:text-emerald-700">support@ruralutilitycost.com</a>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-100 text-slate-700">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">General Inquiries</h3>
            <p className="text-slate-600 mb-6">For partnership, enterprise, or broader platform questions.</p>
            <a href="https://ruralutilitycost.com/contact" className="text-emerald-600 font-medium hover:text-emerald-700">Master Contact Form →</a>
          </div>
        </div>
      </div>
    </div>
  );
}
