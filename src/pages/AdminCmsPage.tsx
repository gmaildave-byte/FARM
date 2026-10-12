import React, { useState, useEffect } from 'react';
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
  Eye,
  Flag,
  Trash2,
  Check,
  ShieldAlert,
  ShoppingBag,
  Activity,
  Layers,
  Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cropsData } from '../data/crops';
import { livestockData } from '../data/livestock';
import { ReportItem } from '../types';
import { FounderRevenueDashboard } from '../components/FounderRevenueDashboard';

export const AdminCmsPage: React.FC = () => {
  const { user, role } = useAuth();
  const [activeTab, setActiveTab] = useState<'revenue' | 'reports' | 'articles' | 'users' | 'metrics'>('revenue');

  // Moderation Reports Queue
  const [reports, setReports] = useState<ReportItem[]>(() => {
    const saved = localStorage.getItem('agri_moderation_reports');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return [
      {
        id: 'rep-sample-1',
        targetType: 'listing',
        targetId: 'mkt-3',
        targetTitle: 'Grade 1 Anna F1 Tomatoes (Crates)',
        reportedBy: 'Kiprono Cheruiyot',
        reason: 'misleading_claim',
        details: 'Seller listed crates as 64kg but standard wooden crates in this area are usually 50kg. Please verify seller scale accuracy.',
        createdAt: '2026-10-10',
        status: 'pending'
      },
      {
        id: 'rep-sample-2',
        targetType: 'post',
        targetId: 'post-1',
        targetTitle: 'Experience with SC Duma hybrid',
        reportedBy: 'Mary Wanjiku',
        reason: 'spam',
        details: 'Suspected duplicate advertising link posted in comments.',
        createdAt: '2026-10-09',
        status: 'pending'
      }
    ];
  });

  // CMS Articles state
  const [articles, setArticles] = useState([
    { id: 'art-1', title: 'Maize Lethal Necrosis (MLND) Control in Rift Valley', category: 'Crops', author: 'Dr. Beatrice Wambui', status: 'Published', date: '2026-10-08' },
    { id: 'art-2', title: 'Formulating Low-Cost Dairy Meal Using Local Byproducts', category: 'Livestock', author: 'Dr. Julius Kipkorir', status: 'Published', date: '2026-10-09' },
    { id: 'art-3', title: 'Avocado Phytosanitary Inspection Standards for Chinese Export', category: 'Export Trade', author: 'Mercy Achieng', status: 'Review', date: '2026-10-10' },
    { id: 'art-4', title: 'Solar Drip Irrigation Sizing for Semi-Arid Counties', category: 'Irrigation', author: 'Eng. Francis Mutua', status: 'Draft', date: '2026-10-11' }
  ]);

  // Platform User Management
  const [managedUsers, setManagedUsers] = useState([
    { id: 'usr-1', name: 'Adams Kipkoech Kering', username: 'adams_kering', role: 'admin', county: 'Uasin Gishu', status: 'Active (Verified)', joinDate: '2023-01-01' },
    { id: 'usr-2', name: 'Kiprono Cheruiyot', username: 'kiprono_farms', role: 'farmer', county: 'Uasin Gishu', status: 'Active (Verified)', joinDate: '2024-03-15' },
    { id: 'usr-3', name: 'Dr. Beatrice Wambui', username: 'dr_beatrice_wambui', role: 'expert', county: 'Nakuru', status: 'Active (Verified)', joinDate: '2023-11-01' },
    { id: 'usr-4', name: 'David Omondi', username: 'omondi_procurement', role: 'buyer', county: 'Nairobi', status: 'Active (Verified)', joinDate: '2024-06-10' },
    { id: 'usr-5', name: 'Mercy Achieng', username: 'mercy_achieng_editor', role: 'editor', county: 'Kisumu', status: 'Active', joinDate: '2024-01-15' },
  ]);

  const [auditLog, setAuditLog] = useState<string[]>([
    '2026-10-11 08:30 — Admin Adams Kering verified Dr. Beatrice Wambui expert credentials.',
    '2026-10-10 14:15 — Editor Mercy Achieng published KALRO cereal guide.',
    '2026-10-09 11:20 — Automated spam filter flagged 1 duplicate comment.',
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Crops');
  const [newStatus, setNewStatus] = useState('Published');
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleResolveReport = (reportId: string, action: 'action_taken' | 'dismissed') => {
    setReports(prev => {
      const updated = prev.map(r => r.id === reportId ? { ...r, status: action } : r);
      localStorage.setItem('agri_moderation_reports', JSON.stringify(updated));
      return updated;
    });
    setAuditLog(prev => [
      `${new Date().toISOString().replace('T', ' ').slice(0, 16)} — Admin ${user?.name} resolved report #${reportId} (${action}).`,
      ...prev
    ]);
  };

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const newArt = {
      id: `art-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      author: user?.name || 'Adams Kipkoech Kering',
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

  if (role !== 'admin' && role !== 'editor' && role !== 'moderator') {
    return (
      <div className="bg-amber-50 rounded-3xl p-8 border border-amber-200 text-center max-w-xl mx-auto my-12 space-y-3">
        <ShieldCheck className="w-12 h-12 text-amber-700 mx-auto" />
        <h2 className="text-xl font-bold text-stone-900">Restricted Administration Portal</h2>
        <p className="text-xs text-stone-600 leading-relaxed">
          The Content Management and Moderation dashboard is restricted to authorized System Administrators and Content Editors. Please switch active role to <strong>Administrator</strong> via the top utility bar to review.
        </p>
      </div>
    );
  }

  const pendingReportsCount = reports.filter(r => r.status === 'pending').length;

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-[#183D29] text-[#FAF7F0] rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#122e1f] rounded-full text-xs font-semibold text-emerald-300 border border-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Platform Administration & Content Operations</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-serif">
              Administration & Moderation
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90">
              Authenticated Admin: <strong>{user?.name || 'Adams Kipkoech Kering'}</strong> • Role: <strong className="capitalize">{role}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCreateModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-[#183D29] rounded-xl text-xs font-bold transition shadow-xs shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publish Agricultural Article</span>
            </button>
          </div>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex border-b border-stone-200 bg-white rounded-2xl p-1.5 shadow-xs text-xs font-semibold overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('revenue')}
          className={`flex-1 py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-2 whitespace-nowrap ${
            activeTab === 'revenue' ? 'bg-[#183D29] text-white' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-amber-400" />
          <span>Founder Revenue & Ledger</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`flex-1 py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-2 whitespace-nowrap ${
            activeTab === 'reports' ? 'bg-[#183D29] text-white' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Flag className="w-4 h-4" />
          <span>Moderation Queue ({pendingReportsCount})</span>
        </button>

        <button
          onClick={() => setActiveTab('articles')}
          className={`flex-1 py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-2 whitespace-nowrap ${
            activeTab === 'articles' ? 'bg-[#183D29] text-white' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Articles ({articles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`flex-1 py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-2 whitespace-nowrap ${
            activeTab === 'users' ? 'bg-[#183D29] text-white' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Users & Verifications ({managedUsers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('metrics')}
          className={`flex-1 py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-2 whitespace-nowrap ${
            activeTab === 'metrics' ? 'bg-[#183D29] text-white' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>System Health</span>
        </button>
      </div>

      {/* Tab 0: Founder Revenue Dashboard */}
      {activeTab === 'revenue' && <FounderRevenueDashboard />}

      {/* Tab 1: Moderation Queue */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-stone-900 text-base">Community & Marketplace Reports</h3>
              <p className="text-xs text-stone-500">
                Review flagged posts, fraudulent marketplace items, or prohibited chemical listings
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-900 rounded-full">
              {pendingReportsCount} Pending Review
            </span>
          </div>

          {reports.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-stone-200 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-stone-800 text-sm">Moderation Queue is Clear</h4>
              <p className="text-xs text-stone-500">No reported items pending review.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map(rep => (
                <div
                  key={rep.id}
                  className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        rep.targetType === 'listing' ? 'bg-blue-100 text-blue-900' : 'bg-purple-100 text-purple-900'
                      }`}>
                        {rep.targetType}
                      </span>
                      <h4 className="font-bold text-stone-900 text-sm">{rep.targetTitle}</h4>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-stone-400">{rep.createdAt}</span>
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                        rep.status === 'pending'
                          ? 'bg-amber-100 text-amber-900'
                          : rep.status === 'action_taken'
                          ? 'bg-rose-100 text-rose-900'
                          : 'bg-stone-100 text-stone-700'
                      }`}>
                        {rep.status}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-stone-700 space-y-1">
                    <div><strong>Reported Reason:</strong> <span className="capitalize">{rep.reason.replace('_', ' ')}</span></div>
                    <div><strong>Reported By:</strong> {rep.reportedBy}</div>
                    <div className="p-3 bg-stone-50 rounded-xl text-stone-800 italic">
                      "{rep.details}"
                    </div>
                  </div>

                  {rep.status === 'pending' && (
                    <div className="flex items-center justify-end gap-2 pt-1 border-t border-stone-100">
                      <button
                        onClick={() => handleResolveReport(rep.id, 'dismissed')}
                        className="px-3 py-1.5 border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50"
                      >
                        Dismiss Report
                      </button>
                      <button
                        onClick={() => handleResolveReport(rep.id, 'action_taken')}
                        className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold"
                      >
                        Enforce Action & Remove Item
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Articles */}
      {activeTab === 'articles' && (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs space-y-4 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-stone-900">Articles & Agronomic Production Guides</h3>
              <p className="text-xs text-stone-500">Draft, Review, Published, and Archived editorial workflows</p>
            </div>
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
      )}

      {/* Tab 3: Users */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs space-y-4 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-stone-900">User Accounts & Role Permissions</h3>
              <p className="text-xs text-stone-500">Manage farmer verifications, professional expert credentials, and access levels</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-900 text-white text-[11px] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-3.5">Name</th>
                  <th className="p-3.5">Username</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5">County</th>
                  <th className="p-3.5">Verification</th>
                  <th className="p-3.5">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {managedUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-stone-50 transition">
                    <td className="p-3.5 font-bold text-stone-900">{u.name}</td>
                    <td className="p-3.5 font-mono text-stone-600">@{u.username}</td>
                    <td className="p-3.5 capitalize font-semibold text-[#183D29]">{u.role}</td>
                    <td className="p-3.5 text-stone-600">{u.county}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded-full font-bold text-[10px]">
                        {u.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-stone-400">{u.joinDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Metrics & Audit */}
      {activeTab === 'metrics' && (
        <div className="space-y-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
              <div className="text-xs font-bold text-stone-500 uppercase">Crop Guides</div>
              <div className="text-2xl font-black text-stone-900">{cropsData.length}</div>
              <div className="text-[11px] text-emerald-700 font-semibold">KALRO & KEPHIS Aligned</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
              <div className="text-xs font-bold text-stone-500 uppercase">Livestock Guides</div>
              <div className="text-2xl font-black text-stone-900">{livestockData.length}</div>
              <div className="text-[11px] text-emerald-700 font-semibold">Species & Breeds</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
              <div className="text-xs font-bold text-stone-500 uppercase">Registered Users</div>
              <div className="text-2xl font-black text-stone-900">4,200+</div>
              <div className="text-[11px] text-stone-400">Farmers & Traders</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
              <div className="text-xs font-bold text-stone-500 uppercase">API / Server</div>
              <div className="text-2xl font-black text-emerald-800">Healthy</div>
              <div className="text-[11px] text-emerald-700 font-semibold">Express & Gemini 3.8 Flash</div>
            </div>
          </div>

          {/* Audit Log */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 space-y-3 shadow-xs">
            <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wider">Administrative Audit Trail</h4>
            <div className="space-y-2 text-xs font-mono text-stone-700 max-h-60 overflow-y-auto bg-stone-50 p-4 rounded-2xl border border-stone-200">
              {auditLog.map((log, idx) => (
                <div key={idx} className="border-b border-stone-200/50 pb-1.5 last:border-b-0">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
                className="w-full py-2.5 bg-[#183D29] hover:bg-[#122e1f] text-white font-bold rounded-xl transition"
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
