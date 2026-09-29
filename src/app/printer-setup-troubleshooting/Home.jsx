import React from 'react';
import HomeHero from './HomeHero';
import Hero2 from './Hero2';
import IssueSelectionCards from './IssueSelectionCards';
import SetupContent from './SetupContent';
import FAQSection from './FAQSection';
import FinalConversion from './FinalConversion';
import TrademarkNotice from './TrademarkNotice';
import Footer from '@/components/Footer';

function Home() {
  return (
    <div className="w-full min-h-screen bg-white font-sans antialiased text-slate-800">
      {/* 1. Visual Banner Image (Untouched) */}
      <HomeHero />

      {/* 2. Hero: H1, concise support copy, primary CTA and secondary CTA */}
      <Hero2 />

      {/* 3. Issue-selection cards with anchor links */}
      <IssueSelectionCards />

      {/* 4. Complete Landing Page Content Sections */}
      <SetupContent />

      {/* 5. FAQs Section */}
      <FAQSection />

      {/* 6. Final Conversion Section */}
      <FinalConversion />

      {/* 7. Brand / Trademark Notice */}
      <TrademarkNotice />

      {/* 8. Site Footer */}
      <Footer />
    </div>
  );
}

export default Home;
