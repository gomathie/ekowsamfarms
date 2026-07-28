import React, { useState } from 'react';
import { Product } from '../types';
import { X, ShoppingBag, Check, Star, ShieldCheck, Plus, Minus, Tag } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 my-8 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 shadow-md flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="h-64 md:h-full relative bg-slate-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.featured && (
              <span className="absolute top-4 left-4 bg-amber-500 text-slate-950 text-xs font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
                Featured Produce
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                {product.category}
              </span>

              <h3 className="text-xl font-bold text-slate-900 mt-2 leading-snug">
                {product.name}
              </h3>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="text-xs font-bold text-slate-800 ml-1">{product.rating}</span>
                </div>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-500">{product.reviewsCount} verified farm reviews</span>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-2xl font-black text-emerald-800">
                  GH¢ {product.priceGHS.toFixed(2)}
                </span>
                <span className="text-xs text-slate-500">/ {product.unit}</span>
                <span className="text-xs text-slate-400 ml-auto">
                  (~${product.priceUSD.toFixed(2)} USD)
                </span>
              </div>

              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Specs */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-xs">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-slate-600">
                    <span className="font-bold text-slate-800">{key}:</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>

              {product.bulkDiscount && (
                <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 font-medium flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>{product.bulkDiscount}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Quantity:</span>
                <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-slate-200 text-slate-600 rounded-l-lg transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-slate-200 text-slate-600 rounded-r-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAdd}
                disabled={added}
                className={`w-full font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm ${
                  added 
                    ? 'bg-emerald-800 text-white' 
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-98'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-300" />
                    <span>Added to Basket!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Basket • GH¢ {(product.priceGHS * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
