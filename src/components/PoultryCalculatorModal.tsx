import React, { useState } from 'react';
import { PageId } from '../types';
import { Egg, X, Calculator, ArrowRight, CheckCircle, Flame, Sparkles, TrendingUp, DollarSign, Package } from 'lucide-react';

interface PoultryCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  setCurrentPage?: (page: PageId) => void;
}

export const PoultryCalculatorModal: React.FC<PoultryCalculatorModalProps> = ({
  isOpen,
  onClose,
  setCurrentPage
}) => {
  const [poultryType, setPoultryType] = useState<'layer' | 'broiler'>('layer');
  const [flockSize, setFlockSize] = useState<number>(1000);
  const [eggPricePerCrateGHS, setEggPricePerCrateGHS] = useState<number>(65);
  const [broilerPriceGHS, setBroilerPriceGHS] = useState<number>(120);

  if (!isOpen) return null;

  // Layer Calculations
  // Laying rate ~88% at peak
  const dailyEggCount = Math.floor(flockSize * 0.88);
  const dailyCrates = (dailyEggCount / 30).toFixed(1);
  const monthlyCrates = Math.floor(parseFloat(dailyCrates) * 30);
  const monthlyRevenueGHS = monthlyCrates * eggPricePerCrateGHS;
  const monthlyRevenueUSD = (monthlyRevenueGHS / 13.5).toFixed(2);
  // Layer feed ~110g per bird/day => 1000 birds = 110kg/day = 3.3 tons/month (~66 bags of 50kg)
  const layerFeedBagsPerMonth = Math.ceil((flockSize * 0.110 * 30) / 50);
  const layerFeedCostGHS = layerFeedBagsPerMonth * 310; // ~310 GHS per 50kg layer mash
  const layerNetProfitGHS = monthlyRevenueGHS - layerFeedCostGHS;

  // Broiler Calculations (35-day grow-out cycle)
  const totalLiveBirdsHarvest = Math.floor(flockSize * 0.96); // 4% mortality standard
  const totalBroilerRevenueGHS = totalLiveBirdsHarvest * broilerPriceGHS;
  const totalBroilerRevenueUSD = (totalBroilerRevenueGHS / 13.5).toFixed(2);
  // Broiler feed FCR ~1.65 => ~4.2kg feed per 2.6kg bird => 4.2kg * 1000 = 4200kg (~84 bags)
  const broilerFeedBagsTotal = Math.ceil((flockSize * 4.2) / 50);
  const broilerFeedCostGHS = broilerFeedBagsTotal * 380; // ~380 GHS per 50kg broiler finisher
  const dayOldChickCostGHS = flockSize * 15; // ~15 GHS per day-old chick
  const broilerNetProfitGHS = totalBroilerRevenueGHS - (broilerFeedCostGHS + dayOldChickCostGHS);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 relative my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-brand-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute right-5 top-5 p-2 rounded-full bg-brand-900 hover:bg-brand-800 text-brand-200 transition-colors"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-accent-300 font-bold text-xs uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4 text-accent-300" />
            <span>EKOW SAM FARMS AGRO-TOOL</span>
          </div>
          <h2 className="text-2xl font-black font-serif text-white">
            Poultry Batch & Yield Profit Estimator
          </h2>
          <p className="text-xs text-brand-200 mt-1">
            Calculate expected egg crates, broiler meat harvest, feed requirements, and income for commercial poultry farming in Ghana.
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Poultry Type Switcher */}
          <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => setPoultryType('layer')}
              className={`py-3 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                poultryType === 'layer'
                  ? 'bg-brand-700 text-white shadow-sm'
                  : 'text-slate-700 hover:text-brand-800'
              }`}
            >
              <Egg className="w-4 h-4" />
              <span>Egg Layers Production</span>
            </button>

            <button
              onClick={() => setPoultryType('broiler')}
              className={`py-3 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                poultryType === 'broiler'
                  ? 'bg-brand-700 text-white shadow-sm'
                  : 'text-slate-700 hover:text-brand-800'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Dressed Broiler Meat</span>
            </button>
          </div>

          {/* Controls Input */}
          <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="font-bold text-slate-800">
                  Total Flock Size (Number of Birds):
                </label>
                <span className="font-extrabold text-brand-800 text-sm bg-brand-100 px-3 py-0.5 rounded-full border border-brand-200">
                  {flockSize.toLocaleString()} Birds
                </span>
              </div>
              <input
                type="range"
                min={100}
                max={20000}
                step={100}
                value={flockSize}
                onChange={(e) => setFlockSize(Number(e.target.value))}
                className="w-full accent-brand-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>100 Birds (Small Unit)</span>
                <span>5,000 Birds</span>
                <span>20,000 Birds (Commercial)</span>
              </div>
            </div>

            {poultryType === 'layer' ? (
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Expected Price per Crate (GH¢):
                </label>
                <input
                  type="number"
                  value={eggPricePerCrateGHS}
                  onChange={(e) => setEggPricePerCrateGHS(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-brand-900"
                />
              </div>
            ) : (
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Selling Price per Dressed Broiler (GH¢):
                </label>
                <input
                  type="number"
                  value={broilerPriceGHS}
                  onChange={(e) => setBroilerPriceGHS(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-brand-900"
                />
              </div>
            )}
          </div>

          {/* Results Summary Grid */}
          {poultryType === 'layer' ? (
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-brand-600" />
                <span>Projected Monthly Egg Layer Yield & Financials</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-brand-50 rounded-xl border border-brand-200">
                  <span className="text-xs text-slate-500 font-medium block">Daily Eggs</span>
                  <span className="text-lg font-black text-brand-950">{dailyEggCount.toLocaleString()}</span>
                  <span className="text-[10px] text-brand-700 block">~88% lay rate</span>
                </div>

                <div className="p-3 bg-brand-50 rounded-xl border border-brand-200">
                  <span className="text-xs text-slate-500 font-medium block">Daily Crates</span>
                  <span className="text-lg font-black text-brand-950">{dailyCrates}</span>
                  <span className="text-[10px] text-brand-700 block">(30 eggs/crate)</span>
                </div>

                <div className="p-3 bg-brand-50 rounded-xl border border-brand-200">
                  <span className="text-xs text-slate-500 font-medium block">Monthly Feed</span>
                  <span className="text-lg font-black text-brand-950">{layerFeedBagsPerMonth}</span>
                  <span className="text-[10px] text-brand-700 block">50kg Mash Bags</span>
                </div>

                <div className="p-3 bg-accent-50 rounded-xl border border-accent-200">
                  <span className="text-xs text-brand-800 font-medium block">Gross Revenue</span>
                  <span className="text-lg font-black text-amber-950">GH¢ {monthlyRevenueGHS.toLocaleString()}</span>
                  <span className="text-[10px] text-brand-800 block">~${monthlyRevenueUSD} USD</span>
                </div>
              </div>

              <div className="p-4 bg-brand-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
                <div>
                  <span className="text-[11px] text-brand-300 uppercase tracking-wider font-bold block">
                    Estimated Net Monthly Profit (After Feed)
                  </span>
                  <span className="text-2xl font-black text-accent-300 font-serif">
                    GH¢ {layerNetProfitGHS > 0 ? layerNetProfitGHS.toLocaleString() : 0}
                  </span>
                </div>
                <span className="text-xs bg-brand-800 px-3 py-1.5 rounded-lg border border-brand-700 text-brand-100">
                  High Demand Market in Ghana
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-brand-600" />
                <span>Projected 35-Day Broiler Batch Harvest & Financials</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-brand-50 rounded-xl border border-brand-200">
                  <span className="text-xs text-slate-500 font-medium block">Harvest Birds</span>
                  <span className="text-lg font-black text-brand-950">{totalLiveBirdsHarvest.toLocaleString()}</span>
                  <span className="text-[10px] text-brand-700 block">~96% survival rate</span>
                </div>

                <div className="p-3 bg-brand-50 rounded-xl border border-brand-200">
                  <span className="text-xs text-slate-500 font-medium block">Total Meat</span>
                  <span className="text-lg font-black text-brand-950">{(totalLiveBirdsHarvest * 2.7).toLocaleString()} kg</span>
                  <span className="text-[10px] text-brand-700 block">2.7kg avg dressed</span>
                </div>

                <div className="p-3 bg-brand-50 rounded-xl border border-brand-200">
                  <span className="text-xs text-slate-500 font-medium block">Total Feed</span>
                  <span className="text-lg font-black text-brand-950">{broilerFeedBagsTotal}</span>
                  <span className="text-[10px] text-brand-700 block">50kg Finisher Bags</span>
                </div>

                <div className="p-3 bg-accent-50 rounded-xl border border-accent-200">
                  <span className="text-xs text-brand-800 font-medium block">Gross Revenue</span>
                  <span className="text-lg font-black text-amber-950">GH¢ {totalBroilerRevenueGHS.toLocaleString()}</span>
                  <span className="text-[10px] text-brand-800 block">~${totalBroilerRevenueUSD} USD</span>
                </div>
              </div>

              <div className="p-4 bg-brand-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
                <div>
                  <span className="text-[11px] text-brand-300 uppercase tracking-wider font-bold block">
                    Estimated Net Batch Profit (After Feed & Chicks)
                  </span>
                  <span className="text-2xl font-black text-accent-300 font-serif">
                    GH¢ {broilerNetProfitGHS > 0 ? broilerNetProfitGHS.toLocaleString() : 0}
                  </span>
                </div>
                <span className="text-xs bg-brand-800 px-3 py-1.5 rounded-lg border border-brand-700 text-brand-100">
                  35-40 Day Quick Turnover
                </span>
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                if (setCurrentPage) setCurrentPage('store');
              }}
              className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4" />
              <span>Order Poultry Products / Feed in Farm Store</span>
            </button>
            <button
              onClick={() => {
                onClose();
                if (setCurrentPage) setCurrentPage('training');
              }}
              className="flex-1 bg-accent-500 hover:bg-accent-400 text-slate-950 font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Poultry Masterclass</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
