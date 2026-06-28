import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'

const TOPICS = [
  'Bug report / incorrect calculation',
  'New calculator request',
  'General feedback',
  'Partnership / business enquiry',
  'Other',
]

const FAQ_ITEMS = [
  {
    q: 'Are all calculators free?',
    a: 'Yes. Every calculator on FinCalcAI is completely free with no sign-up required. We earn through advertising and affiliate partnerships.',
  },
  {
    q: 'How accurate are the calculations?',
    a: 'All formulas follow RBI guidelines and the Income Tax Act. However, results are estimates for planning purposes and may differ from actual bank or government figures due to rounding or policy changes.',
  },
  {
    q: 'Can I embed your calculators on my website?',
    a: 'We are working on an embeddable widget and API. Email us at contact@calcai.in to be notified when it launches.',
  },
  {
    q: 'I found an error in a calculation. What should I do?',
    a: 'Please use the contact form and select "Bug report / incorrect calculation". Include the calculator name, the inputs you used, and the result you got. We will investigate within 48 hours.',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', topic: TOPICS[0], message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'sent' | 'error'

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/xkgjkgpb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Helmet>
        <title>Contact Us | FinCalcAI</title>
        <meta name="description" content="Contact the FinCalcAI team for bug reports, feedback, calculator suggestions, or business enquiries. We read and respond to every message." />
        <link rel="canonical" href="https://calcai.in/contact" />
      </Helmet>

      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-800 text-white py-10 px-4">
        <div className="mx-auto max-w-4xl">
          <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Contact' }]} />
          <h1 className="text-3xl font-extrabold mt-2">Contact Us</h1>
          <p className="mt-2 text-emerald-200">We read and respond to every message, usually within 24–48 hours.</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Send a Message</h2>

            {status === 'sent' ? (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="text-lg font-bold text-emerald-800 mb-2">Message Received!</h3>
                <p className="text-sm text-emerald-700">
                  Thank you for reaching out. We will get back to you at <strong>{form.email}</strong> within
                  24–48 hours.
                </p>
                <button
                  onClick={() => { setForm({ name: '', email: '', topic: TOPICS[0], message: '' }); setStatus(null) }}
                  className="mt-5 text-sm text-emerald-700 underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Rahul Sharma"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="rahul@example.com"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                  <select
                    name="topic"
                    value={form.topic}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 shadow-sm bg-white"
                  >
                    {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 shadow-sm resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                    Something went wrong. Please email us directly at{' '}
                    <a href="mailto:contact@calcai.in" className="underline">contact@calcai.in</a>.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message →'}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  Or email us directly at{' '}
                  <a href="mailto:contact@calcai.in" className="text-emerald-700 underline">contact@calcai.in</a>
                </p>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick contact */}
            <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-3">Quick Contact</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">📧</span>
                  <div>
                    <p className="font-medium text-gray-700">Email</p>
                    <a href="mailto:contact@calcai.in" className="text-emerald-700 hover:underline">
                      contact@calcai.in
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">⏱️</span>
                  <div>
                    <p className="font-medium text-gray-700">Response Time</p>
                    <p className="text-gray-500">24–48 hours on business days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Common Questions</h3>
              <div className="space-y-4">
                {FAQ_ITEMS.map(item => (
                  <div key={item.q} className="rounded-xl bg-white border border-gray-100 p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-1">{item.q}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5">
              <h3 className="font-bold text-emerald-900 mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="text-emerald-700 hover:underline">About FinCalcAI</Link></li>
                <li><Link to="/privacy-policy" className="text-emerald-700 hover:underline">Privacy Policy</Link></li>
                <li><Link to="/blog" className="text-emerald-700 hover:underline">Financial Guides Blog</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
