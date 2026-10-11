import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  MessageSquare,
  ThumbsUp,
  ShieldCheck,
  PlusCircle,
  CheckCircle2,
  X,
  Upload,
  Calendar,
  MapPin,
  Clock
} from 'lucide-react';
import { expertDirectory, expertQuestionsData } from '../data/experts';
import { ExpertQuestion } from '../types';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const ExpertPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [questions, setQuestions] = useState<ExpertQuestion[]>(expertQuestionsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [askModalOpen, setAskModalOpen] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // New question form state
  const [newTitle, setNewTitle] = useState('');
  const [newTopic, setNewTopic] = useState('Crop Agronomy');
  const [newCropAnimal, setNewCropAnimal] = useState('Maize');
  const [newCounty, setNewCounty] = useState('Nakuru');
  const [newDesc, setNewDesc] = useState('');

  const handleUpvote = (id: string) => {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, upvotes: q.upvotes + 1 } : q))
    );
  };

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newQ: ExpertQuestion = {
      id: `q-${Date.now()}`,
      title: newTitle,
      farmerName: user?.name || 'Registered Farmer',
      county: newCounty,
      topic: newTopic,
      cropOrLivestock: newCropAnimal,
      dateSubmitted: new Date().toISOString().split('T')[0],
      description: newDesc,
      status: 'Under Review',
      upvotes: 1
    };
    setQuestions([newQ, ...questions]);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setAskModalOpen(false);
      setNewTitle('');
      setNewDesc('');
    }, 1500);
  };

  const filteredQuestions = questions.filter(q =>
    q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.cropOrLivestock.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.county.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-900 rounded-full text-xs font-semibold text-emerald-300 border border-emerald-800">
            <HelpCircle className="w-3.5 h-3.5" />
            Verified Agricultural Expert Advisory System
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ask an Agricultural Expert
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Submit your crop or animal health inquiries to registered agronomists, veterinary surgeons, and irrigation engineers in Kenya. Read peer-reviewed questions and verified field interventions.
          </p>
        </div>
      </div>

      {/* Verified Experts Panel */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-stone-900">Featured Agronomy & Veterinary Panel</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {expertDirectory.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex items-start gap-4"
            >
              <img
                src={exp.avatar}
                alt={exp.name}
                className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-stone-200"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-900">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Verified Specialist</span>
                </div>
                <h4 className="text-sm font-bold text-stone-900">{exp.name}</h4>
                <p className="text-[11px] text-stone-500">{exp.title}</p>
                <p className="text-[10px] text-stone-400">{exp.qualification}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Ask Question Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 border-b border-stone-200 pb-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search answered expert cases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>

        <button
          onClick={() => setAskModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs sm:text-sm font-bold transition shadow-xs shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Submit a Farming Question</span>
        </button>
      </div>

      {/* Q&A Board */}
      <div className="space-y-6">
        {filteredQuestions.map((q) => (
          <div
            key={q.id}
            className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-xs"
          >
            {/* Question Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  {q.topic}
                </span>
                <span className="text-xs text-stone-500">
                  {q.cropOrLivestock} • {q.county} County
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-stone-400">{q.dateSubmitted}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                    q.status === 'Answered'
                      ? 'bg-emerald-100 text-emerald-900'
                      : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {q.status}
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-stone-900">{q.title}</h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-100">
                "{q.description}" — <span className="font-semibold text-stone-800">{q.farmerName}</span>
              </p>
            </div>

            {/* Expert Answer Section (if answered) */}
            {q.expertAnswer && (
              <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between border-b border-emerald-200/80 pb-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={q.expertAnswer.avatar}
                      alt={q.expertAnswer.expertName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-xs font-bold text-emerald-950">{q.expertAnswer.expertName}</div>
                      <div className="text-[10px] text-emerald-800">{q.expertAnswer.expertTitle}</div>
                    </div>
                  </div>
                  <span className="text-[11px] text-emerald-700">{q.expertAnswer.answeredDate}</span>
                </div>

                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                  {q.expertAnswer.answerText}
                </p>

                {q.expertAnswer.recommendations.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900">
                      Recommended Practical Interventions:
                    </span>
                    <ul className="text-xs text-stone-700 space-y-1 list-disc list-inside">
                      {q.expertAnswer.recommendations.map((rec, idx) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Follow-up Note */}
            {q.farmerFollowUp && (
              <div className="text-xs text-stone-600 bg-white p-3 rounded-xl border border-stone-200 italic">
                <strong>Farmer Feedback:</strong> "{q.farmerFollowUp}"
              </div>
            )}

            {/* Upvote & Actions */}
            <div className="pt-2 flex items-center justify-between text-xs text-stone-500">
              <button
                onClick={() => handleUpvote(q.id)}
                className="flex items-center gap-1.5 px-3 py-1 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 rounded-lg font-semibold transition"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Helpful ({q.upvotes})</span>
              </button>
              <span>Verified case archived in knowledge library</span>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Question Modal */}
      {askModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-4 relative">
            <button
              onClick={() => setAskModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-lg font-bold text-stone-900">Ask an Agricultural Expert</h3>
              <p className="text-xs text-stone-500">Responses are reviewed by registered agronomists and veterinarians.</p>
            </div>

            {submittedSuccess ? (
              <div className="p-6 text-center text-emerald-800 font-bold text-sm bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto mb-2" />
                Your question has been submitted for expert review!
              </div>
            ) : (
              <form onSubmit={handleAskSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Question Summary</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tomato leaves showing brown spots with white underside"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Topic</label>
                    <select
                      value={newTopic}
                      onChange={(e) => setNewTopic(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl bg-white"
                    >
                      <option>Crop Agronomy</option>
                      <option>Veterinary & Animal Health</option>
                      <option>Soil Fertility & Testing</option>
                      <option>Pest & Disease Control</option>
                      <option>Irrigation Engineering</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Crop or Animal</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dairy Cow / Maize"
                      value={newCropAnimal}
                      onChange={(e) => setNewCropAnimal(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Your County</label>
                  <input
                    type="text"
                    required
                    value={newCounty}
                    onChange={(e) => setNewCounty(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Detailed Description of Problem</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe symptoms, age of crop/animal, previous fertilizers or chemical sprays, and weather conditions..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition"
                >
                  Submit Question for Expert Assignment
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
