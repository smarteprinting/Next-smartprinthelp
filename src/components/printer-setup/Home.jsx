import React from 'react'
import HomeHero from './HomeHero'
import HomeBanner from './HomeBanner'
import FAQSection from './FAQSection'
import SupportHighlights from './SupportHighlights'
import Footer from '../Footer'

function Home() {
  return (
    <>
      <HomeHero />
      <HomeBanner />  
      <FAQSection />
      <SupportHighlights />

      <Footer />
    </>
  )
}

export default Home
