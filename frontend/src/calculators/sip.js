export function calculateSIP({ monthlyAmount, annualReturn, years }) {
  const n = years * 12
  const r = annualReturn / 100 / 12
  const corpus = r === 0
    ? monthlyAmount * n
    : monthlyAmount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
  const invested = monthlyAmount * n
  const gains = corpus - invested
  const returnPct = invested > 0 ? (gains / invested) * 100 : 0

  const chart = []
  for (let y = 1; y <= years; y++) {
    const months = y * 12
    const val = r === 0
      ? monthlyAmount * months
      : monthlyAmount * ((Math.pow(1 + r, months) - 1) / r) * (1 + r)
    chart.push({ year: y, value: Math.round(val), invested: monthlyAmount * months })
  }

  return { corpus, invested, gains, returnPct, chart }
}
