import React from 'react';
import { PageId } from '../types';
import { FARM_INFO } from '../data/farmData';
import { Award, ShieldCheck, Target, Heart, Users, MapPin, CheckCircle, Leaf, Sparkles } from 'lucide-react';

interface AboutPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setCurrentPage }) => {
  return (
    <div className="space-y-16 pb-16 font-sans">
      {/* Banner Header */}
      <section className="bg-emerald-950 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest bg-emerald-900 px-3 py-1 rounded-full border border-emerald-800">
            OUR HERITAGE & MISSION
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            About Ekow Sam Farms
          </h1>
          <p className="text-emerald-200 text-sm sm:text-base max-w-2xl mx-auto font-light">
            Building West Africa's most resilient, sustainable, and technology-driven commercial agricultural ecosystem in Ghana.
          </p>
        </div>
      </section>

      {/* Main Story & Founder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
              COMPANY HISTORY
            </span>
            <h2 className="text-3xl font-black text-slate-900 font-serif leading-tight">
              Driven by Passion for Food Security in Ghana
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Founded in 2018 by visionary Ghanaian agricultural entrepreneur <strong>Ekow Sam</strong>, Ekow Sam Farms began as a modest 10-acre poultry and crop trial in the Central Region of Ghana.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Recognizing the immense gap in local food processing and the heavy dependency on imported frozen meats and produce, Ekow Sam expanded the venture into an integrated 500-acre commercial farm estate. Today, Ekow Sam Farms encompasses biosecure poultry layer pens, intensive catfish & tilapia hatcheries, Ghana's largest heliculture (snail breeding) facility, greenhouse tomato units, and an FDA-standard agro-processing plant.
            </p>

            <div className="p-4 bg-emerald-50 border-l-4 border-emerald-600 rounded-r-xl space-y-1 text-xs">
              <p className="font-bold text-emerald-950 text-sm">Our Core Philosophy:</p>
              <p className="text-emerald-800 italic">
                "Agriculture is not just about growing food; it's about engineering sustainable ecosystems that feed families, empower youth, and build national economic dignity."
              </p>
              <p className="text-emerald-900 font-bold pt-1">— Ekow Sam, CEO</p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800"
                alt="Ekow Sam Farm Estate"
                className="w-full h-[450px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-emerald-600 text-white font-bold text-xs px-2.5 py-1 rounded">
                  GOMOA EAST, CENTRAL REGION
                </span>
                <h4 className="text-lg font-bold font-serif mt-2">Ekow Sam Farm Estate Infrastructure</h4>
                <p className="text-xs text-slate-300">500 Acres • Solar Boreholes • FDA Processing Factory</p>
              </div>
            </div>
          </div>
        </div>

        {/* MISSION & VISION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-serif">Our Mission</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To produce fresh, high-quality, organic farm produce and processed foods using sustainable zero-waste circular agricultural practices in West Africa.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-serif">Our Vision</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To become Africa's premier benchmark for commercial farm innovation, value addition, food safety, and youth agricultural entrepreneurship.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-serif">Core Values</h3>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• <strong>Integrity & Hygiene:</strong> FDA Ghana compliant.</li>
              <li>• <strong>Eco-Stewardship:</strong> Zero chemical pesticides.</li>
              <li>• <strong>Community Empowerment:</strong> Training youth.</li>
            </ul>
          </div>
        </div>

        {/* TEAM MEMBERS */}
        <div className="space-y-8 pt-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
              AGRONOMY LEADERSHIP
            </span>
            <h2 className="text-3xl font-black text-slate-900 font-serif">
              Meet Our Leadership & Agronomists
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 text-center space-y-3 shadow-xs">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
                alt="Ekow Sam"
                className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-emerald-600"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Ekow Sam</h4>
                <p className="text-xs text-emerald-700 font-semibold">Chief Executive Officer & Founder</p>
                <p className="text-[11px] text-slate-500 mt-2">15+ years agribusiness experience across West Africa</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 text-center space-y-3 shadow-xs">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=300"
                alt="Dr. K. Mensah"
                className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-emerald-600"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Dr. K. Mensah</h4>
                <p className="text-xs text-emerald-700 font-semibold">Lead Heliculturist (Snail Specialist)</p>
                <p className="text-[11px] text-slate-500 mt-2">PhD in Heliculture & Tropical Animal Science</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 text-center space-y-3 shadow-xs">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
                alt="Dr. Abena Osei"
                className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-emerald-600"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Dr. Abena Osei</h4>
                <p className="text-xs text-emerald-700 font-semibold">Chief Veterinary Officer</p>
                <p className="text-[11px] text-slate-500 mt-2">Specializing in biosecure poultry health & vaccination</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 text-center space-y-3 shadow-xs">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300"
                alt="Ing. Kwame Asante"
                className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-emerald-600"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Ing. Kwame Asante</h4>
                <p className="text-xs text-emerald-700 font-semibold">Lead Aquaculture Engineer</p>
                <p className="text-[11px] text-slate-500 mt-2">Hatchery design & recirculating system specialist</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
