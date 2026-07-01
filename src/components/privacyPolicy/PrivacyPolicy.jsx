import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
          {/* Header */}
          <div className="border-b border-gray-200 pb-8 mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>

            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-semibold">Effective Date:</span> May 5,
                2026
              </p>
              <p>
                <span className="font-semibold">Last Updated:</span> May 5, 2026
              </p>
            </div>

            <p className="mt-6 text-gray-700 leading-8">
              Smart Print Help ("we," "our," or "us") operates the website{" "}
              <span className="font-semibold">
                www.smartprinthelp.com
              </span>
              . This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit or make a purchase from
              our website.
            </p>

            <p className="mt-4 text-gray-700 leading-8 font-medium">
              By using our website, you agree to the terms outlined in this
              policy.
            </p>
          </div>

          {/* Section 1 */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              1. Information We Collect
            </h2>

            <p className="text-gray-700 leading-8 mb-6">
              We collect information to provide and improve our services.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Personal Information
            </h3>

            <p className="text-gray-700 mb-4">
              When you interact with our website, we may collect:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Billing and shipping address</li>
              <li>
                Payment details (processed securely via third-party providers)
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              Non-Personal Information
            </h3>

            <p className="text-gray-700 mb-4">
              We may automatically collect:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>IP address</li>
              <li>Browser type and device information</li>
              <li>Pages visited and time spent on the site</li>
              <li>Cookies and usage data</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              2. How We Use Your Information
            </h2>

            <p className="text-gray-700 mb-4">
              We use your information to:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Process and fulfill orders</li>
              <li>Provide order updates and customer support</li>
              <li>Improve website functionality and user experience</li>
              <li>
                Send updates or promotional communications (if opted-in)
              </li>
              <li>Prevent fraud and maintain website security</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              3. Cookies & Tracking Technologies
            </h2>

            <p className="text-gray-700 mb-4">
              We use cookies and similar technologies to:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Improve browsing experience</li>
              <li>Analyze website traffic and performance</li>
              <li>Store user preferences</li>
            </ul>

            <p className="mt-5 text-gray-700">
              You can control or disable cookies through your browser settings.
            </p>
          </div>

          {/* Section 4 */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              4. Sharing of Information
            </h2>

            <p className="text-gray-700 mb-4">
              We do not sell or rent your personal information.
            </p>

            <p className="text-gray-700 mb-4">
              We may share information with:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                Service providers (payment processors, shipping partners,
                analytics tools)
              </li>
              <li>Legal authorities when required by law</li>
              <li>
                Internal operations for fraud prevention and policy enforcement
              </li>
            </ul>

            <p className="mt-5 text-gray-700">
              All third parties are required to protect your data.
            </p>
          </div>

          {/* Section 5 */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              5. Data Security
            </h2>

            <p className="text-gray-700 leading-8">
              We implement appropriate security measures to protect your
              information from unauthorized access, misuse, or disclosure.
            </p>

            <p className="mt-5 text-gray-700 leading-8">
              However, no online system is completely secure, and we cannot
              guarantee absolute security.
            </p>
          </div>

          {/* Section 6 */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              6. Your Rights (U.S. & Canada Users)
            </h2>

            <p className="text-gray-700 mb-4">
              Depending on your location, you may have the right to:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Access the personal data we hold about you</li>
              <li>Request correction or deletion</li>
              <li>Opt out of marketing communications</li>
            </ul>

            <p className="mt-5 text-gray-700">
              To exercise your rights, contact us at{" "}
              <a
                href="mailto:support@smartprinthelp.com"
                className="text-[#EF4056] font-medium hover:underline"
              >
                support@smartprinthelp.com
              </a>
              .
            </p>
          </div>

          {/* Section 7 */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              7. California Privacy Rights (CCPA/CPRA)
            </h2>

            <p className="text-gray-700 mb-4">
              If you are a California resident, you have rights under the
              California Consumer Privacy Act (CCPA) and California Privacy
              Rights Act (CPRA), including:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                The right to request access to the personal data we collect
              </li>
              <li>The right to request deletion of your personal data</li>
              <li>
                The right to request information about how your data is
                collected, used, and shared
              </li>
            </ul>

            <p className="mt-5 text-gray-700">
              To submit a request, contact us at{" "}
              <a
                href="mailto:support@smartprinthelp.com"
                className="text-[#EF4056] font-medium hover:underline"
              >
                support@smartprinthelp.com
              </a>
              .
            </p>

            <p className="mt-4 text-gray-700">
              We will respond to verified requests in accordance with applicable
              laws.
            </p>
          </div>

          {/* Section 8 */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              8. Third-Party Links
            </h2>

            <p className="text-gray-700 leading-8">
              Our website may include links to third-party websites, including
              official printer brand websites for product support, software
              downloads, and warranty services.
            </p>

            <p className="mt-5 text-gray-700 leading-8">
              We are not responsible for the privacy practices or content of
              these external websites.
            </p>
          </div>

          {/* Section 9 */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              9. Independent Retailer Notice
            </h2>

            <p className="text-gray-700 leading-8">
              Smart Print Help operates as an independent retailer and is not
              affiliated with or authorized by any printer manufacturer unless
              explicitly stated.
            </p>

            <p className="mt-5 text-gray-700 leading-8">
              All trademarks, logos, and brand names belong to their respective
              owners. Official product support and warranty services are
              available directly through the respective brand’s official website.
            </p>
          </div>

          {/* Section 10 */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              10. Children's Privacy
            </h2>

            <p className="text-gray-700 leading-8">
              Our website is not intended for individuals under the age of 13.
              We do not knowingly collect personal information from children.
            </p>
          </div>

          {/* Section 11 */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              11. Changes to This Privacy Policy
            </h2>

            <p className="text-gray-700 leading-8">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated effective date.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-[#f9fafb] rounded-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              12. Contact Information
            </h2>

            <p className="text-gray-700 leading-8 mb-5">
              If you have any questions about this Privacy Policy or your
              personal data, please contact us:
            </p>

            <div className="space-y-2 text-gray-700">
              <p className="font-semibold">Smart Print Help</p>
              <p>23224 Crenshaw Blvd</p>
              <p>Torrance, CA 90505</p>
              <p>United States</p>

              <p className="pt-4">
                📧{" "}
                <a
                  href="mailto:support@smartprinthelp.com"
                  className="text-[#EF4056] hover:underline"
                >
                  support@smartprinthelp.com
                </a>
              </p>

              <p>
                🌐{" "}
                <a
                  href="https://www.smartprinthelp.com"
                  className="text-[#EF4056] hover:underline"
                >
                  www.smartprinthelp.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;