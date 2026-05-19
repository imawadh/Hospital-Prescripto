import React from 'react'
import Header from '../components/Header'
import Stats from '../components/Stats'
import SpecialityMenu from '../components/SpecialityMenu'
import HowItWorks from '../components/HowItWorks'
import TopDoctors from '../components/TopDoctors'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <>
      <Header />
      <Stats />
      <SpecialityMenu />
      <HowItWorks />
      <TopDoctors />
      <Testimonials />
      <FAQ />
      <Banner />
    </>
  )
}

export default Home
