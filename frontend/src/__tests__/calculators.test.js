import { describe, it, expect } from 'vitest'
import { calculateSIP } from '../calculators/sip'
import { calculateEMI } from '../calculators/emi'
import { calculateIncomeTax } from '../calculators/income-tax'
import { calculateGratuity } from '../calculators/gratuity'
import { calculateSalaryHike } from '../calculators/salary-hike'
import { calculateHomeLoanEligibility } from '../calculators/home-loan-eligibility'
import { calculateFD } from '../calculators/fd'
import { calculatePPF } from '../calculators/ppf'

// ─── SIP ─────────────────────────────────────────────────────────────────────
describe('SIP Calculator', () => {
  it('calculates corpus correctly for standard inputs', () => {
    const result = calculateSIP({ monthlyAmount: 5000, annualReturn: 12, years: 10 })
    // Expected ≈ ₹11,61,695 corpus
    expect(result.corpus).toBeGreaterThan(1100000)
    expect(result.corpus).toBeLessThan(1200000)
  })

  it('invested = monthly * months', () => {
    const result = calculateSIP({ monthlyAmount: 5000, annualReturn: 12, years: 10 })
    expect(result.invested).toBe(5000 * 120)
  })

  it('gains = corpus - invested', () => {
    const result = calculateSIP({ monthlyAmount: 5000, annualReturn: 12, years: 10 })
    expect(Math.round(result.gains)).toBe(Math.round(result.corpus - result.invested))
  })

  it('returns positive returnPct for positive rate', () => {
    const result = calculateSIP({ monthlyAmount: 1000, annualReturn: 8, years: 5 })
    expect(result.returnPct).toBeGreaterThan(0)
  })

  it('corpus = invested when rate is 0%', () => {
    const result = calculateSIP({ monthlyAmount: 1000, annualReturn: 0, years: 5 })
    expect(result.corpus).toBeCloseTo(60000, 0)
    expect(result.gains).toBeCloseTo(0, 0)
  })

  it('chart has correct number of data points', () => {
    const result = calculateSIP({ monthlyAmount: 5000, annualReturn: 12, years: 15 })
    expect(result.chart).toHaveLength(15)
    expect(result.chart[0].year).toBe(1)
    expect(result.chart[14].year).toBe(15)
  })

  it('chart values increase monotonically', () => {
    const result = calculateSIP({ monthlyAmount: 5000, annualReturn: 12, years: 10 })
    for (let i = 1; i < result.chart.length; i++) {
      expect(result.chart[i].value).toBeGreaterThan(result.chart[i - 1].value)
    }
  })
})

// ─── EMI ─────────────────────────────────────────────────────────────────────
describe('EMI Calculator', () => {
  it('calculates monthly EMI correctly', () => {
    // ₹20L loan, 8.5%, 20 years → ≈ ₹17,356/month
    const result = calculateEMI({ loanAmount: 2000000, annualRate: 8.5, tenureYears: 20 })
    expect(result.emi).toBeGreaterThan(17000)
    expect(result.emi).toBeLessThan(18000)
  })

  it('total payment > loan amount (interest must be positive)', () => {
    const result = calculateEMI({ loanAmount: 1000000, annualRate: 10, tenureYears: 10 })
    expect(result.totalPayment).toBeGreaterThan(1000000)
    expect(result.totalInterest).toBeGreaterThan(0)
  })

  it('total payment = emi * months', () => {
    const result = calculateEMI({ loanAmount: 500000, annualRate: 9, tenureYears: 5 })
    expect(result.totalPayment).toBeCloseTo(result.emi * 60, 0)
  })

  it('total interest = total payment - principal', () => {
    const result = calculateEMI({ loanAmount: 1000000, annualRate: 8, tenureYears: 15 })
    expect(result.totalInterest).toBeCloseTo(result.totalPayment - result.principal, 0)
  })

  it('EMI = loan/months when rate is 0%', () => {
    const result = calculateEMI({ loanAmount: 120000, annualRate: 0, tenureYears: 10 })
    expect(result.emi).toBeCloseTo(1000, 0)
  })

  it('chart has one entry per year', () => {
    const result = calculateEMI({ loanAmount: 1000000, annualRate: 9, tenureYears: 10 })
    expect(result.chart).toHaveLength(10)
  })

  it('higher rate means higher EMI', () => {
    const low = calculateEMI({ loanAmount: 1000000, annualRate: 7, tenureYears: 10 })
    const high = calculateEMI({ loanAmount: 1000000, annualRate: 12, tenureYears: 10 })
    expect(high.emi).toBeGreaterThan(low.emi)
  })
})

