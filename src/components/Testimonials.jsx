import React from 'react';
import {
  Star,
  Quote,
  TrendingUp,
  Users,
  ShoppingBag,
} from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Rajesh Agarwal',
      business: 'Agarwal Fashion House',
      location: 'Faridabad',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'TechBoost Solutions completely transformed my clothing store. Within 3 months of launching our website and social media presence, our sales increased by 180%. The team understood our local market perfectly.',
      results: '180% sales increase',
      category: 'Fashion Retail',
    },
    {
      name: 'Sunita Sharma',
      business: 'Sharma Shoe Palace',
      location: 'Ballabhgarh',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'The Google Business Profile optimization brought so many new customers to my shoe store. Now people find us easily online, and our WhatsApp integration makes customer service so much easier.',
      results: '300% online visibility',
      category: 'Footwear',
    },
    {
      name: 'Amit Kumar',
      business: 'Kumar Electronics',
      location: 'NIT Faridabad',
      image: 'https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'Their social media marketing strategy is outstanding. Our Instagram and Facebook pages now have thousands of followers, and we get daily inquiries. The ROI has been incredible.',
      results: '5000+ social followers',
      category: 'Electronics',
    },
    {
      name: 'Priya Gupta',
      business: 'Gupta Restaurant',
      location: 'Old Faridabad',
      image: 'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'The website they built for our restaurant is beautiful and functional. Online orders have increased dramatically, and the customer connection system helps us maintain relationships with regular customers.',
      results: '250% online orders',
      category: 'Restaurant',
    },
    {
      name: 'Vikash Singh',
      business: 'Singh Mobile Center',
      location: 'Sector 15, Faridabad',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'Professional team with deep understanding of local business needs. They helped us connect with customers digitally while maintaining our personal touch. Highly recommended for any retail business.',
      results: '150% customer retention',
      category: 'Mobile & Accessories',
    },
    {
      name: 'Neha Bansal',
      business: 'Bansal Beauty Parlour',
      location: 'Sector 21, Faridabad',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'The appointment booking system and social media presence they created has revolutionized my beauty parlour. Customers can now book online, and our Instagram showcases our work beautifully.',
      results: '200% appointment bookings',
      category: 'Beauty & Wellness',
    },
  ];

  const stats = [
    {
      icon: TrendingUp,
      value: '150%',
      label: 'Avg. Sales Increase',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: Users,
      value: '200+',
      label: 'Happy Clients',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: ShoppingBag,
      value: '98%',
      label: 'Client Retention',
      color: 'bg-rose-100 text-rose-600',
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
<h2 className="text-4xl font-bold text-gray-900 mb-4">
  <span className="bg-gradient-to-r from-orange-500 to-orange-500 bg-clip-text text-transparent">
    Client
  </span>{" "}
  Success Stories
</h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real businesses. Real results. See how local shop owners grew with our digital help.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className={`inline-flex p-4 rounded-full ${stat.color} mb-4`}>
                <stat.icon className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <Quote className="h-6 w-6 text-yellow-500 mb-3" />
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-5">"{testimonial.text}"</p>
              <div className="bg-yellow-50 p-3 rounded-lg mb-5">
                <p className="text-yellow-600 text-sm font-semibold">{testimonial.results}</p>
                <p className="text-yellow-500 text-xs">{testimonial.category}</p>
              </div>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.business}</p>
                  <p className="text-xs text-gray-400">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
      {/* CTA Section */}
<div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl text-white p-12 text-center">
  <h3 className="text-3xl font-bold mb-3">Ready to Grow Your Business?</h3>
  <p className="text-white text-lg mb-8 max-w-3xl mx-auto">
    Join hundreds of shop owners who are reaching more customers, increasing revenue, and building their brand online.
  </p>

  <div className="flex flex-col sm:flex-row gap-4 justify-center">
    {/* Call directly */}
    <a
      href="tel:+919871428686" // replace with your number
      className="bg-white text-yellow-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
    >
      Get Free Consultation
    </a>

    {/* Go to homepage */}
    <button
      onClick={() => (window.location.href = "/")} // change route if needed
      className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-yellow-600 transition"
    >
      Discover More
    </button>
  </div>
</div>

      </div>
    </section>
  );
};

export default Testimonials;
