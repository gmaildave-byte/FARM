import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  PlusCircle,
  TrendingUp,
  X,
  Edit3,
  Archive,
  Eye
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cropsData } from '../data/crops';
import { livestockData } from '../data/livestock';

export const AdminCmsPage: React.FC = () => {
  const { user, role } = useAuth();
  const [activeTab, setActiveTab] = useState<'content' | 'moderation' | 'analytics'>('content');

  // CMS Articles state
  const [articles, setArticles] = useState([
    { id: 'art-1', title: 'Maize Lethal Necrosis (MLND) Control in Rift Valley', category: 'Crops', author: 'Dr. Beatrice Wambui', status: 'Published', date: '2026-10-08' },
    { id: 'art-2', title: 'Formulating Low-Cost Dairy Meal Using Local Byproducts', category: 'Livestock', author: 'Dr. Julius Kipkorir', status: 'Published', date: '2026-10-09' },
    { id: 'art-3', title: 'Avocado Phytosanitary Inspection Standards for Chinese Export', category: 'Export Trade', author: 'Mercy Achieng', status: 'Review', date: '2026-10-10' },
    { id: 'art-4', title: 'Solar Drip Irrigation Sizing for Semi-Arid Counties', category: 'Irrigation', author: 'Eng. Francis Mutua', status: 'Draft', date: '2026-10-11' }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Crops');
  const [newStatus, setNewStatus] = useState('Published');
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const newArt = {
      id: `art-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      author: user?.name || 'Content Editor',
      status: newStatus,
      date: new Date().toISOString().split('T')[0]
    };
    setArticles([newArt, ...articles]);
    setCreateModalOpen(false);
    setNewTitle('');
  };

  const toggleStatus = (id: string) => {
    setArticles(prev =>
      prev.map(a => {
        if (a.id === id) {
          const next = a.status === 'Published' ? 'Archived' : a.status === 'Archived' ? 'Draft' : 'Published';
          return { ...a, status: next };
        }
        return a;
      })
    );
  };

  if (role !== 'admin' && role !== 'editor') {
    return (
      <div className="bg-amber-50 rounded-3xl p-8 border border-amber-200 text-center max-w-xl mx-auto my-12 space-y-3">
        <ShieldCheck className="w-12 h-12 text-amber-700 mx-auto" />
        <h2 className="text-xl font-bold text-stone-900">Restricted Administration Portal</h2>
        <p className="text-xs text-stone-600 leading-relaxed">
          The CMS and Platform Moderation dashboard is restricted to authorized Content Editors and System Administrators. Please switch your active role to <strong>Administrator</strong> or <strong>Content Editor</strong> via the top utility bar to review this module.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-800 rounded-full text-xs font-semibold text-emerald-400 border border-stone-700">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin & Editorial CMS</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Content Management & Platform Administration
            </h1>
            <p className="text-xs sm:text-sm text-stone-300">
              Active User: <strong>{user?.name}</strong> • Role: <strong className="capitalize">{role}</strong>
            </p>
          </div>

          <button
            onClick={() => setCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition shadow-xs shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Article / Guide</span>
          </button>
        </div>
      </div>

      {/* Operational Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-xs font-bold text-stone-500 uppercase">Crop Guides</div>
          <div className="text-2xl font-black text-stone-900">{cropsData.length}</div>
          <div className="text-[11px] text-emerald-700 font-semibold">100% KALRO Verified</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-xs font-bold text-stone-500 uppercase">Livestock Guides</div>
          <div className="text-2xl font-black text-stone-900">{livestockData.length}</div>
          <div className="text-[11px] text-emerald-700 font-semibold">Dairy, Beef, Poultry</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-xs font-bold text-stone-500 uppercase">Articles in CMS</div>
          <div className="text-2xl font-black text-stone-900">{articles.length}</div>
          <div className="text-[11px] text-stone-400">Published & In Review</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-xs font-bold text-stone-500 uppercase">System Status</div>
          <div className="text-2xl font-black text-emerald-800">Operational</div>
          <div className="text-[11px] text-emerald-700 font-semibold">Express & Gemini OK</div>
        </div>
      </div>

      {/* Articles Management Table */}
      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs space-y-4 p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold text-stone-900">Articles & Production Guides Editorial Registry</h3>
          <span className="text-xs text-stone-500">Draft, Review, Published, and Archived workflows</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-900 text-white text-[11px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-3.5">Title</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Author</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-stone-50 transition">
                  <td className="p-3.5 font-bold text-stone-900 max-w-xs">{art.title}</td>
                  <td className="p-3.5 text-stone-600 font-medium">{art.category}</td>
                  <td className="p-3.5 text-stone-600">{art.author}</td>
                  <td className="p-3.5 text-stone-400">{art.date}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        art.status === 'Published'
                          ? 'bg-emerald-100 text-emerald-900'
                          : art.status === 'Review'
                          ? 'bg-amber-100 text-amber-900'
                          : art.status === 'Archived'
                          ? 'bg-stone-200 text-stone-700'
                          : 'bg-blue-100 text-blue-900'
                      }`}
                    >
                      {art.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => toggleStatus(art.id)}
                      className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-[11px] font-semibold transition"
                    >
                      Toggle Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Article Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4 relative">
            <button
              onClick={() => setCreateModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-stone-900">Draft New Agricultural Article</h3>
            <form onSubmit={handleCreateArticle} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Article Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Managing Potato Bacterial Wilt with Strict Crop Rotation"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                >
                  <option value="Crops">Crops</option>
                  <option value="Livestock">Livestock</option>
                  <option value="Soil & Water">Soil & Water</option>
                  <option value="Pests & Diseases">Pests & Diseases</option>
                  <option value="Agribusiness">Agribusiness</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Initial Publication State</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                >
                  <option value="Published">Published (Public)</option>
                  <option value="Review">Under Expert Review</option>
                  <option value="Draft">Draft (Internal)</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition"
              >
                Save to CMS Registry
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
