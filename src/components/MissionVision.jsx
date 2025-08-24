import React from 'react';
import { Target, Eye } from 'lucide-react';

const MissionVision = () => {
  return (
    <section id="mission" className="relative py-24 bg-gradient-to-br from-white via-blue-50 to-blue-100 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-300 via-white to-purple-200 opacity-20 blur-2xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="text-center mb-20">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
  Our{" "}
  <span className="bg-gradient-to-r from-orange-500 to-orange-500 bg-clip-text text-transparent">
    Mission
  </span>{" "}
  &{" "}
  <span className="bg-gradient-to-r from-orange-500 to-orange-500 bg-clip-text text-transparent">
    Vision
  </span>
</h2>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Driven by purpose and guided by vision, we're committed to transforming 
            the retail landscape through innovative technology solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="relative p-10 bg-white border border-gray-200 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-[1.015] transition duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-orange-100 rounded-full shadow-sm">
                <Target className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">Our Mission</h3>
            </div>
            <p className="text-gray-600 text-lg mb-5">
              To empower local retail businesses in the unorganized sector by providing 
              accessible, affordable, and effective technology solutions.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex gap-2">
                <span className="w-2 h-2 mt-2 bg-orange-500 rounded-full"></span>
                Democratize technology for small businesses
              </li>
              <li className="flex gap-2">
                <span className="w-2 h-2 mt-2 bg-orange-500 rounded-full"></span>
                Increase sales through digital transformation
              </li>
              <li className="flex gap-2">
                <span className="w-2 h-2 mt-2 bg-orange-500 rounded-full"></span>
                Build lasting customer relationships
              </li>
            </ul>
          </div>

          {/* Vision */}
          <div className="relative p-10 bg-white border border-gray-200 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-[1.015] transition duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-purple-100 rounded-full shadow-sm">
                <Eye className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">Our Vision</h3>
            </div>
            <p className="text-gray-600 text-lg mb-5">
              To become the leading catalyst for digital transformation in India’s retail 
              sector—where every local business thrives in the digital economy.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex gap-2">
                <span className="w-2 h-2 mt-2 bg-purple-500 rounded-full"></span>
                Transform 10,000+ businesses by 2030
              </li>
              <li className="flex gap-2">
                <span className="w-2 h-2 mt-2 bg-purple-500 rounded-full"></span>
                Expand across North India
              </li>
              <li className="flex gap-2">
                <span className="w-2 h-2 mt-2 bg-purple-500 rounded-full"></span>
                Pioneer innovative retail technologies
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
