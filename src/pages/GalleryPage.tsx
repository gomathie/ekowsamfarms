import React, { useState } from 'react';
import { PageId, GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/farmData';
import { 
  Camera, Filter, X, Calendar, MapPin, Users, Check, Clock, Eye 
} from 'lucide-react';

interface GalleryPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ setCurrentPage }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);
  const [tourModalOpen, setTourModalOpen] = useState(false);
  const [tourSuccess, setTourSuccess] = useState(false);
  const [tourForm, setTourForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    groupSize: '1 - 5 People',
    groupType: 'Family / Private Visit'
  });

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'poultry', label: 'Poultry Farm' },
    { id: 'processing', label: 'Processing Factory' },
    { id: 'training', label: 'Farmers Workshops' },
  ];

  const filteredItems = GALLERY_ITEMS.filter(item => 
    activeCategory === 'all' || item.category === activeCategory
  );

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTourSuccess(true);
  };

  return (
    <div className="space-y-12 pb-16 font-sans">
      {/* Page Header */}
      <section className="bg-blue-950 text-white py-14 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest bg-blue-900 px-3 py-1 rounded-full border border-blue-800">
            VISUAL FARM TOUR
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Ekow Sam Farm Gallery & Tours
          </h1>
          <p className="text-blue-200 text-xs sm:text-sm max-w-2xl mx-auto">
            Take a visual tour through our 500-acre commercial farming facilities, biosecure poultry units, and FDA-standard processing operations in Ghana.
          </p>

          <div className="pt-2">
            <button
              onClick={() => { setTourModalOpen(true); setTourSuccess(false); }}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-6 py-3 rounded-xl text-xs transition-colors shadow-md flex items-center gap-2 mx-auto"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>Book a Physical Farm Tour Visit</span>
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 no-scrollbar justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage(item)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group relative"
            >
              <div className="h-64 overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-white">
                <span className="bg-blue-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded w-fit uppercase tracking-wider mb-2">
                  {item.category}
                </span>
                <h3 className="font-bold text-base font-serif">{item.title}</h3>
                <p className="text-xs text-slate-200 line-clamp-2 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden relative shadow-2xl">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute right-4 top-4 z-10 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightboxImage.imageUrl}
              alt={lightboxImage.title}
              className="w-full max-h-[500px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-6 bg-slate-900 text-white space-y-1">
              <span className="text-amber-400 font-bold text-xs uppercase">{lightboxImage.category}</span>
              <h3 className="text-xl font-bold font-serif">{lightboxImage.title}</h3>
              <p className="text-xs text-slate-300">{lightboxImage.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tour Visit Booking Modal */}
      {tourModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 relative my-8">
            <button
              onClick={() => setTourModalOpen(false)}
              className="absolute right-4 top-4 z-10 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!tourSuccess ? (
              <div>
                <div className="p-5 bg-blue-900 text-white">
                  <h3 className="font-bold text-lg leading-snug">Book a Guided Farm Visit</h3>
                  <p className="text-xs text-blue-200 mt-1">Ekow Sam Farm Estate • Gomoa Potsin Junction, Central Region</p>
                </div>

                <form onSubmit={handleTourSubmit} className="p-6 space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Michael Mensah"
                      value={tourForm.name}
                      onChange={(e) => setTourForm({ ...tourForm, name: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="024 XXX XXXX"
                        value={tourForm.phone}
                        onChange={(e) => setTourForm({ ...tourForm, phone: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Preferred Date *</label>
                      <input
                        type="date"
                        required
                        value={tourForm.date}
                        onChange={(e) => setTourForm({ ...tourForm, date: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="michael@gmail.com"
                      value={tourForm.email}
                      onChange={(e) => setTourForm({ ...tourForm, email: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Group Size</label>
                      <select
                        value={tourForm.groupSize}
                        onChange={(e) => setTourForm({ ...tourForm, groupSize: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 text-xs"
                      >
                        <option value="1 - 5 People">1 - 5 People</option>
                        <option value="6 - 15 People">6 - 15 People</option>
                        <option value="16+ Large Group / School">16+ Large Group / School</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Group Category</label>
                      <select
                        value={tourForm.groupType}
                        onChange={(e) => setTourForm({ ...tourForm, groupType: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 text-xs"
                      >
                        <option value="Family / Private Visit">Family / Private Visit</option>
                        <option value="School / Student Excursion">School / Student Excursion</option>
                        <option value="Diaspora Commercial Investors">Diaspora Commercial Investors</option>
                        <option value="Farmer Cooperative">Farmer Cooperative</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-sm"
                  >
                    Confirm Farm Tour Request
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 mx-auto flex items-center justify-center">
                  <Check className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 font-serif">Farm Visit Requested!</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thank you <strong>{tourForm.name}</strong>! Our farm coordinator will contact you at <strong>{tourForm.phone}</strong> to confirm your guided tour booking on <strong>{tourForm.date || 'your requested date'}</strong>.
                </p>
                <button
                  onClick={() => setTourModalOpen(false)}
                  className="bg-blue-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs"
                >
                  Close & Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
