import React, { useState } from 'react';
import { PageId } from '../types';
import { FARM_INFO } from '../data/farmData';
import { 
  Phone, Mail, MapPin, ShoppingBag, Menu, X, 
  Sparkles, Clock, Calendar, Calculator
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

  const navItems: { id: PageId; label: string; badge?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'divisions', label: 'Services' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
    { id: 'store', label: 'Farm Store', badge: 'Fresh' },
    { id: 'training', label: 'Training' },
    { id: 'events', label: 'Events', badge: 'New' },
    { id: 'gallery', label: 'Gallery' }
  ];

  const handleNavClick = (id: PageId) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md font-sans border-b border-brand-100">
      {/* Top Banner Announcement (Dark Brown #3B2314) */}
      <div className="bg-brand-800 text-white text-xs py-2 px-4 border-b border-brand-700">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <a href={`mailto:${FARM_INFO.emails[0]}`} className="flex items-center gap-1.5 hover:text-accent-300 transition-colors">
              <Mail className="w-3.5 h-3.5 text-accent-500" />
              <span>{FARM_INFO.emails[0]}</span>
            </a>
            <span className="hidden sm:inline text-brand-600">|</span>
            <div className="hidden md:flex items-center gap-1.5 text-brand-100">
              <MapPin className="w-3.5 h-3.5 text-accent-500" />
              <span>DL hospital street, Accra, Ghana</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {openPoultryCalculator && (
              <button
                onClick={openPoultryCalculator}
                className="flex items-center gap-1 bg-accent-500 hover:bg-accent-400 text-brand-950 px-2.5 py-0.5 rounded-full text-xs font-bold transition-colors shadow-xs"
              >
                <Calculator className="w-3 h-3 text-brand-950" />
                <span>Poultry Estimator</span>
              </button>
            )}
            <button
              onClick={openAIAssistant}
              className="flex items-center gap-1.5 bg-brand-700 hover:bg-brand-600 text-white px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors shadow-xs"
            >
              <Sparkles className="w-3 h-3 text-accent-300" />
              <span>Ask AI Advisor</span>
            </button>
            <a
              href={`tel:${FARM_INFO.phones[0]}`}
              className="flex items-center gap-1.5 bg-accent-500 text-brand-950 hover:bg-accent-400 font-bold px-3 py-1 rounded-full text-xs transition-colors shadow-xs"
            >
              <Phone className="w-3 h-3 fill-current" />
              <span>{FARM_INFO.phones[0]}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 group text-left"
        >
          <img
            src="/images/logo.webp"
            alt="Ekow Sam Farms Logo"
            className="w-12 h-12 object-contain group-hover:scale-105 transition-transform"
          />
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xl font-black tracking-tight text-brand-950 font-serif">EKOW SAM</span>
              <span className="text-xl font-bold tracking-tight text-brand-700">FARMS</span>
            </div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-brand-600 -mt-1">
              FARM FRESH EGGS & POULTRY
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
                className={`relative px-3.5 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1 ${
                  isActive
                    ? 'text-brand-900 bg-accent-50 font-bold border-b-2 border-accent-500'
                    : 'text-slate-800 hover:text-brand-800 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="bg-accent-500 text-brand-950 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full shadow-xs">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Order Phone Pill / Call Button */}
          <a
            href={`tel:${FARM_INFO.phones[0]}`}
            className="hidden sm:flex items-center gap-2 bg-accent-500 hover:bg-accent-400 text-brand-950 font-black px-4 py-2 rounded-full text-xs shadow-sm transition-all hover:scale-105"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>055 519 8194</span>
          </a>

          {/* Cart Icon Button */}
          <button
            onClick={openCart}
            aria-label="Open Shopping Cart"
            className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-800 transition-colors border border-slate-200"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-800 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-pulse">
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
        <div className="lg:hidden bg-white border-b border-brand-100 px-4 pt-2 pb-6 space-y-1 animate-in slide-in-from-top-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-base transition-colors flex items-center justify-between ${
                currentPage === item.id
                  ? 'bg-brand-800 text-white shadow-xs font-bold'
                  : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  currentPage === item.id ? 'bg-accent-500 text-brand-950' : 'bg-accent-100 text-brand-900'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          <div className="pt-3 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('store')}
              className="w-full bg-accent-500 text-brand-950 font-black py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Shop Fresh Farm Produce</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
