import { calculateEMI } from './emi'

export function calculateHomeLoanEligibility({ monthlyIncome, existingEMIs, interestRate, tenureYears }) {
  const maxEMI = monthlyIncome * 0.5 - existingEMIs
  const r = interestRate / 100 / 12
  const n = tenureYears * 12
  const maxLoan = r === 0
    ? maxEMI * n
    : (maxEMI * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n))
  const foirUsed = existingEMIs / monthlyIncome * 100
  return { maxLoan: Math.max(0, maxLoan), affordableEMI: Math.max(0, maxEMI), foirUsed }
}
