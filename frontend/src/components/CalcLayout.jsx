import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import AdSlot from './AdSlot'
import AIAssistant from './AIAssistant'
import AffiliateCard from './AffiliateCard'
import Breadcrumb from './Breadcrumb'
import FAQSection from './FAQSection'

export default function CalcLayout({ title, subtitle, children, result, affiliatePartner, calcType, aiHint, pageUrl, description, faqs }) {
  const schema = pageUrl ? {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${title} | FinCalcAI`,
    url: `https://calcai.in${pageUrl}`,
    description: description || subtitle || `Free ${title} for India`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  } : null

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
      {schema && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
      )}

      {/* Back link — visible on all screen sizes */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-full px-3 py-1.5 mb-4 transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        All Calculators
      </Link>

      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: title }]} />

      <AdSlot position="top" />

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="mt-1 text-gray-500 text-sm">{subtitle}</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
          {children}
        </div>
        <div className="lg:col-span-3 space-y-5">
          {result}
        </div>
      </div>

      {affiliatePartner && <AffiliateCard partner={affiliatePartner} calculator={calcType} />}
      <AIAssistant calcType={calcType} hint={aiHint} />
      {faqs?.length > 0 && <FAQSection faqs={faqs} />}
    </div>
  )
}
