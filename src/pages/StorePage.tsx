import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS, PRODUCT_CATEGORY_LABELS, FARM_INFO } from '../data/farmData';
import { PageHeader } from '../components/PageHeader';
import { 
  ShoppingBag, Search, Filter, Eye, Star, Check, Tag, ShieldCheck, 
  Truck, Award, ArrowRight
} from 'lucide-react';

interface StorePageProps {
  onAddToCart: (product: Product, quantity: number) => void;
  onQuickView: (product: Product) => void;
  openCart: () => void;
}

export const StorePage: React.FC<StorePageProps> = ({
  onAddToCart,
  onQuickView,
  openCart
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'name'>('featured');

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'eggs', label: 'Fresh Eggs' },
    { id: 'poultry', label: 'Dressed Chicken' },
    { id: 'live-birds', label: 'Live Birds & Pullets' },
    { id: 'ready-to-eat', label: 'Ready to Eat' },
  ];

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="space-y-12 pb-16 font-sans">
      <PageHeader
        eyebrow="Farm Store"
        title="Order Direct From the Farm"
        description="Crates of farm-fresh yellow-yolked eggs, hormone-free dressed chicken, live birds, and point-of-lay pullets — delivered across Greater Accra or collected at the farm gate."
        image="/images/farm-crates-stacked.webp"
      />

      {/* Pricing model, stated up front so "no price" never reads as an oversight. */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-accent-50 border border-accent-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-accent-700 text-white flex items-center justify-center shrink-0">
            <Tag className="w-5 h-5" />
          </div>
          <div className="flex-1 space-y-1">
            <h2 className="font-bold text-slate-900 text-sm">Prices are quoted per order</h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              Rates move with the flock cycle, bird size, and how much you need, so we quote every
              order directly. Build your request below and we'll come back with current pricing —
              usually the same day.
            </p>
          </div>
          <a
            href={`tel:${FARM_INFO.phones[0].replace(/\s/g, '')}`}
            className="bg-accent-700 hover:bg-accent-800 text-white font-bold px-5 py-2.5 rounded-full text-xs transition-colors shrink-0 whitespace-nowrap"
          >
            Call for a price
          </a>
        </div>
      </section>

      {/* Main Catalog Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Controls Bar: Search + Category Tabs + Sort */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search eggs, chicken, pullets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 bg-slate-50"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <span className="text-xs font-bold text-slate-600 whitespace-nowrap">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
              >
                <option value="featured">Featured First</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name (A–Z)</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-700 text-base">No products match your search query.</h3>
            <p className="text-xs text-slate-500">Try adjusting your filters or search keywords.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="bg-brand-600 text-white text-xs font-bold px-4 py-2 rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-brand-900 text-brand-100 text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                      {PRODUCT_CATEGORY_LABELS[product.category]}
                    </span>
                    {product.featured && (
                      <span className="absolute top-3 right-3 bg-accent-700 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-xs">
                        FEATURED
                      </span>
                    )}
                    <button
                      onClick={() => onQuickView(product)}
                      className="absolute bottom-3 right-3 bg-white/95 hover:bg-white text-slate-800 p-2 rounded-xl shadow-md transition-colors text-xs font-bold flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-brand-700" />
                      <span>Details</span>
                    </button>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-1 text-accent-700 text-xs">
                      <Star className="w-3.5 h-3.5 fill-accent-700" />
                      <span className="font-bold text-slate-800">{product.rating}</span>
                      <span className="text-slate-500 text-[10px]">({product.reviewsCount} reviews)</span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base line-clamp-2 leading-tight">
                      {product.name}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {product.bulkNote && (
                      <div className="p-1.5 bg-accent-50 border border-accent-200 rounded text-[10px] text-accent-800 font-medium flex items-center gap-1">
                        <Tag className="w-3 h-3 text-accent-700 shrink-0" />
                        <span className="truncate">{product.bulkNote}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0 space-y-3">
                  <div className="border-t border-slate-100 pt-3">
                    <span className="text-xs font-bold text-brand-800">Priced on request</span>
                    <span className="text-[10px] text-slate-500 block">{product.unit}</span>
                  </div>

                  <button
                    onClick={() => onAddToCart(product, 1)}
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Request</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
