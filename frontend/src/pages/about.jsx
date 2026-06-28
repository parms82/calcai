import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'

const VALUES = [
  {
    icon: '🎯',
    title: 'Accuracy First',
    desc: 'Every formula follows RBI guidelines and the Income Tax Act. We cross-verify calculations against official government sources and leading financial institutions.',
  },
  {
    icon: '🆓',
    title: 'Free Forever',
    desc: 'All calculators are free, with no registration, no credit card, and no hidden charges. We believe financial knowledge should be accessible to every Indian.',
  },
  {
    icon: '🇮🇳',
    title: 'Built for India',
    desc: 'Indian number formats, Indian tax laws, Indian financial products — FD, PPF, ELSS, HRA, gratuity. We do not adapt a Western tool; we build for India from the ground up.',
  },
  {
    icon: '🤖',
    title: 'AI-Powered Guidance',
    desc: 'Our Claude AI assistant does not just calculate — it explains, advises, and answers follow-up questions in plain English so you genuinely understand your finances.',
  },
]

const TOOLS = [
  { name: 'SIP Calculator', path: '/sip-calculator', desc: 'Plan your mutual fund wealth' },
  { name: 'EMI Calculator', path: '/emi-calculator', desc: 'Know your monthly loan repayment' },
  { name: 'Income Tax Calculator', path: '/income-tax-calculator', desc: 'Compare old vs new regime' },
  { name: 'Home Loan Eligibility', path: '/home-loan-eligibility-calculator', desc: 'How much loan can you get' },
  { name: 'FD Calculator', path: '/fd-calculator', desc: 'Fixed deposit maturity amount' },
  { name: 'PPF Calculator', path: '/ppf-calculator', desc: 'Long-term tax-free savings' },
  { name: 'Gratuity Calculator', path: '/gratuity-calculator', desc: 'Your gratuity entitlement' },
  { name: 'Salary Hike Calculator', path: '/salary-hike-calculator', desc: 'New in-hand pay after appraisal' },
]

export default function About() {
  return (
    <>
      <Helmet>
        <title>About FinCalcAI – India's Free Financial Calculator Platform</title>
        <meta
          name="description"
          content="Learn about FinCalcAI — why we built India's most accurate financial calculators, our mission to democratise financial planning, and the team behind the tools."
        />
        <link rel="canonical" href="https://calcai.in/about" />
      </Helmet>

      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-800 text-white py-12 px-4">
        <div className="mx-auto max-w-4xl">
          <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'About Us' }]} />
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-3">About FinCalcAI</h1>
          <p className="mt-3 text-emerald-200 text-lg max-w-2xl leading-relaxed">
            We built FinCalcAI because most Indians make critical financial decisions — taking a home
            loan, choosing a tax regime, starting SIPs — without access to accurate, easy-to-use tools
            that actually explain what the numbers mean.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* Mission */}
        <section>
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">Our Mission</p>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-5">
            Democratise Financial Planning for Every Indian
          </h2>
          <div className="text-gray-700 space-y-4 leading-relaxed">
            <p>
              India has over 500 million working-age adults. Most of them navigate complex financial
              decisions — EMIs, tax regimes, SIP amounts, retirement planning — with inadequate tools
              or expensive advisors. The result? Missed deductions, wrong loan choices, and
              under-invested savings.
            </p>
            <p>
              FinCalcAI was created to change this. We offer a suite of free, accurate financial
              calculators built specifically for India — covering investments, loans, taxes, and
              retirement planning. Every calculator shows not just the answer, but the breakdown,
              the chart, and the &ldquo;why&rdquo; behind the numbers.
            </p>
            <p>
              We also integrate an AI assistant powered by Claude (Anthropic) that lets you ask
              follow-up questions in plain English — &ldquo;Should I choose the old or new tax regime?&rdquo;,
              &ldquo;How much SIP do I need for ₹1 Crore?&rdquo; — and get thoughtful, personalised guidance
              rather than a generic formula.
            </p>
          </div>
        </section>

        {/* Values */}
        <section>
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">What We Stand For</p>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Our Principles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map(v => (
              <div key={v.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 hover:border-emerald-200 hover:bg-emerald-50 transition-all">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tools */}
        <section>
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">What We Offer</p>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Our Free Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TOOLS.map(t => (
              <Link
                key={t.path}
                to={t.path}
                className="group flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-4 hover:border-emerald-200 hover:shadow-sm transition-all"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
                </div>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h3 className="font-bold text-amber-900 mb-2">Important Disclaimer</h3>
          <p className="text-sm text-amber-800 leading-relaxed">
            All calculations on FinCalcAI are for informational and educational purposes only. They
            are not intended as financial, tax, or investment advice. Results are estimates based on
            the inputs you provide and standard financial formulas. Actual returns, tax liabilities,
            and loan eligibility may vary based on individual circumstances, lender policies, and
            prevailing regulations. Always consult a certified financial advisor (CFP), chartered
            accountant, or registered investment advisor before making any financial decision.
          </p>
        </section>

        {/* Contact CTA */}
        <section className="text-center bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-8">
          <h2 className="text-xl font-extrabold text-gray-900 mb-3">Have a Question or Suggestion?</h2>
          <p className="text-gray-600 mb-5 text-sm">
            We read every message. Whether it is a bug report, a new calculator request, or just
            feedback — we would love to hear from you.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-emerald-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Contact Us →
          </Link>
        </section>
      </div>
    </>
  )
}
