import { Helmet } from 'react-helmet-async'

const TIERS = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    description: 'Perfect for personal use',
    features: [
      '8 calculators',
      '1,000 uses/month',
      'FinCalcAI branding',
      'Basic AI questions (5/day)',
    ],
    cta: 'Get Started Free',
    href: '/',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '₹999',
    period: '/month',
    description: 'For businesses and advisors',
    features: [
      'All calculators',
      'Unlimited uses',
      'Custom branding',
      'Lead capture forms',
      'REST API access',
      'Usage analytics',
      'Unlimited AI questions',
      'Priority support',
    ],
    cta: 'Start Pro Trial',
    href: 'mailto:hello@calcai.in?subject=Pro Plan',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: '₹4,999',
    period: '/month',
    description: 'For banks and fintechs',
    features: [
      'Everything in Pro',
      'White-label solution',
      'Custom calculators',
      'AI chat widget',
      'SLA guarantee',
      'Dedicated support',
      'On-premise option',
    ],
    cta: 'Contact Sales',
    href: 'mailto:hello@calcai.in?subject=Enterprise Plan',
    highlight: false,
  },
]

export default function Pricing() {
  return (
    <>
      <Helmet>
        <title>Pricing – FinCalcAI API & Embed Plans</title>
        <meta name="description" content="Embed FinCalcAI calculators on your website. Choose from Free, Pro (₹999/mo) or Enterprise (₹4999/mo) plans." />
      </Helmet>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900">Simple, Transparent Pricing</h1>
          <p className="mt-3 text-lg text-gray-500">Embed financial calculators on your site in minutes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map(tier => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border p-7 flex flex-col ${
                tier.highlight
                  ? 'border-emerald-500 bg-emerald-600 text-white shadow-xl shadow-emerald-200'
                  : 'border-gray-200 bg-white text-gray-900'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div>
                <h2 className={`text-lg font-bold ${tier.highlight ? 'text-white' : 'text-gray-900'}`}>{tier.name}</h2>
                <div className="mt-2 flex items-end gap-1">
                  <span className="text-4xl font-extrabold">{tier.price}</span>
                  <span className={`text-sm mb-1 ${tier.highlight ? 'text-emerald-200' : 'text-gray-400'}`}>{tier.period}</span>
                </div>
                <p className={`text-sm mt-1 ${tier.highlight ? 'text-emerald-200' : 'text-gray-500'}`}>{tier.description}</p>
              </div>

              <ul className="mt-6 space-y-2 flex-1">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg className={`h-4 w-4 mt-0.5 shrink-0 ${tier.highlight ? 'text-emerald-200' : 'text-emerald-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={tier.href}
                className={`mt-8 block text-center rounded-xl px-6 py-3 text-sm font-semibold transition-colors ${
                  tier.highlight
                    ? 'bg-white text-emerald-700 hover:bg-emerald-50'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
