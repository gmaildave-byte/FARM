import React from 'react';
import {
  Sprout,
  Sun,
  Droplet,
  Layers,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SustainablePage: React.FC = () => {
  const { t } = useLanguage();

  const practices = [
    {
      id: 'push-pull',
      title: 'Push-Pull Technology (Stemborer & Striga Defense)',
      inventor: 'Developed by ICIPE & KALRO',
      desc: 'Intercropping maize with Silverleaf Desmodium (which repels/pushes stemborers and chemically aborts parasitic Striga weed) while planting Napier or Brachiaria on field borders (which attracts/pulls moths and traps caterpillars).',
      benefits: [
        'Eliminates need for synthetic stemborer insecticides.',
        'Provides continuous high-protein green fodder for dairy cattle.',
        'Fixes biological nitrogen (up to 40 kg N/acre/year) in soil.'
      ]
    },
    {
      id: 'solar-pumping',
      title: 'Solar-Powered Irrigation & Borehole Pumping',
      inventor: 'Clean Energy Farming',
      desc: 'Replacing expensive diesel generators with brushless DC solar submersible water pumps (Dayliff, Lorentz) connected to elevated buffer tanks and gravity drip lines.',
      benefits: [
        'Zero ongoing fuel costs; operates automatically during peak sunlight hours.',
        'Payback period under 18 months compared to petrol pumps.',
        'Consistent water supply during dry seasons when solar radiation is highest.'
      ]
    },
    {
      id: 'bsf-protein',
      title: 'Black Soldier Fly (BSF) Larvae for Poultry & Fish Feed',
      inventor: 'Circular Circular Economy',
      desc: 'Breeding Black Soldier Fly larvae (Hermetia illucens) on organic farm waste, fruit scraps, and market refuse to produce 42% crude protein feed for poultry and catfish ponds.',
      benefits: [
        'Reduces expensive commercial poultry feed costs by up to 30%.',
        'Converts 100kg organic waste into 20kg high-protein live larvae within 14 days.',
        'Produces rich insect frass organic fertilizer for nursery soil.'
      ]
    },
    {
      id: 'organic-biocontrols',
      title: 'Natural Botanical Pest Formulations (Neem & Pyrethrum)',
      inventor: 'Organic Pest Protection',
      desc: 'Utilizing cold-pressed neem seed oil (Azadirachtin) and natural pyrethrin extract to manage whiteflies, aphids, and mites without leaving toxic synthetic chemical residues on harvest.',
      benefits: [
        'Zero harmful chemical residues on leafy greens and tomatoes (0-day PHI).',
        'Protects honeybees and beneficial predatory ladybird beetles.',
        'Complies with EU organic and fair-trade certification guidelines.'
      ]
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-900 rounded-full text-xs font-semibold text-emerald-300 border border-emerald-800">
            <Sprout className="w-3.5 h-3.5" />
            Ecological Agronomy & Modern Technology
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Sustainable, Organic & Modern Farming
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Harness nature-based solutions and climate-smart technologies. Learn how Kenyan farmers are cutting input expenses with Push-Pull biological systems, solar pumping, organic biocontrols, and circular Black Soldier Fly protein.
          </p>
        </div>
      </div>

      {/* Practices Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {practices.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 space-y-4 shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  {p.inventor}
                </span>
                <Sparkles className="w-4 h-4 text-emerald-700" />
              </div>

              <h3 className="text-lg font-bold text-stone-900 leading-snug">{p.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{p.desc}</p>

              <div className="space-y-1.5 pt-2 border-t border-stone-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900">
                  Key Practical Farm Benefits
                </span>
                <ul className="text-xs text-stone-700 space-y-1 list-disc list-inside bg-stone-50 p-4 rounded-xl border border-stone-100">
                  {p.benefits.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
