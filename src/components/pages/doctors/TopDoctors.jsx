import React from "react";
import DoctorCard from "../../common/DoctorCard";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom"; // 1. useLocation add kiya

const TopDoctors = () => {
  const doctorsData = [
    {
      name: "Dr. Anjali Mehta",
      specialty: "Cardiologist",
      experience: 12,
      rating: 4.9,
      reviews: 128,
      fees: 600,
      initial: "AM",
      initialBg: "#E3F2FD",
    },
    {
      name: "Dr. Rohit Singh",
      specialty: "Orthopedic",
      experience: 8,
      rating: 4.7,
      reviews: 95,
      fees: 500,
      initial: "RS",
      initialBg: "#F1F8E9",
    },
    {
      name: "Dr. Sneha Kapoor",
      specialty: "Neurologist",
      experience: 10,
      rating: 4.8,
      reviews: 110,
      fees: 800,
      initial: "SK",
      initialBg: "#F3E5F5",
    },
  ];

  const navigate = useNavigate();
  const location = useLocation(); // 2. Location variable banaya

  // 3. Condition: Check karo ki user '/doctors' page par hai ya nahi
  const isDoctorsPage = location.pathname === "/doctors";

  return (
    <section className="py-5 px-6">
      <div className="max-w-full mx-auto">
        {/* Title */}
        <div className="flex flex-col mb-10">
          {/* <h2 className="text-2xl md:text-3xl font-bold mb-2">Top Doctors</h2> */}
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {isDoctorsPage ? "All Specialists" : "Top Doctors"}
          </h2>
          <div className="w-16 h-1 bg-blue-500 rounded-full" />
        </div>

        {/* Grid Container */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {doctorsData.map((doc, index) => (
            <DoctorCard key={index} {...doc} />
          ))}
        </motion.div>
      </div>

      {/* 4. Agar isDoctorsPage false hai, tabhi button dikhega */}
      {!isDoctorsPage && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => {
              navigate("/doctors");
            }}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-lg"
          >
            View All Doctors
          </button>
        </div>
      )}
    </section>
  );
};

export default TopDoctors;
