import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import CalculatorCard from '../components/CalculatorCard'
import AdSlot from '../components/AdSlot'
import { calculateSIP } from '../calculators/sip'
import { formatShort } from '../utils/format'

// ─── Data ─────────────────────────────────────────────────────────────────────

const CALCULATORS = [
  { icon: '📈', title: 'SIP Calculator', description: 'Calculate wealth from monthly SIP investments with compounding returns.', path: '/sip-calculator', category: 'Investment', tag: 'Popular' },
  { icon: '🏠', title: 'EMI Calculator', description: 'Know your monthly EMI for home loan, car loan, or personal loan.', path: '/emi-calculator', category: 'Loans', tag: 'Popular' },
  { icon: '💼', title: 'Income Tax Calculator', description: 'Compare Old vs New tax regime and find which saves you more.', path: '/income-tax-calculator', category: 'Tax & Salary', tag: 'FY 2024-25' },
  { icon: '🎁', title: 'Gratuity Calculator', description: 'Calculate your gratuity amount and taxable portion instantly.', path: '/gratuity-calculator', category: 'Tax & Salary' },
  { icon: '💰', title: 'Salary Hike Calculator', description: 'See your new in-hand salary after appraisal hike and deductions.', path: '/salary-hike-calculator', category: 'Tax & Salary' },
  { icon: '🏡', title: 'Home Loan Eligibility', description: 'Find out the maximum home loan you are eligible for based on income.', path: '/home-loan-eligibility-calculator', category: 'Loans', tag: 'High Intent' },
  { icon: '🏦', title: 'FD Calculator', description: 'Calculate fixed deposit maturity amount with quarterly compounding.', path: '/fd-calculator', category: 'Investment' },
  { icon: '📊', title: 'PPF Calculator', description: 'Estimate your Public Provident Fund corpus over 15+ years.', path: '/ppf-calculator', category: 'Retirement', tag: 'Tax-Free' },
]

const CATEGORIES = ['All', 'Investment', 'Loans', 'Tax & Salary', 'Retirement']

const TRUST_STATS = [
  { value: '8+', label: 'Free Calculators' },
  { value: '100%', label: 'Accurate Results' },
  { value: 'AI', label: 'Powered Insights' },
  { value: '0', label: 'Sign-up Needed' },
]

const HOW_IT_WORKS = [
  { step: '01', icon: '🔢', title: 'Pick a Calculator', desc: 'Choose from 8 free calculators covering SIP, EMI, taxes, home loans, and retirement planning.' },
  { step: '02', icon: '📊', title: 'Enter Your Numbers', desc: 'Use sliders or type directly. Results and charts update instantly as you change values.' },
  { step: '03', icon: '🤖', title: 'Get AI Insights', desc: 'Ask our Claude-powered AI advisor any follow-up question about your specific financial situation.' },
]

const FEATURES = [
  { icon: '💸', title: '100% Free, Forever', desc: 'Every calculator, every feature, zero cost. No registration, no credit card, no hidden fees.' },
  { icon: '✅', title: 'Accurate Formulas', desc: 'All calculations follow RBI guidelines and Income Tax Act provisions, reviewed for correctness.' },
  { icon: '📈', title: 'Visual Charts', desc: 'See your money grow with interactive bar, line, area and pie charts — switch between them instantly.' },
  { icon: '🤖', title: 'AI Financial Advisor', desc: 'Powered by Claude AI. Ask anything about your results in plain English and get expert guidance.' },
]

const TESTIMONIALS = [
  {
    quote: 'Used the SIP calculator to plan my ₹1 Crore goal. The AI told me I need ₹18,000/month SIP for 15 years at 12% returns. I set it up the same evening on Groww.',
    name: 'Rahul Sharma',
    role: 'Software Engineer, Bangalore',
    initials: 'RS',
    color: 'bg-emerald-600',
  },
  {
    quote: 'Finally understood the difference between old and new tax regime. Saved ₹42,000 in taxes this year by switching. I recommended this site to my entire team.',
    name: 'Priya Mehta',
    role: 'HR Manager, Mumbai',
    initials: 'PM',
    color: 'bg-teal-600',
  },
  {
    quote: 'The home loan eligibility calculator was spot on — the bank approved almost exactly what it predicted. Wish I had found this before I applied last year.',
    name: 'Amit Joshi',
    role: 'School Teacher, Pune',
    initials: 'AJ',
    color: 'bg-cyan-700',
  },
]

// ─── Mini SIP Calculator (Hero) ───────────────────────────────────────────────

function MiniSlider({ label, value, onChange, min, max, step, prefix = '', suffix = '' }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-500">{label}</span>
        <span className="text-xs font-bold text-emerald-700">{prefix}{value.toLocaleString('en-IN')}{suffix}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-emerald-600 h-1.5 cursor-pointer"
      />
    </div>
  )
}

