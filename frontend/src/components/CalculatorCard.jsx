import { Link } from 'react-router-dom'

export default function CalculatorCard({ icon, title, description, path, category, tag }) {
  return (
    <Link
      to={path}
      className="group flex flex-col rounded-2xl bg-white border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{icon}</span>
        {tag && (
          <span className="text-xs font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">{tag}</span>
        )}
      </div>
      <h3 className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">{title}</h3>
      <p className="mt-1 text-sm text-gray-500 flex-1">{description}</p>
      <div className="mt-3 flex items-center text-xs font-medium text-emerald-600">
        Calculate now
        <svg className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}
