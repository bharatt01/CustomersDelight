import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Gift,
  Star,
  Truck,
  Users,
  Calendar,
  Wallet,
  Diamond,
} from "lucide-react";
import Footer from "./../components/Footer";
import Navbar from "./../components/Navbar";

const benefits = [
  { icon: <CheckCircle />, title: "Flat Discounts", desc: "Guaranteed savings at partner stores." },
  { icon: <Gift />, title: "Welcome Kit", desc: "Exclusive welcome kit worth upto ₹10,000." },
  { icon: <Wallet />, title: "Cashback Bonus", desc: "Earn extra cashback on purchases." },
  { icon: <Truck />, title: "Free Delivery", desc: "Free delivery at select partner stores." },
  { icon: <Star />, title: "Birthday & Festival Perks", desc: "Gift vouchers on special occasions." },
  { icon: <Calendar />, title: "Prime Sundays", desc: "Exclusive discounts every Sunday." },
  { icon: <Users />, title: "Referral Bonus", desc: "Refer friends and earn rewards." },
];

const PrimeMembership = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <>
      <Navbar />

      {/* Hero Strip / Banner */}
    {/* Hero Strip / Banner */}
<div
  className="w-full h-60 md:h-72 lg:h-80 flex items-start justify-center bg-cover bg-center relative"
  style={{
    backgroundImage: `url('/Images/primemember.png')`,
  }}
>
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>

  {/* Heading */}
  <h1 className="relative mt-8 text-4xl sm:text-5xl font-extrabold text-white text-center">
    PRIME MEMBERSHIP
  </h1>
</div>



      <section className="relative bg-gradient-to-br from-white via-orange-50 to-white py-20 px-6 lg:px-20 overflow-hidden text-gray-800">
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Mission & Prime Card */}
          <div className="mb-20 grid lg:grid-cols-2 gap-9 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6
                bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500
                bg-clip-text text-transparent"
              >
                Objectives
              </h2>

              <p className="text-gray-700 mb-3 leading-relaxed">
                To Build a <span className="font-semibold text-orange-500">trusted retail loyalty network</span> that truly empowers customers. And,
              </p>
              <p className="text-gray-700 mb-3 leading-relaxed">
                Let them save on every purchase from apparel shops, restaurants, furniture shops, medical stores, fashion outlets & FMCG shops.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Currently operating in <span className="font-semibold text-orange-600">Delhi NCR</span>. Unlock exclusive benefits like discounts, cashback, free gifts & more!
              </p>
            </motion.div>

            <motion.div
              className="relative bg-white rounded-3xl shadow-lg p-10 hover:shadow-xl transition transform hover:scale-105 border border-orange-200"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
            >
              <h3 className="text-2xl font-bold text-orange-600 mb-4 flex items-center gap-3">
                <Diamond className="w-8 h-8 text-yellow-400" /> Prime Membership
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A membership program designed to give you <span className="font-semibold text-orange-500">savings, rewards, and premium shopping perks</span> at partner stores.
              </p>
            </motion.div>
          </div>

          {/* Benefits */}
          <div className="mb-20">
            <motion.h2
              className="text-4xl font-extrabold text-center text-orange-500 mb-14"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              Prime Membership Benefits
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {benefits.map((item, i) => (
                <motion.div
                  key={i}
                  className="relative bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-2 hover:scale-105 border border-orange-100"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i * 0.2}
                >
                  <div className="flex justify-center items-center mb-4 w-14 h-14 text-orange-500">
                    {React.cloneElement(item.icon, { className: "w-14 h-14 text-orange-500" })}
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-orange-600">{item.title}</h4>
                  <p className="text-gray-700">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Subscription Section */}
          <motion.div
            className="relative max-w-4xl mx-auto text-center rounded-3xl py-12 px-6 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 shadow-xl overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl font-extrabold mb-4 text-white">Prime Membership Fee</h2>
            <p className="text-white mb-6 opacity-90">Enjoy <strong>a full year of exclusive benefits</strong> for just:</p>
            <div className="text-5xl font-extrabold mb-6 drop-shadow-lg text-white">₹999 / Year</div>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-orange-600 font-bold py-4 px-12 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              Join Prime Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default PrimeMembership;
