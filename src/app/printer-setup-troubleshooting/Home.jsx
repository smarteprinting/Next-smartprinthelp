import React from 'react';
import HomeHero from './HomeHero';
import Hero2 from './Hero2';
import IssueSelectionCards from './IssueSelectionCards';
import SetupContent from './SetupContent';
import FAQSection from './FAQSection';
import FinalConversion from './FinalConversion';
import TrademarkNotice from './TrademarkNotice';
import Footer from '@/components/Footer';
import SetupHeader from './SetupHeader';

function Home() {
  return (
    <div className="w-full min-h-screen bg-white font-sans antialiased text-slate-800">
    
      {/* <HomeHero /> */}

     <SetupHeader />
      <Hero2 />

     
      <IssueSelectionCards />

   
      <SetupContent />

    
      <FAQSection />

    
      <FinalConversion />

   
      <TrademarkNotice />

    
      <Footer />
    </div>
  );
}

export default Home;
