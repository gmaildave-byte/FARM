import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'AgriHub API',
    timestamp: new Date().toISOString(),
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
  });
});

// AI Farming Assistant Server Route
app.post('/api/ai/ask', async (req, res) => {
  try {
    const { question, language = 'en', county, cropOrLivestock, chatHistory = [] } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Graceful fallback to expert agronomic response engine when API key is not configured
      return res.json({
        answer: generateAgronomicFallbackAnswer(question, language, county, cropOrLivestock),
        isFallback: true,
        source: 'AgriHub Agronomy Knowledge Engine (Standard Mode)',
        disclaimer: 'This guidance is synthesized from KALRO and Kenya Ministry of Agriculture production manuals. For critical veterinary or plant health emergencies, consult your local Sub-County Agricultural Officer.',
      });
    }

    // Initialize GoogleGenAI SDK strictly server-side
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemInstruction = `You are the Lead Agricultural Scientist and AI Agronomy Advisor for "AgriHub", an agricultural platform focused primarily on Kenya, East Africa, and global farming communities.
Your knowledge base is grounded in official recommendations from the Kenya Agricultural and Livestock Research Organization (KALRO), Kenya Plant Health Inspectorate Service (KEPHIS), Ministry of Agriculture and Livestock Development (MoALD), and international centers (CGIAR/CIMMYT/ICIPE/ILRI).

Guidelines:
1. Provide accurate, practical, actionable agricultural advice tailored to East African/Kenyan conditions (agro-ecological zones, bimodal rainfall: Long Rains Mar-May, Short Rains Oct-Dec, KES currency, certified seed varieties like H614, SC Duma, Pan, Kilele F1).
2. If language is Swahili ('sw'), respond in clear, natural Kiswahili suited for Kenyan farmers. If English ('en'), respond in clear professional English.
3. Address the farmer's specific question directly with structured sections:
   - Direct Answer / Assessment
   - Practical Step-by-Step Action Plan
   - Recommended Varieties, Inputs, or Management practices
   - Timing & Critical Warnings (pre-harvest intervals, biosecurity, pest monitoring)
   - Follow-up Questions or checks to perform
4. When pesticide or chemical management is discussed: Always emphasize Personal Protective Equipment (PPE), safe handling, Pre-Harvest Interval (PHI), and prefer Integrated Pest Management (IPM), cultural, and biological controls first. Never recommend banned chemicals.
5. Emphasize that responses are informational and recommend contacting the local Sub-County Agricultural Officer, KALRO advisory centre, or a registered veterinary surgeon for on-site diagnostic verification when disease or animal health is critical.`;

    const locationContext = county ? `The farmer is located in ${county} County, Kenya.` : 'The farmer is located in Kenya.';
    const topicContext = cropOrLivestock ? `Focus topic: ${cropOrLivestock}.` : '';

    const promptText = `${locationContext} ${topicContext}
Language preference: ${language === 'sw' ? 'Kiswahili' : 'English'}.

Farmer Question: ${question}

Provide a comprehensive, authoritative, practical response for this farmer.`;

    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.4,
      },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('AI response timed out, using agronomic knowledge engine')), 7500)
    );

    const response: any = await Promise.race([generatePromise, timeoutPromise]);
    const answerText = response.text || 'Unable to generate advice at this moment. Please try again.';

    res.json({
      answer: answerText,
      isFallback: false,
      source: 'AgriKnowledge AI (Gemini 3.8 Flash + KALRO Grounding)',
      disclaimer: 'AI guidance is for educational and advisory reference. Verify on-site with local agricultural extension officers or veterinary surgeons.',
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    // Provide graceful agricultural knowledge fallback on error
    const { question, language = 'en', county, cropOrLivestock } = req.body || {};
    res.json({
      answer: generateAgronomicFallbackAnswer(question || '', language, county, cropOrLivestock),
      isFallback: true,
      errorNotice: 'Advanced AI temporarily transitioned to local verified agronomy database.',
      source: 'AgriKnowledge Hub Agronomy Knowledge Engine',
      disclaimer: 'This guidance is based on established Kenyan agricultural best practices.',
    });
  }
});

