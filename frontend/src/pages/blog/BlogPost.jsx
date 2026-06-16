import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ReactMarkdown from 'react-markdown'
import { useMemo } from 'react'
import { getPost } from '../../content/blog/posts'
import Breadcrumb from '../../components/Breadcrumb'

// ─── Custom Markdown Components ───────────────────────────────────────────────
const mdComponents = {
  h2: ({ children }) => {
    const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-')
    return (
      <h2 id={id} className="flex items-center gap-3 text-2xl font-extrabold text-gray-900 mt-10 mb-4 scroll-mt-20">
        <span className="w-1 h-7 rounded-full bg-emerald-500 shrink-0" />
        {children}
      </h2>
    )
  },
  h3: ({ children }) => (
    <h3 className="text-lg font-bold text-gray-800 mt-6 mb-2">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-gray-700 leading-relaxed mb-4 text-[15px]">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="space-y-1.5 mb-4 pl-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="space-y-1.5 mb-4 pl-5 list-decimal">{children}</ol>
  ),
  li: ({ children, ordered }) => ordered ? (
    <li className="text-[15px] text-gray-700 pl-1">{children}</li>
  ) : (
    <li className="flex items-start gap-2 text-[15px] text-gray-700">
      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-900">{children}</strong>
  ),
  blockquote: ({ children }) => (
    <div className="my-4 rounded-xl bg-emerald-50 border-l-4 border-emerald-500 px-5 py-4 text-emerald-900 text-[15px]">
      {children}
    </div>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-5 rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-emerald-600 text-white">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left font-semibold text-sm">{children}</th>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-gray-100">{children}</tbody>
  ),
  tr: ({ children }) => (
    <tr className="even:bg-gray-50">{children}</tr>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-gray-700">{children}</td>
  ),
  a: ({ href, children }) =>
    href?.startsWith('/') ? (
      <Link to={href} className="text-emerald-600 font-medium hover:underline">{children}</Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-medium hover:underline">{children}</a>
    ),
  hr: () => <hr className="my-8 border-gray-200" />,
}

// ─── Table of Contents ────────────────────────────────────────────────────────
function TableOfContents({ content }) {
  const headings = useMemo(() => {
    const matches = content.match(/^## .+$/gm) || []
    return matches.map(h => {
      const text = h.replace('## ', '')
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      return { text, id }
    })
  }, [content])

  if (headings.length === 0) return null

  return (
    <nav className="hidden xl:block sticky top-24 self-start w-56 shrink-0">
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm p-4">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Contents</p>
        <ul className="space-y-2">
          {headings.map(h => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className="text-xs text-gray-500 hover:text-emerald-600 transition-colors leading-snug block"
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)

  if (!post) return <Navigate to="/blog" replace />

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'FinCalcAI' },
    publisher: { '@type': 'Organization', name: 'FinCalcAI', url: 'https://calcai.in' },
    url: `https://calcai.in/blog/${post.slug}`,
    description: post.excerpt,
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | FinCalcAI</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.keywords} />
        <link rel="canonical" href={`https://calcai.in/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://calcai.in/blog/${post.slug}`} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Hero header */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-800 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumb items={[
            { label: 'Home', path: '/' },
            { label: 'Blog', path: '/blog' },
            { label: post.title },
          ]} />
          <div className="flex items-center gap-3 text-emerald-300 text-xs mb-4 mt-2">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">{post.title}</h1>
          <p className="mt-4 text-emerald-100 text-lg leading-relaxed max-w-2xl">{post.excerpt}</p>
        </div>
      </div>

      {/* Content area */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-12 items-start">

          {/* Article body */}
          <article className="flex-1 min-w-0">
            <ReactMarkdown components={mdComponents}>
              {post.content}
            </ReactMarkdown>

            {/* Related calculator CTA */}
            {post.relatedCalc && (
              <div className="mt-10 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-gray-900 text-lg">Ready to calculate?</p>
                  <p className="text-sm text-gray-500 mt-1">Apply what you just learned with our free calculator.</p>
                </div>
                <Link to={post.relatedCalc.path} className="btn-primary whitespace-nowrap shrink-0">
                  {post.relatedCalc.label}
                </Link>
              </div>
            )}

            {/* Back to blog */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
              <Link to="/blog" className="text-sm text-emerald-600 hover:underline font-medium">
                ← Back to all articles
              </Link>
              <span className="text-xs text-gray-400">{post.readTime}</span>
            </div>
          </article>

          {/* Sticky TOC sidebar */}
          <TableOfContents content={post.content} />
        </div>
      </div>
    </>
  )
}
