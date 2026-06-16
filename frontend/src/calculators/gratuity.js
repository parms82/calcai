const TAX_FREE_LIMIT = 2000000 // ₹20 Lakhs

export function calculateGratuity({ basicPlusDA, yearsOfService, coveredUnderAct }) {
  const divisor = coveredUnderAct ? 26 : 30
  const gratuityAmount = (basicPlusDA * 15 * yearsOfService) / divisor
  const taxFree = Math.min(gratuityAmount, TAX_FREE_LIMIT)
  const taxable = Math.max(0, gratuityAmount - TAX_FREE_LIMIT)
  return { gratuityAmount, taxFree, taxable }
}
