import React, { useState } from 'react';
import { CartItem, OrderDetails } from '../types';
import { 
  X, CheckCircle2, ShieldCheck, MapPin, CreditCard, Smartphone, 
  Truck, ArrowLeft, Printer, Download, Sparkles, AlertCircle
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderComplete
}) => {
  const [step, setStep] = useState<'details' | 'confirmation'>('details');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    region: 'Greater Accra',
    city: 'Accra',
    address: '',
    deliveryMethod: 'delivery' as 'delivery' | 'pickup',
    paymentMethod: 'momo' as 'momo' | 'card' | 'cod',
    momoNumber: '',
    momoNetwork: 'MTN Mobile Money'
  });

  const [placedOrder, setPlacedOrder] = useState<OrderDetails | null>(null);

  if (!isOpen) return null;

  const subtotalGHS = cartItems.reduce(
    (sum, item) => sum + item.product.priceGHS * item.quantity,
    0
  );

  const deliveryFee = formData.deliveryMethod === 'pickup' 
    ? 0 
    : formData.region === 'Central Region' ? 25 : 40;

  const totalGHS = subtotalGHS + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newOrder: OrderDetails = {
      orderId: `ESF-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: formData.name,
      email: formData.email,
      phone: formData.phone,
      region: formData.region,
      city: formData.city,
      address: formData.address,
      deliveryMethod: formData.deliveryMethod,
      paymentMethod: formData.paymentMethod,
      items: [...cartItems],
      subtotalGHS,
      deliveryFeeGHS: deliveryFee,
      totalGHS,
      createdAt: new Date().toLocaleString(),
      status: 'confirmed'
    };

    setPlacedOrder(newOrder);
    setStep('confirmation');
    onOrderComplete();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 my-8">
        {step === 'details' ? (
          <div>
            {/* Header */}
            <div className="p-5 bg-brand-900 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xl">Complete Your Farm Order</h3>
                <p className="text-xs text-brand-200">Fresh produce dispatched directly from Ekow Sam Farms</p>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-brand-800 text-brand-200 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Customer Contact */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-brand-950 uppercase tracking-wider flex items-center gap-2 border-b pb-2 border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-800 text-xs flex items-center justify-center font-bold">1</span>
                  Customer Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kwame Mensah"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (MoMo Enabled) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 024 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. kwame@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address & Method */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-brand-950 uppercase tracking-wider flex items-center gap-2 border-b pb-2 border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-800 text-xs flex items-center justify-center font-bold">2</span>
                  Delivery & Location in Ghana
                </h4>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryMethod: 'delivery' })}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-colors ${
                      formData.deliveryMethod === 'delivery'
                        ? 'border-brand-600 bg-brand-50 text-brand-900 font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Truck className="w-5 h-5 text-brand-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold">Home/Office Delivery</p>
                      <p className="text-[10px] text-slate-500">Accra, Cape Coast, Kumasi, Tema</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryMethod: 'pickup' })}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-colors ${
                      formData.deliveryMethod === 'pickup'
                        ? 'border-brand-600 bg-brand-50 text-brand-900 font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <MapPin className="w-5 h-5 text-brand-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold">Direct Farm Pickup</p>
                      <p className="text-[10px] text-slate-500">Free @ Gomoa Potsin Farm</p>
                    </div>
                  </button>
                </div>

                {formData.deliveryMethod === 'delivery' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Region *</label>
                      <select
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                      >
                        <option value="Greater Accra">Greater Accra Region</option>
                        <option value="Central Region">Central Region</option>
                        <option value="Ashanti Region">Ashanti Region (Kumasi)</option>
                        <option value="Western Region">Western Region (Takoradi)</option>
                        <option value="Eastern Region">Eastern Region (Koforidua)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">City / Town *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. East Legon, Tema, Cape Coast"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Street Address & Landmark *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. House No. 24, Near Shell Filling Station"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-brand-950 uppercase tracking-wider flex items-center gap-2 border-b pb-2 border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-800 text-xs flex items-center justify-center font-bold">3</span>
                  Payment Options
                </h4>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'momo' })}
                    className={`p-3 rounded-xl border text-center transition-colors ${
                      formData.paymentMethod === 'momo'
                        ? 'border-brand-600 bg-brand-50 text-brand-900 font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 mx-auto mb-1 text-yellow-600" />
                    <p className="text-xs font-bold">Mobile Money</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className={`p-3 rounded-xl border text-center transition-colors ${
                      formData.paymentMethod === 'card'
                        ? 'border-brand-600 bg-brand-50 text-brand-900 font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1 text-brand-600" />
                    <p className="text-xs font-bold">Credit/Debit Card</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className={`p-3 rounded-xl border text-center transition-colors ${
                      formData.paymentMethod === 'cod'
                        ? 'border-brand-600 bg-brand-50 text-brand-900 font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5 mx-auto mb-1 text-brand-600" />
                    <p className="text-xs font-bold">Pay on Delivery</p>
                  </button>
                </div>

                {formData.paymentMethod === 'momo' && (
                  <div className="p-3 bg-accent-50 border border-accent-200 rounded-xl space-y-2">
                    <p className="text-xs font-bold text-accent-800">Mobile Money Prompt Simulation</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <select 
                        value={formData.momoNetwork}
                        onChange={(e) => setFormData({ ...formData, momoNetwork: e.target.value })}
                        className="p-2 border border-accent-300 rounded-lg bg-white"
                      >
                        <option value="MTN Mobile Money">MTN Mobile Money</option>
                        <option value="Telecel Cash">Telecel Cash</option>
                        <option value="AT Money">AT Money</option>
                      </select>
                      <input 
                        type="text" 
                        placeholder="024 XXX XXXX"
                        value={formData.momoNumber || formData.phone}
                        onChange={(e) => setFormData({ ...formData, momoNumber: e.target.value })}
                        className="p-2 border border-accent-300 rounded-lg bg-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary Breakdown */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Produce Subtotal ({cartItems.length} items)</span>
                  <span className="font-bold text-slate-900">GH¢ {subtotalGHS.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery / Logistics Fee</span>
                  <span className="font-bold text-slate-900">
                    {deliveryFee === 0 ? 'FREE (Farm Pickup)' : `GH¢ ${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-black text-lg text-brand-900">
                  <span>Total Amount Payable</span>
                  <span>GH¢ {totalGHS.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 text-slate-600 hover:text-slate-900 font-bold text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-base text-center"
                >
                  Confirm & Place Farm Order
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Receipt Invoice */
          <div className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-brand-950 font-serif">Order Confirmed!</h3>
              <p className="text-sm text-slate-600">
                Thank you <strong className="text-slate-900">{placedOrder?.customerName}</strong>! Your order reference is{' '}
                <span className="font-mono bg-brand-100 text-brand-800 px-2 py-0.5 rounded font-bold">
                  {placedOrder?.orderId}
                </span>
              </p>
            </div>

            {/* Print/Invoice Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4 text-xs font-sans">
              <div className="flex justify-between border-b pb-3 border-slate-200">
                <div>
                  <h4 className="font-black text-sm text-brand-950">EKOW SAM FARMS GHANA</h4>
                  <p className="text-slate-500">Gomoa Potsin, Central Region</p>
                  <p className="text-slate-500">Tel: +233 24 123 4567</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-800">Date: {placedOrder?.createdAt}</p>
                  <p className="text-brand-700 font-bold uppercase">Status: Confirmed / Dispatched</p>
                </div>
              </div>

              <div>
                <h5 className="font-bold text-slate-800 mb-2">Order Items Breakdown:</h5>
                <div className="space-y-1.5 divide-y divide-slate-200">
                  {placedOrder?.items.map((item) => (
                    <div key={item.product.id} className="pt-1 flex justify-between">
                      <span>{item.quantity}x {item.product.name} ({item.product.unit})</span>
                      <span className="font-bold">GH¢ {(item.product.priceGHS * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between font-black text-sm text-brand-950">
                <span>Total Paid:</span>
                <span>GH¢ {placedOrder?.totalGHS.toFixed(2)}</span>
              </div>

              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 space-y-1">
                <p><strong>Delivery Address:</strong> {placedOrder?.address}, {placedOrder?.city}, {placedOrder?.region}</p>
                <p><strong>Contact Phone:</strong> {placedOrder?.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl transition-colors text-sm"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
