import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import FeatureCards from '../components/FeatureCards'
import HowItWorks from '../components/HowItWorks'
import SocialProof from '../components/SocialProof'
import UseCases from '../components/UseCases'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <section className='w-full bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.12),transparent_40%),linear-gradient(120deg,#f3ecff,#eef3ff,#ffffff)] min-h-screen'>
        <Header/>
        <Hero/>
        <FeatureCards/>
        <HowItWorks/>
        <SocialProof/>
        <UseCases/>
        <Footer/>
    </section>
  )
}

export default Home