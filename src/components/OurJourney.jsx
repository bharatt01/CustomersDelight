import React from 'react';
import { Calendar, TrendingUp, Users, Award, Rocket, Star } from 'lucide-react';

const Journey = () => {
  const milestones = [
    {
      year: '2022',
      quarter: 'Q1',
      title: 'Company Foundation',
      description: 'TechBoost Solutions was established in Faridabad with a vision to transform local retail businesses through technology.',
      icon: Rocket,
      stats: 'Founded with 3 team members',
      color: 'bg-blue-600'
    },
    {
      year: '2022',
      quarter: 'Q2-Q3',
      title: 'First Client Success',
      description: 'Successfully launched our first 25 client websites and Google Business profiles, achieving an average 40% increase in customer inquiries.',
      icon: TrendingUp,
      stats: '25 businesses transformed',
      color: 'bg-green-600'
    },
    {
      year: '2022',
      quarter: 'Q4',
      title: 'Social Media Expansion',
      description: 'Expanded services to include comprehensive social media management across Instagram, Facebook, and YouTube platforms.',
      icon: Users,
      stats: '50+ social media accounts managed',
      color: 'bg-purple-600'
    },
    {
      year: '2023',
      quarter: 'Q1-Q2',
      title: 'Rapid Growth Phase',
      description: 'Scaled operations to serve 100+ clients, developed proprietary customer connection systems, and expanded team to 12 members.',
      icon: Star,
      stats: '100+ active clients',
      color: 'bg-yellow-600'
    },
    {
      year: '2023',
      quarter: 'Q3-Q4',
      title: 'Innovation & Recognition',
      description: 'Launched advanced analytics dashboard, achieved 98% client retention rate, and received recognition as emerging tech company.',
      icon: Award,
      stats: '98% client retention',
      color: 'bg-red-600'
    },
    {
      year: '2024',
      quarter: 'Present',
      title: 'Market Leadership',
      description: 'Serving 200+ businesses with comprehensive digital solutions, maintaining industry-leading growth rates for client businesses.',
      icon: Calendar,
      stats: '200+ successful transformations',
      color: 'bg-indigo-600'
    }
  ];

  return (

    <section id="journey" className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Our Journey</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        From a small startup in Faridabad to a leading technology partner for retail businesses — here’s how we’ve grown.
      </p>
    </div>

    <div className="relative">
      {/* Orange glowing timeline line */}
      <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-orange-500/30 blur-[2px]"></div>

      <div className="space-y-20">
        {milestones.map((milestone, index) => (
          <div key={index} className={`relative flex flex-col lg:flex-row items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            {/* Timeline Dot */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-orange-500 border-4 border-white rounded-full z-10 shadow-md"></div>

            {/* Card Content */}
            <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16'}`}>
              <div className="bg-white border border-gray-200 shadow-md hover:shadow-xl transition duration-300 rounded-2xl p-8">
                <div className="flex items-center mb-5">
                  <div className={`${milestone.color} p-3 rounded-full shadow-md`}>
                    <milestone.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm text-gray-500">{milestone.year} – {milestone.quarter}</div>
                    <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">{milestone.description}</p>
                <div className="bg-gray-50 border-l-4 border-orange-500 px-4 py-2 rounded">
                  <span className="text-sm font-semibold text-orange-600">{milestone.stats}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Stats */}
    <div className="mt-24 bg-gradient-to-r from-orange-500 via-yellow-500 to-amber-500 rounded-3xl p-12 shadow-xl">
      <div className="text-center text-white mb-10">
        <h3 className="text-3xl font-bold mb-2">Two Years of Impact</h3>
        <p className="text-lg">The numbers that define our transformation journey</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
        <div>
          <div className="text-4xl font-extrabold mb-1">200+</div>
          <div className="text-sm">Businesses Transformed</div>
        </div>
        <div>
          <div className="text-4xl font-extrabold mb-1">150%</div>
          <div className="text-sm">Avg. Sales Increase</div>
        </div>
        <div>
          <div className="text-4xl font-extrabold mb-1">98%</div>
          <div className="text-sm">Client Retention</div>
        </div>
        <div>
          <div className="text-4xl font-extrabold mb-1">15+</div>
          <div className="text-sm">Team Members</div>
        </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default Journey;