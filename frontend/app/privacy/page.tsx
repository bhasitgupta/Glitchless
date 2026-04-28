import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <div className="max-w-[800px] mx-auto px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-[var(--secondary)] mb-12">Last updated: January 2024</p>

          <div className="space-y-8 text-[var(--secondary)] leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
              <p className="mb-4">We collect information you provide directly to us, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Account information (name, email, GitHub profile)</li>
                <li>Log files and repository URLs you submit for analysis</li>
                <li>Settings and preferences</li>
                <li>Communication data (support requests)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Analyze log files and generate insights</li>
                <li>Send you technical notifications and updates</li>
                <li>Respond to your comments, questions, and support requests</li>
                <li>Monitor and analyze trends, usage, and activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Data Security</h2>
              <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. All log files are encrypted in transit and at rest. We never store your logs after analysis is complete unless you explicitly choose to save them.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Third-Party Services</h2>
              <p>We may employ third-party companies and individuals to facilitate our services, provide the service on our behalf, or assist us in analyzing how our service is used. These third parties have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us through our <a href="/support" className="text-[var(--accent)] no-underline hover:underline">Support Center</a>.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
