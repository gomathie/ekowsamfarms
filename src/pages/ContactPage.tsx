import React, { useState } from 'react';
import { PageId } from '../types';
import { FARM_INFO, FAQS } from '../data/farmData';
import { PageHeader } from '../components/PageHeader';
import { 
  Phone, Mail, MapPin, Clock, Send, CheckCircle, ChevronDown, 
  HelpCircle, Sparkles, Navigation, Globe
} from 'lucide-react';

interface ContactPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ setCurrentPage }) => {
  const [formSent, setFormSent] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'Wholesale Produce Order',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="space-y-12 pb-16 font-sans">
      <PageHeader
        eyebrow="Get In Touch"
        title="Contact Us"
        description="Reach our farm office for bulk egg and poultry orders, training registration, farm tours, or setting up your own poultry operation."
        image="/images/farm-team-sorting.webp"
      />

      {/* Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details & Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 font-serif border-b pb-3 border-slate-100">
                Contact Information
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Farm Locations</h4>
                    <p className="text-slate-600 mt-0.5">{FARM_INFO.location}</p>
                    <p className="text-brand-700 font-mono font-bold text-[11px] mt-1">{FARM_INFO.gpsLocation}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Phone Hotlines</h4>
                    <p className="text-slate-600 mt-0.5">{FARM_INFO.phones.join(' / ')}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Calls & WhatsApp Available</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Email Addresses</h4>
                    <p className="text-slate-600 mt-0.5">{FARM_INFO.emails.join(' • ')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Operating Hours</h4>
                    <p className="text-slate-600 mt-0.5">{FARM_INFO.openingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Interactive Map */}
            <div className="bg-brand-900 text-white rounded-2xl p-6 border border-brand-800 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-accent-300 uppercase">GHANA MAP LOCATION</span>
                <Navigation className="w-5 h-5 text-accent-300" />
              </div>
              <h4 className="text-lg font-bold font-serif">Millenium City, Kasoa</h4>
              <p className="text-xs text-brand-200">
                Our main farm facilities are located in the heart of Millenium City, ensuring fresh dispatch across Accra and surrounding areas.
              </p>

              <div className="pt-2">
                <a
                  href={`https://maps.google.com/?q=5.5539,-0.4496`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand-700 hover:bg-brand-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors border border-brand-600"
                >
                  <Globe className="w-4 h-4" />
                  <span>Open Directions in Google Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900 font-serif border-b pb-3 border-slate-100">
              Send a Direct Message to Ekow Sam Farms
            </h3>

            {!formSent ? (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kwame Ofori"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-brand-600 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="024 XXX XXXX"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-brand-600 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="kwame@gmail.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-brand-600 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Inquiry Category</label>
                    <select
                      value={contactForm.topic}
                      onChange={(e) => setContactForm({ ...contactForm, topic: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-brand-600 text-xs"
                    >
                      <option value="Wholesale Produce Order">Wholesale Produce Order (Eggs, Chicken)</option>
                      <option value="Farmers Training Workshop">Farmers Training Workshop Inquiry</option>
                      <option value="Farm Tour / Educational Visit">Farm Tour / Educational Visit</option>
                      <option value="Turnkey Agribusiness Setup">Turnkey Agribusiness Setup</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Message Details *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your inquiry, order quantities, preferred delivery location or farm visit date..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-brand-600 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Farm Office</span>
                </button>
              </form>
            ) : (
              <div className="p-8 text-center space-y-4 bg-brand-50 rounded-2xl border border-brand-200">
                <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-700 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 font-serif">Message Sent Successfully!</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thank you <strong>{contactForm.name}</strong>! We have received your inquiry regarding <strong>{contactForm.topic}</strong>. Our farm representative will call you back at <strong>{contactForm.phone}</strong> shortly.
                </p>
                <button
                  onClick={() => setFormSent(false)}
                  className="bg-brand-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>

        {/* FREQUENTLY ASKED QUESTIONS (FAQ) */}
        <div className="space-y-6 pt-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-brand-700 uppercase tracking-widest bg-brand-100 px-3 py-1 rounded-full border border-brand-200">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl font-black text-slate-900 font-serif">
              Got Questions About Ekow Sam Farms?
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 font-bold text-slate-900 text-sm flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-brand-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 border-t border-slate-100 leading-relaxed bg-slate-50/50">
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
  );
};
