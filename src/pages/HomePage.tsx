import React from 'react';
import { PageId, Product } from '../types';
import { FARM_INFO, DIVISIONS, PRODUCTS, TESTIMONIALS, BLOG_POSTS } from '../data/farmData';
import { 
  ShoppingBag, Calendar, Award, ArrowRight, Star, 
  CheckCircle, ChevronRight, MapPin, Phone,
  Egg, Factory, Eye, Calculator,
  Sun, Leaf, Heart, ThumbsUp
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
      default: return <Egg className="w-6 h-6" />;
    }
  };

  return (
    <div className="font-sans space-y-0 pb-16">
      {/* HERO SECTION (Dark Brown #3B2314 background) */}
      <section className="relative bg-brand-800 text-white min-h-[520px] flex items-center justify-center overflow-hidden py-20 px-4">
        {/* Background Image & Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-chicken.webp"
            alt="Ekow Sam Farms Poultry"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/90 via-brand-800/80 to-brand-950/90" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-brand-900/90 text-accent-500 border border-accent-500/30 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase">
            <span>Freshness You Can Trust, From Our Farm to Your Table.</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight font-serif tracking-tight">
            Freshness You Can Trust, <br />
            <span className="text-accent-500">From Our Farm to Your Table.</span>
          </h1>

          <p className="text-brand-100 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto font-light">
            Providing premium poultry products and organic eggs to the community for over 4 years.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setCurrentPage('store')}
              className="bg-accent-500 hover:bg-accent-400 text-brand-950 font-black px-8 py-3.5 rounded-full text-base shadow-xl transition-transform hover:scale-105 flex items-center gap-2"
            >
              <ShoppingBag className="w-5 h-5 text-brand-950" />
              <span>Our Products</span>
            </button>

            <button
              onClick={() => setCurrentPage('divisions')}
              className="border-2 border-white hover:bg-white hover:text-brand-950 text-white font-black px-8 py-3.5 rounded-full text-base transition-colors"
            >
              Our Services
            </button>
          </div>
        </div>
      </section>

      {/* OUR SERVICES SECTION (Light Gray Background) */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-brand-950 font-serif">
              Our Services
            </h2>
            <div className="w-16 h-1 bg-accent-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center space-y-4 border border-slate-200/60 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-brand-950 font-serif">Wholesale Supply</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Consistent, high-volume poultry supply for hotels, restaurants, and catering services.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm text-center space-y-4 border border-slate-200/60 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-brand-950 font-serif">Home Delivery</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Farm-fresh crates of eggs and dressed birds delivered straight to your doorstep.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm text-center space-y-4 border border-slate-200/60 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-brand-950 font-serif">Live Stock Sales</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Healthy, well-vaccinated birds for those looking to start their own poultry journey or for festive seasons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION (Golden Yellow #F5D100 Background) */}
      <section className="bg-accent-500 text-brand-950 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black font-serif">
              Why Choose Us
            </h2>
            <p className="text-brand-900 font-semibold text-sm">
              Why Ekow Sams and not the grocery store?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-accent-100 text-brand-800 mx-auto flex items-center justify-center font-bold">
                <Sun className="w-8 h-8 text-accent-500 fill-accent-500" />
              </div>
              <h3 className="text-xl font-bold text-brand-950 font-serif">Farm Freshness</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Processed and delivered within 24 hours.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-accent-100 text-brand-800 mx-auto flex items-center justify-center font-bold">
                <Leaf className="w-8 h-8 text-accent-500" />
              </div>
              <h3 className="text-xl font-bold text-brand-950 font-serif">Organic Feed</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                No growth hormones or harmful additives.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-accent-100 text-brand-800 mx-auto flex items-center justify-center font-bold">
                <Heart className="w-8 h-8 text-accent-500 fill-accent-500" />
              </div>
              <h3 className="text-xl font-bold text-brand-950 font-serif">Community Focused</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Supporting local agriculture and sustainable practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAND (Dark Brown #3B2314) */}
      <section className="bg-brand-950 text-white py-12 px-4 border-y border-brand-900">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <span className="text-4xl sm:text-5xl font-black text-accent-500 font-serif">4,768+</span>
            <p className="text-xs sm:text-sm font-medium text-brand-200">Birds Raised Annually</p>
          </div>
          <div className="space-y-2">
            <span className="text-4xl sm:text-5xl font-black text-accent-500 font-serif">79%</span>
            <p className="text-xs sm:text-sm font-medium text-brand-200">Organic Feed Policy</p>
          </div>
          <div className="space-y-2">
            <span className="text-4xl sm:text-5xl font-black text-accent-500 font-serif">157+</span>
            <p className="text-xs sm:text-sm font-medium text-brand-200">People & Restaurants Supplied</p>
          </div>
          <div className="space-y-2">
            <span className="text-4xl sm:text-5xl font-black text-accent-500 font-serif">0</span>
            <p className="text-xs sm:text-sm font-medium text-brand-200">Added Hormones or Chemicals</p>
          </div>
        </div>
      </section>

      {/* ABOUT US BRIEF SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-black text-brand-950 font-serif">About Us</h2>
        <div className="w-16 h-1 bg-brand-800 mx-auto rounded-full" />
        <p className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
          At Ekow Farms, we believe in raising healthy, happy birds that contribute to a sustainable future. Our commitment to eco-friendly practices ensures that every chicken and egg we produce is not only delicious but also responsibly sourced.
        </p>
        <button
          onClick={() => setCurrentPage('about')}
          className="inline-flex items-center gap-2 text-brand-800 font-bold hover:text-brand-600 transition-colors text-sm"
        >
          <span>Learn More About Our Farm</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* KEY PRODUCTS WE HAVE SECTION */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-brand-950 font-serif">
              Key Products We Have
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="h-64 overflow-hidden bg-slate-100 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-brand-800 text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                      {product.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-brand-950 font-serif text-center">
                      {product.name}
                    </h3>
                    <p className="text-slate-600 text-xs text-center leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-3 text-center">
                  <div className="text-2xl font-black text-brand-800">
                    GH¢ {product.priceGHS.toFixed(2)}
                  </div>
                  <button
                    onClick={() => onAddToCart(product, 1)}
                    className="w-full bg-brand-800 hover:bg-brand-900 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Order Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION (Dark Brown #3B2314 Background) */}
      <section className="bg-brand-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((test) => (
              <div key={test.id} className="bg-white text-slate-900 p-8 rounded-2xl space-y-6 flex flex-col justify-between shadow-lg">
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{test.comment}"
                </p>

                <div className="border-t border-slate-100 pt-4 text-center">
                  <h4 className="font-bold text-base text-brand-950 font-serif">{test.name}</h4>
                  <p className="text-xs text-brand-700 font-medium">{test.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST NEWS & INSIGHTS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-brand-950 font-serif">
            Latest News & Insights
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setCurrentPage('blog')}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden bg-slate-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-bold text-slate-900 text-lg font-serif leading-snug hover:text-brand-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3">
                    {post.snippet}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
