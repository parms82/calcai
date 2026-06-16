function oldRegimeTax(taxableIncome) {
  let tax = 0
  if (taxableIncome <= 250000) tax = 0
  else if (taxableIncome <= 500000) tax = (taxableIncome - 250000) * 0.05
  else if (taxableIncome <= 1000000) tax = 12500 + (taxableIncome - 500000) * 0.20
  else tax = 112500 + (taxableIncome - 1000000) * 0.30
  // 87A rebate
  if (taxableIncome <= 500000) tax = 0
  return tax
}

function newRegimeTax(income) {
  let tax = 0
  if (income <= 300000) tax = 0
  else if (income <= 600000) tax = (income - 300000) * 0.05
  else if (income <= 900000) tax = 15000 + (income - 600000) * 0.10
  else if (income <= 1200000) tax = 45000 + (income - 900000) * 0.15
  else if (income <= 1500000) tax = 90000 + (income - 1200000) * 0.20
  else tax = 150000 + (income - 1500000) * 0.30
  // 87A rebate (new regime: up to ₹7L)
  if (income <= 700000) tax = 0
  return tax
}

export function calculateIncomeTax({ annualIncome, deductions80C, hraExemption, regime }) {
  const std = 50000
  const oldTaxableIncome = Math.max(0, annualIncome - std - Math.min(deductions80C, 150000) - hraExemption)
  const newTaxableIncome = Math.max(0, annualIncome - 75000) // standard deduction for new regime

  const calcRegime = (taxable, taxFn, label) => {
    const baseTax = taxFn(taxable)
    const cess = baseTax * 0.04
    const totalTax = baseTax + cess
    const effectiveRate = annualIncome > 0 ? (totalTax / annualIncome) * 100 : 0
    const netIncome = annualIncome - totalTax
    return { label, taxableIncome: taxable, baseTax, cess, totalTax, effectiveRate, netIncome }
  }

  if (regime === 'old') return calcRegime(oldTaxableIncome, oldRegimeTax, 'Old Regime')
  if (regime === 'new') return calcRegime(newTaxableIncome, newRegimeTax, 'New Regime')

  // Compare both
  const old = calcRegime(oldTaxableIncome, oldRegimeTax, 'Old Regime')
  const newR = calcRegime(newTaxableIncome, newRegimeTax, 'New Regime')
  return { old, new: newR, winner: old.totalTax <= newR.totalTax ? 'old' : 'new' }
}