// ─── Income Tax ───────────────────────────────────────────────────────────────
describe('Income Tax Calculator', () => {
  it('zero tax for income below exemption (old regime)', () => {
    const result = calculateIncomeTax({ annualIncome: 200000, deductions80C: 0, hraExemption: 0, regime: 'old' })
    expect(result.totalTax).toBe(0)
  })

  it('zero tax for income ≤5L with 87A rebate (old regime)', () => {
    const result = calculateIncomeTax({ annualIncome: 500000, deductions80C: 0, hraExemption: 0, regime: 'old' })
    expect(result.totalTax).toBe(0)
  })

  it('zero tax for income ≤7L in new regime (87A rebate)', () => {
    const result = calculateIncomeTax({ annualIncome: 700000, deductions80C: 0, hraExemption: 0, regime: 'new' })
    expect(result.totalTax).toBe(0)
  })

  it('cess is 4% of base tax', () => {
    const result = calculateIncomeTax({ annualIncome: 1500000, deductions80C: 0, hraExemption: 0, regime: 'old' })
    expect(result.cess).toBeCloseTo(result.baseTax * 0.04, 1)
  })

  it('net income = annual income - total tax', () => {
    const result = calculateIncomeTax({ annualIncome: 1200000, deductions80C: 150000, hraExemption: 0, regime: 'old' })
    expect(result.netIncome).toBeCloseTo(result.annualIncome - result.totalTax || 1200000 - result.totalTax, 0)
  })

  it('compare mode returns old, new, and winner', () => {
    const result = calculateIncomeTax({ annualIncome: 1000000, deductions80C: 150000, hraExemption: 0, regime: 'compare' })
    expect(result).toHaveProperty('old')
    expect(result).toHaveProperty('new')
    expect(['old', 'new']).toContain(result.winner)
  })

  it('80C deductions reduce old regime tax', () => {
    const without = calculateIncomeTax({ annualIncome: 800000, deductions80C: 0, hraExemption: 0, regime: 'old' })
    const with80C = calculateIncomeTax({ annualIncome: 800000, deductions80C: 150000, hraExemption: 0, regime: 'old' })
    expect(with80C.totalTax).toBeLessThan(without.totalTax)
  })

  it('80C deductions do NOT affect new regime tax', () => {
    const without = calculateIncomeTax({ annualIncome: 800000, deductions80C: 0, hraExemption: 0, regime: 'new' })
    const with80C = calculateIncomeTax({ annualIncome: 800000, deductions80C: 150000, hraExemption: 0, regime: 'new' })
    expect(with80C.totalTax).toBe(without.totalTax)
  })

  it('effective rate is between 0 and 30%', () => {
    const result = calculateIncomeTax({ annualIncome: 2000000, deductions80C: 0, hraExemption: 0, regime: 'new' })
    expect(result.effectiveRate).toBeGreaterThan(0)
    expect(result.effectiveRate).toBeLessThan(30)
  })
})

