import React from "react";

function Disclaimer() {
  return (
    <section
      aria-labelledby="independent-service-disclaimer"
      className="w-full bg-slate-50 px-4 py-8 sm:px-6"
    >
      <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2
          id="independent-service-disclaimer"
          className="text-lg font-bold text-slate-900 sm:text-xl"
        >
          Independent Service Disclaimer
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
          Smart Print Help is an independent provider of printer setup
          information and troubleshooting guidance. Manufacturer names, product
          names, and trademarks are used for identification purposes only and
          remain the property of their respective owners. Unless expressly
          stated and substantiated, Smart Print Help is not affiliated with,
          endorsed by, sponsored by, or authorized by any printer manufacturer.
          For official drivers, software, firmware, and manufacturer-specific
          support, visit the manufacturer&apos;s official website.
        </p>
      </div>
    </section>
  );
}

export default Disclaimer;