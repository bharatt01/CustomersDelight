import React from 'react';
import { MapPin, Calendar, Target, Award } from 'lucide-react';
import Navbar from '../components/Navbar';
import WhatWeDo from '../components/WhatWeDo';
import MissionVision from '../components/MissionVision';
import OurJourney from '../components/OurJourney';
import Team from '../components/Team';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const AboutUs = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
   {/* Hero Section */}
<section className="relative h-[75vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: `url(${process.env.PUBLIC_URL + '/Images/aboutus.png'})`,
    }}
  />
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
  
  <div className="relative z-10 text-center px-4 text-white max-w-3xl mx-auto">
    <p className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed drop-shadow-lg">
      We help retail shops, restaurants and other businesses grow locally with the use of <br />
      <span className="text-orange-400 font-bold">Technology, Tools, Ideas.</span>
    </p>
  </div>
</section>

      {/* Who We Are Section */}
      <section id="about" className="relative bg-gradient-to-br from-white via-gray-50 to-white py-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Section Header */}
    <div className="text-center mb-20">
      <h3 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
        Who <span className="text-orange-500">We Are</span>
      </h3>
      <div className="mt-3 w-20 h-1 bg-orange-400 mx-auto rounded-full"></div>
    </div>

    {/* Content Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      
      {/* Left Column - Text Content */}
      <div className="space-y-6 text-lg leading-relaxed text-gray-700">
        <p>
          We’re a passionate team from Technology Business Development , Strategy , Growth , Innovation and many other such background.
        </p>
        <p>
          With a deep understanding of local markets and customer behavior, we bring offline stores online — the right way.
        </p>
        <p>
          Our approach is simple: combine practical innovation with easy-to-use tech, giving you more time to focus on what matters — your customers.
        </p>
      </div>

      {/* Right Column - Glassmorphic Card */}
      <div className="bg-white/60 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl p-8">
        <h4 className="text-2xl font-semibold text-gray-800 mb-4">How We Make a Difference</h4>
        <ul className="space-y-3 text-gray-700 list-disc list-inside">
          <li>Tailored digital tools for local businesses</li>
          <li>Fast, SEO-optimized websites and job portals</li>
          <li>Real results through design + strategy</li>
          <li>Technology that doesn’t overwhelm — it empowers</li>
        </ul>
        <div className="mt-6 text-orange-500 font-medium">
          Trusted by 200+ businesses across NCR & growing.
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Info Cards */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Based in Faridabad',
                desc: 'Proudly serving Haryana and surrounding regions',
                icon: <MapPin className="h-8 w-8 text-blue-500" />,
                bg: 'bg-blue-100',
              },
              {
                title: 'Since 2022',
                desc: 'Two years of consistent growth and innovation',
                icon: <Calendar className="h-8 w-8 text-green-500" />,
                bg: 'bg-green-100',
              },
              {
                title: 'Retail Focus',
                desc: 'Specialized in offline to online transformation',
                icon: <Target className="h-8 w-8 text-purple-500" />,
                bg: 'bg-purple-100',
              },
              {
                title: 'Proven Results',
                desc: '200+ successful business transformations',
                icon: <Award className="h-8 w-8 text-yellow-500" />,
                bg: 'bg-yellow-100',
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl shadow-md hover:shadow-lg transition-transform hover:scale-[1.03] ${card.bg}`}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-white shadow-inner">
                  {card.icon}
                </div>
                <h4 className="text-xl font-semibold mb-2">{card.title}</h4>
                <p className="text-gray-700">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhatWeDo />
      <MissionVision />
      <OurJourney />
      <Team />
      <Testimonials />
      <Footer />
    </>
  );
};

export default AboutUs;
