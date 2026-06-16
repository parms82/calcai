export function formatINR(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return '₹0'
  const num = Math.round(Number(amount))
  return '₹' + num.toLocaleString('en-IN')
}

export function formatINRDecimal(amount, decimals = 2) {
  if (amount === null || amount === undefined || isNaN(amount)) return '₹0.00'
  return '₹' + Number(amount).toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export function formatShort(amount) {
  const num = Number(amount)
  if (num >= 1e7) return `₹${(num / 1e7).toFixed(2)} Cr`
  if (num >= 1e5) return `₹${(num / 1e5).toFixed(2)} L`
  return formatINR(num)
}

export function formatPct(value, decimals = 2) {
  return `${Number(value).toFixed(decimals)}%`
}
