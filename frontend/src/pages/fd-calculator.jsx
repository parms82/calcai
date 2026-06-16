import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import CalcLayout from '../components/CalcLayout'
import SliderInput from '../components/SliderInput'
import StatCard from '../components/StatCard'
import ChartWrapper from '../components/ChartWrapper'
import { calculateFD } from '../calculators/fd'
import { formatShort, formatINR, formatPct } from '../utils/format'

const FAQS = [
  { q: 'What is the difference between cumulative and non-cumulative FD?', a: 'In a cumulative FD, the interest is compounded and paid at maturity along with the principal. In a non-cumulative FD, interest is paid out monthly, quarterly, or annually. Cumulative FDs grow faster due to compounding and are better for wealth creation. Non-cumulative FDs are suitable for regular income.' },
  { q: 'Is FD interest taxable in India?', a: 'Yes. FD interest is added to your total income and taxed at your applicable income tax slab rate. If your total FD interest exceeds ₹40,000 in a year (₹50,000 for senior citizens), the bank deducts TDS at 10%. You can submit Form 15G/15H to avoid TDS if your income is below the taxable limit.' },
  { q: 'What happens if I break my FD before maturity?', a: 'Banks allow premature withdrawal but charge a penalty of 0.5–1% on the applicable interest rate. For example, if you booked an FD at 7% for 5 years and break it after 2 years, the bank pays 2-year rate (say 6.5%) minus 0.5% penalty = 6%.' },
  { q: 'What is TDS on FD interest?', a: 'TDS (Tax Deducted at Source) on FD interest is 10% if your interest income exceeds ₹40,000 per year (₹50,000 for senior citizens). If you do not provide PAN, TDS is deducted at 20%. Note: TDS is not the final tax — you must declare FD interest in your ITR and pay tax per your slab.' },
  { q: 'Which compounding frequency gives the best returns?', a: 'Monthly compounding gives the highest effective yield, followed by quarterly, half-yearly, and annual. For a 7% FD, monthly compounding gives an effective annual yield of 7.23% vs 7.19% for quarterly and 7% for annual. The difference becomes significant for large amounts.' },
  { q: 'Are FD returns better than mutual funds?', a: 'FDs give guaranteed, fixed returns (6–8% currently) with no risk. Equity mutual funds historically deliver 10–14% annually but carry market risk. For short-term goals (under 3 years) or risk-averse investors, FD is better. For long-term wealth creation (5+ years), equity mutual funds through SIP typically outperform FDs.' },
]

const SERIES = [
  { key: 'value', name: 'FD Value', color: '#059669' },
]

export default function FdCalculator() {
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(5)
  const [compounding, setCompounding] = useState('quarterly')

  const result = useMemo(() => calculateFD({ principal, ratePct: rate, years, compounding }), [principal, rate, years, compounding])

  const pieData = [
    { name: 'Principal',       value: Math.round(principal),              color: '#6ee7b7' },
    { name: 'Interest Earned', value: Math.round(result.interestEarned), color: '#059669' },
  ]

  const stats = (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Maturity Amount"  value={formatShort(result.maturityAmount)}  highlight />
        <StatCard label="Interest Earned"  value={formatShort(result.interestEarned)} />
        <StatCard label="Principal"        value={formatShort(principal)}              />
        <StatCard label="Effective Yield"  value={formatPct(result.effectiveYield)}   />
      </div>
      <ChartWrapper
        title="FD Growth Over Time"
        data={result.chart}
        series={SERIES}
        xKey="year"
        availableTypes={['line', 'bar', 'area', 'pie']}
        formatValue={formatINR}
        formatX={v => `Y${v}`}
        pieData={pieData}
      />
    </div>
  )

  return (
    <>
      <Helmet>
        <title>FD Calculator – Fixed Deposit Maturity Amount Calculator | FinCalcAI</title>
        <meta name="description" content="Calculate FD maturity amount and interest earned. Compare quarterly, monthly and annual compounding with our free fixed deposit calculator." />
        <meta name="keywords" content="FD calculator, fixed deposit calculator India, FD maturity amount" />
        <link rel="canonical" href="https://calcai.in/fd-calculator" />
      </Helmet>
      <CalcLayout
        title="FD Calculator"
        subtitle="Calculate fixed deposit returns with different compounding frequencies."
        result={stats}
        affiliatePartner="groww"
        calcType="fd"
        aiHint="Which bank gives the best FD rate for 3 years right now?"
        faqs={FAQS}
        pageUrl="/fd-calculator"
        description="Fixed deposit calculator India. Calculate FD maturity amount and interest with quarterly, monthly or annual compounding."
      >
        <SliderInput label="Principal Amount"      value={principal} onChange={setPrincipal} min={5000} max={10000000} step={5000}  prefix="₹" />
        <SliderInput label="Annual Interest Rate"  value={rate}      onChange={setRate}      min={3}    max={10}       step={0.1}   suffix="%" />
        <SliderInput label="Tenure"                value={years}     onChange={setYears}     min={1}    max={10}                    suffix=" yr" />
        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700 block mb-2">Compounding</label>
          <div className="flex gap-2">
            {[['monthly', 'Monthly'], ['quarterly', 'Quarterly'], ['annual', 'Yearly']].map(([val, label]) => (
              <button key={val} onClick={() => setCompounding(val)}
                className={`flex-1 rounded-lg py-2 text-xs font-semibold border transition-colors ${
                  compounding === val ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'
                }`}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </CalcLayout>
    </>
  )
}
