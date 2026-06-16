import { useState } from 'react'

export default function AIAssistant({ calcType, hint }) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleAsk() {
    if (!question.trim()) return
    setLoading(true)
    setAnswer('')
    setError('')
    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, calculator_type: calcType }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Something went wrong')
      setAnswer(data.answer)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-8 rounded-2xl bg-gray-900 text-white p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🤖</span>
        <h3 className="font-semibold text-lg">Ask AI</h3>
        <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-full ml-auto">Powered by Claude</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAsk()}
          placeholder={hint || 'Ask a financial question...'}
          className="flex-1 rounded-lg bg-gray-800 border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
        />
        <button
          onClick={handleAsk}
          disabled={loading || !question.trim()}
          className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Thinking...' : 'Ask AI'}
        </button>
      </div>

      {loading && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:300ms]" />
          </div>
          Thinking...
        </div>
      )}

      {answer && (
        <div className="mt-4 rounded-lg bg-gray-800 p-4 text-sm text-gray-200 leading-relaxed">
          {answer}
        </div>
      )}

      {error && (
        <p className="mt-3 text-sm text-red-400">{error}</p>
      )}
    </div>
  )
}
