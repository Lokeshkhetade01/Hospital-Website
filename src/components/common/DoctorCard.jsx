// import React from "react";
// import { FaStar } from "react-icons/fa";
// import { motion } from "framer-motion";

// const DoctorCard = ({ name, specialty, experience, rating, reviews, fees, initial, initialBg }) => {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.02 }}
//       className="flex items-center gap-4 p-5 rounded-2xl bg-[#2D2D2D] border border-white/5 shadow-lg w-full"
//     >
//       {/* Circle with Initials */}
//       <div 
//         className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 text-xl font-bold"
//         style={{ backgroundColor: initialBg, color: '#0D2344' }}
//       >
//         {initial}
//       </div>

//       {/* Doctor Info */}
//       <div className="flex flex-col gap-1">
//         <h3 className="text-white font-bold text-lg leading-tight">{name}</h3>
//         <p className="text-gray-400 text-sm">
//           {specialty} • {experience} yrs exp
//         </p>
        
//         {/* Rating */}
//         <div className="flex items-center gap-1.5">
//           <div className="flex items-center text-orange-500 gap-0.5">
//             {[...Array(5)].map((_, i) => (
//               <FaStar key={i} size={12} fill={i < Math.floor(rating) ? "currentColor" : "none"} stroke="currentColor" />
//             ))}
//           </div>
//           <span className="text-gray-300 text-xs font-medium">
//             {rating} ({reviews})
//           </span>
//         </div>

//         {/* Fees */}
//         <p className="text-blue-400 font-bold text-sm mt-1">
//           ₹{fees} / visit
//         </p>
//       </div>
//     </motion.div>
//   );
// };

// export default DoctorCard;





import React from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 1. useNavigate import karein

const DoctorCard = (props) => {
  // Props ko destructure karein taaki data pass karne mein aasani ho
  const { name, specialty, experience, rating, reviews, fees, initial, initialBg } = props;
  
  const navigate = useNavigate(); // 2. Navigate function initialize karein

  const handleNavigate = () => {
    // Doctor name ko URL friendly banao (e.g. "Dr. Anjali Mehta" -> "dr-anjali-mehta")
    const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "");
    
    // 3. Navigate karein aur poora data 'state' mein pass karein
    navigate(`/book/${slug}`, { state: { doctorData: props } });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={handleNavigate} // 4. Click event yahan lagayein
      className="flex items-center gap-4 p-5 rounded-2xl bg-[#2D2D2D] border border-white/5 shadow-lg w-full cursor-pointer hover:border-blue-500/30 transition-colors"
    >
      {/* Circle with Initials */}
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 text-xl font-bold"
        style={{ backgroundColor: initialBg, color: '#0D2344' }}
      >
        {initial}
      </div>

      {/* Doctor Info */}
      <div className="flex flex-col gap-1">
        <h3 className="text-white font-bold text-lg leading-tight">{name}</h3>
        <p className="text-gray-400 text-sm">
          {specialty} • {experience} yrs exp
        </p>
        
        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center text-orange-500 gap-0.5">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={12} fill={i < Math.floor(rating) ? "currentColor" : "none"} stroke="currentColor" />
            ))}
          </div>
          <span className="text-gray-300 text-xs font-medium">
            {rating} ({reviews})
          </span>
        </div>

        {/* Fees */}
        <p className="text-blue-400 font-bold text-sm mt-1">
          ₹{fees} / visit
        </p>
      </div>
    </motion.div>
  );
};

export default DoctorCard;