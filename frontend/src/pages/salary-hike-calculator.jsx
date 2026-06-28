import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import CalcLayout from '../components/CalcLayout'
import SliderInput from '../components/SliderInput'
import StatCard from '../components/StatCard'
import ChartWrapper from '../components/ChartWrapper'
import { calculateSalaryHike } from '../calculators/salary-hike'
import { formatShort, formatINR } from '../utils/format'

const FAQS = [
  { q: 'What is CTC and how is it different from take-home salary?', a: 'CTC (Cost to Company) is the total amount the employer spends on you annually, including PF contribution, gratuity component, health insurance, and other benefits. Take-home salary is what is actually credited to your bank account after deductions like employee PF, professional tax, and income tax.' },
  { q: 'How is in-hand salary calculated from CTC?', a: 'A rough estimate: Monthly In-Hand = (CTC ÷ 12) − PF deduction (12% of basic) − Professional Tax (₹200/month) − Income Tax TDS. For a ₹10L CTC, the monthly in-hand is typically ₹68,000–₹73,000 depending on your tax slab.' },
  { q: 'What is a good salary hike percentage in India?', a: 'A hike of 8–12% is considered average in the Indian IT and corporate sector. A hike of 15–20% is considered good. Switching jobs typically yields 20–40% hikes. The tech sector saw higher hikes of 15–25% during 2021–22, but normalised to 8–12% post-2023.' },
  { q: 'Does salary hike affect PF deduction?', a: 'Yes. If your basic salary increases, your PF deduction (12% of basic) also increases proportionally. This reduces your take-home salary increase but builds your retirement corpus. If your basic exceeds ₹15,000/month, PF is calculated on the actual basic up to ₹15,000 unless your employer follows a higher contribution policy.' },
  { q: 'What is the difference between gross salary and net salary?', a: 'Gross salary is your salary before tax and PF deductions but after HRA and allowances are added. Net salary (take-home) is gross salary minus income tax (TDS), employee PF (12% of basic), and professional tax.' },
  { q: 'Is variable pay included in CTC?', a: 'Yes, most companies include variable pay (performance bonus) in CTC. However, variable pay is not guaranteed — it depends on your and company performance. When calculating your effective monthly salary, it is safer to consider only the fixed component of CTC.' },
]

const SERIES = [
  { key: 'value', name: 'CTC', color: '#059669' },
]

export default function SalaryHikeCalculator() {
  const [ctc, setCtc] = useState(800000)
  const [hike, setHike] = useState(15)
  const [deductions, setDeductions] = useState(5000)

  const result = useMemo(
    () => calculateSalaryHike({ currentCTC: ctc, hikePct: hike, monthlyDeductions: deductions }),
    [ctc, hike, deductions]
  )

  const barData = [
    { label: 'Current CTC', value: Math.round(ctc) },
    { label: 'New CTC',     value: Math.round(result.newCTC) },
  ]

  const pieData = [
    { name: 'Previous CTC',  value: Math.round(ctc),                  color: '#6ee7b7' },
    { name: 'Annual Hike',   value: Math.round(result.annualIncrease), color: '#059669' },
  ]

  const stats = (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="New Annual CTC"   value={formatShort(result.newCTC)}         highlight />
        <StatCard label="Annual Increase"  value={formatShort(result.annualIncrease)} />
        <StatCard label="Monthly Gross"    value={formatINR(result.monthlyGross)}     />
        <StatCard label="Monthly In-Hand"  value={formatINR(result.monthlyInhand)}    />
      </div>
      <ChartWrapper
        title="CTC Before vs After"
        data={barData}
        series={SERIES}
        xKey="label"
        availableTypes={['bar', 'pie']}
        formatValue={formatINR}
        formatX={v => v}
        pieData={pieData}
      />
    </div>
  )

  return (
    <>
      <Helmet>
        <title>Salary Hike Calculator – Calculate New In-Hand Salary | FinCalcAI</title>
        <meta name="description" content="Calculate your new in-hand salary after appraisal hike. Know monthly gross, take-home, and annual increase with our salary hike calculator." />
        <meta name="keywords" content="salary hike calculator, salary increment calculator India, new take home salary" />
        <link rel="canonical" href="https://calcai.in/salary-hike-calculator" />
      </Helmet>
      <CalcLayout
        title="Salary Hike Calculator"
        subtitle="Find out your new in-hand salary after your appraisal."
        result={stats}
        affiliatePartner="cleartax"
        calcType="salary-hike"
        aiHint="What is my in-hand salary after a 20% hike on ₹10L CTC?"
        faqs={FAQS}
        pageUrl="/salary-hike-calculator"
        description="Salary hike calculator India. Find your new CTC, monthly gross and in-hand salary after appraisal."
        intro={
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Why Your In-Hand Hike Is Always Less Than the CTC Hike</h2>
            <p>
              A 20% salary hike on a ₹10L CTC sounds like ₹2 Lakhs more per year — but your monthly
              in-hand increase will be closer to ₹12,000–₹14,000, not ₹16,666. This gap exists because:
              (1) your <strong>income tax slab increases</strong> with higher income, (2) your
              <strong>PF deduction</strong> rises proportionally with basic salary, and (3) some hike
              may go to the gratuity component, which you only receive after 5 years of service.
            </p>
            <h3 className="text-base font-semibold text-gray-800">CTC vs In-Hand: The Real Numbers</h3>
            <p>
              For a typical salaried employee in India, the monthly in-hand salary is approximately
              <strong>70–78% of the monthly CTC</strong>. The remaining 22–30% covers employer PF
              contribution, gratuity provision, health insurance premium, and income tax deducted at source.
              The exact figure depends heavily on your tax regime choice, deductions claimed, and your
              employer's salary structuring.
            </p>
            <h3 className="text-base font-semibold text-gray-800">How to Maximise Your In-Hand From a Hike</h3>
            <p>
              Ask your HR to restructure your new salary with higher special allowance and lower basic (this
              reduces PF, though it also lowers future gratuity). Choose the tax regime that saves more tax for
              your new income level — a regime that was optimal at ₹10L CTC may not be optimal at ₹12L. Use
              our <a href="/income-tax-calculator" className="text-emerald-700 underline">Income Tax Calculator</a>{' '}
              to compare both regimes after the hike.
            </p>
          </div>
        }
      >
        <SliderInput label="Current Annual CTC"            value={ctc}        onChange={setCtc}        min={200000} max={5000000} step={50000} prefix="₹" />
        <SliderInput label="Hike Percentage"               value={hike}       onChange={setHike}       min={1}      max={100}               suffix="%" />
        <SliderInput label="Monthly Deductions (PF, PT)"  value={deductions} onChange={setDeductions} min={0}      max={20000}  step={500}  prefix="₹" />
      </CalcLayout>
    </>
  )
}
