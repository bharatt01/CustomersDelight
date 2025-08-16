import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Category from '../components/Category'
import FeaturedStores from '../components/FeaturedStores'
import OwnerBenefits from '../components/OwnerBenefits'
import Stores from '../components/Stores'
import  Footer from '../components/Footer'
import FeaturedProducts from '../components/FeaturedProducts'
import AssociateWithUs from '../components/AssociateWithUs'
function Home() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <FeaturedProducts limit={4}/>
    <Category/>
    <FeaturedStores/>
    <OwnerBenefits/>
    <AssociateWithUs/>
    {/* <Stores/> */}
    <Footer/>
    </>
  )
}

export default Home