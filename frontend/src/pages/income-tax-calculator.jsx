import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import CalcLayout from '../components/CalcLayout'
import SliderInput from '../components/SliderInput'
import StatCard from '../components/StatCard'
import ChartWrapper from '../components/ChartWrapper'
import { calculateIncomeTax } from '../calculators/income-tax'
import { formatShort, formatINR, formatPct } from '../utils/format'

const FAQS = [
  { q: 'What is the difference between old and new tax regime?', a: 'The old regime allows deductions like 80C (₹1.5L), HRA, home loan interest, and 80D, but has higher tax rates. The new regime has lower slab rates but does not allow most deductions. From FY 2024-25, the new regime is the default.' },
  { q: 'Can I switch between old and new tax regime every year?', a: 'Salaried employees can switch between regimes every financial year by informing their employer. Self-employed individuals and business owners can switch to the new regime only once — they cannot go back to the old regime after that.' },
  { q: 'What is the standard deduction in FY 2024-25?', a: 'The standard deduction is ₹50,000 in the old regime and ₹75,000 in the new regime for FY 2024-25. This is automatically applied to salaried income without requiring any proof.' },
  { q: 'Is HRA exempt in the new tax regime?', a: 'No. House Rent Allowance (HRA) exemption is not available in the new tax regime. If you pay high rent and claim significant HRA, the old regime is likely better for you.' },
  { q: 'What is the 87A tax rebate?', a: 'Section 87A provides a tax rebate of up to ₹12,500 in the old regime if your taxable income is ₹5 Lakhs or below. In the new regime, the rebate covers up to ₹25,000 for income up to ₹7 Lakhs, effectively making income up to ₹7L tax-free.' },
  { q: 'Is 80C deduction available in the new tax regime?', a: 'No. Deductions under Section 80C (PPF, ELSS, LIC premium, EPF, etc.) are not available in the new tax regime. Only a few exemptions like employer NPS contribution (80CCD(2)) remain.' },
]

