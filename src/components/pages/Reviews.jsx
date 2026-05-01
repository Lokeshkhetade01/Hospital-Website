import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2 } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Patient",
    image: "https://i.pravatar.cc/150?u=sarah",
    content: "The booking process was incredibly seamless. I was able to connect with a world-class cardiologist within minutes. MediCare+ has truly changed how I manage my health.",
    rating: 5,
    tag: "Cardiology"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Health Consultant",
    image: "https://i.pravatar.cc/150?u=michael",
    content: "As a professional, I highly recommend this platform. The digital prescriptions and follow-up system are top-notch. It's efficient for both doctors and patients.",
    rating: 5,
    tag: "Professional"
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Patient",
    image: "https://i.pravatar.cc/150?u=james",
    content: "Excellent dermatological care. The interface is clean, and the doctors are very attentive. I received my prescription instantly after the video consultation.",
    rating: 5,
    tag: "Dermatology"
  }
];

const ReviewCard = ({ review }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] relative flex flex-col justify-between"
  >
    {/* Decorative Quote Icon */}
    <div className="absolute top-8 right-8 text-blue-50/50">
      <Quote size={40} fill="currentColor" />
    </div>

    <div>
      {/* Rating Stars */}
      <div className="flex gap-1 mb-6">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} size={16} className="text-amber-400" fill="currentColor" />
        ))}
      </div>

      {/* Content */}
      <p className="text-gray-600 leading-relaxed mb-8 italic text-lg">
        "{review.content}"
      </p>
    </div>

    {/* User Info */}
    <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
      <div className="relative">
        <img 
          src={review.image} 
          alt={review.name} 
          className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md"
        />
        <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-0.5 border-2 border-white">
          <CheckCircle2 size={12} />
        </div>
      </div>
      <div>
        <h4 className="font-bold text-[#0D2344]">{review.name}</h4>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-medium">{review.role}</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
            {review.tag}
          </span>
        </div>
      </div>
    </div>
  </motion.div>
);

const Reviews = () => {
  return (
    <section className="py-24 px-6 bg-[#f8fbff] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-blue-600 font-bold text-xs uppercase tracking-[0.3em] mb-4 block"
            >
              Testimonials
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-extrabold text-[#0D2344] leading-tight"
            >
              What our <span className="text-blue-600">Patients</span> say <br /> about MediCare+
            </motion.h2>
          </div>
          
          <div className="hidden md:block text-right">
             <p className="text-gray-500 font-medium mb-2">Overall Rating</p>
             <div className="flex items-center gap-2 justify-end">
                <span className="text-3xl font-bold text-[#0D2344]">4.9</span>
                <div className="flex text-amber-400">
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                </div>
             </div>
             <p className="text-xs text-gray-400 mt-1">Based on 12,000+ reviews</p>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ReviewCard review={review} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA (Call to action) */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-center"
        >
          <button className="text-blue-600 font-bold hover:text-blue-700 transition-colors flex items-center gap-2 mx-auto group">
            View all patient stories
            <span className="w-8 h-[1px] bg-blue-600 group-hover:w-12 transition-all"></span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;