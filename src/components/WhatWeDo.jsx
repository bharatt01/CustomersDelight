import React from 'react';
import {
  Globe,
  Search,
  Instagram,
  Users,
  Smartphone,
  TrendingUp,
  Store,
  Share2,
  Repeat
} from 'lucide-react';

const WhatWeDo = () => {
  return (
    <section id="what-we-do" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading & Paragraph */}
        {/* Heading & Paragraph */}
<div className="text-center mb-16">
  <h2 className="text-4xl font-extrabold mb-6">
    <span className="bg-gradient-to-r from-orange-500 to-orange-500 bg-clip-text text-transparent">
      What
    </span>{" "}
    We Do
  </h2>
  <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
    We help local retail shops, specially in unorganised sector, grow their business by leveraging technology, tools and innovative ideas.
    Since most local shops feel the heat of online market shopping from large ecommerce companies, their sales are going down day by day,
    profits are declining, and many shops are shutting down. We use Google My Business to improve local search, mini website, and social media
    to bring more new customers to our clients for shopping and reshopping — that is, repeating customers.
  </p>
</div>


        {/* Cards Section */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mb-24">
          {[
            { icon: Globe, label: 'Website Development' },
            { icon: Search, label: 'Google Business Profile' },
            { icon: Instagram, label: 'Social Media Marketing' },
            { icon: Users, label: 'Customer Connection' },
            { icon: Smartphone, label: 'Mobile-First Solutions' },
            { icon: TrendingUp, label: 'Sales Analytics' }
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 border hover:shadow-xl transition-transform hover:scale-105 duration-300 rounded-xl"
            >
              <div className="bg-orange-100 w-14 h-14 flex items-center justify-center rounded-full mb-4">
                <item.icon className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800">{item.label}</h4>
            </div>
          ))}
        </div>

        {/* 3-Step Digital Growth Strategy */}
       <div className="text-center mb-14">
  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
    Our{" "}
    <span className="bg-gradient-to-r from-orange-500 to-orange-500 bg-clip-text text-transparent">
      3-Step  Digital Growth
    </span>{" "}
   Strategy
  </h2>
  <p className="text-gray-600 max-w-2xl mx-auto text-lg">
    A powerful system to attract new customers and turn them into repeat buyers.
  </p>
</div>


        <div className="relative flex flex-col md:flex-row items-center justify-between gap-14 md:gap-6">
          {/* Step 1 */}
          <div className="group relative bg-white rounded-3xl shadow-xl p-8 w-full md:w-1/3 transform hover:-translate-y-2 hover:rotate-[0.5deg] transition-all duration-300 border-t-4 border-orange-500">
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 text-white text-sm font-semibold flex items-center justify-center shadow-lg z-10">
              1
            </div>
            <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition shadow-inner shadow-orange-200">
              <Store className="w-10 h-10 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Digital Solutions</h3>
            <p className="text-gray-600 text-sm">
              Set up your Mini Website and Google Business Profile to go fully online.
            </p>
          </div>

          {/* Step 2 */}
          <div className="group relative bg-white rounded-3xl shadow-xl p-8 w-full md:w-1/3 transform hover:-translate-y-2 hover:rotate-[0.5deg] transition-all duration-300 border-t-4 border-orange-500">
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 text-white text-sm font-semibold flex items-center justify-center shadow-lg z-10">
              2
            </div>
            <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition shadow-inner shadow-orange-200">
              <Share2 className="w-10 h-10 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Marketing and social media solutions </h3>
            <p className="text-gray-600 text-sm">
              Build your brand with regular content on Instagram, Facebook, and YouTube.
            </p>
          </div>

          {/* Step 3 */}
          <div className="group relative bg-white rounded-3xl shadow-xl p-8 w-full md:w-1/3 transform hover:-translate-y-2 hover:rotate-[0.5deg] transition-all duration-300 border-t-4 border-orange-500">
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 text-white text-sm font-semibold flex items-center justify-center shadow-lg z-10">
              3
            </div>
            <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition shadow-inner shadow-orange-200">
              <Repeat className="w-10 h-10 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Customer Connections</h3>
            <p className="text-gray-600 text-sm">
              Engage and retain your customers with smart tools that drive repeat visits.
            </p>
          </div>

          {/* Optional line between cards on large screens */}
          {/* <div className="hidden md:block absolute left-1/2 top-[50%] transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-orange-300 to-transparent rounded-full z-0" /> */}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
