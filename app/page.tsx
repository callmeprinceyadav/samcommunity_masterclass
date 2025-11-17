'use client'

import { useState } from 'react'
import LoadingScreen from '@/components/LoadingScreen'
import ScrollPopup from '@/components/ScrollPopup'
import HeroSection from '@/components/HeroSection'
import MasterclassBanner from '@/components/MasterclassBanner'
import EventIntroduction from '@/components/EventIntroduction'
import WhatYouWillLearn from '@/components/WhatYouWillLearn'
import AboutSpeaker from '@/components/AboutSpeaker'
import WhyAttend from '@/components/WhyAttend'
import RegistrationForm from '@/components/RegistrationForm'
import AboutSamcommunity from '@/components/AboutSamcommunity'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <LoadingScreen />
      <main className="min-h-screen">
        <HeroSection />
        <MasterclassBanner />
        <EventIntroduction />
        <WhatYouWillLearn />
        <AboutSpeaker />
        <WhyAttend />
        <RegistrationForm />
        <AboutSamcommunity />
        <Testimonials />
        <FAQ />
        <Footer />
        <ScrollPopup />
      </main>
    </>
  )
}

