export function calculateSalaryHike({ currentCTC, hikePct, monthlyDeductions }) {
  const newCTC = currentCTC * (1 + hikePct / 100)
  const monthlyGross = newCTC / 12
  const monthlyInhand = monthlyGross - monthlyDeductions
  const annualIncrease = newCTC - currentCTC
  return { newCTC, monthlyGross, monthlyInhand, annualIncrease }
}
