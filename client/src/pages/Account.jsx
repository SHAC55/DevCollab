import React from 'react'
import Navbar from '../components/Navbar'
import PersonalInfo from '../components/PersonalInfo'

const Account = () => {
  return (
    <section className="bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.12),transparent_40%),linear-gradient(120deg,#f3ecff,#eef3ff,#ffffff)] min-h-screen">
      <Navbar />
      <PersonalInfo/>
     
    </section>
  )
}

export default Account