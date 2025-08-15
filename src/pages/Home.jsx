import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Category from '../components/Category'
import FeaturedStores from '../components/FeaturedStores'
import OwnerBenefits from '../components/OwnerBenefits'
import Stores from '../components/Stores'
import  Footer from '../components/Footer'
import FeaturedProducts from '../components/FeaturedProducts'
function Home() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <FeaturedProducts/>
    <Category/>
    <FeaturedStores/>
    <OwnerBenefits/>
    {/* <Stores/> */}
    <Footer/>
    </>
  )
}

export default Home