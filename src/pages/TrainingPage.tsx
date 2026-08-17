import React, { useState } from 'react';
import { PageId, Workshop } from '../types';
import { WORKSHOPS } from '../data/farmData';
import { PageHeader } from '../components/PageHeader';
import { openWhatsApp, buildWhatsAppUrl, trainingMessage } from '../lib/whatsapp';
import {
  GraduationCap, Calendar, MapPin, CheckCircle, Clock,
  X, Check, MessageCircle
} from 'lucide-react';

interface TrainingPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const TrainingPage: React.FC<TrainingPageProps> = ({ setCurrentPage }) => {
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    phone: '',
    attendeeType: 'Individual Farmer',
    paymentMethod: 'momo'
  });

  const registrationMessage = () =>
    selectedWorkshop
      ? trainingMessage({
          workshopTitle: selectedWorkshop.title,
          date: selectedWorkshop.date,
          name: registrationForm.name,
          phone: registrationForm.phone,
          email: registrationForm.email,
          attendeeType: registrationForm.attendeeType
        })
      : '';

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp(registrationMessage());
    setRegisterSuccess(true);
  };

  return (
    <div className="space-y-12 pb-16 font-sans">
      <PageHeader
        eyebrow="Practical Poultry Education"
        title="Training & Masterclasses"
        description="Hands-on poultry training at a working farm — broiler management, commercial layer and egg production, and turnkey farm setup, taught by our own team and veterinary partners."
        image="/images/farm-broiler-chicks.webp"
      />

      {/* Main Workshops Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-brand-700 uppercase tracking-widest bg-brand-100 px-3 py-1 rounded-full border border-brand-200">
            UPCOMING COURSES
          </span>
          <h2 className="text-3xl font-black text-slate-900 font-serif">
            Upcoming Masterclasses & Bootcamps
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {WORKSHOPS.map((ws) => (
            <div
              key={ws.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={ws.image}
                    alt={ws.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 bg-accent-700 text-white text-[11px] font-black px-2.5 py-1 rounded shadow-xs uppercase tracking-wider">
                    {ws.category}
                  </span>
                  <span className="absolute top-4 right-4 bg-brand-900/90 text-brand-200 text-xs font-bold px-2.5 py-1 rounded border border-brand-700">
                    {ws.seatsRemaining} Seats Left
                  </span>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-bold text-xl font-serif leading-tight">{ws.title}</h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Calendar className="w-4 h-4 text-brand-600 shrink-0" />
                      <span>{ws.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Clock className="w-4 h-4 text-brand-600 shrink-0" />
                      <span>{ws.duration}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-1.5 text-slate-700">
                      <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                      <span className="truncate">{ws.location}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ws.description}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <h4 className="font-bold text-xs uppercase text-slate-800 tracking-wider">Course Modules:</h4>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {ws.modules.slice(0, 4).map((mod, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
                          <span>{mod}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-4 space-y-3">
                <div className="flex items-baseline justify-between pt-3 gap-3">
                  <div>
                    <span className="text-sm font-black text-accent-800">Fee on request</span>
                    <span className="text-[10px] text-slate-500 block">Confirmed when you register</span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium text-right">
                    Instructor: {ws.instructor.split(' ')[0]} {ws.instructor.split(' ')[1]}
                  </span>
                </div>

                <button
                  onClick={() => { setSelectedWorkshop(ws); setRegisterSuccess(false); }}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-2"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Register for Masterclass</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Registration Modal */}
      {selectedWorkshop && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 relative my-8">
            <button
              onClick={() => setSelectedWorkshop(null)}
              className="absolute right-4 top-4 z-10 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!registerSuccess ? (
              <div>
                <div className="p-5 bg-brand-900 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent-300">
                    {selectedWorkshop.category}
                  </span>
                  <h3 className="font-bold text-lg leading-snug">{selectedWorkshop.title}</h3>
                  <p className="text-xs text-brand-200 mt-1">{selectedWorkshop.date} · {selectedWorkshop.duration}</p>
                </div>

                <form onSubmit={handleRegisterSubmit} className="p-6 space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Abena Serwaa"
                      value={registrationForm.name}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, name: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number (MTN MoMo / Telecel) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="024 XXX XXXX"
                      value={registrationForm.phone}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, phone: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="abena@gmail.com"
                      value={registrationForm.email}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, email: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Attendee Status</label>
                    <select
                      value={registrationForm.attendeeType}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, attendeeType: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 text-xs"
                    >
                      <option value="Individual Farmer">Individual Farmer / Entrepreneur</option>
                      <option value="Diaspora Investor">Diaspora Investor</option>
                      <option value="Corporate Representative">Corporate Representative</option>
                      <option value="Student">Student / Researcher</option>
                    </select>
                  </div>

                  <div className="p-3 bg-brand-50 rounded-xl border border-brand-200 space-y-1">
                    <p className="font-bold text-brand-900">Registration Includes:</p>
                    <p className="text-brand-800">• MoFA-Recognized Certificate of Completion</p>
                    <p className="text-brand-800">• Starter Stock Vouchers & Comprehensive Handbook</p>
                    <p className="text-brand-800">• Buffet Farm Lunch & Alumni Mentorship Access</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-sm"
                  >
                    Reserve My Seat on WhatsApp
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-700 mx-auto flex items-center justify-center">
                  <Check className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 font-serif">One last step</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  WhatsApp should have opened with your registration for <strong>{selectedWorkshop.title}</strong> on <strong>{selectedWorkshop.date}</strong>. Press send there to hold your seat.
                </p>
                <div className="p-3 bg-accent-50 border border-accent-200 rounded-xl text-left text-xs space-y-2">
                  <p className="text-slate-700">
                    We'll confirm the course fee and answer any questions on{' '}
                    <strong>{registrationForm.phone}</strong> before the session.
                  </p>
                  <a
                    href={buildWhatsAppUrl(registrationMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-accent-700 hover:bg-accent-800 text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Didn't open? Tap here</span>
                  </a>
                </div>
                <button
                  onClick={() => setSelectedWorkshop(null)}
                  className="bg-brand-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs"
                >
                  Close & Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
