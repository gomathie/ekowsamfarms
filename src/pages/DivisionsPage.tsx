import React, { useState } from 'react';
import { PageId } from '../types';
import { DIVISIONS } from '../data/farmData';
import { Egg, Factory, GraduationCap, CheckCircle, ChevronRight, ArrowRight, ShoppingBag } from 'lucide-react';

interface DivisionsPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const DivisionsPage: React.FC<DivisionsPageProps> = ({ setCurrentPage }) => {
  const [selectedDivId, setSelectedDivId] = useState<string>(DIVISIONS[0].id);

  const activeDiv = DIVISIONS.find(d => d.id === selectedDivId) || DIVISIONS[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Egg': return <Egg className="w-5 h-5" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5" />;
      case 'Factory': return <Factory className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      default: return <Egg className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-12 pb-16 font-sans">
      {/* Header Banner */}
      <section className="bg-blue-950 text-white py-14 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest bg-blue-900 px-3 py-1 rounded-full border border-blue-800">
            OUR SERVICES
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            What We Do at Ekow Sam Farms
          </h1>
          <p className="text-blue-200 text-xs sm:text-sm max-w-2xl mx-auto">
            Explore our specialized services delivering sustainable premium poultry produce and agribusiness training across Ghana.
          </p>
        </div>
      </section>

      {/* Tabs & Deep Dive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Tab Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 no-scrollbar">
          {DIVISIONS.map((div) => {
            const isActive = div.id === selectedDivId;
            return (
              <button
                key={div.id}
                onClick={() => setSelectedDivId(div.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all border shrink-0 ${
                  isActive
                    ? 'bg-blue-700 text-white border-blue-800 shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-blue-50 border-slate-200'
                }`}
              >
                {getIcon(div.iconName)}
                <span>{div.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Division Card Feature */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-6 relative h-72 lg:h-auto min-h-[380px]">
            <img
              src={activeDiv.image}
              alt={activeDiv.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="bg-blue-600 text-white font-extrabold text-[11px] px-2.5 py-1 rounded">
                CAPACITY: {activeDiv.capacity}
              </span>
              <h3 className="text-2xl font-black font-serif mt-2">{activeDiv.title}</h3>
              <p className="text-xs text-blue-300 font-semibold">{activeDiv.subtitle}</p>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold">
                {getIcon(activeDiv.iconName)}
                <span>Farm Service</span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 font-serif">
                {activeDiv.title} Overview
              </h2>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {activeDiv.fullDetails}
              </p>

              <div className="space-y-2 pt-2">
                <h4 className="font-bold text-xs uppercase text-slate-800 tracking-wider">Key Operational Highlights:</h4>
                <div className="space-y-2">
                  {activeDiv.highlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <h4 className="font-bold text-xs uppercase text-slate-800 tracking-wider mb-2">Primary Products & Deliverables:</h4>
                <div className="flex flex-wrap gap-2">
                  {activeDiv.keyProducts.map((prod, i) => (
                    <span key={i} className="bg-blue-100 text-blue-900 text-xs font-bold px-3 py-1 rounded-lg border border-blue-200">
                      {prod}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setCurrentPage('store')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors shadow-xs flex items-center gap-1.5"
              >
                <span>Order Products From This Service</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage('training')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors"
              >
                Learn via Farmers Masterclass
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
