import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | FinCalcAI</title>
        <meta name="description" content="FinCalcAI privacy policy — how we collect, use and protect your data when you use our free financial calculators." />
        <link rel="canonical" href="https://calcai.in/privacy-policy" />
      </Helmet>

      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-800 text-white py-10 px-4">
        <div className="mx-auto max-w-3xl">
          <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Privacy Policy' }]} />
          <h1 className="text-3xl font-extrabold mt-2">Privacy Policy</h1>
          <p className="mt-2 text-emerald-200">Last updated: June 2025</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-gray max-w-none space-y-8 text-gray-700">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
            <p>
              Welcome to FinCalcAI (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), accessible at{' '}
              <a href="https://calcai.in" className="text-emerald-700 underline">calcai.in</a>. We are
              committed to protecting your personal information and your right to privacy. This Privacy
              Policy explains what information we collect, how we use it, and what rights you have in
              relation to it.
            </p>
            <p className="mt-3">
              By using our website, you agree to the collection and use of information in accordance with
              this policy. If you do not agree with any part of this policy, please discontinue use of
              the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">a) Information You Provide</h3>
            <p>
              FinCalcAI calculators operate entirely in your browser. The financial figures you enter
              (monthly income, loan amount, SIP amount, etc.) are <strong>never sent to our servers</strong>{' '}
              and are not stored or logged anywhere. All calculations happen locally in your browser.
            </p>
            <p className="mt-3">
              If you use the AI assistant feature or submit a lead inquiry form, we may collect the
              query text and your email address (if provided) in order to respond to your request.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">b) Automatically Collected Information</h3>
            <p>When you visit our website, we automatically collect certain information, including:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Browser type and version</li>
              <li>Device type (desktop, mobile, tablet)</li>
              <li>Pages visited and time spent on each page</li>
              <li>Referring website URL</li>
              <li>General geographic location (country/city level, not precise location)</li>
              <li>IP address (anonymised where possible)</li>
            </ul>
            <p className="mt-3">
              This information is collected through cookies and similar tracking technologies described
              below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies to enhance your experience and to serve relevant advertisements. A cookie
              is a small text file stored on your device. You can instruct your browser to refuse all
              cookies or to indicate when a cookie is being sent.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Types of cookies we use:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Essential cookies:</strong> Required for the website to function. These cannot
                be disabled.
              </li>
              <li>
                <strong>Analytics cookies:</strong> We use Google Analytics to understand how visitors
                interact with the site. Google Analytics collects anonymised usage data. You can opt
                out by installing the{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  className="text-emerald-700 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>.
              </li>
              <li>
                <strong>Advertising cookies:</strong> We use Google AdSense to display relevant
                advertisements. Google and its partners may use cookies to serve ads based on your
                prior visits to this or other websites. You can opt out of personalised advertising
                by visiting{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  className="text-emerald-700 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Ads Settings
                </a>.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Google AdSense and Third-Party Advertising</h2>
            <p>
              We use Google AdSense to display advertisements on our website. Google AdSense uses
              cookies and web beacons to collect data about your visits to this and other websites to
              provide relevant advertisements.
            </p>
            <p className="mt-3">
              Google&rsquo;s use of advertising cookies enables it and its partners to serve ads based
              on your visit to FinCalcAI and/or other sites on the Internet. You may opt out of
              personalised advertising at{' '}
              <a
                href="https://www.aboutads.info"
                className="text-emerald-700 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                aboutads.info
              </a>{' '}
              or at{' '}
              <a
                href="https://www.networkadvertising.org/choices/"
                className="text-emerald-700 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                networkadvertising.org/choices
              </a>.
            </p>
            <p className="mt-3">
              For more information about Google&rsquo;s privacy practices, please visit{' '}
              <a
                href="https://policies.google.com/privacy"
                className="text-emerald-700 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Privacy Policy
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Provide and improve the website and calculator tools</li>
              <li>Analyse how the site is used so we can improve user experience</li>
              <li>Display relevant advertisements through Google AdSense</li>
              <li>Respond to AI assistant queries and contact form submissions</li>
              <li>Ensure the technical security and proper functioning of the website</li>
            </ul>
            <p className="mt-3">
              We do not sell, trade, or transfer your personally identifiable information to third
              parties, other than as described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Data Retention</h2>
            <p>
              We retain analytics data in anonymised form for up to 26 months. Contact form and AI
              query data is retained for up to 12 months to allow us to respond to follow-up queries.
              You may request deletion of your data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Children&rsquo;s Privacy</h2>
            <p>
              FinCalcAI is not directed at individuals under the age of 18. We do not knowingly
              collect personal information from children. If you believe we have inadvertently collected
              information from a minor, please contact us and we will promptly delete it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of personalised advertising</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us at the details below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any significant
              changes by updating the &ldquo;Last updated&rdquo; date at the top of this page. Your
              continued use of the website after any changes constitutes your acceptance of the updated
              policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact
              us:
            </p>
            <div className="mt-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="font-semibold text-gray-900">FinCalcAI</p>
              <p className="mt-1">
                Email:{' '}
                <a href="mailto:contact@calcai.in" className="text-emerald-700 underline">
                  contact@calcai.in
                </a>
              </p>
              <p className="mt-1">Website: <a href="https://calcai.in" className="text-emerald-700 underline">calcai.in</a></p>
            </div>
          </section>

          <div className="pt-4 border-t border-gray-200">
            <Link to="/contact" className="text-emerald-700 font-medium hover:underline">
              Contact Us →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
