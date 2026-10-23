import React, { useState } from 'react';
import { PageId } from '../types';
import { FAQS } from '../data/resortData';
import { submitToAppsScript } from '../lib/appsScriptApi';
import {
  Compass,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle2,
  Info,
  Navigation,
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [contactReferenceId, setContactReferenceId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Concierge Inquiry',
    message: '',
  });

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitError('Please complete your name, email address, and message.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitToAppsScript({
        type: 'contact',
        ...formData,
        source: 'contact-page',
        pageUrl: window.location.href,
      });
      setContactReferenceId(result.referenceId);
      setFormSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Your message could not be submitted. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0B0B0D] text-[#F4EFE5] pt-32 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#E8C36B] font-sans font-semibold mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Private Concierge Desk</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F4EFE5]">
          Contact & Access Protocols
        </h1>
        <p className="font-sans text-sm md:text-base text-[#F4EFE5]/75 max-w-2xl mt-4 leading-relaxed">
          Contact our private office for suite inquiries, whole-resort buyouts, or bespoke aviation and yacht arrival coordination.
        </p>
      </div>

      {/* Concept Disclaimer Notice */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="p-4 md:p-6 bg-[#16171D] border border-[#E8C36B]/50 flex items-start gap-4 shadow-xl">
          <Info className="w-5 h-5 text-[#E8C36B] shrink-0 mt-0.5" />
          <div className="font-sans text-xs text-[#F4EFE5]/85 space-y-1">
            <span className="font-semibold text-[#F4EFE5] uppercase tracking-wider block">
              Architectural Concept Notice
            </span>
            <p className="leading-relaxed">
              Aurelia Noir is a fictional ultra-luxury hospitality architectural concept and demonstration website. All coordinates, suites, phone lines, and amenities are artistic creations crafted to demonstrate world-class luxury web design and user experience.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column (7 cols): Contact Form */}
          <div className="lg:col-span-7 bg-[#121215] border border-[#232328] p-8 md:p-10 space-y-6 shadow-2xl">
            <div className="border-b border-[#232328] pb-4">
              <span className="text-xs uppercase tracking-[0.2em] text-[#E8C36B] font-sans font-semibold">
                Send a Message
              </span>
              <h3 className="font-serif text-2xl text-[#F4EFE5] mt-1">
                Concierge Enquiry Desk
              </h3>
            </div>

            {formSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <CheckCircle2 className="w-10 h-10 text-[#E8C36B] mx-auto shadow-[0_0_15px_rgba(232,195,107,0.3)]" />
                <h4 className="font-serif text-2xl text-[#F4EFE5]">Message Sent</h4>
                <p className="text-xs md:text-sm text-[#F4EFE5]/75 font-sans max-w-md mx-auto">
                  Thank you, {formData.name}. Your message has been recorded in the Aurelia Noir demonstration database. Reference: <span className="text-[#F4EFE5] font-mono">{contactReferenceId}</span>. This is a concept website, so no real concierge reply will be generated.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setSubmitError(null);
                    setContactReferenceId(null);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      subject: 'General Concierge Inquiry',
                      message: '',
                    });
                  }}
                  className="px-6 py-2.5 text-xs uppercase tracking-wider border border-[#232328] hover:border-[#E8C36B] text-[#F4EFE5] transition-colors cursor-pointer mt-4"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 font-sans text-xs">
                {submitError && (
                  <div role="alert" className="border border-red-800 bg-red-950/40 p-3 text-sm text-red-200">
                    {submitError}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#F4EFE5]/70 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Elena Rostova"
                      className="w-full bg-[#17171B] border border-[#232328] p-3 text-[#F4EFE5] focus:outline-none focus:border-[#E8C36B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#F4EFE5]/70 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="elena@example.com"
                      className="w-full bg-[#17171B] border border-[#232328] p-3 text-[#F4EFE5] focus:outline-none focus:border-[#E8C36B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#F4EFE5]/70 mb-1">Telephone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+44 20 7946 0912"
                      className="w-full bg-[#17171B] border border-[#232328] p-3 text-[#F4EFE5] focus:outline-none focus:border-[#E8C36B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#F4EFE5]/70 mb-1">Inquiry Topic</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#17171B] border border-[#232328] p-3 text-[#F4EFE5] focus:outline-none focus:border-[#E8C36B] cursor-pointer"
                    >
                      <option>General Concierge Inquiry</option>
                      <option>Private Resort Buyout (All 18 Residences)</option>
                      <option>Dining & Wine Cellar Tastings</option>
                      <option>Private Yacht Charter (The Celestia)</option>
                      <option>Media & Architectural Photography</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#F4EFE5]/70 mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please specify any specific dates, questions, or arrival preferences..."
                    className="w-full bg-[#17171B] border border-[#232328] p-3 text-[#F4EFE5] focus:outline-none focus:border-[#E8C36B]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 text-xs uppercase tracking-[0.18em] btn-gold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Submitting Message...' : 'Send Concierge Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column (5 cols): Coordinates, Aviation/Marine Access */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#121215] border border-[#232328] p-8 space-y-6 shadow-2xl">
              <div className="border-b border-[#232328] pb-3">
                <span className="text-[10px] uppercase tracking-widest text-[#E8C36B] font-sans font-semibold">
                  Geographic Coordinates
                </span>
                <h4 className="font-serif text-2xl text-[#F4EFE5] mt-1">Arrival Coordinates</h4>
              </div>

              <div className="space-y-4 font-sans text-xs">
                <div className="p-3.5 bg-[#17171B] border border-[#232328] space-y-1">
                  <div className="flex items-center gap-2 text-[#E8C36B]">
                    <Navigation className="w-3.5 h-3.5" />
                    <span className="uppercase tracking-wider font-mono text-[10px] font-semibold">COASTAL POSITION</span>
                  </div>
                  <div className="font-mono text-sm text-[#F4EFE5]">28°34&apos;12&quot;N 16°19&apos;45&quot;W</div>
                  <div className="text-[#F4EFE5]/50 text-[11px]">Obsidian Promontory, Atlantic Ocean</div>
                </div>

                <div className="p-3.5 bg-[#17171B] border border-[#232328] space-y-1">
                  <div className="flex items-center gap-2 text-[#E8C36B]">
                    <Navigation className="w-3.5 h-3.5" />
                    <span className="uppercase tracking-wider font-mono text-[10px] font-semibold">HELIPORT SPECIFICATION</span>
                  </div>
                  <div className="font-mono text-sm text-[#F4EFE5]">IDENTIFIER: AN-PAD 01</div>
                  <div className="text-[#F4EFE5]/50 text-[11px]">Lighted pad, daylight and night operations capable</div>
                </div>

                <div className="p-3.5 bg-[#17171B] border border-[#232328] space-y-1">
                  <div className="flex items-center gap-2 text-[#E8C36B]">
                    <Navigation className="w-3.5 h-3.5" />
                    <span className="uppercase tracking-wider font-mono text-[10px] font-semibold">MARINE HARBOR</span>
                  </div>
                  <div className="font-mono text-sm text-[#F4EFE5]">BERTH 4A · VHF CH 16 / 72</div>
                  <div className="text-[#F4EFE5]/50 text-[11px]">Cathedral Cove deep water mooring up to 85m draft</div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#232328] space-y-2 text-xs font-sans text-[#F4EFE5]/75">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#E8C36B]" />
                  <span>Private Office Desk: +41 22 555 0192</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#E8C36B]" />
                  <span>Concierge: privateoffice@aurelianoir.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive FAQ Accordion Section */}
        <section className="mt-24 pt-16 border-t border-[#232328]">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#E8C36B] font-sans font-semibold">
                Help & Information
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#F4EFE5] font-light">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3 font-sans">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[#232328] bg-[#121215] transition-colors shadow-lg"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none"
                    >
                      <span className="font-serif text-lg text-[#F4EFE5] font-normal">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#E8C36B] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#F4EFE5]/40 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs md:text-sm text-[#F4EFE5]/75 leading-relaxed border-t border-[#232328] pt-3 animate-fade-in">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
