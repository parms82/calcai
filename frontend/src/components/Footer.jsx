import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-xs">₹</span>
              <span className="text-lg font-bold text-white">FinCalcAI</span>
            </div>
            <p className="text-xs leading-relaxed">India's smartest financial calculators. Free, accurate, and AI-powered.</p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Calculators</h4>
            <ul className="space-y-1 text-xs">
              {[
                ['SIP Calculator', '/sip-calculator'],
                ['EMI Calculator', '/emi-calculator'],
                ['Income Tax', '/income-tax-calculator'],
                ['FD Calculator', '/fd-calculator'],
                ['PPF Calculator', '/ppf-calculator'],
              ].map(([label, to]) => (
                <li key={to}><Link to={to} className="hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">More Tools</h4>
            <ul className="space-y-1 text-xs">
              {[
                ['Gratuity Calculator', '/gratuity-calculator'],
                ['Salary Hike', '/salary-hike-calculator'],
                ['Home Loan Check', '/home-loan-eligibility-calculator'],
              ].map(([label, to]) => (
                <li key={to}><Link to={to} className="hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-1 text-xs">
              {[
                ['Pricing', '/pricing'],
                ['Blog', '/blog'],
                ['API Docs', '/api-docs'],
              ].map(([label, to]) => (
                <li key={to}><Link to={to} className="hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-6 text-xs text-center">
          <p>Disclaimer: Calculations are for informational purposes only. Consult a certified financial advisor before making investment decisions.</p>
          <p className="mt-2">© {new Date().getFullYear()} FinCalcAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
