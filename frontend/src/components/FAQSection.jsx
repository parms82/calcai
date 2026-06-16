import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

export default function FAQSection({ faqs }) {
  const [open, setOpen] = useState(null)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                className={`rounded-xl border transition-colors ${isOpen ? 'border-emerald-200 bg-emerald-50' : 'border-gray-100 bg-white'}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
                  aria-expanded={isOpen}
                >
                  <span className={`text-sm font-semibold ${isOpen ? 'text-emerald-800' : 'text-gray-800'}`}>
                    {faq.q}
                  </span>
                  <span className={`shrink-0 flex items-center justify-center w-6 h-6 rounded-full border transition-all ${isOpen ? 'bg-emerald-600 border-emerald-600 text-white rotate-45' : 'border-gray-300 text-gray-400'}`}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16M4 12h16" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-emerald-100">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
