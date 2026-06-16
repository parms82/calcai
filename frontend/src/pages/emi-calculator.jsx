import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import CalcLayout from '../components/CalcLayout'
import SliderInput from '../components/SliderInput'
import StatCard from '../components/StatCard'
import ChartWrapper from '../components/ChartWrapper'
import { calculateEMI } from '../calculators/emi'
import { formatShort, formatINR } from '../utils/format'

const FAQS = [
  { q: 'How is EMI calculated?', a: 'EMI is calculated using the formula: EMI = P × r × (1+r)^n / ((1+r)^n − 1), where P is the loan amount, r is the monthly interest rate, and n is the number of months. Our calculator applies this formula instantly.' },
  { q: 'Does prepayment reduce EMI or loan tenure?', a: 'By default, most banks reduce your loan tenure when you make a part-prepayment, keeping EMI the same. However, you can request your bank to reduce the EMI instead while keeping the tenure unchanged. Reducing tenure saves more interest overall.' },
  { q: 'What is the difference between fixed and floating interest rate?', a: 'A fixed rate stays constant throughout the loan tenure, giving predictable EMIs. A floating rate changes with the RBI repo rate — it can go up or down. Most home loans in India are floating rate, which are generally lower to begin with but carry some risk.' },
  { q: 'What is the maximum home loan tenure in India?', a: 'Most banks offer home loans for up to 30 years. The maximum tenure also depends on your age at the time of application — the loan must be repaid before you turn 60 (salaried) or 65 (self-employed).' },
  { q: 'Can I reduce my EMI after taking the loan?', a: 'Yes. You can reduce your EMI by making partial prepayments to reduce the outstanding principal, or by refinancing your loan to a lower interest rate (balance transfer). Some banks also allow tenure reduction which brings down total interest paid.' },
  { q: 'Is there a penalty for prepaying a loan?', a: 'As per RBI guidelines, banks cannot charge prepayment penalty on floating rate home loans. For fixed rate loans or personal loans, a prepayment charge of 1–4% may apply. Always check your loan agreement before prepaying.' },
]

const SERIES = [
  { key: 'principal', name: 'Principal', color: '#059669' },
  { key: 'interest',  name: 'Interest',  color: '#f59e0b' },
]

export default function EmiCalculator() {
  const [loan, setLoan] = useState(2000000)
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(20)

  const result = useMemo(() => calculateEMI({ loanAmount: loan, annualRate: rate, tenureYears: tenure }), [loan, rate, tenure])

  const pieData = [
    { name: 'Principal',      value: Math.round(result.principal),     color: '#059669' },
    { name: 'Total Interest', value: Math.round(result.totalInterest), color: '#f59e0b' },
  ]

  const stats = (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Monthly EMI"    value={formatINR(result.emi)}           highlight />
        <StatCard label="Principal"      value={formatShort(result.principal)}   />
        <StatCard label="Total Interest" value={formatShort(result.totalInterest)} />
        <StatCard label="Total Payment"  value={formatShort(result.totalPayment)} />
      </div>
      <ChartWrapper
        title="Yearly Principal vs Interest"
        data={result.chart}
        series={SERIES}
        xKey="year"
        availableTypes={['bar', 'line', 'pie']}
        formatValue={formatINR}
        formatX={v => `Y${v}`}
        pieData={pieData}
      />
    </div>
  )

  return (
    <>
      <Helmet>
        <title>EMI Calculator – Home Loan, Car Loan EMI | FinCalcAI</title>
        <meta name="description" content="Calculate monthly EMI for home loan, car loan or personal loan. Know principal, interest and total payment with our free EMI calculator." />
        <meta name="keywords" content="EMI calculator, home loan EMI calculator, car loan EMI India" />
        <link rel="canonical" href="https://calcai.in/emi-calculator" />
      </Helmet>
      <CalcLayout
        title="EMI Calculator"
        subtitle="Calculate your monthly loan EMI and total interest payable."
        result={stats}
        affiliatePartner="hdfc"
        calcType="emi"
        aiHint="Can I afford a ₹50L home loan on ₹80K salary?"
        faqs={FAQS}
        pageUrl="/emi-calculator"
        description="Free EMI calculator India. Calculate monthly EMI for home loan, car loan and personal loan instantly."
      >
        <SliderInput label="Loan Amount"         value={loan}   onChange={setLoan}   min={100000} max={10000000} step={50000} prefix="₹" />
        <SliderInput label="Annual Interest Rate" value={rate}   onChange={setRate}   min={5}      max={20}       step={0.1}  suffix="%" />
        <SliderInput label="Loan Tenure"         value={tenure} onChange={setTenure} min={1}      max={30}                   suffix=" yr" />
      </CalcLayout>
    </>
  )
}
