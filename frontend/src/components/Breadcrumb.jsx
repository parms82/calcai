import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function Breadcrumb({ items }) {
  // items = [{ label: 'Home', path: '/' }, { label: 'SIP Calculator' }]
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.path ? { item: `https://calcai.in${item.path}` } : {}),
    })),
  }

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-gray-300">/</span>}
            {item.path ? (
              <Link to={item.path} className="hover:text-emerald-600 transition-colors">{item.label}</Link>
            ) : (
              <span className="text-gray-700 font-medium">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  )
}
