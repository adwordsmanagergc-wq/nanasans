import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    // Set canonical URL for this page
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonical) {
      canonical.href = "https://nanasans.com/privacy";
    } else {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      canonical.href = "https://nanasans.com/privacy";
      document.head.appendChild(canonical);
    }
    
    return () => {
      // Reset to home canonical when leaving
      if (canonical) {
        canonical.href = "https://nanasans.com/";
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800">
      {/* Header */}
      <div className="bg-stone-900 py-6 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-100">
            Privacy Policy
          </h1>
          <p className="text-stone-400 mt-2">
            Nana Sans Tandoori Kitchen
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="prose prose-stone max-w-none space-y-8">
          <p className="text-stone-600 text-sm">
            Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">Introduction</h2>
            <p className="text-stone-700 leading-relaxed">
              Nana Sans Tandoori Kitchen ("we", "our", or "us") operates a restaurant located in Canggu, Bali, Indonesia. 
              This Privacy Policy explains how we collect, use, and protect your personal information when you visit our 
              website or dine at our restaurant.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">Information We Collect</h2>
            <p className="text-stone-700 leading-relaxed mb-3">
              We may collect the following types of information:
            </p>
            <ul className="list-disc list-inside text-stone-700 space-y-2">
              <li><strong>Contact Information:</strong> Name, phone number, and email address when you make a reservation or contact us via WhatsApp</li>
              <li><strong>Reservation Details:</strong> Date, time, party size, and any special requests or dietary requirements</li>
              <li><strong>Website Usage Data:</strong> Anonymous browsing data such as pages visited and time spent on site</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">How We Use Your Information</h2>
            <p className="text-stone-700 leading-relaxed mb-3">
              We use your information to:
            </p>
            <ul className="list-disc list-inside text-stone-700 space-y-2">
              <li>Process and confirm your table reservations</li>
              <li>Accommodate dietary requirements and special requests</li>
              <li>Respond to your enquiries via WhatsApp or other channels</li>
              <li>Improve our website and services</li>
              <li>Send promotional offers (only with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">Third-Party Services</h2>
            <p className="text-stone-700 leading-relaxed">
              Our website may include links to third-party services such as WhatsApp for reservations, 
              Google Maps for directions, Gojek/GoFood for delivery orders, and Instagram for social media. 
              These services have their own privacy policies, and we encourage you to review them. 
              We are not responsible for the privacy practices of these external services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">Data Security</h2>
            <p className="text-stone-700 leading-relaxed">
              We take reasonable measures to protect your personal information from unauthorized access, 
              alteration, or destruction. However, no internet transmission is completely secure, and we 
              cannot guarantee absolute security of data transmitted to our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">Data Retention</h2>
            <p className="text-stone-700 leading-relaxed">
              We retain your personal information only for as long as necessary to fulfill the purposes 
              outlined in this policy, or as required by law. Reservation data is typically retained 
              for up to 12 months for operational purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">Your Rights</h2>
            <p className="text-stone-700 leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-stone-700 space-y-2">
              <li>Request access to the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Withdraw consent for marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">Contact Us</h2>
            <p className="text-stone-700 leading-relaxed">
              If you have any questions about this Privacy Policy or wish to exercise your rights, 
              please contact us via WhatsApp at +62 812 3456 4499 or visit us at our restaurant in 
              Canggu, Bali.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">Changes to This Policy</h2>
            <p className="text-stone-700 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this 
              page with an updated revision date. We encourage you to review this policy periodically.
            </p>
          </section>
        </div>

        {/* Back Link */}
        <div className="mt-12 pt-8 border-t border-stone-300">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
