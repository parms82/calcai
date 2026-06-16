export function calculateEMI({ loanAmount, annualRate, tenureYears }) {
  const n = tenureYears * 12
  const r = annualRate / 100 / 12
  const emi = r === 0
    ? loanAmount / n
    : (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  const totalPayment = emi * n
  const totalInterest = totalPayment - loanAmount

  const chart = []
  let balance = loanAmount
  for (let y = 1; y <= tenureYears; y++) {
    let principalYear = 0, interestYear = 0
    for (let m = 0; m < 12 && balance > 0; m++) {
      const intMonth = balance * r
      const prinMonth = Math.min(emi - intMonth, balance)
      interestYear += intMonth
      principalYear += prinMonth
      balance -= prinMonth
    }
    chart.push({ year: y, principal: Math.round(principalYear), interest: Math.round(interestYear) })
  }

  return { emi, principal: loanAmount, totalInterest, totalPayment, chart }
}
