import React, { useState } from 'react';
import { PageId, Product } from '../types';
import { FARM_INFO, DIVISIONS, PRODUCTS, TESTIMONIALS, BLOG_POSTS } from '../data/farmData';
import { 
  Leaf, ShoppingBag, Calendar, Award, ShieldCheck, ArrowRight, Star, 
  Play, Users, CheckCircle, ChevronRight, Sparkles, MapPin, Phone,
  Egg, Fish, Bug, Sprout, Factory, GraduationCap, Flame, Eye, Calculator,
  Heart, Sun
} from 'lucide-react';

interface HomePageProps {
  setCurrentPage: (page: PageId) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onQuickView: (product: Product) => void;
  openAIAssistant: () => void;
  openPoultryCalculator?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentPage,
  onAddToCart,
  onQuickView,
  openAIAssistant,
  openPoultryCalculator
}) => {
  const getDivisionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Egg': return <Egg className="w-6 h-6" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6" />;
      case 'Factory': return <Factory className="w-6 h-6" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6" />;
      default: return <Leaf className="w-6 h-6" />;
    }
  };

  const featuredProducts = PRODUCTS.filter(p => p.featured).slice(0, 4);

  return (
    <div className="space-y-16 pb-16 font-sans">
      {/* HERO SECTION */}
      <section className="relative bg-blue-950 text-white min-h-[560px] flex items-center overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=1920"
            alt="Ekow Sam Farms Ghana"
            className="w-full h-full object-cover opacity-25 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-800/80 text-amber-300 border border-blue-700/80 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide backdrop-blur-xs">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>FRESHNESS YOU CAN TRUST</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight font-serif">
              From Our Farm, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-300 to-amber-300">
                To Your Table.
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
              Providing premium poultry products and organic eggs to the community for over 4 years.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setCurrentPage('store')}
                className="bg-blue-500 hover:bg-blue-400 text-slate-950 font-black px-6 py-3.5 rounded-xl text-base shadow-lg transition-all flex items-center gap-2.5 active:scale-95"
              >
                <ShoppingBag className="w-5 h-5 text-slate-950" />
                <span>Shop Fresh Produce</span>
              </button>

              {openPoultryCalculator && (
                <button
                  onClick={openPoultryCalculator}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-5 py-3.5 rounded-xl text-base transition-all flex items-center gap-2 shadow-md active:scale-95"
                >
                  <Calculator className="w-5 h-5 text-slate-950" />
                  <span>Poultry Calculator</span>
                </button>
              )}

              <button
                onClick={() => setCurrentPage('training')}
                className="bg-blue-900/80 hover:bg-blue-800 text-white font-bold px-5 py-3.5 rounded-xl text-base border border-blue-700 transition-all flex items-center gap-2"
              >
                <Calendar className="w-5 h-5 text-amber-300" />
                <span>Book Workshops</span>
              </button>
            </div>

            {/* Live Badges */}
            <div className="pt-6 border-t border-blue-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center gap-2 text-blue-200">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Zero Added Hormones</span>
              </div>
              <div className="flex items-center gap-2 text-blue-200">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>FDA Certified Foods</span>
              </div>
              <div className="flex items-center gap-2 text-blue-200">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>2,500+ Trainees</span>
              </div>
              <div className="flex items-center gap-2 text-blue-200">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>100% Organic Quality</span>
              </div>
            </div>
          </div>

          {/* Hero Side Feature Card */}
          <div className="lg:col-span-5 bg-blue-900/60 backdrop-blur-md border border-blue-700/60 rounded-2xl p-6 text-white space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-blue-800 pb-3">
              <h3 className="font-extrabold text-base text-amber-300 flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <span>Featured Farm Offerings</span>
              </h3>
              <span className="text-[11px] bg-blue-950 text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-800 font-bold">
                Daily Harvest
              </span>
            </div>

            <div className="space-y-3">
              <div 
                onClick={() => setCurrentPage('store')}
                className="p-3 bg-blue-950/80 hover:bg-blue-800/80 rounded-xl border border-blue-800 transition-colors cursor-pointer flex items-center gap-3"
              >
                <img 
                  src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=200"
                  alt="Fresh Eggs"
                  className="w-14 h-14 rounded-lg object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-sm text-white">Commercial Table Eggs</h4>
                  <p className="text-xs text-blue-300">GH¢ 65.00 / Crate of 30</p>
                  <p className="text-[10px] text-slate-400">Collected fresh daily from biosecure layers</p>
                </div>
              </div>

              <div 
                onClick={() => setCurrentPage('store')}
                className="p-3 bg-blue-950/80 hover:bg-blue-800/80 rounded-xl border border-blue-800 transition-colors cursor-pointer flex items-center gap-3"
              >
                <img 
                  src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=200"
                  alt="Dressed Chicken"
                  className="w-14 h-14 rounded-lg object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-sm text-white">Live Dressed Broiler</h4>
                  <p className="text-xs text-blue-300">GH¢ 120.00 / Per Bird</p>
                  <p className="text-[10px] text-slate-400">Hormone-free and vacuum packed</p>
                </div>
              </div>

              <div 
                onClick={() => setCurrentPage('store')}
                className="p-3 bg-blue-950/80 hover:bg-blue-800/80 rounded-xl border border-blue-800 transition-colors cursor-pointer flex items-center gap-3"
              >
                <img 
                  src="https://images.unsplash.com/photo-1628268909376-e8c459632eb3?auto=format&fit=crop&q=80&w=200"
                  alt="Kosua ne Meko"
                  className="w-14 h-14 rounded-lg object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-sm text-white">Kosua ne Meko</h4>
                  <p className="text-xs text-blue-300">GH¢ 25.00 / Pack</p>
                  <p className="text-[10px] text-slate-400">Farm fresh eggs with special pepper</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentPage('store')}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore All Produce in Farm Store</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* QUICK STATS BAND */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-blue-800 font-serif">15,000+</span>
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Birds Raised Annually</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-blue-800 font-serif">100%</span>
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Organic Feed Policy</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-blue-800 font-serif">100+</span>
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Restaurants Supplied</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-blue-800 font-serif">0</span>
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Added Hormones</p>
          </div>
        </div>
      </section>

      {/* ABOUT BRIEF SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=800"
                alt="Ekow Sam Farms Agriculture"
                className="w-full h-[420px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-amber-500 text-slate-950 font-black text-[10px] uppercase px-2.5 py-1 rounded">
                  FOUNDER'S VISION
                </span>
                <p className="text-sm font-semibold mt-2 text-slate-100">
                  "At Ekow Farms, we believe in raising healthy, happy birds that contribute to a sustainable future."
                </p>
                <p className="text-xs text-amber-300 font-bold mt-1">— Ekow Sam, CEO & Founder</p>
              </div>
            </div>

            {/* Badge overlay */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex bg-blue-800 text-white p-5 rounded-2xl shadow-xl border-2 border-blue-600 max-w-xs items-center gap-3">
              <Award className="w-8 h-8 text-amber-300 shrink-0" />
              <div>
                <h5 className="font-bold text-sm">FDA Certified Facility</h5>
                <p className="text-[11px] text-blue-200">Adhering to strict Food & Hygiene Standards in Ghana</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
                Welcome to Ekow Sam Farms
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-serif leading-tight">
                Freshness You Can Trust, From Our Farm to Your Table.
              </h2>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">
              At Ekow Farms, we believe in raising healthy, happy birds that contribute to a sustainable future. Our commitment to eco-friendly practices ensures that every chicken and egg we produce is not only delicious but also responsibly sourced.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Farm Freshness</h4>
                  <p className="text-xs text-slate-500">Processed and delivered within 24 hours.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Organic Feed</h4>
                  <p className="text-xs text-slate-500">No growth hormones or harmful additives.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Community Focused</h4>
                  <p className="text-xs text-slate-500">Supporting local agriculture and sustainable practices.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => setCurrentPage('about')}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors shadow-sm flex items-center gap-2"
              >
                <span>Read Full Company Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FARM DIVISIONS GRID */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
              OUR SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-serif">
              What We Offer
            </h2>
            <p className="text-slate-600 text-sm">
              Discover the specialized services powering Ekow Sam Farms' agricultural production and value addition in Ghana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {DIVISIONS.map((div) => (
              <div
                key={div.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-slate-200/80 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={div.image}
                      alt={div.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                      {getDivisionIcon(div.iconName)}
                    </div>
                    <span className="absolute bottom-3 right-3 bg-blue-950/90 text-blue-300 text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-blue-700">
                      {div.capacity}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors font-serif">
                      {div.title}
                    </h3>
                    <p className="text-xs text-blue-800 font-semibold">{div.subtitle}</p>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {div.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => setCurrentPage('divisions')}
                    className="w-full bg-slate-100 hover:bg-blue-600 text-slate-800 hover:text-white font-bold py-2.5 rounded-xl transition-all text-xs flex items-center justify-center gap-1.5"
                  >
                    <span>View Service Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED FARM STORE PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
              DIRECT FROM FARM
            </span>
            <h2 className="text-3xl font-black text-slate-900 font-serif mt-2">
              Featured Fresh Farm Produce
            </h2>
            <p className="text-slate-600 text-xs mt-1">
              Hygienically packaged produce dispatches delivered directly to your doorstep or supermarket.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('store')}
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-xs shrink-0"
          >
            <span>Browse Full Farm Store ({PRODUCTS.length} Items)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 bg-blue-800 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {product.category}
                  </span>
                  <button
                    onClick={() => onQuickView(product)}
                    className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-xl shadow-md transition-colors text-xs font-bold flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-700" />
                    <span>Quick View</span>
                  </button>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-bold text-slate-800">{product.rating}</span>
                    <span className="text-slate-400 text-[10px]">({product.reviewsCount})</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">
                    {product.name}
                  </h3>

                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 space-y-3">
                <div className="flex items-baseline justify-between border-t border-slate-100 pt-3">
                  <div>
                    <span className="text-lg font-black text-blue-800">
                      GH¢ {product.priceGHS.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-400 block">{product.unit}</span>
                  </div>
                </div>

                <button
                  onClick={() => onAddToCart(product, 1)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Basket</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest bg-blue-800 px-3 py-1 rounded-full border border-blue-700">
              WHY CHOOSE US
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-serif text-white">
              Why Ekow Sams and not the grocery store?
            </h2>
            <p className="text-blue-200 text-xs sm:text-sm">
              We stand by our commitment to delivering the freshest and healthiest poultry products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-950/80 p-6 rounded-2xl border border-blue-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-800 flex items-center justify-center text-amber-300 font-bold text-lg">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white font-serif">Farm Freshness</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Processed and delivered within 24 hours to ensure you get the absolute best quality directly from our farm.
              </p>
            </div>

            <div className="bg-blue-950/80 p-6 rounded-2xl border border-blue-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-800 flex items-center justify-center text-amber-300 font-bold text-lg">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white font-serif">Organic Feed</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We use 100% organic feed. There are absolutely no growth hormones or harmful additives in our birds.
              </p>
            </div>

            <div className="bg-blue-950/80 p-6 rounded-2xl border border-blue-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-800 flex items-center justify-center text-amber-300 font-bold text-lg">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white font-serif">Community Focused</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Supporting local agriculture, sustainable practices, and empowering farmers through our agribusiness masterclasses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
            TESTIMONIALS & REVIEWS
          </span>
          <h2 className="text-3xl font-black text-slate-900 font-serif">
            Trusted by Hotels, Supermarkets & Families
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((test) => (
            <div key={test.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 italic leading-relaxed">
                  "{test.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <img
                  src={test.image}
                  alt={test.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{test.name}</h4>
                  <p className="text-[10px] text-blue-800 font-medium">{test.role} • {test.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-800 to-green-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-blue-700">
          <div className="space-y-3 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-black font-serif">
              Ready to Order Fresh Produce or Book a Farm Training?
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm max-w-xl">
              Connect directly with Ekow Sam Farms for wholesale produce supply, masterclass registrations, or turnkey farm installation in Ghana.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setCurrentPage('store')}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-6 py-3.5 rounded-xl text-sm transition-all shadow-md active:scale-95"
            >
              Shop Farm Store
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="bg-blue-950 hover:bg-blue-900 text-white font-bold px-6 py-3.5 rounded-xl text-sm border border-blue-700 transition-colors"
            >
              Contact Farm Office
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
