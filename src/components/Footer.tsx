import React from 'react';
import { PageId } from '../types';
import { FARM_INFO } from '../data/farmData';
import { WHATSAPP_LINK } from '../lib/whatsapp';
import { 
  Phone, Mail, MapPin, Facebook, Linkedin, 
  ThumbsUp, ArrowRight
} from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="font-sans text-brand-100">
      {/* Ready to taste the difference CTA Banner (Vibrant Green) */}
      <div className="bg-accent-700 text-white py-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white">
              Ready to taste the difference?
            </h2>
            <p className="text-accent-100 font-medium text-sm mt-1">
              Place Your Order Today! Fresh farm yellow-yolked eggs & dressed poultry delivered to you.
            </p>
          </div>
          <button
            onClick={() => navigateTo('store')}
            className="bg-brand-900 hover:bg-brand-950 text-white font-black px-6 py-3 rounded-full text-sm transition-transform hover:scale-105 shadow-lg flex items-center gap-2 shrink-0"
          >
            <ThumbsUp className="w-4 h-4 text-accent-400 fill-current" />
            <span>Order Now</span>
          </button>
        </div>
      </div>

      {/* Main Footer Section (Dark Brown #3B2314) */}
      <div className="bg-brand-950 text-brand-100 pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-brand-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Logo & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo-esf-full.webp"
                alt="Ekow Sam Farms"
                width={620}
                height={382}
                className="h-20 w-auto object-contain bg-white px-3 py-2.5 rounded-xl"
              />
            </div>
            <p className="text-brand-200 text-xs leading-relaxed">
              High quality farm fresh yellow yoked eggs & premium poultry products for households and businesses in Ghana.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a href={FARM_INFO.socials.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-brand-900 hover:bg-accent-400 hover:text-brand-950 text-brand-200 flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={FARM_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-brand-900 hover:bg-accent-400 hover:text-brand-950 text-brand-200 flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp" className="w-8 h-8 rounded-full bg-brand-900 hover:bg-accent-400 hover:text-brand-950 text-brand-200 flex items-center justify-center transition-colors font-bold text-xs">
                WA
              </a>
            </div>
          </div>

          {/* Col 2: Our Services */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base border-b border-brand-800 pb-2">Our Services</h4>
            <ul className="space-y-2 text-xs text-brand-200">
              <li className="flex items-center gap-2 hover:text-accent-400 cursor-pointer" onClick={() => navigateTo('divisions')}>
                <ArrowRight className="w-3 h-3 text-accent-400" />
                <span>Poultry Consulting &amp; Farm Setup</span>
              </li>
              <li className="flex items-center gap-2 hover:text-accent-400 cursor-pointer" onClick={() => navigateTo('divisions')}>
                <ArrowRight className="w-3 h-3 text-accent-400" />
                <span>Live Birds &amp; Point-of-Lay Pullets</span>
              </li>
              <li className="flex items-center gap-2 hover:text-accent-400 cursor-pointer" onClick={() => navigateTo('divisions')}>
                <ArrowRight className="w-3 h-3 text-accent-400" />
                <span>Doorstep Home Delivery</span>
              </li>
              <li className="flex items-center gap-2 hover:text-accent-400 cursor-pointer" onClick={() => navigateTo('divisions')}>
                <ArrowRight className="w-3 h-3 text-accent-400" />
                <span>Wholesale & B2B Supply</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base border-b border-brand-800 pb-2">Navigation</h4>
            <ul className="space-y-2 text-xs text-brand-200">
              <li><button onClick={() => navigateTo('home')} className="hover:text-accent-400 transition-colors">Home</button></li>
              <li><button onClick={() => navigateTo('about')} className="hover:text-accent-400 transition-colors">About Us</button></li>
              <li><button onClick={() => navigateTo('divisions')} className="hover:text-accent-400 transition-colors">Services</button></li>
              <li><button onClick={() => navigateTo('store')} className="hover:text-accent-400 transition-colors">Farm Store</button></li>
              <li><button onClick={() => navigateTo('training')} className="hover:text-accent-400 transition-colors">Training</button></li>
              <li><button onClick={() => navigateTo('events')} className="hover:text-accent-400 transition-colors">Events &amp; Open Days</button></li>
              <li><button onClick={() => navigateTo('gallery')} className="hover:text-accent-400 transition-colors">Gallery</button></li>
              <li><button onClick={() => navigateTo('blog')} className="hover:text-accent-400 transition-colors">Insights</button></li>
              <li><button onClick={() => navigateTo('contact')} className="hover:text-accent-400 transition-colors">Contact</button></li>
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base border-b border-brand-800 pb-2">Contact Us</h4>
            <div className="text-xs text-brand-200 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent-400 shrink-0 mt-0.5" />
                <span>{FARM_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent-400 shrink-0" />
                <span>{FARM_INFO.phones[1]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent-400 shrink-0" />
                <span>{FARM_INFO.emails[1]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="bg-brand-950 border-t border-brand-900 py-4 px-4 text-center text-xs text-brand-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© Copyright 2026, Ekowsam Farms. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-brand-400">
            <button onClick={() => navigateTo('about')} className="hover:text-accent-400 transition-colors">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => navigateTo('contact')} className="hover:text-accent-400 transition-colors">Contact Us</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
