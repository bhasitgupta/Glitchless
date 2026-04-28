import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <div className="max-w-[800px] mx-auto px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-[var(--secondary)] mb-12">Last updated: January 2024</p>

          <div className="space-y-8 text-[var(--secondary)] leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p>By accessing or using Glitchless, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
              <p>Glitchless provides AI-powered log analysis and auto-fix suggestions for deployment errors. The service includes log file analysis, repository scanning, plain English translations of technical errors, and suggested code fixes.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. User Responsibilities</h2>
              <p className="mb-4">You are responsible for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Maintaining the confidentiality of your account</li>
                <li>All activities that occur under your account</li>
                <li>Ensuring that the log files you upload do not contain sensitive personal information of third parties without their consent</li>
                <li>Reviewing and testing suggested fixes before applying them to production environments</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Intellectual Property</h2>
              <p>The service and its original content, features, and functionality are owned by Glitchless and are protected by international copyright, trademark, and other intellectual property laws. Our suggested fixes and code modifications are provided for your use but remain subject to any existing licenses of the original code.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Limitation of Liability</h2>
              <p>Glitchless shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service. Our AI-generated suggestions are provided as-is and should be reviewed before implementation.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Termination</h2>
              <p>We may terminate or suspend your account immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, your right to use the service will immediately cease.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Governing Law</h2>
              <p>These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. We will provide notice of significant changes by posting the updated Terms on this page. Your continued use of the service after changes constitutes acceptance of the new Terms.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Contact</h2>
              <p>If you have questions about these Terms, please contact us through our <a href="/support" className="text-[var(--accent)] no-underline hover:underline">Support Center</a>.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
