import React from "react";
import { motion } from "framer-motion";

const Card = ({ icon: Icon, title, description, iconBgColor, iconColor }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="flex flex-col items-center text-center py-6 px-8  rounded-[1rem] bg-[#2D2D2D] border border-white/5 shadow-2xl w-full"
    >
      {/* Icon Circle */}
      <div 
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-6`}
        style={{ backgroundColor: iconBgColor }}
      >
        <Icon size={28} style={{ color: iconColor }} />
      </div>

      {/* Content */}
      <h3 className="text-white text-xl font-bold mb-2">
        {title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default Card;