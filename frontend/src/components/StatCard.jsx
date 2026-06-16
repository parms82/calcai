export default function StatCard({ label, value, sub, highlight }) {
  return (
    <div className={`stat-card ${highlight ? 'border-emerald-200 bg-emerald-50' : ''}`}>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${highlight ? 'text-emerald-700' : 'text-gray-900'}`}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  )
}
