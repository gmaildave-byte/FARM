import React, { useState } from 'react';
import {
  Bug,
  Search,
  Filter,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Upload,
  Camera,
  ArrowRight,
  ShieldCheck,
  X,
  HelpCircle
} from 'lucide-react';
import { pestsData } from '../data/pests';
import { PestOrDisease } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const PestsPage: React.FC = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'pest' | 'disease' | 'weed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProblemModal, setSelectedProblemModal] = useState<PestOrDisease | null>(null);

  // Diagnostic Assistant State
  const [diagnosticOpen, setDiagnosticOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState('Maize');
  const [selectedSymptom, setSelectedSymptom] = useState('Window-pane leaf feeding / frass in whorl');
  const [uploadedPhotoPreview, setUploadedPhotoPreview] = useState<string | null>(null);
  const [diagnosisResult, setDiagnosisResult] = useState<{
    likelyCause: string;
    confidence: number;
    description: string;
    immediateAction: string;
    warning: string;
  } | null>(null);

  const filteredPests = pestsData.filter((item) => {
    const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.swahiliName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.affectedCropsOrAnimals.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesQuery;
  });

  const handleRunDiagnosis = () => {
    // Intelligent differential diagnostic logic
    if (selectedCrop === 'Maize') {
      if (selectedSymptom.includes('Window-pane') || selectedSymptom.includes('frass')) {
        setDiagnosisResult({
          likelyCause: 'Fall Armyworm (Spodoptera frugiperda)',
          confidence: 94,
          description: 'Characteristic ragged feeding holes and abundant sawdust-like frass accumulated in the whorl. Larva possesses 4 squared pinacula on 8th abdominal segment and inverted Y on head.',
          immediateAction: 'Apply registered bio-pesticide (Bt or Metarhizium) or Emamectin Benzoate 50g/kg directly into the funnel whorl early morning. Observe 14-day Pre-Harvest Interval (PHI).',
          warning: 'Do not spray when winds exceed 15 km/h. Wear complete PPE (respirator, gloves, eye goggles).'
        });
      } else if (selectedSymptom.includes('V-shaped yellowing')) {
        setDiagnosisResult({
          likelyCause: 'Nitrogen (N) Deficiency',
          confidence: 90,
          description: 'Not a pest; physiological nutrient starvation. Mobile nitrogen moves to upper leaves, leaving older lower leaves chlorotic.',
          immediateAction: 'Top-dress with CAN (50-75 kg/acre) when soil is moist.',
          warning: 'Fungicides or pesticides will not resolve nutrient deficiencies.'
        });
      } else {
        setDiagnosisResult({
          likelyCause: 'Stem Borer (Busseola fusca) or Fall Armyworm',
          confidence: 78,
          description: 'Early instars boring into central stem causing dead heart symptom.',
          immediateAction: 'Scout 20 consecutive plants across 5 spots to evaluate economic threshold (>10% damaged plants).',
          warning: 'Consult your local Ward Agricultural Extension Officer if symptoms persist.'
        });
      }
    } else if (selectedCrop === 'Tomatoes') {
      if (selectedSymptom.includes('Water-soaked dark lesions') || selectedSymptom.includes('cottony fungal')) {
        setDiagnosisResult({
          likelyCause: 'Late Blight (Phytophthora infestans)',
          confidence: 96,
          description: 'Aggressive oomycete pathogen thriving during cool, humid, rainy spells. Can destroy complete foliage within 48-72 hours.',
          immediateAction: 'Apply systemic curative Metalaxyl-M + Mancozeb (Ridomil Gold) immediately; follow up 7 days later with protective contact Mancozeb.',
          warning: 'Observe 7-day Pre-Harvest Interval (PHI) before picking any ripe fruits for market.'
        });
      } else if (selectedSymptom.includes('Sudden daytime wilting while green')) {
        setDiagnosisResult({
          likelyCause: 'Bacterial Wilt (Ralstonia solanacearum)',
          confidence: 92,
          description: 'Soil-borne bacteria blocking vascular xylem. Plant collapses while foliage remains green.',
          immediateAction: 'Perform the clean-water stem streaming test. Uproot infected plant with soil and destroy outside the field. There is NO chemical spray cure.',
          warning: 'Do not replant potatoes, tomatoes, or peppers in this field for at least 3-4 years.'
        });
      } else {
        setDiagnosisResult({
          likelyCause: 'Tomato Leafminer (Tuta Absoluta)',
          confidence: 85,
          description: 'Translucent blotch mines with black fecal pellets in leaf mesophyll.',
          immediateAction: 'Install delta pheromone traps; spray Chlorantraniliprole (Coragen) observing 3-day PHI.',
          warning: 'Rotate chemical groups to avoid rapid pesticide resistance.'
        });
      }
    } else {
      setDiagnosisResult({
        likelyCause: 'Suspected fungal leaf blight or nutrient stress',
        confidence: 70,
        description: 'Symptoms indicate possible foliar disease or soil moisture stress.',
        immediateAction: 'Inspect leaf undersides with a hand lens for fungal sporulation or pest webs.',
        warning: 'For accurate diagnosis, take a sample to your nearest KALRO or sub-county agriculture office.'
      });
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-900 rounded-full text-xs font-semibold text-emerald-300 border border-emerald-800">
            <Bug className="w-3.5 h-3.5" />
            Pest, Disease & Weed Knowledge Base
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Agricultural Pests & Diseases Database
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Searchable agricultural problem bank providing symptom recognition, economic thresholds, Integrated Pest Management (IPM), registered chemicals, Pre-Harvest Intervals (PHIs), and personal safety precautions.
          </p>
        </div>
      </div>

      {/* Interactive Symptom Helper / Photo Diagnostic Assistant Trigger Banner */}
      <div className="bg-gradient-to-r from-emerald-50 to-stone-50 border-2 border-emerald-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <Camera className="w-4 h-4 text-emerald-700" />
            <span>Interactive Diagnostic Assistant</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
            Not sure what is attacking your crop?
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
            Select the crop and visible symptoms or attach a crop photograph to run our agricultural differential diagnostic engine.
          </p>
        </div>

        <button
          onClick={() => setDiagnosticOpen(!diagnosticOpen)}
          className="px-6 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs sm:text-sm transition shadow-sm shrink-0 flex items-center gap-2"
        >
          <Camera className="w-4 h-4" />
          <span>{diagnosticOpen ? 'Hide Diagnostic Helper' : 'Open Symptom Helper'}</span>
        </button>
      </div>

      {/* Diagnostic Assistant Workspace (Collapsible) */}
      {diagnosticOpen && (
        <div className="bg-white rounded-3xl border-2 border-emerald-600 p-6 sm:p-8 space-y-6 shadow-md animate-in fade-in duration-200">
          <div className="flex justify-between items-center border-b border-stone-200 pb-4">
            <div>
              <h3 className="text-lg font-bold text-stone-900">Crop Health Diagnostic Assistant</h3>
              <p className="text-xs text-stone-500">Provide observed symptoms and optional crop leaf photo.</p>
            </div>
            <button
              onClick={() => setDiagnosticOpen(false)}
              className="text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Selection */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Affected Crop</label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm bg-white"
                >
                  <option value="Maize">Maize (Mahindi)</option>
                  <option value="Tomatoes">Tomatoes (Nyanya)</option>
                  <option value="Beans">Common Beans (Maharagwe)</option>
                  <option value="Potatoes">Irish Potatoes (Viazi)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Primary Observed Symptom</label>
                <select
                  value={selectedSymptom}
                  onChange={(e) => setSelectedSymptom(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm bg-white"
                >
                  {selectedCrop === 'Maize' && (
                    <>
                      <option value="Window-pane leaf feeding / frass in whorl">Window-pane transparent feeding / frass in whorl</option>
                      <option value="V-shaped yellowing from leaf tip down midrib">V-shaped yellowing from leaf tip down midrib (older leaves)</option>
                      <option value="Caterpillar bored inside central stem (dead heart)">Caterpillar bored inside central stem (dead heart)</option>
                      <option value="Striped chlorotic mottle and yellow leaf margins">Striped chlorotic mottle and yellow leaf margins</option>
                    </>
                  )}
                  {selectedCrop === 'Tomatoes' && (
                    <>
                      <option value="Water-soaked dark lesions with cottony fungal underside">Water-soaked dark lesions with cottony fungal underside</option>
                      <option value="Sudden daytime wilting while green (milky stem streaming)">Sudden daytime wilting while green (milky stem streaming)</option>
                      <option value="Translucent blotch mines on leaf mesophyll with frass">Translucent blotch mines on leaf mesophyll with frass (Tuta)</option>
                      <option value="Black sunken leathery rot at blossom base of fruit">Black sunken leathery rot at blossom base of fruit</option>
                    </>
                  )}
                  {selectedCrop !== 'Maize' && selectedCrop !== 'Tomatoes' && (
                    <option value="General leaf spotting and premature yellowing">General leaf spotting and premature yellowing</option>
                  )}
                </select>
              </div>

              {/* Photo Upload Box */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Attach Crop Leaf / Fruit Photo (Optional)</label>
                <div className="border-2 border-dashed border-stone-200 rounded-xl p-4 text-center hover:border-emerald-500 transition">
                  {uploadedPhotoPreview ? (
                    <div className="relative inline-block">
                      <img
                        src={uploadedPhotoPreview}
                        alt="Uploaded leaf"
                        className="h-28 rounded-lg object-cover mx-auto"
                      />
                      <button
                        onClick={() => setUploadedPhotoPreview(null)}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block space-y-1">
                      <Upload className="w-6 h-6 text-stone-400 mx-auto" />
                      <span className="text-xs font-semibold text-emerald-800 block">Upload photo from device</span>
                      <span className="text-[10px] text-stone-400">PNG, JPG up to 5MB</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <button
                onClick={handleRunDiagnosis}
                className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Analyze Observed Symptoms</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Diagnostic Output Results */}
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 flex flex-col justify-between">
              {diagnosisResult ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Differential Assessment
                    </span>
                    <span className="bg-emerald-100 text-emerald-900 text-xs font-extrabold px-2.5 py-0.5 rounded-full">
                      {diagnosisResult.confidence}% Confidence
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-stone-900">{diagnosisResult.likelyCause}</h4>
                    <p className="text-xs text-stone-600 leading-relaxed mt-1">
                      {diagnosisResult.description}
                    </p>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-stone-200 space-y-1 text-xs">
                    <div className="font-bold text-emerald-900">Recommended Action:</div>
                    <div className="text-stone-700">{diagnosisResult.immediateAction}</div>
                  </div>

                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>{diagnosisResult.warning}</div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-stone-400 text-xs space-y-2">
                  <Bug className="w-8 h-8 text-stone-300 mx-auto" />
                  <div>Select your crop symptoms on the left and click "Analyze Observed Symptoms".</div>
                </div>
              )}

              <div className="text-[11px] text-stone-700 italic border-t border-stone-200 pt-3 mt-4">
                *Note: Photo symptom helpers provide probabilistic indications. Always verify on-site with certified extension officers before executing major chemical sprays.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar for Database */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Problems' },
            { id: 'pest', label: 'Pests & Insects' },
            { id: 'disease', label: 'Fungal & Bacterial Diseases' },
            { id: 'weed', label: 'Parasitic Weeds' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeFilter === f.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search pest, disease, weed..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>
      </div>

      {/* Searchable Database Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPests.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition flex flex-col justify-between group"
          >
            <div>
              <div className="h-44 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span
                  className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md text-white ${
                    item.type === 'pest'
                      ? 'bg-red-800'
                      : item.type === 'disease'
                      ? 'bg-amber-800'
                      : 'bg-purple-800'
                  }`}
                >
                  {item.type}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-stone-900 group-hover:text-emerald-800 transition">
                    {item.name} ({item.swahiliName})
                  </h3>
                  <p className="text-xs text-stone-500 italic">{item.scientificName}</p>
                </div>

                <div className="text-xs text-stone-700">
                  <strong>Affects: </strong>
                  <span className="text-emerald-900 font-semibold">{item.affectedCropsOrAnimals.join(', ')}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                    Key Identifying Symptoms
                  </span>
                  <ul className="text-xs text-stone-600 space-y-1 list-disc list-inside">
                    {item.symptoms.slice(0, 2).map((s, idx) => (
                      <li key={idx} className="line-clamp-2">{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => setSelectedProblemModal(item)}
                className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Read Full Management Protocol</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Comprehensive Problem Detail Modal */}
      {selectedProblemModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-150">
            <div className="sticky top-0 bg-white/95 backdrop-blur-md p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-800 text-white flex items-center justify-center">
                  <Bug className="w-6 h-6 text-red-200" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                    {selectedProblemModal.name} ({selectedProblemModal.swahiliName})
                  </h2>
                  <p className="text-xs text-stone-500 italic">{selectedProblemModal.scientificName}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedProblemModal(null)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Affects & Weather */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <span className="font-bold text-stone-900 block mb-1">Target Crops / Animals:</span>
                  <span className="text-stone-700">{selectedProblemModal.affectedCropsOrAnimals.join(', ')}</span>
                </div>
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <span className="font-bold text-stone-900 block mb-1">Conducive Weather Conditions:</span>
                  <span className="text-stone-700">{selectedProblemModal.conduciveConditions}</span>
                </div>
              </div>

              {/* Symptoms */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-red-900">
                  Symptoms & Diagnostic Indicators
                </h3>
                <ul className="text-xs text-stone-700 space-y-1.5 list-disc list-inside bg-red-50/50 p-4 rounded-xl border border-red-200/60">
                  {selectedProblemModal.symptoms.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              {/* IPM Strategies */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-900">
                  Integrated Pest Management (IPM) & Biological Controls
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 space-y-1">
                    <span className="font-bold text-emerald-950 block">Cultural & Physical Control:</span>
                    <span className="text-stone-700">{selectedProblemModal.culturalControl}</span>
                  </div>
                  <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 space-y-1">
                    <span className="font-bold text-emerald-950 block">Biological Parasitoids & Natural Predators:</span>
                    <span className="text-stone-700">{selectedProblemModal.biologicalControl}</span>
                  </div>
                </div>
              </div>

              {/* Responsible Chemical Management & Safety */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-700" />
                  Responsible Chemical Control & Pre-Harvest Intervals (PHIs)
                </h3>
                <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200 space-y-3 text-xs">
                  <div>
                    <strong>Registered Active Ingredients: </strong>
                    <span className="text-stone-800">{selectedProblemModal.chemicalControl.registeredActiveIngredients}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-xl border border-amber-200">
                      <strong>Pre-Harvest Interval (PHI): </strong>
                      <span className="font-bold text-red-900 text-sm block mt-0.5">
                        {selectedProblemModal.chemicalControl.phiDays} Days
                      </span>
                      <span className="text-[10px] text-stone-500">Wait this minimum duration before harvesting for human consumption.</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-amber-200">
                      <strong>Re-Entry Interval (REI): </strong>
                      <span className="font-bold text-stone-900 text-sm block mt-0.5">
                        {selectedProblemModal.chemicalControl.reiHours} Hours
                      </span>
                      <span className="text-[10px] text-stone-500">Do not enter treated field without PPE.</span>
                    </div>
                  </div>
                  <div className="text-stone-700">
                    <strong>Mandatory Personal Protective Equipment (PPE): </strong>
                    {selectedProblemModal.chemicalControl.safetyPrecautions}
                  </div>
                </div>
              </div>

              {/* Consultation Trigger */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs">
                <strong>When to Seek Professional Agronomic Intervention: </strong>
                <span className="text-stone-700">{selectedProblemModal.professionalAdviceTrigger}</span>
              </div>
            </div>

            <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedProblemModal(null)}
                className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition"
              >
                Close Protocol
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
