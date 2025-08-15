import React from "react";

const OwnerBenefits = () => {
  const benefits = [
    {
      icon: "💻",
      title: "Easy Online Management",
      description: "Manage your store, products, and offers effortlessly from one place."
    },
    {
      icon: "📈",
      title: "Boost Sales",
      description: "Reach more customers and increase your sales with local promotions."
    },
    {
      icon: "🤝",
      title: "Engage Customers",
      description: "Build loyalty programs and communicate directly with your customers."
    },
    {
      icon: "⚡",
      title: "Quick Setup",
      description: "Get your store online in minutes without technical hassles."
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center relative">
        {/* Heading with side lines */}
        <div className="flex items-center justify-center mb-12">
          <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-orange-400 rounded-full mr-4"></div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Empower Your Store with Customers Delight
          </h2>
          <div className="w-32 h-1 bg-gradient-to-l from-cyan-500 to-blue-500 rounded-full ml-4"></div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-3xl shadow-2xl hover:shadow-3xl transition transform hover:scale-105 flex flex-col items-center text-center"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OwnerBenefits;
