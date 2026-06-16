import { useState } from 'react'

export default function LeadCaptureForm({ calculator }) {
  const [form, setForm] = useState({ name: '', phone: '', amount: '', type: calculator })
  const [status, setStatus] = useState('idle')

  function update(k, v) { setForm(f => ({ ...f, [k]: v })) }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source_calculator: calculator }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-green-50 border border-green-200 p-5 text-center">
        <span className="text-2xl">✅</span>
        <p className="mt-2 font-semibold text-green-800">We'll send you the best offers in 2 hours!</p>
        <p className="text-sm text-green-600 mt-1">Our team will reach out on {form.phone}.</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5">
      <h3 className="font-semibold text-gray-900 mb-1">Get the Best Loan Offers</h3>
      <p className="text-sm text-gray-500 mb-4">Fill in your details and we'll match you with top lenders.</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" required placeholder="Your Name" value={form.name}
          onChange={e => update('name', e.target.value)} className="calc-input" />
        <input type="tel" required placeholder="Mobile Number" value={form.phone}
          onChange={e => update('phone', e.target.value)} className="calc-input" />
        <input type="text" placeholder="Loan amount needed (e.g. 50 Lakhs)" value={form.amount}
          onChange={e => update('amount', e.target.value)} className="calc-input" />
        <button type="submit" disabled={status === 'loading'} className="btn-primary w-full disabled:opacity-50">
          {status === 'loading' ? 'Submitting...' : 'Get Free Consultation →'}
        </button>
        {status === 'error' && <p className="text-xs text-red-500 text-center">Something went wrong. Please try again.</p>}
        <p className="text-xs text-gray-400 text-center">No spam. Your data is safe with us.</p>
      </form>
    </div>
  )
}
