import React from 'react';
import { Linkedin, Mail } from 'lucide-react';

const teamMembers = [
  {
    name: 'Amod Sharma',
    role: 'Founder & CEO',
    image: '/team/amod.jpg', // Replace with actual path
    linkedin: 'https://linkedin.com/in/amodsharma',
    email: 'mailto:amod@example.com'
  },
  {
    name: 'Abhishek Rawat',
    role: 'Technical Head',
    image: '/team/ritika.jpg',
    linkedin: 'https://linkedin.com/in/ritikajain',
    email: 'mailto:ritika@example.com'
  },
  {
    name: 'Bharat Sharma',
    role: 'Full Stack Developer',
    image: '/team/rajeev.jpg',
    linkedin: 'https://linkedin.com/in/rajeevmalhotra',
    email: 'mailto:rajeev@example.com'
  }
];

const Team = () => {
  return (
    <section id="team" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're a team of passionate individuals dedicated to empowering local retail shops with the right technology and strategy.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 flex flex-col items-center text-center"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-4 border-orange-100 group-hover:scale-105 transition duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h4>
              <p className="text-sm text-gray-600 mb-4">{member.role}</p>
              <div className="flex gap-4 justify-center">
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500 transition">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={member.email} className="text-gray-500 hover:text-orange-500 transition">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
