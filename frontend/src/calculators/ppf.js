const MAX_YEARLY = 150000

export function calculatePPF({ yearlyInvestment, ratePct, years }) {
  const invest = Math.min(yearlyInvestment, MAX_YEARLY)
  const r = ratePct / 100
  let balance = 0
  const chart = []

  for (let y = 1; y <= years; y++) {
    balance = (balance + invest) * (1 + r)
    chart.push({ year: y, value: Math.round(balance), invested: invest * y })
  }

  const totalInvested = invest * years
  const interestEarned = balance - totalInvested

  return { corpus: balance, totalInvested, interestEarned, chart }
}
