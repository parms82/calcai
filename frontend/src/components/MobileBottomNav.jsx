import { NavLink, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  {
    label: 'Home',
    path: '/',
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? 'text-emerald-600' : 'text-gray-400'}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: 'Calculate',
    path: '/#calculators',
    matchPath: '/',
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? 'text-emerald-600' : 'text-gray-400'}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Blog',
    path: '/blog',
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? 'text-emerald-600' : 'text-gray-400'}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    label: 'Pricing',
    path: '/pricing',
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? 'text-emerald-600' : 'text-gray-400'}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
]

export default function MobileBottomNav() {
  const { pathname } = useLocation()
  const isCalcPage = pathname !== '/' && pathname !== '/blog' && pathname !== '/pricing' && !pathname.startsWith('/blog/')

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="grid grid-cols-4">
        {NAV_ITEMS.map(item => {
          const isActive = item.path === '/'
            ? pathname === '/'
            : pathname.startsWith(item.matchPath || item.path)

          return (
            <a
              key={item.path}
              href={item.path}
              className="flex flex-col items-center justify-center py-2.5 gap-0.5"
            >
              {item.icon(isActive)}
              <span className={`text-[10px] font-medium ${isActive ? 'text-emerald-600' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </a>
          )
        })}
      </div>

      {/* Calculator page back pill — floats above bottom nav */}
      {isCalcPage && (
        <div className="absolute -top-14 left-1/2 -translate-x-1/2">
          <a
            href="/"
            className="flex items-center gap-1.5 bg-white border border-gray-200 shadow-md rounded-full px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:border-emerald-300 transition-colors whitespace-nowrap"
          >
            <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            All Calculators
          </a>
        </div>
      )}
    </nav>
  )
}
