import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import CalcLayout from '../components/CalcLayout'
import SliderInput from '../components/SliderInput'
import StatCard from '../components/StatCard'
import ChartWrapper from '../components/ChartWrapper'
import { calculateSIP } from '../calculators/sip'
import { formatShort, formatINR, formatPct } from '../utils/format'

const FAQS = [
  { q: 'What is SIP and how does it work?', a: 'A Systematic Investment Plan (SIP) lets you invest a fixed amount in a mutual fund every month. Each instalment buys units at the current NAV, so you automatically buy more units when markets are low and fewer when they are high — a strategy called rupee-cost averaging.' },
  { q: 'What is the minimum SIP amount in India?', a: 'Most mutual funds allow SIPs starting from ₹500 per month. Some funds, especially ELSS funds, allow ₹500 while others may have ₹1,000 as the minimum.' },
  { q: 'Is SIP return guaranteed?', a: 'No, SIP returns are not guaranteed. They depend on the performance of the underlying mutual fund. Equity SIPs historically deliver 10–14% annual returns over long periods, but can be negative in the short term.' },
  { q: 'What happens if I miss an SIP instalment?', a: 'If your bank account has insufficient balance, the SIP instalment will be skipped for that month. Most fund houses allow up to 3 consecutive missed payments before cancelling the SIP. There is no penalty for a missed instalment.' },
  { q: 'Can I stop or pause my SIP anytime?', a: 'Yes. You can pause a SIP for 1–3 months or stop it permanently at any time without any exit charges. The units you have already accumulated remain invested and continue to earn returns.' },
  { q: 'What is the difference between SIP and lump sum investment?', a: 'In SIP you invest a fixed amount monthly, which reduces timing risk. In lump sum you invest a large amount at once, which works better when markets are at a low point. For most salaried investors, SIP is recommended because it builds discipline and averages out market volatility.' },
]

const SERIES = [
  { key: 'invested', name: 'Invested', color: '#6ee7b7' },
  { key: 'value',    name: 'Corpus',   color: '#059669' },
]

export default function SipCalculator() {
  const [monthly, setMonthly] = useState(5000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)

  const result = useMemo(() => calculateSIP({ monthlyAmount: monthly, annualReturn: rate, years }), [monthly, rate, years])

  const pieData = [
    { name: 'Total Invested', value: Math.round(result.invested), color: '#6ee7b7' },
    { name: 'Wealth Gained',  value: Math.round(result.gains),   color: '#059669' },
  ]

  const stats = (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Total Corpus"    value={formatShort(result.corpus)}   highlight />
        <StatCard label="Total Invested"  value={formatShort(result.invested)} />
        <StatCard label="Wealth Gained"   value={formatShort(result.gains)}    />
        <StatCard label="Absolute Return" value={formatPct(result.returnPct)}  />
      </div>
      <ChartWrapper
        title="Growth Over Time"
        data={result.chart}
        series={SERIES}
        xKey="year"
        availableTypes={['bar', 'line', 'area', 'pie']}
        formatValue={formatINR}
        formatX={v => `Y${v}`}
        pieData={pieData}
      />
    </div>
  )

  return (
    <>
      <Helmet>
        <title>SIP Calculator – Calculate SIP Returns Online | FinCalcAI</title>
        <meta name="description" content="Calculate SIP returns online. Know your total corpus, wealth gained and absolute returns with our free SIP calculator for India." />
        <meta name="keywords" content="SIP calculator, SIP returns calculator, mutual fund SIP calculator India" />
        <link rel="canonical" href="https://calcai.in/sip-calculator" />
      </Helmet>
      <CalcLayout
        title="SIP Calculator"
        subtitle="Calculate the wealth you can build through monthly SIP investments."
        result={stats}
        affiliatePartner="groww"
        calcType="sip"
        aiHint="How much SIP do I need to reach ₹1 Crore in 15 years?"
        faqs={FAQS}
        pageUrl="/sip-calculator"
        description="Free SIP calculator for India. Calculate mutual fund SIP returns, total corpus and wealth gained online."
      >
        <SliderInput label="Monthly SIP Amount"     value={monthly} onChange={setMonthly} min={500}  max={100000} step={500}  prefix="₹" />
        <SliderInput label="Expected Annual Return" value={rate}    onChange={setRate}    min={1}    max={30}     step={0.5}  suffix="%" />
        <SliderInput label="Investment Period"      value={years}   onChange={setYears}   min={1}    max={40}                suffix=" yr" />
      </CalcLayout>
    </>
  )
}
