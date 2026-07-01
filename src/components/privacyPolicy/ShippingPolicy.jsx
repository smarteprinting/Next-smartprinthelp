import React from "react";

const ShippingPolicy = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
          {/* Header */}
          <div className="border-b border-gray-200 pb-8 mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Shipping Policy
            </h1>

            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-semibold">Effective Date:</span> May 5,
                2026
              </p>
              <p>
                <span className="font-semibold">Last Updated:</span> May 5,
                2026
              </p>
            </div>

            <p className="mt-6 text-gray-700 leading-8">
              Smart Print Help is committed to delivering your orders in a
              timely and reliable manner. This Shipping Policy outlines how we
              process, ship, and deliver orders across the United States and
              Canada.
            </p>
          </div>

          {/* 1 */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              1. Shipping Coverage
            </h2>

            <p className="text-gray-700 mb-4">
              We currently ship to:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>United States</li>
              <li>Canada</li>
            </ul>

            <p className="mt-5 text-gray-700">
              At this time, we do not offer international shipping outside
              these regions.
            </p>
          </div>

          {/* 2 */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              2. Shipping Cost
            </h2>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>Free Shipping:</strong> We offer free standard shipping
                on all orders across the United States and Canada.
              </li>
              <li>
                No hidden fees or additional shipping charges at checkout.
              </li>
            </ul>
          </div>

          {/* 3 */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              3. Order Processing Time
            </h2>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                Orders are typically processed within 1–3 business days after
                payment confirmation.
              </li>
              <li>
                Orders are not processed on weekends or public holidays.
              </li>
              <li>
                Processing times may vary during peak periods or due to high
                order volume.
              </li>
            </ul>
          </div>

          {/* 4 */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              4. Delivery Time
            </h2>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                Estimated delivery time: <strong>3–7 business days</strong>{" "}
                after dispatch.
              </li>
              <li>
                Delivery timelines may vary based on your location and carrier
                operations.
              </li>
              <li>
                Delivery times are estimates and are not guaranteed.
              </li>
            </ul>
          </div>

          {/* 5 */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              5. Order Tracking
            </h2>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                Once your order is shipped, you will receive a tracking number
                via email.
              </li>
              <li>
                You can use the tracking information to monitor your shipment in
                real time.
              </li>
            </ul>
          </div>

          {/* 6 */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              6. Shipping Partners
            </h2>

            <p className="text-gray-700 leading-8">
              We work with reliable and established shipping carriers to ensure
              safe and timely delivery of your orders.
            </p>
          </div>

          {/* 7 */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              7. Delays & Exceptions
            </h2>

            <p className="text-gray-700 mb-4">
              While we aim to meet estimated delivery timelines, delays may
              occur due to:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Weather conditions.</li>
              <li>Carrier issues.</li>
              <li>High demand periods.</li>
              <li>Incorrect or incomplete shipping information.</li>
            </ul>

            <p className="mt-5 text-gray-700">
              Smart Print Help is not responsible for delays caused by
              third-party carriers or unforeseen circumstances.
            </p>
          </div>

          {/* 8 */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              8. Incorrect Address
            </h2>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                Customers are responsible for providing accurate shipping
                information.
              </li>
              <li>
                Incorrect or incomplete addresses may result in delays or failed
                deliveries.
              </li>
              <li>
                Additional charges may apply for reshipment.
              </li>
            </ul>
          </div>

          {/* 9 */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              9. Lost or Damaged Shipments
            </h2>

            <p className="text-gray-700 mb-4">
              If your order is:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Lost in transit.</li>
              <li>Delivered damaged.</li>
            </ul>

            <p className="mt-5 text-gray-700 leading-8">
              Please contact us at{" "}
              <a
                href="mailto:support@smartprinthelp.com"
                className="text-[#EF4056] hover:underline"
              >
                support@smartprinthelp.com
              </a>{" "}
              as soon as possible. We will assist you in resolving the issue in
              accordance with our policies.
            </p>
          </div>

          {/* 10 */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              10. Order Issues & Support
            </h2>

            <p className="text-gray-700 leading-8">
              If you have questions about your order status or delivery, please
              contact our support team:
            </p>

            <p className="mt-5">
              📧{" "}
              <a
                href="mailto:support@smartprinthelp.com"
                className="text-[#EF4056] hover:underline font-medium"
              >
                support@smartprinthelp.com
              </a>
            </p>
          </div>

          {/* 11 */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              11. Independent Retailer Notice
            </h2>

            <p className="text-gray-700 leading-8">
              Smart Print Help operates as an independent retailer and is not
              affiliated with or authorized by any printer manufacturer unless
              explicitly stated.
            </p>
          </div>

          {/* 12 */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              12. Changes to This Policy
            </h2>

            <p className="text-gray-700 leading-8">
              We may update this Shipping Policy from time to time. Any changes
              will be posted on this page with an updated effective date.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Contact Information
            </h2>

            <p className="text-gray-700 mb-6">
              If you have any questions regarding this Shipping Policy, please
              contact us:
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

export default ShippingPolicy;