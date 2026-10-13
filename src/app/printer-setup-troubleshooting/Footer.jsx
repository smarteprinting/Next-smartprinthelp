import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#232222] text-white w-full pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-12">
        {/* About Smart Print Help */}
        <div>
          <h3 className="text-xl font-bold mb-2 tracking-wide border-b border-white pb-1">
            Smart Print Help
          </h3>
          <ul className="space-y-2 text-base">
            <li>Printer setup guidance</li>
            <li>WiFi connection help</li>
            <li>Printer troubleshooting</li>
          </ul>
        </div>

        {/* Printer Setup */}
        <div>
          <h3 className="text-xl font-bold mb-2 tracking-wide border-b border-white pb-1">
            Printer Setup
          </h3>
          <ul className="space-y-2 text-base">
            <li>New printer setup</li>
            <li>Connect a printer to WiFi</li>
            <li>Install printer drivers</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-bold mb-2 tracking-wide border-b border-white pb-1">
            Support
          </h3>
          <ul className="space-y-2 text-base">
            <li>Printer offline help</li>
            <li>Printing troubleshooting</li>
            <li>Scanner troubleshooting</li>
          </ul>
        </div>

        {/* Printer Help */}
        <div>
          <h3 className="text-xl font-bold mb-2 tracking-wide border-b border-white pb-1">
            Printer Help
          </h3>
          <ul className="space-y-2 text-base">
            <li>Printer showing offline</li>
            <li>Printer not printing</li>
            <li>Printer driver installation</li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-bold mb-2 tracking-wide border-b border-white pb-1">
            Useful Links
          </h3>
          <ul className="space-y-2 text-base">
            <li>Printer setup information</li>
            <li>WiFi connection information</li>
            <li>Driver installation information</li>
            <li>Scanner help</li>
            <li>Privacy</li>
            <li>Terms of use</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <hr className="border-gray-700" />

        <div className="flex flex-col md:flex-row items-center justify-between py-6 gap-4">
          <p className="text-gray-400 text-sm">
            © Copyright 2026 Smart Print Help
          </p>

          <form className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Your Email address"
              className="rounded-full px-5 py-2 text-black focus:outline-none"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-full transition"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;