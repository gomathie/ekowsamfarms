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
      <section className="bg-brand-950 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold text-accent-300 uppercase tracking-widest bg-brand-900 px-3 py-1 rounded-full border border-brand-800">
            OUR HERITAGE & MISSION
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            About Ekow Sam Farms
          </h1>
          <p className="text-brand-200 text-sm sm:text-base max-w-2xl mx-auto font-light">
            Providing premium poultry products and organic eggs to the community for over 4 years.
          </p>
        </div>
      </section>

      {/* Main Story & Founder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-brand-700 uppercase tracking-widest bg-brand-100 px-3 py-1 rounded-full border border-brand-200">
              COMPANY HISTORY
            </span>
            <h2 className="text-3xl font-black text-slate-900 font-serif leading-tight">
              Raising Healthy, Happy Birds
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              At Ekow Farms, we believe in raising healthy, happy birds that contribute to a sustainable future. Our commitment to eco-friendly practices ensures that every chicken and egg we produce is not only delicious but also responsibly sourced.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Founded by <strong>Ekow Sam</strong>, the farm focuses on providing families and businesses with high-quality, hormone-free meat and rich, golden-yolked eggs. By adopting an organic feed policy and prioritizing community well-being, we guarantee freshness you can trust, directly from our farm to your table.
            </p>

            <div className="p-4 bg-brand-50 border-l-4 border-brand-600 rounded-r-xl space-y-1 text-xs">
              <p className="font-bold text-brand-950 text-sm">Our Core Philosophy:</p>
              <p className="text-brand-800 italic">
                "Agriculture is not just about growing food; it's about engineering sustainable ecosystems that feed families, empower youth, and build national economic dignity."
              </p>
              <p className="text-brand-900 font-bold pt-1">— Ekow Sam, CEO</p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
              <img
                src="/images/about-farm.webp"
                alt="Ekow Sam Farm Estate"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-brand-600 text-white font-bold text-xs px-2.5 py-1 rounded">
                  MILLENIUM CITY, KASOA
                </span>
                <h4 className="text-lg font-bold font-serif mt-2">Ekow Sam Farm Infrastructure</h4>
                <p className="text-xs text-slate-300">Biosecure Layers • FDA Processing • Organic Feed Mill</p>
              </div>
            </div>
          </div>
        </div>

        {/* MISSION & VISION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-serif">Our Mission</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To produce fresh, high-quality, organic poultry and eggs using sustainable and biosecure agricultural practices in Ghana.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-accent-100 text-brand-800 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-serif">Our Vision</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To become the most trusted and sought-after supplier of premium hormone-free poultry products for households and restaurants in West Africa.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-serif">Core Values</h3>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• <strong>Integrity & Hygiene:</strong> FDA Ghana compliant.</li>
              <li>• <strong>Organic Promise:</strong> Zero growth hormones.</li>
              <li>• <strong>Community Focus:</strong> Supporting local agriculture.</li>
            </ul>
          </div>
        </div>

        {/* TEAM MEMBERS */}
        <div className="space-y-8 pt-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-brand-700 uppercase tracking-widest bg-brand-100 px-3 py-1 rounded-full border border-brand-200">
              LEADERSHIP
            </span>
            <h2 className="text-3xl font-black text-slate-900 font-serif">
              Meet Our Leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                initials: 'ES',
                name: 'Ekow Sam',
                role: 'Chief Executive Officer & Founder',
                bio: 'Over 4 years building Ekow Sam Farms into a trusted supplier of hormone-free poultry and farm-fresh eggs.'
              },
              {
                initials: 'AO',
                name: 'Dr. Abena Osei',
                role: 'Chief Veterinary Officer',
                bio: 'Specializing in biosecure poultry health, vaccination programmes, and organic feed management.'
              }
            ].map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl p-6 border border-slate-200 text-center space-y-3 shadow-xs"
              >
                <div
                  className="w-24 h-24 rounded-full mx-auto flex items-center justify-center bg-brand-800 text-white font-black text-2xl font-serif tracking-wide"
                  aria-hidden="true"
                >
                  {member.initials}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{member.name}</h4>
                  <p className="text-xs text-brand-700 font-semibold">{member.role}</p>
                  <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
