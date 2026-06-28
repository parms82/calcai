import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MobileBottomNav from './components/MobileBottomNav'

const Home = lazy(() => import('./pages/Home'))
const SipCalculator = lazy(() => import('./pages/sip-calculator'))
const EmiCalculator = lazy(() => import('./pages/emi-calculator'))
const IncomeTaxCalculator = lazy(() => import('./pages/income-tax-calculator'))
const GratuityCalculator = lazy(() => import('./pages/gratuity-calculator'))
const SalaryHikeCalculator = lazy(() => import('./pages/salary-hike-calculator'))
const HomeLoanCalculator = lazy(() => import('./pages/home-loan-eligibility-calculator'))
const FdCalculator = lazy(() => import('./pages/fd-calculator'))
const PpfCalculator = lazy(() => import('./pages/ppf-calculator'))
const Pricing = lazy(() => import('./pages/pricing'))
const BlogIndex = lazy(() => import('./pages/blog/index'))
const BlogPost = lazy(() => import('./pages/blog/BlogPost'))
const About = lazy(() => import('./pages/about'))
const Contact = lazy(() => import('./pages/contact'))
const PrivacyPolicy = lazy(() => import('./pages/privacy-policy'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin h-8 w-8 rounded-full border-4 border-emerald-600 border-t-transparent" />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pb-16 md:pb-0">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sip-calculator" element={<SipCalculator />} />
              <Route path="/emi-calculator" element={<EmiCalculator />} />
              <Route path="/income-tax-calculator" element={<IncomeTaxCalculator />} />
              <Route path="/gratuity-calculator" element={<GratuityCalculator />} />
              <Route path="/salary-hike-calculator" element={<SalaryHikeCalculator />} />
              <Route path="/home-loan-eligibility-calculator" element={<HomeLoanCalculator />} />
              <Route path="/fd-calculator" element={<FdCalculator />} />
              <Route path="/ppf-calculator" element={<PpfCalculator />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    </BrowserRouter>
  )
}
