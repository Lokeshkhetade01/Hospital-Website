import React from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const DoctorCard = (props) => {
  const { id, name, specialty, experience, rating, reviews, fees, initial, initialBg } = props;
  
  const navigate = useNavigate(); 

  const handleNavigate = () => {
    navigate(`/book/${id}`, { state: { doctorData: props } });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={handleNavigate}
      className="flex items-center gap-4 p-5 rounded-2xl bg-[#2D2D2D] border border-white/5 shadow-lg w-full cursor-pointer hover:border-blue-500/30 transition-colors"
    >
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 text-xl font-bold"
        style={{ backgroundColor: initialBg, color: '#0D2344' }}
      >
        {initial}
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-white font-bold text-lg leading-tight">{name}</h3>
        
        <p className="text-gray-400 text-sm">
          {specialty} • {experience} yrs exp
        </p>
        

        {/* Fees */}
        <p className="text-blue-400 font-bold text-sm mt-1">
          ₹{fees} / visit
        </p>
      </div>
    </motion.div>
  );
};

export default DoctorCard;