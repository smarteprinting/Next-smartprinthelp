import React from 'react'
import HomeHero from './HomeHero'
import HomeBanner from './HomeBanner'
import FAQSection from './FAQSection'
import Footer from '../Footer'
import FinalConversion from './FinalConversion'
import Disclaimer from './Disclaimer'
import WhatDoYouNeed from './WhatDoYouNeed'
import GetYourPrinterReadyToPrint from './GetYourPrinterReadyToPrint'
import ConnectPrinterToComputer from './ConnectPrinterToComputer'
import ConnectPrinterToWifi from './ConnectPrinterToWifi'
import PrinterOfflineFix from './PrinterOfflineFix'
import PrinterNotConnected from './PrinterNotConnected'
import PrinterDriverInstallation from './PrinterDriverInstallation'
import PrinterScannerSetup from './PrinterScannerSetup'
import WhyChoose from './WhyChoose'

function Home() {
  return (
    <>
      <HomeHero />
      <HomeBanner />  
      <WhatDoYouNeed />
      <GetYourPrinterReadyToPrint />
      <ConnectPrinterToComputer />
      <ConnectPrinterToWifi />
      <PrinterOfflineFix />
      <PrinterNotConnected />
      <PrinterDriverInstallation />
      <PrinterScannerSetup />
    
      <WhyChoose />

      <FAQSection />

      <FinalConversion />

      <Disclaimer />
      <Footer />
    </>
  )
}

export default Home
