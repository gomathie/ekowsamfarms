import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { FARM_INFO } from '../data/farmData';
import {
  Phone, Mail, MapPin, ShoppingBag, Menu, X, Clock, Calculator
} from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  cartCount: number;
  openCart: () => void;
  openPoultryCalculator?: () => void;
}

const navItems: { id: PageId; label: string; badge?: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'divisions', label: 'Services' },
  { id: 'store', label: 'Farm Store', badge: 'Fresh' },
  { id: 'training', label: 'Training' },
  { id: 'events', label: 'Events' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'blog', label: 'Insights' },
  { id: 'contact', label: 'Contact' }
];

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  cartCount,
  openCart,
  openPoultryCalculator
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleNavClick = (id: PageId) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm font-sans border-b border-slate-200">
      {/* Utility Bar */}
      <div className="bg-brand-950 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start text-brand-100">
            <a
              href={`mailto:${FARM_INFO.emails[1]}`}
              className="flex items-center gap-1.5 hover:text-accent-300 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-accent-400" />
              <span>{FARM_INFO.emails[1]}</span>
            </a>
            <span className="hidden sm:inline text-brand-800">|</span>
            <div className="hidden md:flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-accent-400" />
              <span>{FARM_INFO.address}</span>
            </div>
            <span className="hidden lg:inline text-brand-800">|</span>
            <div className="hidden lg:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-accent-400" />
              <span>{FARM_INFO.openingHoursShort}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {openPoultryCalculator && (
              <button
                onClick={openPoultryCalculator}
                className="flex items-center gap-1.5 bg-brand-900 hover:bg-brand-800 text-white px-3 py-1 rounded-full text-xs font-semibold transition-colors border border-brand-800"
              >
                <Calculator className="w-3 h-3 text-accent-400" />
                <span>Poultry Estimator</span>
              </button>
            )}
            <a
              href={`tel:${FARM_INFO.phones[0].replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 bg-accent-700 text-white hover:bg-accent-800 font-bold px-3 py-1 rounded-full text-xs transition-colors"
            >
              <Phone className="w-3 h-3 fill-current" />
              <span>{FARM_INFO.phones[0]}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 group text-left shrink-0"
          aria-label="Ekow Sam Farms — Home"
        >
          <img
            src="/images/logo-esf.webp"
            alt=""
            aria-hidden="true"
            className="w-11 h-11 object-contain group-hover:scale-105 transition-transform"
          />
          <div className="hidden sm:block">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black tracking-tight text-brand-950 font-serif leading-none">
                EKOW SAM
              </span>
              <span className="text-lg font-bold tracking-tight text-accent-700 leading-none">
                FARMS
              </span>
            </div>
            <p className="text-[10px] uppercase font-bold tracking-[0.14em] text-slate-500 mt-1">
              Farm Fresh Eggs &amp; Poultry
            </p>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative px-3 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'text-brand-800'
                    : 'text-slate-700 hover:text-brand-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="bg-accent-700 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full leading-none">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute -bottom-px left-3 right-3 h-0.5 bg-accent-700 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleNavClick('store')}
            className="hidden xl:flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white font-bold px-4 py-2.5 rounded-full text-xs transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order Now</span>
          </button>

          <button
            onClick={openCart}
            aria-label={`Open basket, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
            className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent-700 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-1 max-h-[calc(100vh-8rem)] overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              aria-current={currentPage === item.id ? 'page' : undefined}
              className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-base transition-colors flex items-center justify-between ${
                currentPage === item.id
                  ? 'bg-brand-800 text-white'
                  : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  currentPage === item.id ? 'bg-accent-700 text-white' : 'bg-accent-100 text-accent-800'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          <div className="pt-3 space-y-2">
            <button
              onClick={() => handleNavClick('store')}
              className="w-full bg-accent-700 hover:bg-accent-800 text-white font-black py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Shop Fresh Eggs &amp; Poultry</span>
            </button>
            <a
              href={`tel:${FARM_INFO.phones[0].replace(/\s/g, '')}`}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call {FARM_INFO.phones[0]}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