function HeroCalculator() {
  const [monthly, setMonthly] = useState(10000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)

  const result = useMemo(() => calculateSIP({ monthlyAmount: monthly, annualReturn: rate, years }), [monthly, rate, years])

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-auto lg:mx-0">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">SIP Calculator</p>
        <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Live</span>
      </div>

      <div className="text-center py-3 mb-5 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
        <p className="text-4xl font-extrabold text-gray-900">{formatShort(result.corpus)}</p>
        <p className="text-xs text-gray-400 mt-1">estimated corpus</p>
      </div>

      <div className="space-y-4 mb-5">
        <MiniSlider label="Monthly SIP" value={monthly} onChange={setMonthly} min={1000} max={50000} step={500} prefix="₹" />
        <MiniSlider label="Annual Return" value={rate} onChange={setRate} min={8} max={20} step={0.5} suffix="%" />
        <MiniSlider label="Time Period" value={years} onChange={setYears} min={1} max={30} suffix=" yr" />
      </div>

      <div className="grid grid-cols-2 gap-2 mb-5">
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-400">Invested</p>
          <p className="font-bold text-gray-900 text-sm mt-0.5">{formatShort(result.invested)}</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-400">Gains</p>
          <p className="font-bold text-emerald-600 text-sm mt-0.5">{formatShort(result.gains)}</p>
        </div>
      </div>

      <Link to="/sip-calculator" className="btn-primary block w-full text-center text-sm">
        Full Calculator with Charts →
      </Link>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Home() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = CALCULATORS.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
    const matchCategory = activeCategory === 'All' || c.category === activeCategory
    return matchSearch && matchCategory
  })

  return (
    <>
      <Helmet>
        <title>FinCalcAI – India's Smartest Financial Calculators</title>
        <meta name="description" content="Free online financial calculators for India. SIP, EMI, Income Tax, Gratuity, FD, PPF and more. AI-powered insights in seconds." />
        <meta name="keywords" content="SIP calculator, EMI calculator, income tax calculator India, FD calculator, PPF calculator, gratuity calculator" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'FinCalcAI',
          url: 'https://calcai.in',
          description: 'Free financial calculators for India powered by AI',
          potentialAction: { '@type': 'SearchAction', target: 'https://calcai.in/?search={search_term_string}', 'query-input': 'required name=search_term_string' },
        })}</script>
      </Helmet>

      {/* ── 1. HERO ── */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left — copy */}
            <div>
              <span className="inline-block bg-white/10 border border-white/20 text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                🇮🇳 Made for India · 100% Free
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-5">
                India's Smartest<br />
                <span className="text-emerald-300">Financial Calculators</span>
              </h1>
              <p className="text-emerald-100 text-lg leading-relaxed mb-8 max-w-lg">
                Plan your SIP, EMI, taxes, and retirement in seconds. Powered by AI, trusted by thousands of Indians every month.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#calculators" className="btn-primary text-base px-8 py-3">
                  Start Calculating →
                </a>
                <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-colors text-sm font-medium">
                  Read Financial Guides
                </Link>
              </div>

              {/* Mini trust row */}
              <div className="flex flex-wrap gap-5 mt-10">
                {['✓ No sign-up', '✓ Instant results', '✓ AI-powered', '✓ Mobile friendly'].map(t => (
                  <span key={t} className="text-emerald-300 text-sm font-medium">{t}</span>
                ))}
              </div>
            </div>

            {/* Right — live mini calculator */}
            <div className="flex justify-center lg:justify-end">
              <HeroCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST STRIP ── */}
      <section className="bg-emerald-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-emerald-600">
            {TRUST_STATS.map(({ value, label }) => (
              <div key={label} className="text-center px-4 py-2">
                <p className="text-2xl font-extrabold text-white">{value}</p>
                <p className="text-xs text-emerald-200 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. HOW IT WORKS ── */}
      <section className="bg-white py-16 px-4">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">Simple Process</p>
            <h2 className="text-3xl font-extrabold text-gray-900">How It Works</h2>
            <p className="mt-2 text-gray-500 max-w-lg mx-auto">From question to answer in under 30 seconds — no sign-up, no waiting.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="relative text-center">
                {/* connector line */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full border-t-2 border-dashed border-emerald-200" />
                )}
                <div className="relative z-10 inline-flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center text-3xl mb-4">
                    {step.icon}
                  </div>
                  <span className="text-xs font-bold text-emerald-500 mb-1">{step.step}</span>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CALCULATOR GRID ── */}
      <section id="calculators" className="bg-gray-50 py-12 px-4">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <AdSlot position="top" />

          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">All Tools</p>
            <h2 className="text-3xl font-extrabold text-gray-900">Free Calculators</h2>
          </div>

          {/* Search */}
          <div className="relative max-w-md mx-auto mb-6">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search calculators..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-xl bg-white border border-gray-200 pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400 shadow-sm"
            />
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap justify-center mb-8">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-16">No calculators match "{search}"</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filtered.map(calc => (
                <CalculatorCard key={calc.path} {...calc} />
              ))}
            </div>
          )}

          <AdSlot position="between-results" />
        </div>
      </section>

      {/* ── 5. WHY FINCALCAI ── */}
      <section className="bg-white py-16 px-4">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">Why Us</p>
            <h2 className="text-3xl font-extrabold text-gray-900">Everything You Need to Plan Your Finances</h2>
            <p className="mt-2 text-gray-500 max-w-xl mx-auto">Built specifically for India — Indian number formats, Indian tax laws, Indian financial products.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(f => (
              <div key={f.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 hover:border-emerald-200 hover:bg-emerald-50 transition-all">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS ── */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">What People Say</p>
            <h2 className="text-3xl font-extrabold text-gray-900">Trusted by Indians Across the Country</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
                  <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. BOTTOM CTA ── */}
      <section className="bg-gradient-to-r from-emerald-700 to-teal-700 py-14 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Start Planning Your Financial Future Today
          </h2>
          <p className="text-emerald-100 text-lg mb-8">
            Free forever. No account needed. Results in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#calculators"
              className="inline-block bg-white text-emerald-700 font-bold px-8 py-3.5 rounded-xl hover:bg-emerald-50 transition-colors text-base shadow-lg"
            >
              Browse All Calculators →
            </a>
            <Link
              to="/blog"
              className="inline-block border border-white/40 text-white font-medium px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-base"
            >
              Read Financial Guides
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