// ─── Gratuity ─────────────────────────────────────────────────────────────────
describe('Gratuity Calculator', () => {
  it('calculates correctly under Gratuity Act (÷26)', () => {
    // Formula: (50000 * 15 * 5) / 26 = ₹1,44,230.77
    const result = calculateGratuity({ basicPlusDA: 50000, yearsOfService: 5, coveredUnderAct: true })
    expect(result.gratuityAmount).toBeCloseTo(144230.77, 0)
  })

  it('calculates correctly NOT under Act (÷30)', () => {
    const result = calculateGratuity({ basicPlusDA: 50000, yearsOfService: 5, coveredUnderAct: false })
    expect(result.gratuityAmount).toBeCloseTo(125000, 0)
  })

  it('÷26 gives more than ÷30 for same inputs', () => {
    const covered = calculateGratuity({ basicPlusDA: 40000, yearsOfService: 10, coveredUnderAct: true })
    const notCovered = calculateGratuity({ basicPlusDA: 40000, yearsOfService: 10, coveredUnderAct: false })
    expect(covered.gratuityAmount).toBeGreaterThan(notCovered.gratuityAmount)
  })

  it('entire amount is tax-free when below ₹20L limit', () => {
    const result = calculateGratuity({ basicPlusDA: 30000, yearsOfService: 5, coveredUnderAct: true })
    expect(result.taxable).toBe(0)
    expect(result.taxFree).toBe(result.gratuityAmount)
  })

  it('taxable amount = gratuity - 20L when above limit', () => {
    const result = calculateGratuity({ basicPlusDA: 200000, yearsOfService: 40, coveredUnderAct: true })
    expect(result.taxFree).toBe(2000000)
    expect(result.taxable).toBeCloseTo(result.gratuityAmount - 2000000, 0)
  })
})

// ─── Salary Hike ──────────────────────────────────────────────────────────────
describe('Salary Hike Calculator', () => {
  it('calculates new CTC correctly', () => {
    const result = calculateSalaryHike({ currentCTC: 1000000, hikePct: 20, monthlyDeductions: 5000 })
    expect(result.newCTC).toBe(1200000)
  })

  it('monthly gross = newCTC / 12', () => {
    const result = calculateSalaryHike({ currentCTC: 600000, hikePct: 10, monthlyDeductions: 3000 })
    expect(result.monthlyGross).toBeCloseTo(660000 / 12, 2)
  })

  it('monthly in-hand = monthly gross - deductions', () => {
    const result = calculateSalaryHike({ currentCTC: 800000, hikePct: 15, monthlyDeductions: 6000 })
    expect(result.monthlyInhand).toBeCloseTo(result.monthlyGross - 6000, 2)
  })

  it('annual increase = new CTC - old CTC', () => {
    const result = calculateSalaryHike({ currentCTC: 500000, hikePct: 25, monthlyDeductions: 2000 })
    expect(result.annualIncrease).toBe(125000)
  })

  it('0% hike means no change in CTC', () => {
    const result = calculateSalaryHike({ currentCTC: 1000000, hikePct: 0, monthlyDeductions: 5000 })
    expect(result.newCTC).toBe(1000000)
    expect(result.annualIncrease).toBe(0)
  })
})

// ─── Home Loan Eligibility ───────────────────────────────────────────────────
describe('Home Loan Eligibility Calculator', () => {
  it('max eligible loan is positive for valid inputs', () => {
    const result = calculateHomeLoanEligibility({ monthlyIncome: 100000, existingEMIs: 0, interestRate: 8.5, tenureYears: 20 })
    expect(result.maxLoan).toBeGreaterThan(0)
  })

  it('eligible loan reduces when existing EMIs increase', () => {
    const noEMI = calculateHomeLoanEligibility({ monthlyIncome: 100000, existingEMIs: 0, interestRate: 8.5, tenureYears: 20 })
    const withEMI = calculateHomeLoanEligibility({ monthlyIncome: 100000, existingEMIs: 20000, interestRate: 8.5, tenureYears: 20 })
    expect(withEMI.maxLoan).toBeLessThan(noEMI.maxLoan)
  })

  it('max loan = 0 when existing EMIs consume 50% of income', () => {
    const result = calculateHomeLoanEligibility({ monthlyIncome: 80000, existingEMIs: 40000, interestRate: 8.5, tenureYears: 20 })
    expect(result.maxLoan).toBe(0)
  })

  it('longer tenure increases eligible loan amount', () => {
    const short = calculateHomeLoanEligibility({ monthlyIncome: 80000, existingEMIs: 0, interestRate: 8.5, tenureYears: 10 })
    const long = calculateHomeLoanEligibility({ monthlyIncome: 80000, existingEMIs: 0, interestRate: 8.5, tenureYears: 25 })
    expect(long.maxLoan).toBeGreaterThan(short.maxLoan)
  })

  it('FOIR = existingEMIs / income * 100', () => {
    const result = calculateHomeLoanEligibility({ monthlyIncome: 100000, existingEMIs: 15000, interestRate: 8.5, tenureYears: 20 })
    expect(result.foirUsed).toBeCloseTo(15, 1)
  })
})

