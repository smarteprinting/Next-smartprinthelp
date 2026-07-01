import React from "react";

const BusinessInfo = () => {
    return (
        <section className="pb-16 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4">
                <div className="  p-8 md:p-10">
                    {/* Business Information */}
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                        Business Information
                    </h2>

                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            Smart Print Help
                        </h3>

                        <p className="text-gray-600 leading-8">
                            23224 Crenshaw Blvd
                            <br />
                            Torrance, CA 90505
                            <br />
                            United States
                        </p>

                        <p className="mt-5 text-gray-700">
                            <span className="font-semibold">📧 Email:</span>{" "}
                            <a
                                href="mailto:support@smartprinthelp.com"
                                className="text-[#EF4056] hover:underline"
                            >
                                support@smartprinthelp.com
                            </a>
                        </p>
                    </div>

                    {/* Important Notice */}
                    <div className="border-t border-gray-200 pt-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Important Notice
                        </h3>

                        <p className="text-gray-600 leading-8 mb-5">
                            Smart Print Help provides general product guidance and customer
                            assistance only.
                        </p>

                        <p className="font-semibold text-gray-900 mb-3">We are:</p>

                        <ul className="list-disc pl-6 space-y-2 text-gray-600 leading-7 mb-6">
                            <li>Not an authorized service provider or repair center.</li>
                            <li>Not affiliated with any printer brand or manufacturer.</li>
                            <li>Not responsible for manufacturer warranty services.</li>
                        </ul>

                        <p className="text-gray-600 leading-8">
                            For official support, software downloads, and warranty services,
                            please visit the respective brand&apos;s official website.
                        </p>
                    </div>

                    {/* Still Need Help */}
                    <div className="border-t border-gray-200 pt-8 mt-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Still Need Help?
                        </h3>

                        <p className="text-gray-600 leading-8 mb-6">
                            If you have questions about products, orders, or general setup
                            guidance, feel free to contact our support team.
                        </p>

                        <a
                            href="/contact"
                            className="inline-flex items-center rounded-lg bg-[#EF4056] px-6 py-3 font-semibold text-white transition hover:bg-[#d6364b]"
                        >
                            → Contact Support
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BusinessInfo;