import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import CalcLayout from '../components/CalcLayout'
import SliderInput from '../components/SliderInput'
import StatCard from '../components/StatCard'
import { calculateGratuity } from '../calculators/gratuity'
import { formatShort, formatINR } from '../utils/format'

const FAQS = [
  { q: 'Who is eligible for gratuity in India?', a: 'Any employee who has completed 5 or more years of continuous service with the same employer is eligible for gratuity under the Payment of Gratuity Act, 1972. The rule applies to organisations with 10 or more employees.' },
  { q: 'What is the formula for gratuity calculation?', a: 'For employees covered under the Gratuity Act: Gratuity = (Basic + DA) × 15 × Years of Service ÷ 26. For those not covered: the divisor is 30 instead of 26. The 15/26 ratio represents 15 working days out of 26 working days in a month.' },
  { q: 'Is gratuity taxable in India?', a: 'Gratuity received by a government employee is fully tax-exempt. For private sector employees, gratuity up to ₹20 Lakhs is tax-free. Any amount above ₹20 Lakhs is added to your income and taxed at your applicable slab rate.' },
  { q: 'Can I receive gratuity before completing 5 years?', a: 'Generally no. The 5-year minimum service is mandatory. However, in case of death or disablement of the employee, gratuity is payable regardless of years of service.' },
  { q: 'When must the employer pay gratuity?', a: 'The employer must pay gratuity within 30 days of it becoming due. If payment is delayed, the employer is liable to pay simple interest at the rate prescribed by the government from the due date.' },
  { q: 'Is gratuity paid on basic salary or CTC?', a: 'Gratuity is calculated on Basic Salary + Dearness Allowance (DA), not on the total CTC. Typically, Basic salary is 40–50% of CTC, so the actual gratuity is calculated on that component only.' },
]

export default function GratuityCalculator() {
  const [salary, setSalary] = useState(50000)
  const [years, setYears] = useState(5)
  const [covered, setCovered] = useState(true)

  const result = useMemo(() => calculateGratuity({ basicPlusDA: salary, yearsOfService: years, coveredUnderAct: covered }), [salary, years, covered])

  const stats = (
    <div className="grid grid-cols-2 gap-3">
      <StatCard label="Gratuity Amount" value={formatShort(result.gratuityAmount)} highlight />
      <StatCard label="Tax-Free Amount" value={formatShort(result.taxFree)} />
      <StatCard label="Taxable Amount" value={formatINR(result.taxable)} />
      <StatCard label="Tax-Free Limit" value="₹20 Lakhs" />
    </div>
  )

  return (
    <>
      <Helmet>
        <title>Gratuity Calculator India – Check Your Gratuity Amount | FinCalcAI</title>
        <meta name="description" content="Calculate your gratuity amount instantly. Know the tax-free portion and taxable gratuity as per Payment of Gratuity Act India." />
        <meta name="keywords" content="gratuity calculator India, gratuity calculation formula, payment of gratuity act" />
        <link rel="canonical" href="https://calcai.in/gratuity-calculator" />
      </Helmet>
      <CalcLayout
        title="Gratuity Calculator"
        subtitle="Calculate gratuity based on Payment of Gratuity Act, 1972."
        result={stats}
        affiliatePartner="policybazaar"
        calcType="gratuity"
        aiHint="Is my gratuity taxable if I worked 8 years?"
        faqs={FAQS}
        pageUrl="/gratuity-calculator"
        description="Free gratuity calculator India. Calculate gratuity amount as per Payment of Gratuity Act 1972."
      >
        <SliderInput label="Basic + DA (Monthly)" value={salary} onChange={setSalary} min={10000} max={500000} step={1000} prefix="₹" />
        <SliderInput label="Years of Service" value={years} onChange={setYears} min={1} max={40} suffix=" yr" />
        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700 block mb-2">Covered under Gratuity Act?</label>
          <div className="flex gap-2">
            {[[true, 'Yes (÷26)'], [false, 'No (÷30)']].map(([val, label]) => (
              <button
                key={String(val)}
                onClick={() => setCovered(val)}
                className={`flex-1 rounded-lg py-2 text-sm font-semibold border transition-colors ${covered === val ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </CalcLayout>
    </>
  )
}