// ─── FD Calculator ───────────────────────────────────────────────────────────
describe('FD Calculator', () => {
  it('maturity amount > principal for positive rate', () => {
    const result = calculateFD({ principal: 100000, ratePct: 7, years: 5, compounding: 'quarterly' })
    expect(result.maturityAmount).toBeGreaterThan(100000)
  })

  it('interest earned = maturity - principal', () => {
    const result = calculateFD({ principal: 100000, ratePct: 7, years: 3, compounding: 'quarterly' })
    expect(result.interestEarned).toBeCloseTo(result.maturityAmount - 100000, 0)
  })

  it('monthly compounding yields more than quarterly', () => {
    const monthly = calculateFD({ principal: 100000, ratePct: 7, years: 5, compounding: 'monthly' })
    const quarterly = calculateFD({ principal: 100000, ratePct: 7, years: 5, compounding: 'quarterly' })
    expect(monthly.maturityAmount).toBeGreaterThan(quarterly.maturityAmount)
  })

  it('quarterly compounding yields more than annual', () => {
    const quarterly = calculateFD({ principal: 100000, ratePct: 7, years: 5, compounding: 'quarterly' })
    const annual = calculateFD({ principal: 100000, ratePct: 7, years: 5, compounding: 'annual' })
    expect(quarterly.maturityAmount).toBeGreaterThan(annual.maturityAmount)
  })

  it('chart grows monotonically', () => {
    const result = calculateFD({ principal: 50000, ratePct: 7, years: 5, compounding: 'quarterly' })
    for (let i = 1; i < result.chart.length; i++) {
      expect(result.chart[i].value).toBeGreaterThan(result.chart[i - 1].value)
    }
  })

  it('effective yield > nominal rate for non-annual compounding', () => {
    const result = calculateFD({ principal: 100000, ratePct: 7, years: 1, compounding: 'quarterly' })
    expect(result.effectiveYield).toBeGreaterThan(7)
  })
})

// ─── PPF Calculator ───────────────────────────────────────────────────────────
describe('PPF Calculator', () => {
  it('corpus > total invested (interest is positive)', () => {
    const result = calculatePPF({ yearlyInvestment: 100000, ratePct: 7.1, years: 15 })
    expect(result.corpus).toBeGreaterThan(result.totalInvested)
  })

  it('total invested = yearly * years (capped at 1.5L)', () => {
    const result = calculatePPF({ yearlyInvestment: 100000, ratePct: 7.1, years: 15 })
    expect(result.totalInvested).toBe(100000 * 15)
  })

  it('caps investment at ₹1.5L per year', () => {
    const capped = calculatePPF({ yearlyInvestment: 200000, ratePct: 7.1, years: 15 })
    const normal = calculatePPF({ yearlyInvestment: 150000, ratePct: 7.1, years: 15 })
    expect(capped.corpus).toBe(normal.corpus)
  })

  it('interest earned = corpus - total invested', () => {
    const result = calculatePPF({ yearlyInvestment: 100000, ratePct: 7.1, years: 15 })
    expect(result.interestEarned).toBeCloseTo(result.corpus - result.totalInvested, 0)
  })

  it('chart has correct number of years', () => {
    const result = calculatePPF({ yearlyInvestment: 100000, ratePct: 7.1, years: 20 })
    expect(result.chart).toHaveLength(20)
  })

  it('corpus grows each year', () => {
    const result = calculatePPF({ yearlyInvestment: 100000, ratePct: 7.1, years: 15 })
    for (let i = 1; i < result.chart.length; i++) {
      expect(result.chart[i].value).toBeGreaterThan(result.chart[i - 1].value)
    }
  })

  it('higher rate produces larger corpus', () => {
    const low = calculatePPF({ yearlyInvestment: 100000, ratePct: 7.0, years: 15 })
    const high = calculatePPF({ yearlyInvestment: 100000, ratePct: 7.5, years: 15 })
    expect(high.corpus).toBeGreaterThan(low.corpus)
  })
})
