import React, { useState } from 'react';
import { CartItem, QuoteRequest } from '../types';
import { FARM_INFO } from '../data/farmData';
import { openWhatsApp, buildWhatsAppUrl, quoteRequestMessage } from '../lib/whatsapp';
import {
  X, CheckCircle2, MapPin, Truck, Printer, Phone, Clock, MessageCircle
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderComplete: () => void;
}

/**
 * Collects a produce request and hands it to the farm. Deliberately carries no
 * prices or payment step: rates depend on the flock cycle and order volume, so
 * the farm quotes each request by phone or email after it arrives.
 */
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
    notes: ''
  });

  const [submitted, setSubmitted] = useState<QuoteRequest | null>(null);

  if (!isOpen) return null;

  const totalUnits = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const buildMessage = (request: QuoteRequest) =>
    quoteRequestMessage({
      reference: request.requestId,
      name: request.customerName,
      phone: request.phone,
      email: request.email,
      deliveryMethod: request.deliveryMethod,
      address: request.address,
      city: request.city,
      region: request.region,
      notes: request.notes,
      items: request.items
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const request: QuoteRequest = {
      requestId: `ESF-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: formData.name,
      email: formData.email,
      phone: formData.phone,
      region: formData.region,
      city: formData.city,
      address: formData.address,
      deliveryMethod: formData.deliveryMethod,
      notes: formData.notes,
      items: [...cartItems],
      createdAt: new Date().toLocaleString(),
      status: 'awaiting-quote'
    };

    // Fire from inside the submit handler so the browser treats it as a user
    // gesture; the confirmation screen repeats the link if it gets blocked.
    openWhatsApp(buildMessage(request));

    setSubmitted(request);
    setStep('confirmation');
    onOrderComplete();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 my-8">
        {step === 'details' ? (
          <div>
            {/* Header */}
            <div className="p-5 bg-brand-900 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xl">Request a Quote</h3>
                <p className="text-xs text-brand-200">
                  Tell us what you need and we'll reply with current prices
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-1.5 rounded-lg hover:bg-brand-800 text-brand-200 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* What they're asking about */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                  Your request — {cartItems.length} {cartItems.length === 1 ? 'product' : 'products'}, {totalUnits} {totalUnits === 1 ? 'unit' : 'units'}
                </h4>
                <div className="space-y-1 text-xs text-slate-700">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex justify-between gap-3">
                      <span className="truncate">{item.product.name}</span>
                      <span className="font-bold shrink-0">
                        {item.quantity} × {item.product.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-brand-950 uppercase tracking-wider flex items-center gap-2 border-b pb-2 border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-800 text-xs flex items-center justify-center font-bold">1</span>
                  How We Reach You
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
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
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

              {/* Delivery */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-brand-950 uppercase tracking-wider flex items-center gap-2 border-b pb-2 border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-800 text-xs flex items-center justify-center font-bold">2</span>
                  Delivery or Pickup
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
                      <p className="text-xs font-bold">Deliver to me</p>
                      <p className="text-[10px] text-slate-500">Greater Accra &amp; beyond</p>
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
                      <p className="text-xs font-bold">Farm pickup</p>
                      <p className="text-[10px] text-slate-500">{FARM_INFO.address}</p>
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
                        placeholder="e.g. East Legon, Tema, Kasoa"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Street Address &amp; Landmark *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. House No. 24, near Shell filling station"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Notes */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-brand-950 uppercase tracking-wider flex items-center gap-2 border-b pb-2 border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-800 text-xs flex items-center justify-center font-bold">3</span>
                  Anything Else? <span className="font-normal normal-case text-slate-500 text-xs">(optional)</span>
                </h4>
                <textarea
                  rows={3}
                  placeholder="e.g. bird size preference, delivery day, or whether you need regular weekly supply"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 resize-y"
                />
              </div>

              <div className="p-3 bg-accent-50 border border-accent-200 rounded-xl flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-accent-700 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong className="text-accent-800">No payment is taken here.</strong> Tapping send opens
                  WhatsApp with your request already written out — just press send there. We reply with current
                  prices and any delivery charge, usually the same day during opening hours ({FARM_INFO.openingHoursShort}).
                </p>
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
                  className="flex-1 bg-accent-700 hover:bg-accent-800 text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-base flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Send on WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation */
          <div className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-accent-100 text-accent-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-brand-950 font-serif">Almost there!</h3>
              <p className="text-sm text-slate-600">
                Reference{' '}
                <span className="font-mono bg-brand-100 text-brand-800 px-2 py-0.5 rounded font-bold">
                  {submitted?.requestId}
                </span>
              </p>
            </div>

            <div className="p-4 bg-accent-50 border border-accent-200 rounded-xl space-y-2.5">
              <p className="font-bold text-accent-800 text-sm">
                Finish by pressing send in WhatsApp
              </p>
              <p className="text-xs text-slate-700 leading-relaxed">
                WhatsApp should have opened with your request already written out. If it didn't open —
                or you closed it — use the button below. We'll reply with current prices and call you
                on <strong>{submitted?.phone}</strong> to confirm.
              </p>
              {submitted && (
                <a
                  href={buildWhatsAppUrl(buildMessage(submitted))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-accent-700 hover:bg-accent-800 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open WhatsApp &amp; Send</span>
                </a>
              )}
            </div>

            {/* Printable summary */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4 text-xs font-sans">
              <div className="flex justify-between gap-4 border-b pb-3 border-slate-200">
                <div>
                  <h4 className="font-black text-sm text-brand-950">EKOW SAM FARMS</h4>
                  <p className="text-slate-500">{FARM_INFO.address}</p>
                  <p className="text-slate-500">Tel: {FARM_INFO.phones[1]}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-slate-800">{submitted?.createdAt}</p>
                  <p className="text-accent-800 font-bold uppercase">Awaiting Quote</p>
                </div>
              </div>

              <div>
                <h5 className="font-bold text-slate-800 mb-2">Requested items:</h5>
                <div className="space-y-1.5 divide-y divide-slate-200">
                  {submitted?.items.map((item) => (
                    <div key={item.product.id} className="pt-1 flex justify-between gap-3">
                      <span className="truncate">{item.product.name}</span>
                      <span className="font-bold shrink-0">
                        {item.quantity} × {item.product.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 space-y-1">
                {submitted?.deliveryMethod === 'delivery' ? (
                  <p><strong>Deliver to:</strong> {submitted?.address}, {submitted?.city}, {submitted?.region}</p>
                ) : (
                  <p><strong>Collection:</strong> Farm pickup at {FARM_INFO.address}</p>
                )}
                <p><strong>Contact:</strong> {submitted?.phone} · {submitted?.email}</p>
                {submitted?.notes && <p><strong>Notes:</strong> {submitted.notes}</p>}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href={`tel:${FARM_INFO.phones[0].replace(/\s/g, '')}`}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Call Instead</span>
              </a>
              <button
                onClick={() => window.print()}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Print Summary</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl transition-colors text-sm"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
