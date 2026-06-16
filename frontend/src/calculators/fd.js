const COMPOUND_MAP = { annual: 1, quarterly: 4, monthly: 12 }

export function calculateFD({ principal, ratePct, years, compounding }) {
  const n = COMPOUND_MAP[compounding] || 4
  const r = ratePct / 100
  const maturityAmount = principal * Math.pow(1 + r / n, n * years)
  const interestEarned = maturityAmount - principal
  const effectiveYield = (Math.pow(1 + r / n, n) - 1) * 100

  const chart = []
  for (let y = 1; y <= years; y++) {
    const val = principal * Math.pow(1 + r / n, n * y)
    chart.push({ year: y, value: Math.round(val) })
  }

  return { maturityAmount, interestEarned, effectiveYield, chart }
}
