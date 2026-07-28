import React, { useState } from 'react';
import { PageId, Product } from '../types';
import { FARM_INFO, DIVISIONS, PRODUCTS, TESTIMONIALS, BLOG_POSTS } from '../data/farmData';
import { 
  Leaf, ShoppingBag, Calendar, Award, ShieldCheck, ArrowRight, Star, 
  Play, Users, CheckCircle, ChevronRight, Sparkles, MapPin, Phone,
  Egg, Fish, Bug, Sprout, Factory, GraduationCap, Flame, Eye, Calculator
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
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const getDivisionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Egg': return <Egg className="w-6 h-6" />;
      case 'Fish': return <Fish className="w-6 h-6" />;
      case 'Bug': return <Bug className="w-6 h-6" />;
      case 'Sprout': return <Sprout className="w-6 h-6" />;
      case 'Factory': return <Factory className="w-6 h-6" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6" />;
      default: return <Leaf className="w-6 h-6" />;
    }
  };

  const featuredProducts = PRODUCTS.filter(p => p.featured).slice(0, 4);

  return (
    <div className="space-y-16 pb-16 font-sans">
      {/* HERO SECTION */}
      <section className="relative bg-emerald-950 text-white min-h-[560px] flex items-center overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1920"
            alt="Ekow Sam Farms Ghana"
            className="w-full h-full object-cover opacity-25 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-800/80 text-amber-300 border border-emerald-700/80 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide backdrop-blur-xs">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>GHANA'S PREMIER SUSTAINABLE AGRIBUSINESS</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight font-serif">
              Nurturing Nature, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-amber-300">
                Feeding Communities
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
              Ekow Sam Farms leads commercial agriculture in West Africa — producing high-yield layer eggs, dressed broilers, Giant African Snails, catfish aquaculture, greenhouse produce, and practical farmer training.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setCurrentPage('store')}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3.5 rounded-xl text-base shadow-lg transition-all flex items-center gap-2.5 active:scale-95"
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
                className="bg-emerald-900/80 hover:bg-emerald-800 text-white font-bold px-5 py-3.5 rounded-xl text-base border border-emerald-700 transition-all flex items-center gap-2"
              >
                <Calendar className="w-5 h-5 text-amber-300" />
                <span>Book Workshops</span>
              </button>
            </div>

            {/* Live Badges */}
            <div className="pt-6 border-t border-emerald-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center gap-2 text-emerald-200">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>500+ Acres Farmed</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-200">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>FDA Certified Foods</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-200">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>2,500+ Trainees</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-200">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Organic Quality</span>
              </div>
            </div>
          </div>

          {/* Hero Side Feature Card */}
          <div className="lg:col-span-5 bg-emerald-900/60 backdrop-blur-md border border-emerald-700/60 rounded-2xl p-6 text-white space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-emerald-800 pb-3">
              <h3 className="font-extrabold text-base text-amber-300 flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <span>Featured Farm Offerings</span>
              </h3>
              <span className="text-[11px] bg-emerald-950 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-800 font-bold">
                Daily Harvest
              </span>
            </div>

            <div className="space-y-3">
              <div 
                onClick={() => setCurrentPage('store')}
                className="p-3 bg-emerald-950/80 hover:bg-emerald-800/80 rounded-xl border border-emerald-800 transition-colors cursor-pointer flex items-center gap-3"
              >
                <img 
                  src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=200"
                  alt="Fresh Eggs"
                  className="w-14 h-14 rounded-lg object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-sm text-white">Commercial Table Eggs</h4>
                  <p className="text-xs text-emerald-300">GH¢ 65.00 / Crate of 30</p>
                  <p className="text-[10px] text-slate-400">Collected fresh daily from biosecure layers</p>
                </div>
              </div>

              <div 
                onClick={() => setCurrentPage('store')}
                className="p-3 bg-emerald-950/80 hover:bg-emerald-800/80 rounded-xl border border-emerald-800 transition-colors cursor-pointer flex items-center gap-3"
              >
                <img 
                  src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=200"
                  alt="Giant Snails"
                  className="w-14 h-14 rounded-lg object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-sm text-white">Giant African Land Snails</h4>
                  <p className="text-xs text-emerald-300">GH¢ 180.00 / Pack of 10 Jumbo</p>
                  <p className="text-[10px] text-slate-400">Organically bred Archachatina marginata</p>
                </div>
              </div>

              <div 
                onClick={() => setCurrentPage('store')}
                className="p-3 bg-emerald-950/80 hover:bg-emerald-800/80 rounded-xl border border-emerald-800 transition-colors cursor-pointer flex items-center gap-3"
              >
                <img 
                  src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=200"
                  alt="Smoked Catfish"
                  className="w-14 h-14 rounded-lg object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-sm text-white">Oven-Smoked Catfish</h4>
                  <p className="text-xs text-emerald-300">GH¢ 160.00 / Pack of 5 Large</p>
                  <p className="text-[10px] text-slate-400">Vacuum packed • FDA Ghana approved</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentPage('store')}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore All Produce in Farm Store</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* QUICK STATS BAND */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-emerald-800 font-serif">500+</span>
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Acres Cultivated</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-emerald-800 font-serif">15,000+</span>
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Birds & Livestock</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-emerald-800 font-serif">100,000+</span>
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Catfish & Tilapia</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-emerald-800 font-serif">2,500+</span>
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Trainees Certified</p>
          </div>
        </div>
      </section>

      {/* ABOUT BRIEF SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800"
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
                  "Our goal is to build sustainable food sovereignty in Ghana through modern commercial agriculture, value addition, and youth training."
                </p>
                <p className="text-xs text-amber-300 font-bold mt-1">— Ekow Sam, CEO & Founder</p>
              </div>
            </div>

            {/* Badge overlay */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex bg-emerald-800 text-white p-5 rounded-2xl shadow-xl border-2 border-emerald-600 max-w-xs items-center gap-3">
              <Award className="w-8 h-8 text-amber-300 shrink-0" />
              <div>
                <h5 className="font-bold text-sm">FDA Certified Facility</h5>
                <p className="text-[11px] text-emerald-200">Adhering to strict Food & Hygiene Standards in Ghana</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                Welcome to Ekow Sam Farms
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-serif leading-tight">
                Pioneering Commercial Agribusiness Across West Africa
              </h2>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">
              Established with a commitment to sustainable commercial agriculture, Ekow Sam Farms operates an integrated 500-acre estate in the Central Region of Ghana. We seamlessly combine livestock husbandry, aquaculture, heliculture (snail farming), greenhouse horticulture, and agro-processing into a circular zero-waste ecosystem.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Integrated Circular Agriculture</h4>
                  <p className="text-xs text-slate-500">Poultry manure enriches crop soil, while fish pond effluent irrigates greenhouse tomatoes.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Direct-to-Consumer Freshness</h4>
                  <p className="text-xs text-slate-500">Daily harvest dispatches serving supermarkets, hotels, restaurants, and homes in Accra, Kumasi & Cape Coast.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Youth & Diaspora Agribusiness Training</h4>
                  <p className="text-xs text-slate-500">Empowering aspiring farmers with practical masterclasses and turnkey farm installation blueprints.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => setCurrentPage('about')}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors shadow-sm flex items-center gap-2"
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
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
              OUR OPERATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-serif">
              Explore Our Core Farm Divisions
            </h2>
            <p className="text-slate-600 text-sm">
              Discover the six specialized arms powering Ekow Sam Farms' agricultural production and value addition in Ghana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                      {getDivisionIcon(div.iconName)}
                    </div>
                    <span className="absolute bottom-3 right-3 bg-emerald-950/90 text-emerald-300 text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-emerald-700">
                      {div.capacity}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors font-serif">
                      {div.title}
                    </h3>
                    <p className="text-xs text-emerald-800 font-semibold">{div.subtitle}</p>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {div.summary}
                    </p>

                    <div className="pt-2 space-y-1">
                      <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Key Outputs:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {div.keyProducts.slice(0, 3).map((prod, i) => (
                          <span key={i} className="bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded border border-slate-200">
                            {prod}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => setCurrentPage('divisions')}
                    className="w-full bg-slate-100 hover:bg-emerald-600 text-slate-800 hover:text-white font-bold py-2.5 rounded-xl transition-all text-xs flex items-center justify-center gap-1.5"
                  >
                    <span>View Division Details</span>
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
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
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
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-xs shrink-0"
          >
            <span>Browse Full Farm Store ({PRODUCTS.length} Items)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <span className="absolute top-3 left-3 bg-emerald-800 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {product.category}
                  </span>
                  <button
                    onClick={() => onQuickView(product)}
                    className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-xl shadow-md transition-colors text-xs font-bold flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5 text-emerald-700" />
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
                    <span className="text-lg font-black text-emerald-800">
                      GH¢ {product.priceGHS.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-400 block">{product.unit}</span>
                  </div>
                </div>

                <button
                  onClick={() => onAddToCart(product, 1)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Basket</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ZERO-WASTE SUSTAINABILITY SHOWCASE */}
      <section className="bg-emerald-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest bg-emerald-800 px-3 py-1 rounded-full border border-emerald-700">
              CIRCULAR ECOSYSTEM
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-serif text-white">
              Zero-Waste Sustainable Farming Method
            </h2>
            <p className="text-emerald-200 text-xs sm:text-sm">
              How Ekow Sam Farms closes the loop by turning farm byproducts into vital inputs across divisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-emerald-950/80 p-6 rounded-2xl border border-emerald-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-800 flex items-center justify-center text-amber-300 font-bold text-lg">
                1
              </div>
              <h3 className="font-bold text-lg text-white font-serif">Poultry Manure to Bio-Fertilizer</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Manure from our 15,000 layers is composted with biochar and neem cake to produce nutrient-rich bio-fertilizer for our 350+ acre crop fields.
              </p>
            </div>

            <div className="bg-emerald-950/80 p-6 rounded-2xl border border-emerald-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-800 flex items-center justify-center text-amber-300 font-bold text-lg">
                2
              </div>
              <h3 className="font-bold text-lg text-white font-serif">Fish Water Fertigation</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Nitrate-rich wastewater flushed from our catfish tanks is piped into drip irrigation systems powering our greenhouse tomatoes and peppers.
              </p>
            </div>

            <div className="bg-emerald-950/80 p-6 rounded-2xl border border-emerald-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-800 flex items-center justify-center text-amber-300 font-bold text-lg">
                3
              </div>
              <h3 className="font-bold text-lg text-white font-serif">Crop Byproducts for Snail Feed</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cassava peelings, papaya leaves, and maize bran nourish our 35,000 Giant African Snails, eliminating waste disposal costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
            TESTIMONIALS & REVIEWS
          </span>
          <h2 className="text-3xl font-black text-slate-900 font-serif">
            Trusted by Hotels, Supermarkets & Farmers
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
                  <p className="text-[10px] text-emerald-800 font-medium">{test.role} • {test.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-800 to-green-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-emerald-700">
          <div className="space-y-3 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-black font-serif">
              Ready to Order Fresh Produce or Book a Farm Training?
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-xl">
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
              className="bg-emerald-950 hover:bg-emerald-900 text-white font-bold px-6 py-3.5 rounded-xl text-sm border border-emerald-700 transition-colors"
            >
              Contact Farm Office
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
