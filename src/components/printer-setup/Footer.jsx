import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#232528] text-white w-full pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* CUSTOMER SERVICE */}
        <div>
          <h3 className="text-2xl font-extrabold mb-2 tracking-wide">CUSTOMER SERVICE</h3>
          <div className="w-12 h-1 bg-white mb-4" />
          <ul className="space-y-2 text-base">
            <li>Help & FAQs</li>
            <li>Order Tracking</li>
            <li>Shipping & Delivery</li>
            <li>Orders History</li>
            <li>Advanced Search</li>
            <li>My Account</li>
            <li>Careers</li>
            <li>About Us</li>
          </ul>
        </div>
        {/* CONTACT INFO */}
        <div>
          <h3 className="text-2xl font-extrabold mb-2 tracking-wide">CONTACT INFO</h3>
          <div className="w-12 h-1 bg-white mb-4" />
          <div className="space-y-2 text-base">
            <p>ADDRESS: PO Box 141 Bettendorf, IOWA, 52722</p>
            <p>WORKING DAYS/HOURS:</p>
            <p>Mon - Sun / 9:00 AM - 8:00 PM</p>
          </div>
        </div>
        {/* SUBSCRIBE NEWSLETTER */}
        <div>
          <h3 className="text-2xl font-extrabold mb-2 tracking-wide">SUBSCRIBE NEWSLETTER</h3>
          <div className="w-12 h-1 bg-white mb-4" />
          <p className="text-base mb-2">Get all the latest information on events, sales and offers. Sign up for newsletter:</p>
          {/* Newsletter input could go here */}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <hr className="border-gray-700" />
        <div className="flex flex-col md:flex-row items-center justify-between py-6 gap-4">
          <p className="text-gray-400 text-sm">© Copyright 2026 Printer Setup | All Rights Reserved</p>
          <div className="flex items-center gap-2">
            <img src="https://img.icons8.com/color/38/visa.png" alt="Visa" className="h-7 object-contain" loading="lazy" />
            <img src="https://img.icons8.com/color/38/paypal.png" alt="PayPal" className="h-7 object-contain" loading="lazy" />
            <img src="https://img.icons8.com/color/38/stripe.png" alt="Stripe" className="h-7 object-contain" loading="lazy" />
            <img src="https://img.icons8.com/color/38/verified-account.png" alt="VeriSign" className="h-7 object-contain" loading="lazy" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
