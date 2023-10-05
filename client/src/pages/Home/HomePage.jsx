import React from 'react'
import MainLayout from '../../components/MainLayout'
import Hero from './Container/Hero'
import Benefits from './Container/Benefits'
import CTA from './Container/CTA'
const HomePage = () => {
  return (
    <>
        <MainLayout>
          <Hero />
          <CTA />
          <Benefits />
        </MainLayout>
    </>
  )
}

export default HomePage