function RegimeResult({ data, highlight }) {
  return (
    <div className={`rounded-2xl border p-4 ${highlight ? 'border-green-300 bg-green-50' : 'bg-white border-gray-100'} shadow-sm`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800">{data.label}</h3>
        {highlight && <span className="text-xs bg-green-100 text-green-700 font-medium px-2 py-0.5 rounded-full">Better Option</span>}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <StatCard label="Taxable Income" value={formatShort(data.taxableIncome)} />
        <StatCard label="Total Tax"      value={formatShort(data.totalTax)}      highlight={highlight} />
        <StatCard label="Effective Rate" value={formatPct(data.effectiveRate)}   />
        <StatCard label="Net Income"     value={formatShort(data.netIncome)}     />
      </div>
    </div>
  )
}

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState(1200000)
  const [ded80C, setDed80C] = useState(150000)
  const [hra, setHra] = useState(0)
  const [regime, setRegime] = useState('compare')

  const result = useMemo(
    () => calculateIncomeTax({ annualIncome: income, deductions80C: ded80C, hraExemption: hra, regime }),
    [income, ded80C, hra, regime]
  )

  // Chart data for bar comparison
  const compareChartData = regime === 'compare' && result.old
    ? [
        { label: 'Old Regime', tax: Math.round(result.old.totalTax) },
        { label: 'New Regime', tax: Math.round(result.new.totalTax) },
      ]
    : null

  // Pie: tax vs net income for the relevant result
  const activeResult = regime === 'compare'
    ? (result.winner === 'old' ? result.old : result.new)
    : result

  const pieTaxData = activeResult
    ? [
        { name: 'Total Tax',   value: Math.round(activeResult.totalTax), color: '#ef4444' },
        { name: 'Net Income',  value: Math.round(activeResult.netIncome), color: '#059669' },
      ]
    : []

  const stats = (
    <div className="space-y-4">
      {regime === 'compare' && result.old ? (
        <>
          <RegimeResult data={result.old} highlight={result.winner === 'old'} />
          <RegimeResult data={result.new} highlight={result.winner === 'new'} />
          <ChartWrapper
            title="Tax Comparison"
            data={compareChartData}
            series={[{ key: 'tax', name: 'Tax Payable', color: '#059669' }]}
            xKey="label"
            availableTypes={['bar', 'pie']}
            formatValue={formatINR}
            formatX={v => v}
            pieData={pieTaxData}
          />
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Taxable Income" value={formatShort(result.taxableIncome)} />
            <StatCard label="Total Tax"      value={formatShort(result.totalTax)}      highlight />
            <StatCard label="Cess (4%)"      value={formatINR(result.cess)}            />
            <StatCard label="Effective Rate" value={formatPct(result.effectiveRate)}   />
          </div>
          <ChartWrapper
            title="Tax vs Take-Home Breakdown"
            data={[{ label: result.label, tax: Math.round(result.totalTax) }]}
            series={[{ key: 'tax', name: 'Tax Payable', color: '#059669' }]}
            xKey="label"
            availableTypes={['bar', 'pie']}
            formatValue={formatINR}
            formatX={v => v}
            pieData={pieTaxData}
          />
        </>
      )}
    </div>
  )

  return (
    <>
      <Helmet>
        <title>Income Tax Calculator FY 2024-25 – Old vs New Regime | FinCalcAI</title>
        <meta name="description" content="Calculate income tax for FY 2024-25. Compare old and new tax regime side by side and find which saves more tax for your income." />
        <meta name="keywords" content="income tax calculator 2024-25, old vs new tax regime calculator India" />
        <link rel="canonical" href="https://calcai.in/income-tax-calculator" />
      </Helmet>
      <CalcLayout
        title="Income Tax Calculator FY 2024-25"
        subtitle="Compare Old vs New regime and find which saves you more tax."
        result={stats}
        affiliatePartner="cleartax"
        calcType="income-tax"
        aiHint="Which regime saves more if I have ₹2L in 80C investments?"
        faqs={FAQS}
        pageUrl="/income-tax-calculator"
        description="Income tax calculator FY 2024-25 India. Compare old vs new tax regime and calculate total tax payable."
        intro={
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Old vs New Tax Regime: Which Saves You More?</h2>
            <p>
              From FY 2024-25, the <strong>new tax regime is the default</strong> for all taxpayers. If you do not
              inform your employer otherwise, your TDS will be deducted under the new regime. The choice between
              regimes can mean a difference of ₹10,000–₹50,000 in annual tax depending on your income and deductions.
            </p>
            <h3 className="text-base font-semibold text-gray-800">New Regime: Lower Rates, No Deductions</h3>
            <p>
              The new regime offers lower slab rates and a standard deduction of ₹75,000. It eliminates most
              exemptions — HRA, LTA, 80C, 80D, home loan interest. If your total deductions are small, the new
              regime almost always wins. Income up to ₹7 Lakhs is effectively <strong>zero tax</strong> under the
              new regime due to the Section 87A rebate.
            </p>
            <h3 className="text-base font-semibold text-gray-800">Old Regime: Worth It If Deductions Are High</h3>
            <p>
              The old regime allows powerful deductions: <strong>₹1.5L under 80C</strong> (PPF, ELSS, LIC),
              HRA exemption (critical for metro renters), home loan interest up to ₹2L under Section 24(b), and
              ₹25,000–₹75,000 under 80D for health insurance. If your combined deductions exceed ₹3.5–4 Lakhs,
              the old regime typically results in lower tax. Use the "Compare Both" mode above to find your answer
              instantly.
            </p>
            <h3 className="text-base font-semibold text-gray-800">4% Health & Education Cess</h3>
            <p>
              Both regimes levy a 4% health and education cess on the calculated income tax. This is automatically
              included in the results shown above.
            </p>
          </div>
        }
      >
        <SliderInput label="Annual Income"    value={income}  onChange={setIncome}  min={250000} max={10000000} step={50000} prefix="₹" />
        <SliderInput label="80C Deductions"  value={ded80C}  onChange={setDed80C}  min={0}      max={150000}   step={5000}  prefix="₹" />
        <SliderInput label="HRA Exemption"   value={hra}     onChange={setHra}     min={0}      max={500000}   step={5000}  prefix="₹" />
        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700 block mb-2">Regime</label>
          <div className="grid grid-cols-3 gap-2">
            {[['old', 'Old Regime'], ['new', 'New Regime'], ['compare', 'Compare Both']].map(([val, label]) => (
              <button key={val} onClick={() => setRegime(val)}
                className={`rounded-lg py-2.5 text-xs font-semibold border transition-colors leading-tight text-center ${
                  regime === val ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'
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
