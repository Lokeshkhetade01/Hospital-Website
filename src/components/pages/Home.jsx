import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import WhyChoose from "./whychoose/WhyChoose";
import TopDoctors from "./doctors/TopDoctors";
import Reviews from "./Reviews";

const CATEGORIES = [
  "Cardiologist",
  "Dermatologist",
  "Orthopedic",
  "Pediatrician",
  "Neurologist",
];

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("Cardiologist");

  return (
    <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center bg-[#E3F2FD] px-4 py-20 overflow-hidden">
      
      {/* Background Subtle Circles for "Attractive" look */}
      <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-30" />

      <div className="max-w-4xl w-full text-center z-10">
        
        {/* Trusted Badge */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-blue-700 font-bold tracking-wide text-sm mb-4"
        >
          Trusted by 50,000+ patients
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-[#0D2344] leading-tight mb-6"
        >
          Book doctors instantly, <br />
          <span className="text-blue-600">from home</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-blue-800/70 text-lg md:text-xl mb-10"
        >
          Find top specialists, book appointments, get prescriptions online
        </motion.p>

        {/* Search Bar Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row items-center gap-3 bg-transparent max-w-2xl mx-auto mb-10"
        >
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by doctor name or specialization.."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#2D2D2D] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-xl"
            />
          </div>
          <button className="w-full md:w-auto px-10 py-4 bg-[#E8F1F9] text-blue-400 font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md">
            Search
          </button>
        </motion.div>

        {/* Category Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-blue-100 border-blue-400 text-blue-700 shadow-sm"
                  : "bg-[#2D2D2D] border-transparent text-gray-300 hover:bg-[#3D3D3D]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>
      <WhyChoose/>
      <TopDoctors/>
      <Reviews/>
    </section>
  );
};

export default Home;