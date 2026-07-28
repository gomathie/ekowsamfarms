import React, { useState } from 'react';
import { PageId } from '../types';
import { FARM_INFO } from '../data/farmData';
import { 
  Phone, Mail, MapPin, ShoppingBag, Menu, X, Leaf, 
  ChevronDown, Award, Sparkles, Clock, Calendar, Calculator, Egg
} from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  cartCount: number;
  openCart: () => void;
  openAIAssistant: () => void;
  openPoultryCalculator?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  cartCount,
  openCart,
  openAIAssistant,
  openPoultryCalculator
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [divisionsDropdownOpen, setDivisionsDropdownOpen] = useState(false);

  const navItems: { id: PageId; label: string; badge?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'divisions', label: 'Divisions' },
    { id: 'store', label: 'Farm Store', badge: 'Fresh Produce' },
    { id: 'training', label: 'Training', badge: 'Workshops' },
    { id: 'gallery', label: 'Gallery & Tours' },
    { id: 'blog', label: 'Farming Insights' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id: PageId) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    setDivisionsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm font-sans border-b border-emerald-100">
      {/* Top Banner Announcement */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <a href={`tel:${FARM_INFO.phones[0]}`} className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{FARM_INFO.phones[0]}</span>
            </a>
            <span className="hidden sm:inline text-emerald-700">|</span>
            <a href={`mailto:${FARM_INFO.emails[0]}`} className="hidden sm:flex items-center gap-1.5 hover:text-emerald-300 transition-colors">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>{FARM_INFO.emails[0]}</span>
            </a>
            <span className="hidden md:inline text-emerald-700">|</span>
            <div className="hidden md:flex items-center gap-1.5 text-emerald-200">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Gomoa East, Central Region, Ghana</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {openPoultryCalculator && (
              <button
                onClick={openPoultryCalculator}
                className="flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full text-xs font-bold transition-colors shadow-xs"
              >
                <Calculator className="w-3 h-3 text-slate-950" />
                <span>Poultry Estimator</span>
              </button>
            )}
            <button
              onClick={openAIAssistant}
              className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors shadow-xs"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Ask AI Advisor</span>
            </button>
            <div className="flex items-center gap-1 text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded text-[11px] border border-emerald-800">
              <Clock className="w-3 h-3 text-emerald-400" />
              <span>Open: Mon - Sat 7:30AM - 5:30PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Leaf className="w-6 h-6 text-emerald-200" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-emerald-950 font-serif">EKOW SAM</span>
              <span className="text-xl font-bold tracking-tight text-emerald-600">FARMS</span>
            </div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-800/80 -mt-1">
              Commercial Agriculture & Processing • Ghana
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1 ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50 font-bold'
                    : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full border border-amber-200">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Farm Store Order Button */}
          <button
            onClick={() => handleNavClick('store')}
            className="hidden sm:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order Produce</span>
          </button>

          {/* Cart Icon Button */}
          <button
            onClick={openCart}
            aria-label="Open Shopping Cart"
            className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 transition-colors border border-slate-200"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-emerald-100 px-4 pt-2 pb-6 space-y-1 animate-in slide-in-from-top-2">
          <div className="p-3 bg-emerald-50 rounded-xl mb-3 flex items-center justify-between border border-emerald-100">
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-medium">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>100% Sustainable Organic Produce</span>
            </div>
            <button
              onClick={openAIAssistant}
              className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>AI Advisor</span>
            </button>
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-base transition-colors flex items-center justify-between ${
                currentPage === item.id
                  ? 'bg-emerald-600 text-white shadow-xs font-bold'
                  : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  currentPage === item.id ? 'bg-emerald-800 text-emerald-100' : 'bg-amber-100 text-amber-800'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          <div className="pt-3 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('store')}
              className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Shop Fresh Farm Produce</span>
            </button>
            <button
              onClick={() => handleNavClick('training')}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Training Workshop</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
