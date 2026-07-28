import React, { useState } from 'react';
import { PageId } from '../types';
import { FARM_INFO } from '../data/farmData';
import { 
  Leaf, Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Youtube, 
  Send, ShieldCheck, Award, Heart, ArrowUpRight
} from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageId) => void;
  openAIAssistant: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage, openAIAssistant }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 font-sans border-t-4 border-emerald-600">
      {/* Top Value Banner */}
      <div className="bg-emerald-900/90 text-emerald-100 py-6 px-4 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-xl bg-emerald-800/80 flex items-center justify-center text-amber-300 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">FDA Ghana Standardized</h4>
              <p className="text-xs text-emerald-200">Hygienic processing, vacuum packaging & quality control</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-xl bg-emerald-800/80 flex items-center justify-center text-amber-300 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">100% Sustainable & Organic</h4>
              <p className="text-xs text-emerald-200">Zero-chemical pesticides & circular waste recycling</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-xl bg-emerald-800/80 flex items-center justify-center text-amber-300 shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Direct Farm Orders & Support</h4>
              <p className="text-xs text-emerald-200">Fast delivery to Accra, Cape Coast, Kumasi & Tema</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Col 1: About Brand */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
              <Leaf className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <span className="text-xl font-black text-white font-serif">EKOW SAM</span>
              <span className="text-xl font-bold text-emerald-400"> FARMS</span>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed pr-4">
            Ghana's premier commercial agribusiness producing high-yield poultry eggs, dressed chicken, Giant African Snails, catfish aquaculture, greenhouse produce, and practical farmer training.
          </p>

          <div className="pt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">Connect With Us</p>
            <div className="flex items-center gap-3">
              <a href={FARM_INFO.socials.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={FARM_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={FARM_INFO.socials.twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href={FARM_INFO.socials.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-base border-b border-slate-800 pb-2">Quick Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => navigateTo('home')} className="hover:text-emerald-400 transition-colors">Home Page</button></li>
            <li><button onClick={() => navigateTo('about')} className="hover:text-emerald-400 transition-colors">About Us & History</button></li>
            <li><button onClick={() => navigateTo('divisions')} className="hover:text-emerald-400 transition-colors">Farm Divisions</button></li>
            <li><button onClick={() => navigateTo('store')} className="hover:text-emerald-400 transition-colors">Farm Produce Store</button></li>
            <li><button onClick={() => navigateTo('training')} className="hover:text-emerald-400 transition-colors">Farmers Masterclasses</button></li>
            <li><button onClick={() => navigateTo('gallery')} className="hover:text-emerald-400 transition-colors">Farm Gallery & Tours</button></li>
            <li><button onClick={() => navigateTo('blog')} className="hover:text-emerald-400 transition-colors">Farming Insights</button></li>
            <li><button onClick={() => navigateTo('contact')} className="hover:text-emerald-400 transition-colors">Contact Us</button></li>
          </ul>
        </div>

        {/* Col 3: Farm Divisions */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-base border-b border-slate-800 pb-2">Our Divisions</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Poultry & Layers Unit</li>
            <li>Aquaculture & Fish Hatchery</li>
            <li>Heliculture (Snail Farming)</li>
            <li>Greenhouse Vegetables</li>
            <li>Agro-Processing Unit</li>
            <li>Turnkey Farm Consultancy</li>
          </ul>
        </div>

        {/* Col 4: Newsletter & Contact Info */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-base border-b border-slate-800 pb-2">Get Farm Updates</h4>
          <p className="text-xs text-slate-400">
            Subscribe for seasonal harvest alerts, training discounts, and agricultural tips.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-900 text-white placeholder-slate-500 text-sm px-3.5 py-2.5 rounded-lg border border-slate-800 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 bg-emerald-600 hover:bg-emerald-500 text-white px-3 rounded-md transition-colors text-xs font-bold"
              >
                Join
              </button>
            </div>
            {subscribed && (
              <p className="text-xs text-emerald-400 font-medium">Thank you for subscribing to Ekow Sam Farms newsletter!</p>
            )}
          </form>

          <div className="pt-2 text-xs text-slate-400 space-y-1.5">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Gomoa Potsin Junction, Off Accra-Cape Coast Highway, Central Region, Ghana</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{FARM_INFO.phones[0]}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{FARM_INFO.emails[0]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Payment Badges */}
      <div className="bg-slate-900 border-t border-slate-800 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Ekow Sam Farms Ghana. All Rights Reserved. Empowering Sustainable Agriculture.</p>
          
          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-semibold">Accepted Payments:</span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 font-bold text-[10px] border border-yellow-500/30">MTN MoMo</span>
              <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-bold text-[10px] border border-red-500/30">Telecel Cash</span>
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold text-[10px] border border-blue-500/30">Visa / Mastercard</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px] border border-emerald-500/30">Cash on Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