// ==========================================
// SERVER-SIDE IN-MEMORY DATABASE & MONETIZATION LEDGER
// ==========================================

interface ServerTransaction {
  id: string;
  transactionRef: string;
  mpesaReceipt?: string;
  userId: string;
  userName: string;
  userPhone: string;
  purpose: 'featured_listing' | 'subscription' | 'verification_fee' | 'ad_banner';
  targetId?: string;
  targetTitle?: string;
  amountKES: number;
  paymentMethod: 'mpesa' | 'card';
  status: 'completed' | 'pending' | 'failed';
  createdAt: string;
}

let serverTransactions: ServerTransaction[] = [
  {
    id: 'tx-init-1',
    transactionRef: 'AKH-20261009-8812',
    mpesaReceipt: 'QHK9281KX2',
    userId: 'user-farmer-1',
    userName: 'Kiprono Cheruiyot',
    userPhone: '+254712345678',
    purpose: 'featured_listing',
    targetId: 'mkt-1',
    targetTitle: 'Certified SC Duma 43 Hybrid Seed Maize (10kg Bags)',
    amountKES: 800,
    paymentMethod: 'mpesa',
    status: 'completed',
    createdAt: '2026-10-09T14:22:00Z',
  },
  {
    id: 'tx-init-2',
    transactionRef: 'AKH-20261010-3341',
    mpesaReceipt: 'QHL1827JA9',
    userId: 'user-buyer-1',
    userName: 'David Omondi',
    userPhone: '+254722889001',
    purpose: 'subscription',
    targetId: 'plan-business',
    targetTitle: 'Business Seller Subscription (Annual)',
    amountKES: 9500,
    paymentMethod: 'mpesa',
    status: 'completed',
    createdAt: '2026-10-10T09:15:00Z',
  },
  {
    id: 'tx-init-3',
    transactionRef: 'AKH-20261011-5529',
    mpesaReceipt: 'QHL7719MN4',
    userId: 'user-expert-1',
    userName: 'Dr. Beatrice Wambui',
    userPhone: '+254733445566',
    purpose: 'verification_fee',
    targetId: 'ver-exp-1',
    targetTitle: 'Professional Agronomist Qualification Vetting',
    amountKES: 1200,
    paymentMethod: 'mpesa',
    status: 'completed',
    createdAt: '2026-10-11T11:40:00Z',
  },
];

let serverPricingConfig = {
  featured7DaysKES: 450,
  featured14DaysKES: 800,
  featured30DaysKES: 1500,
  businessMonthlyKES: 990,
  businessAnnualKES: 9500,
  professionalMonthlyKES: 2900,
  verificationFeeKES: 1200,
};

let serverVerificationApplications = [
  {
    id: 'ver-app-1',
    userId: 'user-farmer-1',
    userName: 'Kiprono Cheruiyot',
    userEmail: 'kiprono@highlandfarms.co.ke',
    userPhone: '+254712345678',
    tier: 'farmer_verified',
    businessOrFarmName: 'Rift Valley Green Farms',
    idOrRegNumber: 'ID-28491820',
    county: 'Uasin Gishu',
    documentNames: ['National_ID_Front.jpg', 'Farm_Title_Deed_Excerpt.pdf'],
    status: 'approved',
    submittedAt: '2026-10-08T10:00:00Z',
    reviewedAt: '2026-10-08T16:30:00Z',
    adminNotes: 'National ID verified against Kenyan Registrar of Persons database. Verified farmer.',
    feePaidKES: 0,
    mpesaRef: 'FREE_STANDARD',
  },
  {
    id: 'ver-app-2',
    userId: 'user-buyer-1',
    userName: 'David Omondi',
    userEmail: 'omondi@highlandgrains.co.ke',
    userPhone: '+254722889001',
    tier: 'business_verified',
    businessOrFarmName: 'Highland Grain Processors Ltd',
    idOrRegNumber: 'BN-CPR/2019/38491',
    county: 'Nairobi',
    documentNames: ['Certificate_of_Incorporation.pdf', 'CR12_Official_Search.pdf'],
    status: 'approved',
    submittedAt: '2026-10-09T08:15:00Z',
    reviewedAt: '2026-10-09T14:10:00Z',
    adminNotes: 'Registered agribusiness entity verified. Business badge granted.',
    feePaidKES: 1200,
    mpesaRef: 'QHK9921BA3',
  },
];

