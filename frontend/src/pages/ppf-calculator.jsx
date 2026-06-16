import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import CalcLayout from '../components/CalcLayout'
import SliderInput from '../components/SliderInput'
import StatCard from '../components/StatCard'
import ChartWrapper from '../components/ChartWrapper'
import { calculatePPF } from '../calculators/ppf'
import { formatShort, formatINR } from '../utils/format'

const FAQS = [
  { q: 'What is the lock-in period for PPF?', a: 'PPF has a mandatory lock-in period of 15 years. After 15 years, you can extend the account in blocks of 5 years with or without making further contributions. Premature closure is allowed only after 5 years in specific circumstances like medical treatment or higher education.' },
  { q: 'What is the maximum investment limit in PPF?', a: 'The maximum you can invest in PPF is ₹1.5 Lakhs per financial year across all your PPF accounts. The minimum contribution is ₹500 per year. You can make up to 12 deposits per year in any amount, as long as the total does not exceed ₹1.5 Lakhs.' },
  { q: 'Can I withdraw from PPF before 15 years?', a: 'Partial withdrawal is allowed from the 7th financial year onwards (i.e., after 6 complete years). You can withdraw up to 50% of the balance at the end of the 4th year or the year before withdrawal, whichever is lower. Full premature closure is allowed only after 5 years for specific reasons.' },
  { q: 'Is PPF interest taxable?', a: 'No. PPF follows the EEE (Exempt-Exempt-Exempt) tax structure: the investment qualifies for 80C deduction, the interest earned is completely tax-free, and the maturity amount is also fully exempt from tax. This makes PPF one of the most tax-efficient investments in India.' },
  { q: 'Can I take a loan against my PPF account?', a: 'Yes. You can take a loan against your PPF balance from the 3rd to the 6th financial year. The loan amount can be up to 25% of the balance at the end of 2 years before the loan application. The interest rate on PPF loan is 1% above the PPF rate.' },
  { q: 'Can NRIs invest in PPF?', a: 'No. NRIs (Non-Resident Indians) cannot open a new PPF account. However, if a resident Indian who had a PPF account becomes an NRI, they can continue the existing account until maturity but cannot extend it beyond 15 years.' },
]

const SERIES = [
  { key: 'invested', name: 'Invested', color: '#6ee7b7' },
  { key: 'value',    name: 'Corpus',   color: '#059669' },
]

export default function PpfCalculator() {
  const [yearly, setYearly] = useState(100000)
  const [rate, setRate] = useState(7.1)
  const [years, setYears] = useState(15)

  const result = useMemo(() => calculatePPF({ yearlyInvestment: yearly, ratePct: rate, years }), [yearly, rate, years])

  const pieData = [
    { name: 'Total Invested',  value: Math.round(result.totalInvested),  color: '#6ee7b7' },
    { name: 'Interest Earned', value: Math.round(result.interestEarned), color: '#059669' },
  ]

  const stats = (
    <div className="space-y-4">
      <div className="rounded-xl bg-green-50 border border-green-200 p-3 text-sm text-green-800 font-medium text-center">
        EEE Status: Exempt – Exempt – Exempt (Invest, Interest & Withdrawal all tax-free)
      </div>
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Total Corpus"     value={formatShort(result.corpus)}         highlight />
        <StatCard label="Total Invested"   value={formatShort(result.totalInvested)}  />
        <StatCard label="Interest Earned"  value={formatShort(result.interestEarned)} />
        <StatCard label="Max Yearly Limit" value="₹1.5 Lakhs"                        />
      </div>
      <ChartWrapper
        title="PPF Growth Over Time"
        data={result.chart}
        series={SERIES}
        xKey="year"
        availableTypes={['area', 'bar', 'line', 'pie']}
        formatValue={formatINR}
        formatX={v => `Y${v}`}
        pieData={pieData}
      />
    </div>
  )

  return (
    <>
      <Helmet>
        <title>PPF Calculator – Public Provident Fund Returns | FinCalcAI</title>
        <meta name="description" content="Calculate PPF maturity corpus and interest earned. PPF offers EEE tax benefits and guaranteed government-backed returns." />
        <meta name="keywords" content="PPF calculator, public provident fund calculator, PPF returns India" />
        <link rel="canonical" href="https://calcai.in/ppf-calculator" />
      </Helmet>
      <CalcLayout
        title="PPF Calculator"
        subtitle="Calculate your tax-free PPF corpus with EEE tax benefits."
        result={stats}
        affiliatePartner="groww"
        calcType="ppf"
        aiHint="How much will I get from PPF if I invest ₹1.5L every year for 25 years?"
        faqs={FAQS}
        pageUrl="/ppf-calculator"
        description="PPF calculator India. Calculate Public Provident Fund corpus, interest earned and EEE tax benefits."
      >
        <SliderInput label="Yearly Investment"   value={yearly} onChange={setYearly} min={500}  max={150000} step={500}  prefix="₹" />
        <SliderInput label="PPF Interest Rate"   value={rate}   onChange={setRate}   min={6}    max={9}      step={0.1}  suffix="%" />
        <SliderInput label="Investment Period"   value={years}  onChange={setYears}  min={15}   max={50}                suffix=" yr" />
        <p className="text-xs text-gray-400 mt-2">Current PPF rate: 7.1% p.a. (Q1 FY2024-25)</p>
      </CalcLayout>
    </>
  )
}
