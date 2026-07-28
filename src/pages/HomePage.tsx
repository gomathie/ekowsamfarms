import React, { useState, useEffect } from 'react';
import { PageId, Product } from '../types';
import { FARM_INFO, DIVISIONS, PRODUCTS, TESTIMONIALS, BLOG_POSTS } from '../data/farmData';
import { 
  ShoppingBag, Calendar, Award, ArrowRight, Star, 
  CheckCircle, ChevronRight, ChevronLeft, MapPin, Phone,
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

const heroSlides = [
  {
    image: '/images/hero-bg.webp',
    tagline: 'Freshness You Can Trust, From Our Farm to Your Table.',
    title: 'Freshness You Can Trust,',
    titleAccent: 'From Our Farm to Your Table.',
    description: 'Providing premium poultry products and organic eggs to the community for over 4 years.'
  },
  {
    image: '/images/scraped_4.webp',
    tagline: '100% Farm-Fresh Yellow Yolked Eggs',
    title: 'Rich Golden Yolks,',
    titleAccent: 'Nutrient-Dense Egg Crates.',
    description: 'Collected daily from free-flowing, nutrient-fed layers. Delivered fresh within 24 hours.'
  },
  {
    image: '/images/scraped_7.webp',
    tagline: 'Hygienically Slaughtered & Dressed Chicken',
    title: 'Hormone-Free Broilers,',
    titleAccent: 'Vacuum-Packed Freshness.',
    description: 'Raised on 79% organic feed with zero artificial growth hormones or additives.'
  },
  {
    image: '/images/gallery-farm.webp',
    tagline: 'Biosecure Commercial Poultry Infrastructure',
    title: 'Modern Poultry Farming,',
    titleAccent: 'Empowering Ghana\'s Agribusiness.',
    description: 'State-of-the-art biosecure layer pens and eco-friendly agricultural operations in Kasoa.'
  }
];

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentPage,
  onAddToCart,
  onQuickView,
  openAIAssistant,
  openPoultryCalculator
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

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
      {/* HERO SLIDER SECTION */}
      <section className="relative bg-brand-950 text-white min-h-[560px] flex items-center justify-center overflow-hidden py-20 px-4 group">
        {/* Background Images with Fade Transition */}
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover opacity-90 transition-transform duration-7000 ease-linear scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/75" />
          </div>
        ))}

        {/* Hero Slide Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 bg-brand-950/30 backdrop-blur-xs p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          <div className="inline-flex items-center gap-2 bg-brand-900/90 text-accent-400 border border-accent-500/40 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase shadow-md transition-all">
            <span>{heroSlides[currentSlide].tagline}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight font-serif tracking-tight transition-all drop-shadow-md">
            {heroSlides[currentSlide].title} <br />
            <span className="text-accent-400">{heroSlides[currentSlide].titleAccent}</span>
          </h1>

          <p className="text-white text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto font-medium transition-all drop-shadow-sm">
            {heroSlides[currentSlide].description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setCurrentPage('store')}
              className="bg-accent-500 hover:bg-accent-400 text-white font-black px-8 py-3.5 rounded-full text-base shadow-xl transition-transform hover:scale-105 flex items-center gap-2"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
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

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-brand-950/60 hover:bg-brand-900 text-white border border-brand-800 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-brand-950/60 hover:bg-brand-900 text-white border border-brand-800 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center items-center gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-accent-400' : 'w-2.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
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

      {/* WHY CHOOSE US SECTION (Vibrant Green Background) */}
      <section className="bg-accent-500 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black font-serif text-white">
              Why Choose Us
            </h2>
            <p className="text-accent-100 font-semibold text-sm">
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

      {/* STATS BAND (Deep Red #450A0A) */}
      <section className="bg-brand-950 text-white py-12 px-4 border-y border-brand-900">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <span className="text-4xl sm:text-5xl font-black text-accent-400 font-serif">4,768+</span>
            <p className="text-xs sm:text-sm font-medium text-brand-200">Birds Raised Annually</p>
          </div>
          <div className="space-y-2">
            <span className="text-4xl sm:text-5xl font-black text-accent-400 font-serif">79%</span>
            <p className="text-xs sm:text-sm font-medium text-brand-200">Organic Feed Policy</p>
          </div>
          <div className="space-y-2">
            <span className="text-4xl sm:text-5xl font-black text-accent-400 font-serif">157+</span>
            <p className="text-xs sm:text-sm font-medium text-brand-200">People & Restaurants Supplied</p>
          </div>
          <div className="space-y-2">
            <span className="text-4xl sm:text-5xl font-black text-accent-400 font-serif">0</span>
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

      {/* TESTIMONIALS SECTION (Deep Red #450A0A Background) */}
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
