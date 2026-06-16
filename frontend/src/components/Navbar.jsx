import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const CALCULATORS = [
  { icon: '📈', label: 'SIP Calculator', path: '/sip-calculator', cat: 'Investment' },
  { icon: '🏦', label: 'FD Calculator', path: '/fd-calculator', cat: 'Investment' },
  { icon: '📊', label: 'PPF Calculator', path: '/ppf-calculator', cat: 'Retirement' },
  { icon: '🏠', label: 'EMI Calculator', path: '/emi-calculator', cat: 'Loans' },
  { icon: '🏡', label: 'Home Loan Eligibility', path: '/home-loan-eligibility-calculator', cat: 'Loans' },
  { icon: '💼', label: 'Income Tax', path: '/income-tax-calculator', cat: 'Tax & Salary' },
  { icon: '💰', label: 'Salary Hike', path: '/salary-hike-calculator', cat: 'Tax & Salary' },
  { icon: '🎁', label: 'Gratuity', path: '/gratuity-calculator', cat: 'Tax & Salary' },
]

function CalcDropdown({ onClose }) {
  const groups = ['Investment', 'Loans', 'Tax & Salary', 'Retirement']
  return (
    <div className="absolute top-full left-0 mt-1 w-[520px] bg-white rounded-2xl border border-gray-100 shadow-xl p-4 grid grid-cols-2 gap-1 z-50">
      {groups.map(group => (
        <div key={group}>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 mb-1">{group}</p>
          {CALCULATORS.filter(c => c.cat === group).map(c => (
            <Link
              key={c.path}
              to={c.path}
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 text-sm text-gray-700 transition-colors"
            >
              <span className="text-base w-5 text-center">{c.icon}</span>
              {c.label}
            </Link>
          ))}
        </div>
      ))}
      <div className="col-span-2 mt-2 pt-2 border-t border-gray-100">
        <a
          href="/#calculators"
          onClick={onClose}
          className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-800 py-1"
        >
          View all calculators on Home →
        </a>
      </div>
    </div>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [calcOpen, setCalcOpen] = useState(false)
  const { pathname } = useLocation()
  const dropdownRef = useRef(null)

  const isCalcPage = pathname !== '/' && pathname !== '/blog' && pathname !== '/pricing'
    && !pathname.startsWith('/blog/') && !pathname.startsWith('/api-docs')

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCalcOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close on route change
  useEffect(() => {
    setCalcOpen(false)
    setMenuOpen(false)
  }, [pathname])

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-6">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold text-base shadow-sm group-hover:bg-emerald-700 transition-colors">
              ₹
            </div>
            <div>
              <span className="text-xl font-extrabold text-emerald-700 leading-none">FinCalcAI</span>
              <p className="text-[10px] text-gray-400 leading-none mt-0.5 hidden sm:block">India's Financial Calculator</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 flex-1">

            {/* Home */}
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${pathname === '/' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'}`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>

            {/* Calculators dropdown trigger */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCalcOpen(o => !o)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${isCalcPage || calcOpen ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'}`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Calculators
                <svg className={`w-3 h-3 transition-transform ${calcOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {calcOpen && <CalcDropdown onClose={() => setCalcOpen(false)} />}
            </div>

            {/* Blog */}
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${isActive ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'}`
              }
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Blog
            </NavLink>

            {/* Pricing */}
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'}`
              }
            >
              Pricing
            </NavLink>
          </div>

          <div className="hidden md:flex items-center gap-3 ml-auto">
            {/* Back pill on calc pages — desktop */}
            {isCalcPage && (
              <Link
                to="/"
                className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-emerald-600 border border-gray-200 hover:border-emerald-300 rounded-full px-3 py-1.5 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Home
              </Link>
            )}
            <Link to="/pricing" className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              Get API Access
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden ml-auto p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile expanded menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            <Link to="/" onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700">
              🏠 Home
            </Link>

            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 pt-2">Calculators</p>
            {CALCULATORS.map(c => (
              <Link key={c.path} to={c.path} onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700">
                <span>{c.icon}</span> {c.label}
              </Link>
            ))}

            <div className="border-t border-gray-100 pt-2 space-y-1">
              <NavLink to="/blog" onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700">
                📖 Blog
              </NavLink>
              <NavLink to="/pricing" onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700">
                💰 Pricing
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
