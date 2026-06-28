import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import CalcLayout from '../components/CalcLayout'
import SliderInput from '../components/SliderInput'
import StatCard from '../components/StatCard'
import LeadCaptureForm from '../components/LeadCaptureForm'
import { calculateHomeLoanEligibility } from '../calculators/home-loan-eligibility'
import { formatShort, formatINR, formatPct } from '../utils/format'

const FAQS = [
  { q: 'What is FOIR and how does it affect home loan eligibility?', a: 'FOIR (Fixed Obligation to Income Ratio) is the percentage of your monthly income that goes towards EMI payments. Banks allow a maximum FOIR of 40–50%. So if your income is ₹80,000/month, your total EMI obligations (including the new home loan) cannot exceed ₹40,000.' },
  { q: 'What is the minimum salary required for a home loan?', a: 'There is no fixed minimum, but most banks require a minimum net monthly income of ₹25,000–₹30,000 for home loans. The actual loan amount depends on your income, existing obligations, credit score, and the property value.' },
  { q: 'Does CIBIL score affect home loan eligibility?', a: 'Yes, significantly. A CIBIL score above 750 gives you the best interest rates and highest approval chances. Scores between 650–750 may still get approval but at higher rates. Below 650, most banks will reject the application.' },
  { q: 'Can I get a home loan with existing car or personal loan EMIs?', a: 'Yes, but your existing EMIs reduce your home loan eligibility. For example, if you earn ₹80,000/month and pay ₹15,000 as car EMI, the maximum new home loan EMI the bank will approve is ₹25,000 (50% of income minus existing EMI).' },
  { q: 'How can I increase my home loan eligibility?', a: 'You can increase eligibility by: (1) adding a co-applicant with income, (2) closing existing loans before applying, (3) choosing a longer tenure, (4) improving your CIBIL score, and (5) including all income sources like rent and freelance income.' },
  { q: 'What documents are needed for a home loan application?', a: 'Typically: PAN card, Aadhaar, last 3 months salary slips, last 6 months bank statements, Form 16, IT returns (2 years), property documents, and passport-size photos. Self-employed applicants need ITR for 3 years and business proof.' },
]

export default function HomeLoanEligibilityCalculator() {
  const [income, setIncome] = useState(80000)
  const [existingEMIs, setExistingEMIs] = useState(0)
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(20)

  const result = useMemo(() => calculateHomeLoanEligibility({ monthlyIncome: income, existingEMIs, interestRate: rate, tenureYears: tenure }), [income, existingEMIs, rate, tenure])

  const stats = (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Max Eligible Loan" value={formatShort(result.maxLoan)} highlight />
        <StatCard label="Affordable EMI" value={formatINR(result.affordableEMI)} />
        <StatCard label="Your FOIR" value={formatPct(result.foirUsed)} />
        <StatCard label="Max FOIR Allowed" value="50%" />
      </div>
      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
        <strong>FOIR Rule:</strong> Banks allow up to 50% of monthly income as total EMI outgo. Your current FOIR is {formatPct(result.foirUsed)}.
      </div>
      <LeadCaptureForm calculator="home-loan" />
    </div>
  )

  return (
    <>
      <Helmet>
        <title>Home Loan Eligibility Calculator – Check Max Loan Amount | FinCalcAI</title>
        <meta name="description" content="Check your home loan eligibility instantly. Know the maximum loan amount you can get based on your income, existing EMIs and FOIR ratio." />
        <meta name="keywords" content="home loan eligibility calculator, home loan eligibility India, max home loan amount" />
        <link rel="canonical" href="https://calcai.in/home-loan-eligibility-calculator" />
      </Helmet>
      <CalcLayout
        title="Home Loan Eligibility Calculator"
        subtitle="Find the maximum home loan you can get based on your income."
        result={stats}
        affiliatePartner="hdfc"
        calcType="home-loan"
        aiHint="What is the maximum home loan I can get on ₹1L monthly salary?"
        faqs={FAQS}
        pageUrl="/home-loan-eligibility-calculator"
        description="Home loan eligibility calculator India. Check maximum loan amount based on your income and existing EMIs."
        intro={
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">How Banks Calculate Your Home Loan Eligibility</h2>
            <p>
              Banks use a metric called <strong>FOIR (Fixed Obligation to Income Ratio)</strong> to determine
              your home loan eligibility. The rule is simple: your total monthly EMI obligations — including
              the proposed new loan — should not exceed 40–50% of your net monthly income. If your income
              is ₹1 Lakh and you have no existing EMIs, the bank will approve a loan whose EMI is at most
              ₹50,000 per month.
            </p>
            <p>
              Back-calculating from the maximum EMI to the loan amount: at 8.5% interest over 20 years,
              every ₹1 Lakh of loan requires approximately ₹868 in monthly EMI. So an allowable EMI of
              ₹50,000 translates to a <strong>maximum loan of approximately ₹57.5 Lakhs</strong>.
            </p>
            <h3 className="text-base font-semibold text-gray-800">Other Factors Banks Consider</h3>
            <p>
              Beyond FOIR, your eligibility also depends on your <strong>CIBIL score</strong> (750+ gets
              the best rates), your <strong>age</strong> (the loan must be repaid before retirement age),
              your <strong>employment type</strong> (government employees get the most generous terms), and
              the <strong>property valuation</strong> (banks typically fund 75–90% of the property value).
            </p>
            <h3 className="text-base font-semibold text-gray-800">5 Ways to Increase Your Eligibility</h3>
            <p>
              Add a co-applicant (combines incomes), close existing personal or car loans before applying,
              choose a longer tenure (lowers per-month EMI requirement), improve your CIBIL score above 750,
              and include all documented income sources — rental income, professional fees, and freelance
              earnings all count if supported by bank statements and ITR.
            </p>
          </div>
        }
      >
        <SliderInput label="Monthly Net Income" value={income} onChange={setIncome} min={20000} max={500000} step={5000} prefix="₹" />
        <SliderInput label="Existing EMIs" value={existingEMIs} onChange={setExistingEMIs} min={0} max={100000} step={1000} prefix="₹" />
        <SliderInput label="Interest Rate" value={rate} onChange={setRate} min={6} max={15} step={0.1} suffix="%" />
        <SliderInput label="Loan Tenure" value={tenure} onChange={setTenure} min={5} max={30} suffix=" yr" />
      </CalcLayout>
    </>
  )
}
