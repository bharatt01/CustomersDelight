import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Category from '../components/Category'
import Stores from '../components/Stores'
import  Footer from '../components/Footer'
function Home() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <Category/>
    <Stores/>
    <Footer/>
    </>
  )
}

export default Home