import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { posts } from '../../content/blog/posts'
import Breadcrumb from '../../components/Breadcrumb'

const listSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'FinCalcAI Blog',
  url: 'https://calcai.in/blog',
  description: 'Financial guides for India — SIP, home loans, income tax, and more.',
}

const ICONS = {
  'how-to-start-sip-in-india': '📈',
  'home-loan-eligibility-india': '🏠',
  'old-vs-new-tax-regime': '💼',
}

export default function BlogIndex() {
  const [featured, ...rest] = posts

  return (
    <>
      <Helmet>
        <title>Blog – Financial Guides for India | FinCalcAI</title>
        <meta name="description" content="Free financial guides for India. Learn about SIP investing, home loan eligibility, income tax regimes, and more." />
        <link rel="canonical" href="https://calcai.in/blog" />
        <script type="application/ld+json">{JSON.stringify(listSchema)}</script>
      </Helmet>

      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-800 text-white py-12 px-4">
        <div className="mx-auto max-w-4xl">
          <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Blog' }]} />
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-2">Financial Guides</h1>
          <p className="mt-2 text-emerald-200 text-lg">Plain-language guides to help you make better money decisions in India.</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">

        {/* Featured article */}
        <Link
          to={`/blog/${featured.slug}`}
          className="group block rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-300 p-7 mb-8 transition-all"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Featured</span>
          <div className="flex items-start gap-4 mt-3">
            <span className="text-5xl">{ICONS[featured.slug] || '📄'}</span>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-extrabold text-gray-900 group-hover:text-emerald-700 transition-colors leading-snug">
                {featured.title}
              </h2>
              <p className="mt-2 text-gray-500 text-sm leading-relaxed">{featured.excerpt}</p>
              <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.readTime}</span>
              </div>
            </div>
          </div>
          <span className="mt-4 inline-flex items-center text-sm font-semibold text-emerald-600">
            Read article
            <svg className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>

        {/* Rest of articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {rest.map(post => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 p-6 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{ICONS[post.slug] || '📄'}</span>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
              <h2 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed flex-1">{post.excerpt}</p>
              <span className="mt-4 inline-flex items-center text-xs font-semibold text-emerald-600">
                Read article
                <svg className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
