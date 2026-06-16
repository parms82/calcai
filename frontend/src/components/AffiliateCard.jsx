const PARTNERS = {
  groww: {
    name: 'Groww',
    logo: '🌱',
    tagline: 'Start investing in mutual funds',
    cta: 'Open Free Account',
    color: 'from-green-50 to-emerald-50 border-green-200',
    btnColor: 'bg-green-600 hover:bg-green-700',
    url: 'https://groww.in',
  },
  hdfc: {
    name: 'HDFC Bank',
    logo: '🏦',
    tagline: 'Apply for home loan at lowest rates',
    cta: 'Apply for Loan',
    color: 'from-blue-50 to-sky-50 border-blue-200',
    btnColor: 'bg-blue-700 hover:bg-blue-800',
    url: 'https://www.hdfcbank.com',
  },
  cleartax: {
    name: 'ClearTax',
    logo: '📋',
    tagline: 'File your ITR for free in minutes',
    cta: 'File ITR Free',
    color: 'from-orange-50 to-amber-50 border-orange-200',
    btnColor: 'bg-orange-600 hover:bg-orange-700',
    url: 'https://cleartax.in',
  },
  policybazaar: {
    name: 'PolicyBazaar',
    logo: '🛡️',
    tagline: 'Compare and buy insurance plans',
    cta: 'Compare Plans',
    color: 'from-purple-50 to-violet-50 border-purple-200',
    btnColor: 'bg-purple-700 hover:bg-purple-800',
    url: 'https://www.policybazaar.com',
  },
}

export default function AffiliateCard({ partner, calculator }) {
  const p = PARTNERS[partner]
  if (!p) return null

  function handleClick() {
    fetch('/api/affiliates/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ partner, calculator }),
    }).catch(() => {})
    window.open(p.url, '_blank', 'noopener')
  }

  return (
    <div className={`mt-6 rounded-2xl border bg-gradient-to-r ${p.color} p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4`}>
      <div className="flex items-center gap-3">
        <span className="text-3xl">{p.logo}</span>
        <div>
          <p className="font-semibold text-gray-800">{p.name}</p>
          <p className="text-sm text-gray-600">{p.tagline}</p>
        </div>
      </div>
      <button
        onClick={handleClick}
        className={`w-full sm:w-auto rounded-lg px-4 py-3 sm:py-2 text-sm font-semibold text-white transition-colors ${p.btnColor}`}
      >
        {p.cta} →
      </button>
    </div>
  )
}
