import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  if (!isOpen) return null;

  const subtotalGHS = cartItems.reduce(
    (sum, item) => sum + item.product.priceGHS * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 bg-brand-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-800 flex items-center justify-center text-brand-200">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">Your Farm Basket</h3>
                <p className="text-xs text-brand-200">{cartItems.length} items selected</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-brand-800 text-brand-200 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-slate-100">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-700 mb-1">Your Basket is Empty</h4>
                <p className="text-xs text-slate-500 mb-6">
                  Explore our farm store for crates of fresh eggs, hormone-free dressed chicken, live broilers, and point-of-lay pullets.
                </p>
                <button
                  onClick={onClose}
                  className="bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-sm"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.product.id} className="pt-4 first:pt-0 flex gap-3">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover border border-slate-100 shrink-0 bg-slate-50"
                    loading="lazy"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-sm text-slate-900 leading-snug line-clamp-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-500 hover:text-brand-600 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{item.product.unit}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-slate-200 text-slate-600 rounded-l-lg transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-slate-200 text-slate-600 rounded-r-lg transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-extrabold text-sm text-brand-800">
                          GH¢ {(item.product.priceGHS * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          (GH¢ {item.product.priceGHS} each)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">GH¢ {subtotalGHS.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-brand-700">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" /> Direct Delivery
                  </span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-base">Estimated Total</span>
                  <span className="font-black text-xl text-brand-800">GH¢ {subtotalGHS.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-2.5 bg-brand-100/70 border border-brand-200 rounded-lg flex items-center gap-2 text-xs text-brand-900">
                <ShieldCheck className="w-4 h-4 text-brand-700 shrink-0" />
                <span>Harvested fresh & processed under FDA standards.</span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-base active:scale-98"
              >
                <span>Proceed to Order Checkout</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
