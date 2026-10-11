import React, { useState } from 'react';
import {
  Layers,
  PlusCircle,
  Calendar,
  DollarSign,
  TrendingUp,
  Download,
  CheckCircle2,
  Clock,
  MapPin,
  Sprout,
  X,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { FarmActivity, FarmField, FarmFinancialRecord, FarmHarvestRecord } from '../types';

export const FarmDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const {
    farms,
    currentFarm,
    fields,
    activities,
    financials,
    harvests,
    addField,
    addActivity,
    toggleActivity,
    addFinancial,
    addHarvest,
    totalIncomeKES,
    totalExpensesKES,
    netProfitKES,
    exportCSV
  } = useFarm();

  const [activeTab, setActiveTab] = useState<'overview' | 'fields' | 'activities' | 'finances' | 'harvests'>('overview');

  // Modals state
  const [fieldModalOpen, setFieldModalOpen] = useState(false);
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldAcreage, setNewFieldAcreage] = useState(2.0);
  const [newFieldCrop, setNewFieldCrop] = useState('Maize (H614D)');
  const [newFieldStage, setNewFieldStage] = useState<'Land Prep' | 'Vegetative' | 'Flowering' | 'Maturity / Harvest' | 'Post-Harvest'>('Vegetative');

  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [newActType, setNewActType] = useState<'Planting' | 'Weeding' | 'Spraying' | 'Fertilizing' | 'Irrigation' | 'Harvesting' | 'Livestock'>('Fertilizing');
  const [newActDetails, setNewActDetails] = useState('');
  const [newActCost, setNewActCost] = useState(0);

  const [financeModalOpen, setFinanceModalOpen] = useState(false);
  const [newFinType, setNewFinType] = useState<'Income' | 'Expense'>('Expense');
  const [newFinCategory, setNewFinCategory] = useState<'Seeds/Seedlings' | 'Fertilizers' | 'Pesticides' | 'Labor' | 'Machinery/Fuel' | 'Livestock Feed' | 'Veterinary' | 'Harvest Sales' | 'Other'>('Fertilizers');
  const [newFinAmount, setNewFinAmount] = useState(12000);
  const [newFinNotes, setNewFinNotes] = useState('');

  const handleCreateField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentFarm) return;
    addField({
      farmId: currentFarm.id,
      name: newFieldName || 'Block Parcel',
      acreage: newFieldAcreage,
      cropOrEnterprise: newFieldCrop,
      variety: newFieldCrop,
      plantingDate: new Date().toISOString().split('T')[0],
      targetHarvestDate: 'In 4 months',
      growthStage: newFieldStage
    });
    setFieldModalOpen(false);
    setNewFieldName('');
  };

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentFarm) return;
    addActivity({
      farmId: currentFarm.id,
      date: new Date().toISOString().split('T')[0],
      activityType: newActType,
      details: newActDetails,
      costKES: newActCost,
      completed: false
    });
    setActivityModalOpen(false);
    setNewActDetails('');
    setNewActCost(0);
  };

  const handleCreateFinance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentFarm) return;
    addFinancial({
      farmId: currentFarm.id,
      date: new Date().toISOString().split('T')[0],
      type: newFinType,
      category: newFinCategory,
      amountKES: newFinAmount,
      notes: newFinNotes
    });
    setFinanceModalOpen(false);
    setNewFinNotes('');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Farm Top Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-900 rounded-full text-xs font-semibold text-emerald-300 border border-emerald-800">
              <Layers className="w-3.5 h-3.5" />
              <span>Personal Farm Management System</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {currentFarm?.name || 'Rift Valley Green Fields'}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-200">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {currentFarm?.county} County ({currentFarm?.subCounty || 'Central'})
              </span>
              <span>•</span>
              <span>Acreage: <strong>{currentFarm?.acreage} Acres</strong></span>
              <span>•</span>
              <span>Soil: <strong>{currentFarm?.soilType}</strong></span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={exportCSV}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white border border-emerald-700 font-bold rounded-xl text-xs transition"
            >
              <Download className="w-4 h-4 text-emerald-300" />
              <span>Export Records (CSV)</span>
            </button>
            <button
              onClick={() => setFinanceModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs transition shadow-sm"
            >
              <DollarSign className="w-4 h-4" />
              <span>Log Transaction</span>
            </button>
          </div>
        </div>
      </div>

      {/* Financial Health Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-1 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-500">Total Farm Income</div>
          <div className="text-2xl font-black text-emerald-900">KES {totalIncomeKES.toLocaleString()}</div>
          <div className="text-[11px] text-stone-400">Crop harvests & raw milk sales</div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-1 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-500">Total Farm Expenses</div>
          <div className="text-2xl font-black text-red-700">KES {totalExpensesKES.toLocaleString()}</div>
          <div className="text-[11px] text-stone-400">Inputs, labor, fertilizers, seeds</div>
        </div>

        <div className={`rounded-2xl border p-5 space-y-1 shadow-xs ${netProfitKES >= 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
          <div className="text-xs font-bold uppercase tracking-wider text-stone-600">Net Farm Profit (KES)</div>
          <div className={`text-2xl font-black ${netProfitKES >= 0 ? 'text-emerald-900' : 'text-red-900'}`}>
            KES {netProfitKES.toLocaleString()}
          </div>
          <div className="text-[11px] text-stone-600">
            {netProfitKES >= 0 ? 'Operationally profitable enterprise' : 'Operating at current seasonal deficit'}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 gap-2">
        {[
          { id: 'overview', label: 'Dashboard Overview' },
          { id: 'fields', label: `Crop Fields (${fields.length})` },
          { id: 'activities', label: `Farm Activities (${activities.length})` },
          { id: 'finances', label: `Financial Transactions (${financials.length})` },
          { id: 'harvests', label: `Harvest Records (${harvests.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition ${
              activeTab === tab.id
                ? 'border-emerald-800 text-emerald-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Fields */}
      {activeTab === 'fields' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-stone-900">Active Crop & Fodder Fields</h3>
            <button
              onClick={() => setFieldModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-800 text-white rounded-xl text-xs font-bold hover:bg-emerald-900 transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Field Block</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {fields.map((f) => (
              <div
                key={f.id}
                className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3 shadow-xs"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-stone-900 text-base">{f.name}</h4>
                  <span className="text-[11px] font-bold bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded border border-emerald-200">
                    {f.acreage} Acres
                  </span>
                </div>

                <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 space-y-1 text-xs">
                  <div><strong>Crop Enterprise:</strong> {f.cropOrEnterprise}</div>
                  <div><strong>Planted Date:</strong> {f.plantingDate}</div>
                  <div><strong>Target Harvest:</strong> {f.targetHarvestDate}</div>
                </div>

                <div className="flex justify-between items-center text-xs pt-1">
                  <span className="text-stone-500">Stage:</span>
                  <span className="font-bold text-emerald-900 bg-stone-100 px-2 py-0.5 rounded">
                    {f.growthStage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Activities & Tasks */}
      {(activeTab === 'overview' || activeTab === 'activities') && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-stone-900">Seasonal Tasks & Operation Logs</h3>
            <button
              onClick={() => setActivityModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-800 text-white rounded-xl text-xs font-bold hover:bg-emerald-900 transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Schedule Farm Activity</span>
            </button>
          </div>

          <div className="space-y-3">
            {activities.map((act) => (
              <div
                key={act.id}
                className={`p-4 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  act.completed
                    ? 'bg-stone-50/70 border-stone-200 opacity-80'
                    : 'bg-white border-stone-200 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleActivity(act.id)}
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition ${
                      act.completed
                        ? 'bg-emerald-700 border-emerald-700 text-white'
                        : 'border-stone-300 hover:border-emerald-600'
                    }`}
                  >
                    {act.completed && <CheckCircle2 className="w-4 h-4" />}
                  </button>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                        {act.activityType}
                      </span>
                      <span className="text-[11px] text-stone-400">• {act.date}</span>
                    </div>
                    <div className={`text-xs sm:text-sm ${act.completed ? 'line-through text-stone-500' : 'text-stone-900 font-medium'}`}>
                      {act.details}
                    </div>
                  </div>
                </div>

                {act.costKES && act.costKES > 0 && (
                  <div className="text-xs font-bold text-stone-700 shrink-0 text-right">
                    Cost: KES {act.costKES.toLocaleString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Financial Transactions */}
      {(activeTab === 'overview' || activeTab === 'finances') && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-stone-900">Income & Expense Ledger (KES)</h3>
            <button
              onClick={() => setFinanceModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-800 text-white rounded-xl text-xs font-bold hover:bg-emerald-900 transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Record Transaction</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-900 text-white text-[11px] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Type</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Notes</th>
                    <th className="p-3.5 text-right">Amount (KES)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {financials.map((fin) => (
                    <tr key={fin.id} className="hover:bg-stone-50 transition">
                      <td className="p-3.5 text-stone-600 font-medium">{fin.date}</td>
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            fin.type === 'Income'
                              ? 'bg-emerald-100 text-emerald-900'
                              : 'bg-red-100 text-red-900'
                          }`}
                        >
                          {fin.type}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-stone-800">{fin.category}</td>
                      <td className="p-3.5 text-stone-600 max-w-xs">{fin.notes}</td>
                      <td className={`p-3.5 text-right font-black text-sm ${fin.type === 'Income' ? 'text-emerald-900' : 'text-red-700'}`}>
                        {fin.type === 'Income' ? '+' : '-'} KES {fin.amountKES.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Harvests */}
      {activeTab === 'harvests' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-stone-900">Harvest Yield Records</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {harvests.map((h) => (
              <div key={h.id} className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2 text-xs shadow-xs">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-sm text-stone-900">{h.enterprise}</span>
                  <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-bold">{h.grade}</span>
                </div>
                <div>Harvest Date: {h.date}</div>
                <div>Quantity: <strong>{h.quantity} {h.unit}</strong> ({h.storedOrSold})</div>
                {h.revenueRealizedKES && (
                  <div className="text-emerald-900 font-bold text-sm pt-1">
                    Revenue Realized: KES {h.revenueRealizedKES.toLocaleString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Field Modal */}
      {fieldModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4 relative">
            <button onClick={() => setFieldModalOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-700">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-stone-900">Add Field or Parcel</h3>
            <form onSubmit={handleCreateField} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Field Name / ID</label>
                <input type="text" required placeholder="e.g. East Valley Block 4" value={newFieldName} onChange={e => setNewFieldName(e.target.value)} className="w-full px-3 py-2 border rounded-xl" />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Acreage</label>
                <input type="number" step="0.1" required value={newFieldAcreage} onChange={e => setNewFieldAcreage(parseFloat(e.target.value) || 1)} className="w-full px-3 py-2 border rounded-xl" />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Crop / Enterprise</label>
                <input type="text" required value={newFieldCrop} onChange={e => setNewFieldCrop(e.target.value)} className="w-full px-3 py-2 border rounded-xl" />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Current Growth Stage</label>
                <select value={newFieldStage} onChange={e => setNewFieldStage(e.target.value as any)} className="w-full px-3 py-2 border rounded-xl bg-white">
                  <option value="Land Prep">Land Prep</option>
                  <option value="Vegetative">Vegetative</option>
                  <option value="Flowering">Flowering</option>
                  <option value="Maturity / Harvest">Maturity / Harvest</option>
                  <option value="Post-Harvest">Post-Harvest</option>
                </select>
              </div>
              <button type="submit" className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition">
                Save Field to Farm Profile
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Activity Modal */}
      {activityModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4 relative">
            <button onClick={() => setActivityModalOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-700">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-stone-900">Schedule Farm Activity / Task</h3>
            <form onSubmit={handleCreateActivity} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Activity Type</label>
                <select value={newActType} onChange={e => setNewActType(e.target.value as any)} className="w-full px-3 py-2 border rounded-xl bg-white">
                  <option value="Planting">Planting</option>
                  <option value="Weeding">Weeding</option>
                  <option value="Spraying">Spraying</option>
                  <option value="Fertilizing">Fertilizing</option>
                  <option value="Irrigation">Irrigation</option>
                  <option value="Harvesting">Harvesting</option>
                  <option value="Livestock">Livestock Care</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Activity Details</label>
                <textarea rows={3} required placeholder="e.g. Apply CAN top dressing on North Block maize..." value={newActDetails} onChange={e => setNewActDetails(e.target.value)} className="w-full px-3 py-2 border rounded-xl" />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Estimated Cost (KES, Optional)</label>
                <input type="number" value={newActCost} onChange={e => setNewActCost(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-xl" />
              </div>
              <button type="submit" className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition">
                Add Task to Schedule
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Financial Modal */}
      {financeModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4 relative">
            <button onClick={() => setFinanceModalOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-700">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-stone-900">Record Financial Transaction</h3>
            <form onSubmit={handleCreateFinance} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Transaction Type</label>
                  <select value={newFinType} onChange={e => setNewFinType(e.target.value as any)} className="w-full px-3 py-2 border rounded-xl bg-white">
                    <option value="Expense">Expense</option>
                    <option value="Income">Income</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Amount (KES)</label>
                  <input type="number" required value={newFinAmount} onChange={e => setNewFinAmount(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-xl" />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Category</label>
                <select value={newFinCategory} onChange={e => setNewFinCategory(e.target.value as any)} className="w-full px-3 py-2 border rounded-xl bg-white">
                  <option value="Seeds/Seedlings">Seeds / Seedlings</option>
                  <option value="Fertilizers">Fertilizers & Manure</option>
                  <option value="Pesticides">Pesticides & Chemicals</option>
                  <option value="Labor">Labor & Weeding Wages</option>
                  <option value="Machinery/Fuel">Tractor Hire / Fuel</option>
                  <option value="Livestock Feed">Livestock Dairy Feed / Silage</option>
                  <option value="Veterinary">Veterinary & Vaccinations</option>
                  <option value="Harvest Sales">Harvest Sales Inflow</option>
                  <option value="Other">Other Miscellaneous</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Notes / Description</label>
                <input type="text" required placeholder="e.g. Purchased 4 bags CAN fertilizer from Kitale depot" value={newFinNotes} onChange={e => setNewFinNotes(e.target.value)} className="w-full px-3 py-2 border rounded-xl" />
              </div>
              <button type="submit" className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition">
                Record Transaction
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
