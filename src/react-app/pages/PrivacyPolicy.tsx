import Footer from "@/react-app/components/Footer";
import PageHeader from "@/react-app/components/PageHeader";

export default function PrivacyPolicy() {

  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHeader eyebrow="Legal" title="Nana Sans Tandoori Kitchen Privacy Policy" intro="How we collect, use and protect your information." />

      {/* Content */}
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="prose prose-stone max-w-none space-y-8">
          <p className="text-cocoa-400 text-sm">
            Last updated: 3 August 2026
          </p>

          <section>
            <h2 className="mb-3 font-display text-2xl text-ink">Introduction</h2>
            <p className="text-cocoa-500 leading-relaxed">
              Nana Sans Tandoori Kitchen ("we", "our", or "us") operates a restaurant located in Canggu, Bali, Indonesia. 
              This Privacy Policy explains how we collect, use, and protect your personal information when you visit our 
              website or dine at our restaurant.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl text-ink">Information We Collect</h2>
            <p className="text-cocoa-500 leading-relaxed mb-3">
              We may collect the following types of information:
            </p>
            <ul className="list-disc list-inside text-cocoa-500 space-y-2">
              <li><strong>Contact Information:</strong> Name, phone number, and email address when you make a reservation or contact us via WhatsApp</li>
              <li><strong>Reservation Details:</strong> Date, time, party size, and any special requests or dietary requirements</li>
              <li><strong>Website Usage Data:</strong> Anonymous browsing data such as pages visited and time spent on site</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl text-ink">How We Use Your Information</h2>
            <p className="text-cocoa-500 leading-relaxed mb-3">
              We use your information to:
            </p>
            <ul className="list-disc list-inside text-cocoa-500 space-y-2">
              <li>Process and confirm your table reservations</li>
              <li>Accommodate dietary requirements and special requests</li>
              <li>Respond to your enquiries via WhatsApp or other channels</li>
              <li>Improve our website and services</li>
              <li>Send promotional offers (only with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl text-ink">Third-Party Services</h2>
            <p className="text-cocoa-500 leading-relaxed">
              Our website may include links to third-party services such as WhatsApp for reservations, 
              Google Maps for directions, Gojek/GoFood for delivery orders, and Instagram for social media. 
              These services have their own privacy policies, and we encourage you to review them. 
              We are not responsible for the privacy practices of these external services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl text-ink">Data Security</h2>
            <p className="text-cocoa-500 leading-relaxed">
              We take reasonable measures to protect your personal information from unauthorized access, 
              alteration, or destruction. However, no internet transmission is completely secure, and we 
              cannot guarantee absolute security of data transmitted to our website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl text-ink">Data Retention</h2>
            <p className="text-cocoa-500 leading-relaxed">
              We retain your personal information only for as long as necessary to fulfill the purposes 
              outlined in this policy, or as required by law. Reservation data is typically retained 
              for up to 12 months for operational purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl text-ink">Your Rights</h2>
            <p className="text-cocoa-500 leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-cocoa-500 space-y-2">
              <li>Request access to the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Withdraw consent for marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl text-ink">Contact Us</h2>
            <p className="text-cocoa-500 leading-relaxed">
              If you have any questions about this Privacy Policy or wish to exercise your rights, 
              please contact us via WhatsApp at +62 812 3456 4499 or visit us at our restaurant in 
              Canggu, Bali.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl text-ink">Changes to This Policy</h2>
            <p className="text-cocoa-500 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this 
              page with an updated revision date. We encourage you to review this policy periodically.
            </p>
          </section>
        </div>

      </div>

      <Footer />
    </div>
  );
}