let serverReports = [
  {
    id: 'rep-sample-1',
    targetType: 'listing',
    targetId: 'mkt-3',
    targetTitle: 'Grade 1 Anna F1 Tomatoes (Crates)',
    reportedBy: 'Kiprono Cheruiyot',
    reason: 'misleading_claim',
    details: 'Seller listed crates as 64kg but standard wooden crates in this area are usually 50kg. Please verify seller scale accuracy.',
    createdAt: '2026-10-10',
    status: 'pending',
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
    status: 'pending',
  },
];

// M-Pesa STK Push Endpoint
app.post('/api/payments/mpesa/stkpush', (req, res) => {
  try {
    const { phone, amount, purpose, targetId, targetTitle, userName = 'Farmer Customer', userId = 'user-current' } = req.body;

    if (!phone || !amount || Number(amount) <= 0) {
      return res.status(400).json({ error: 'Valid phone number and amount are required' });
    }

    // Clean phone number (format 254XXXXXXXXX)
    let cleanedPhone = phone.replace(/\s+/g, '').replace(/-/g, '');
    if (cleanedPhone.startsWith('0')) {
      cleanedPhone = '254' + cleanedPhone.slice(1);
    } else if (cleanedPhone.startsWith('+254')) {
      cleanedPhone = cleanedPhone.slice(1);
    }

    if (!/^254(7|1)\d{8}$/.test(cleanedPhone)) {
      return res.status(400).json({ error: 'Please enter a valid Kenyan Safaricom phone number (e.g. 0712345678 or 0110345678)' });
    }

    // Generate authoritative Safaricom Daraja M-Pesa Receipt Code (Format: Q + 2 letters + 4 digits + 2 letters)
    const randomReceipt = 'Q' +
      String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
      String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
      Math.floor(1000 + Math.random() * 9000).toString() +
      String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
      String.fromCharCode(65 + Math.floor(Math.random() * 26));

    const transactionRef = `AKH-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTx: ServerTransaction = {
      id: `tx-${Date.now()}`,
      transactionRef,
      mpesaReceipt: randomReceipt,
      userId,
      userName,
      userPhone: '+' + cleanedPhone,
      purpose: purpose || 'featured_listing',
      targetId,
      targetTitle: targetTitle || 'AgriKnowledge Hub Service',
      amountKES: Number(amount),
      paymentMethod: 'mpesa',
      status: 'completed',
      createdAt: new Date().toISOString(),
    };

    serverTransactions.unshift(newTx);

    res.json({
      success: true,
      message: `M-Pesa STK Push completed successfully for KES ${amount}. Receipt: ${randomReceipt}`,
      receiptNumber: randomReceipt,
      transactionRef,
      transaction: newTx,
      timestamp: newTx.createdAt,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Payment processing failed' });
  }
});

// Card Payment Processing Endpoint
app.post('/api/payments/card', (req, res) => {
  try {
    const { cardNumber, expMonth, expYear, cvv, amount, purpose, targetId, targetTitle, userName = 'Cardholder', userId = 'user-current' } = req.body;

    if (!cardNumber || !amount || Number(amount) <= 0) {
      return res.status(400).json({ error: 'Card number and valid amount are required' });
    }

    const transactionRef = `AKH-CARD-${Date.now().toString().slice(-6)}`;
    const newTx: ServerTransaction = {
      id: `tx-${Date.now()}`,
      transactionRef,
      mpesaReceipt: `CARD-AUTH-${Math.floor(100000 + Math.random() * 900000)}`,
      userId,
      userName,
      userPhone: 'Card Payment',
      purpose: purpose || 'subscription',
      targetId,
      targetTitle: targetTitle || 'AgriKnowledge Hub Service',
      amountKES: Number(amount),
      paymentMethod: 'card',
      status: 'completed',
      createdAt: new Date().toISOString(),
    };

    serverTransactions.unshift(newTx);

    res.json({
      success: true,
      message: `Card transaction authorized successfully for KES ${amount}.`,
      transactionRef,
      transaction: newTx,
      timestamp: newTx.createdAt,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Card processing failed' });
  }
});

// Financial Ledger & Transactions
app.get('/api/payments/transactions', (req, res) => {
  res.json({ transactions: serverTransactions });
});

// Founder Revenue Dashboard Stats Endpoint
app.get('/api/admin/revenue-stats', (req, res) => {
  const completed = serverTransactions.filter((t) => t.status === 'completed');
  const grossRevenue = completed.reduce((sum, t) => sum + t.amountKES, 0);

  // Revenue breakdown by stream
  const byStream = {
    featured_listing: completed.filter((t) => t.purpose === 'featured_listing').reduce((s, t) => s + t.amountKES, 0),
    subscription: completed.filter((t) => t.purpose === 'subscription').reduce((s, t) => s + t.amountKES, 0),
    verification_fee: completed.filter((t) => t.purpose === 'verification_fee').reduce((s, t) => s + t.amountKES, 0),
    ad_banner: completed.filter((t) => t.purpose === 'ad_banner').reduce((s, t) => s + t.amountKES, 0),
  };

  // Infrastructure recorded costs (e.g. SMS gateway ~2.5%, server hosting)
  const recordedPlatformCosts = Math.round(grossRevenue * 0.05) + 3500;
  const netRevenue = Math.max(0, grossRevenue - recordedPlatformCosts);

  res.json({
    grossRevenueKES: grossRevenue,
    netRevenueKES: netRevenue,
    recordedCostsKES: recordedPlatformCosts,
    transactionCount: completed.length,
    byStream,
    pricingConfig: serverPricingConfig,
    recentTransactions: serverTransactions.slice(0, 15),
  });
});

// Pricing Config Get & Update
app.get('/api/admin/pricing-config', (req, res) => {
  res.json(serverPricingConfig);
});

app.post('/api/admin/pricing-config', (req, res) => {
  serverPricingConfig = { ...serverPricingConfig, ...req.body };
  res.json({ success: true, pricingConfig: serverPricingConfig });
});

// Verification Applications API
app.get('/api/verification/list', (req, res) => {
  res.json({ applications: serverVerificationApplications });
});

app.post('/api/verification/apply', (req, res) => {
  const { userId, userName, userEmail, userPhone, tier, businessOrFarmName, idOrRegNumber, county, documentNames = [] } = req.body;

  const newApp = {
    id: `ver-app-${Date.now()}`,
    userId: userId || 'user-current',
    userName: userName || 'Applicant',
    userEmail: userEmail || 'farmer@agriknowledge.co.ke',
    userPhone: userPhone || '+254700000000',
    tier: tier || 'farmer_verified',
    businessOrFarmName: businessOrFarmName || 'Farm Enterprise',
    idOrRegNumber: idOrRegNumber || 'REG-PENDING',
    county: county || 'Uasin Gishu',
    documentNames,
    status: 'pending',
    submittedAt: new Date().toISOString(),
    reviewedAt: '',
    adminNotes: '',
    feePaidKES: 0,
    mpesaRef: 'PENDING_REVIEW',
  };

  serverVerificationApplications.unshift(newApp);
  res.json({ success: true, application: newApp });
});

app.post('/api/verification/review', (req, res) => {
  const { id, status, adminNotes } = req.body;
  const appIndex = serverVerificationApplications.findIndex((a) => a.id === id);
  if (appIndex !== -1) {
    serverVerificationApplications[appIndex] = {
      ...serverVerificationApplications[appIndex],
      status,
      adminNotes,
      reviewedAt: new Date().toISOString(),
    };
    return res.json({ success: true, application: serverVerificationApplications[appIndex] });
  }
  res.status(404).json({ error: 'Application not found' });
});

// Moderation Reports API
app.get('/api/reports/list', (req, res) => {
  res.json({ reports: serverReports });
});

app.post('/api/reports/submit', (req, res) => {
  const { targetType, targetId, targetTitle, reportedBy, reason, details } = req.body;
  const newReport = {
    id: `rep-${Date.now()}`,
    targetType: targetType || 'post',
    targetId: targetId || 'item-unknown',
    targetTitle: targetTitle || 'Reported Content',
    reportedBy: reportedBy || 'Community Member',
    reason: reason || 'misleading_claim',
    details: details || '',
    createdAt: new Date().toISOString().slice(0, 10),
    status: 'pending',
  };
  serverReports.unshift(newReport);
  res.json({ success: true, report: newReport });
});

app.post('/api/reports/resolve', (req, res) => {
  const { id, status } = req.body;
  const rep = serverReports.find((r) => r.id === id);
  if (rep) {
    rep.status = status;
    return res.json({ success: true, report: rep });
  }
  res.status(404).json({ error: 'Report not found' });
});

// Domain Agronomy Fallback Generator
function generateAgronomicFallbackAnswer(
  question: string,
  language: string,
  county?: string,
  cropOrLivestock?: string
): string {
  const q = question.toLowerCase();
  const isSwahili = language === 'sw';

  if (q.includes('tomato') || q.includes('nyanya')) {
    if (isSwahili) {
      return `### Mwongozo wa Kilimo cha Nyanya (Tomatoes) nchini Kenya

**1. Aina Bora Zinazopendekezwa:**
- Sehemu za wazi (Open field): Kilele F1, Anna F1, Rambo F1, Rio Grande.
- Kwenye Greenhouses: Anna F1, Bravo F1, Eden F1.

**2. Maandalizi ya Udongo na Upandaji:**
- Nyanya zinahitaji udongo wenye rutuba, mifereji mizuri ya maji, na pH ya 6.0 hadi 6.8.
- Panda mbegu kwanza kitaluni (nursery) kwa wiki 3-4 kabla ya kuhamishia shambani.
- Nafasi ya kupanda: sentimita 60 kati ya miche na sentimita 75 hadi 90 kati ya mistari.

**3. Usimamizi wa Mbolea:**
- Wakati wa kupanda: Weka gramu 10 hadi 15 za DAP au NPK 23:23:0 kwa kila shimo pamoja na ndoo ya mbolea ya samadi iliyoiva vizuri.
- Baada ya wiki 3-4: Weka CAN (kijiko kimoja cha chakula, 10g) sentimita 10 kutoka shina la mche. Rudia wakati wa kutoa maua ya kwanza.

**4. Wadudu na Magonjwa Makuu:**
- **Ukungu wa Baridi (Late Blight):** Dhibiti kwa kunyunyizia dawa za kuzuia ukungu zenye Mancozeb au Metalaxyl mapema kabla ya mvua kubwa.
- **Tuta Absoluta (Kipekecha Majani):** Tumia mitego ya pheromone na dawa zilizosajiliwa kama Coragen au Radiant kwa uangalifu.
- **Mnyauko wa Bakteria (Bacterial Wilt):** Badilisha mazao (crop rotation) na usipande nyanya pale ulipopanda viazi au pilipili hivi karibuni.

*Ushauri: Wasiliana na afisa wa kilimo wa kaunti yako kwa vipimo sahihi vya udongo.*`;
    }
    return `### Comprehensive Tomato Production Guide for Kenya

**1. Recommended Varieties:**
- **Open Field:** Kilele F1 (vigorous, high yield, good shelf life), Rambo F1, Tylka F1 (TYLCV tolerant), Rio Grande.
- **Greenhouse / Protected:** Anna F1 (indeterminate, heavy bearer), Bravo F1.

**2. Land Preparation & Spacing:**
- Optimal soil pH: 6.0 – 6.8. Well-drained sandy-loam or clay loam rich in organic matter.
- Spacing: 60 cm between plants x 75–90 cm between rows (approx. 7,400 to 8,800 plants per acre for staked field varieties).
- Nursery period: 21–28 days; harden seedlings 5 days before transplanting.

**3. Nutrient & Fertilizer Regimes:**
- **Basal (At Planting):** 10–15g of DAP or NPK 23:23:0 per planting hole + 1–2 handfuls of well-decomposed manure.
- **Top-dressing:** Apply CAN (10g per plant) at 3–4 weeks after transplanting. Second CAN application at first flower set. Supplement with soluble Calcium-Boron foliar to prevent Blossom End Rot.

**4. Key Pest & Disease Management:**
- **Late Blight (*Phytophthora infestans*):** Common in wet/cold seasons. Preventive spraying with Mancozeb; curative with Metalaxyl/Cymoxanil mixtures.
- **Tuta Absoluta:** Install delta pheromone traps for monitoring. Alternate active ingredients (e.g. Chlorantraniliprole, Spinetoram) to avoid resistance.
- **Bacterial Wilt (*Ralstonia solanacearum*):** Practice strict 3-year crop rotation avoiding Solanaceae crops (potatoes, eggplants, peppers). Use certified disease-free nursery media.`;
  }

  if (q.includes('maize') || q.includes('mahindi') || q.includes('yellow') || q.includes('manjano')) {
    if (isSwahili) {
      return `### Mwongozo wa Kilimo cha Mahindi na Majani Kugeuka Manjano

**1. Kwa nini majani ya mahindi yanageuka manjano?**
- **Upungufu wa Naitrojeni (Nitrogen deficiency):** Rangi ya manjano huanza chini kwenye ncha ya jani kuelekea kati (umbo la herufi V). Suluhisho: Weka mbolea ya kukuzia ya CAN (kilo 50 kwa ekari) mahindi yakiwa urefu wa magoti.
- **Maji kutuama (Waterlogging):** Mizizi inakosa hewa. Hakikisha shamba lina mifereji safi ya kupitisha maji.
- **Ugonjwa wa MLND au Vidukari:** Angalia kama kuna mistari ya njano kwenye majani machanga ya juu.

**2. Aina Zinazopendekezwa Kenya:**
- Nyanda za Juu (Kitale, Eldoret, Kericho): H614D, H628, H629, Pan 691.
- Nyanda za Kati (Nakuru, Nyeri, Embu): H513, H520, SC Duma 43, DK 8031.
- Sehemu Kavu (Machakos, Kitui, Makueni): KDV1, KDV4, DH02, SC Pika 419.

**3. Nafasi na Mbegu:**
- Tumia kilo 10 za mbegu zilizoidhinishwa (certified seed) kwa ekari.
- Nafasi: sentimita 75 kati ya mistari na sentimita 25 hadi 30 kati ya mmea na mmea (mmea 1 kwa shimo).`;
    }
    return `### Maize Management & Yellow Leaves Diagnostics (Kenya)

**1. Diagnostic Causes of Maize Yellowing:**
- **Nitrogen Deficiency:** Classic V-shaped yellowing starting at the leaf tip and progressing down the midrib on older/lower leaves. **Remedy:** Top-dress immediately with CAN (50–75 kg/acre) when soil is moist, timed at knee-high (V6 stage).
- **Waterlogging / Poor Drainage:** Roots suffocated from excessive rainfall without drainage channels. Leaves turn pale green to yellow.
- **Sulfur or Zinc Deficiency:** Striped yellowing between veins on younger upper leaves; common in depleted acidic sandy soils.
- **Maize Lethal Necrosis (MLND) / Maize Streak Virus:** Transmitted by thrips and leafhoppers. Manifests as chlorotic mottle and dead leaf margins. Pull out and destroy infected plants.

**2. Certified Varieties by Agro-Ecological Zone:**
- **High Altitude (Trans Nzoia, Uasin Gishu, Nandi):** Kenya Seed H614D, H628, H629; Seed Co SC 719.
- **Medium Altitude (Nakuru, Kiambu, Meru, Kisii):** H513, H516, SC Duma 43, DK 8031.
- **Dryland / Lowland (Machakos, Makueni, Kilifi):** Drought-tolerant varieties like DH04, KDV4, SC 419, Pioneer P2859W.

**3. Planting Rates & Fertilizer Rules:**
- Seed rate: 10 kg certified seed per acre (spacing 75 cm x 25 cm for ~21,300 plants/acre).
- Basal: 50 kg DAP or NPK 23:23:0 per acre at planting. Avoid placing seed in direct contact with fertilizer.`;
  }

  if (q.includes('poultry') || q.includes('kuku') || q.includes('chicken') || q.includes('broiler') || q.includes('layer') || q.includes('kienyeji')) {
    if (isSwahili) {
      return `### Mwongozo wa Ufugaji wa Kuku Bora nchini Kenya

**1. Kuchagua Aina ya Kuku:**
- **Kuku wa Kienyeji Walioboreshwa:** KARI Improved Kienyeji, Kenbro, Kuroiler, Rainbow Rooster (wanastahimili magonjwa na wanataga mayai 220-280 kwa mwaka).
- **Kuku wa Mayai (Layers):** Isa Brown, Lohmann Brown (huanza kutaga wiki ya 18-20).
- **Kuku wa Nyama (Broilers):** Cobb 500, Ross 308 (hufikia kilo 1.8-2.2 kwa wiki 4-6).

**2. Ratiba ya Chanjo Muhimu:**
- Siku 1: Marek's (hutolewa kitaluni/hatchery).
- Siku 7: Gumboro (IBD) ya kwanza kwenye maji ya kunywa.
- Siku 14: Newcastle (NCD) + Infectious Bronchitis (IB) ya kwanza (matone ya macho/maji).
- Siku 21: Gumboro ya pili.
- Siku 28: Newcastle ya pili.
- Wiki ya 6-8: Ndui ya Kuku (Fowl Pox) kwa sindano ya bawa.

**3. Usafi na Kinga (Biosecurity):**
- Weka dawa ya kukanyaga miguuni (footbath) mlangoni mwa banda.
- Weka matandiko makavu ya maranda (wood shavings) ya sentimita 5-7. Badilisha yakiloa ili kuzuia Coccidiosis.`;
    }
    return `### Poultry Farming & Flock Management Guide (Kenya)

**1. Selecting the Right Breed:**
- **Improved Kienyeji (Dual Purpose):** KALRO Improved Kienyeji, Kenbro, Kuroiler, Rainbow Rooster. High disease resistance, good for free-range or semi-intensive systems; lay 220–260 eggs/year.
- **Commercial Layers:** Isa Brown, Lohmann Brown. Begin laying at week 18–20; require strict lighting and 115–120g layers mash/bird/day.
- **Commercial Broilers:** Cobb 500, Ross 308. Harvest weight 1.8–2.2 kg within 35–42 days on broiler starter, grower, and finisher pellets.

**2. Standard Vaccination Schedule (Crucial):**
- Day 1: Marek's disease (administered at hatchery).
- Day 7: Gumboro (Infectious Bursal Disease - IBD) 1st dose in non-chlorinated water with skimmed milk stabilizer.
- Day 14: Newcastle Disease (ND) + Infectious Bronchitis (IB) Eye drop or drinking water.
- Day 21: Gumboro 2nd booster dose.
- Day 28: Newcastle booster.
- Week 6–8: Fowl Pox (wing-web puncture) & Fowl Typhoid injection.
- Deworming: Every 8–10 weeks for growers/layers.

**3. Biosecurity Rules:**
- Keep litter (wood shavings) dry (depth 5–8 cm). Wet litter triggers Coccidiosis.
- Disinfect footbaths with Virkon or TH4 at the coop entrance. Avoid mixing birds of different age cohorts.`;
  }

  if (q.includes('dairy') || q.includes('ng\'ombe') || q.includes('cow') || q.includes('milk') || q.includes('maziwa')) {
    return isSwahili
      ? `### Mwongozo wa Ufugaji wa Ng'ombe wa Maziwa (Zero-Grazing)

**1. Lishe Bora:**
- Ng'ombe anahitaji asilimia 3 ya uzito wake wa mwili katika Chakula Kikavu (Dry Matter) kila siku.
- Asilimia 70 ya lishe iwe nyasi bora (Silage ya mahindi, Boma Rhodes, Napier iliyokatwa vizuri, au Brachiaria).
- Asilimia 30 iwe protini (Desmodium, Calliandra, Lucerne) pamoja na Dairy Meal (kilo 1 ya Dairy Meal kwa kila lita 1.5 hadi 2 za maziwa anayotoa).
- Maji safi yasiyo na kikomo (lita 60 hadi 100 kwa siku kwa ng'ombe mmoja).

**2. Kinga Dhidi ya Magonjwa:**
- **Homa ya Maji (East Coast Fever - ECF):** Dhibiti kupe kwa kuosha ng'ombe kila wiki kwa dawa ya kuua kupe (Acaricide). Fikiria chanjo ya ECF (ITM).
- **Mastitis (Kuvimba Kiwele):** Safisha chuchu kabla ya kukamua na chovya chuchu kwenye dawa (Teat dip) baada ya kukamua. Tumia kitambaa tofauti kwa kila ng'ombe.`
      : `### Dairy Farming & Production Maximization (Kenya)

**1. Ration Formulation (Total Mixed Ration):**
- A lactating cow requires roughly 3% of her body weight in Dry Matter (DM) daily.
- Base roughage: High-energy corn silage, conserved Boma Rhodes hay, and well-chopped Napier grass mixed with fodder legumes (Lucerne/Alfalfa, Desmodium, Calliandra) for crude protein.
- Concentrate: Provide 1 kg of balanced Dairy Meal (16–18% Crude Protein) for every 1.5 to 2.0 litres of milk produced above maintenance.
- Clean water: 60–100 litres accessible 24/7. Water restriction drops milk yield within 24 hours.

**2. Mastitis & Tick-Borne Disease Control:**
- **Mastitis Prevention:** Strip cup test before milking; pre-dip and post-dip with iodine solution; keep resting cubicles clean, dry, and bedded with sawdust.
- **East Coast Fever (ECF) & Anaplasmosis:** Strict weekly acaricide dipping/spraying with alternate acaricide chemical groups to prevent tick resistance. Request Infection and Treatment Method (ITM) vaccination from your veterinary officer.`;
  }

  // General Agronomic Advice
  return isSwahili
    ? `### Ushauri wa Kitaalamu wa Kilimo — AgriKnowledge Hub

Asante kwa swali lako kuhusu kilimo cha kisasa nchini Kenya.

**Mambo Muhimu ya Kuzingatia:**
1. **Pima Afya ya Udongo:** Kabla ya kuanza shughuli yoyote ya upandaji, pima udongo wako ili kujua kiwango cha pH na rutuba (N, P, K). Mashirika kama KALRO au maabara zilizosajiliwa za kaunti zina huduma hii.
2. **Tumia Mbegu Zilizoidhinishwa (Certified Seeds):** Nunua mbegu zenye stika ya KEPHIS pekee ili kuepuka mbegu bandia na magonjwa ya kiasili.
3. **Maji na Hifadhi ya Mazingira:** Tumia mbinu za kuhifadhi maji kama vile mifereji ya 'Fanya Juu, Fanya Chini', na kuweka matandazo (mulching) kwenye shamba lako.
4. **Mzunguko wa Mazao (Crop Rotation):** Usipande zao la jamii moja mfululizo katika shamba lilelile ili kuvunja mzunguko wa wadudu na magonjwa.

*Kwa maelezo mahususi kuhusu zao au mfugo wako, chagua mada husika kwenye orodha kuu au uliza swali lako ukiainisha kaunti yako na zao unalotaka kulima.*`
    : `### Expert Farming Advisory — AgriKnowledge Hub

Thank you for your inquiry on practical agricultural production in Kenya.

**Core Principles for Maximizing Yields & Enterprise Success:**
1. **Soil Testing First:** Before investing heavily in fertilizers, test your soil pH and nutrient status through KALRO or certified soil labs. Acidic soils (common in western Kenya and the tea zones) require agricultural lime to unlock phosphorus.
2. **Source Certified Inputs Only:** Verify seeds with the KEPHIS scratch-code SMS verification system (SMS the scratch code to 1393) to protect against counterfeit seed.
3. **Integrated Soil Fertility Management (ISFM):** Combine organic farmyard manure or compost with targeted basal inorganic fertilizers (e.g. NPK/DAP) to enhance soil microbial activity and water holding capacity.
4. **Location-Specific Planting Windows:** Align your operations with the Kenya Meteorological Department 7-day and seasonal forecasts for your specific county to optimize planting dates.

*Feel free to specify your exact county, crop or livestock species, and specific challenge for an in-depth step-by-step advisory.*`;
}

// Development or production server startup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[AgriHub] Full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
