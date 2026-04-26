// src/pages/profile/EditProfile.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, User, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

const EditProfile = ({ userData, onSave }) => {
  const navigate = useNavigate();

  // Local state for form management
  const [formData, setFormData] = useState({ ...userData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Helper to handle saving and updating initials
  const handleSave = (e) => {
    e.preventDefault();
    // Update initials based on name if name has multiple words, else keep first char
    const initials = formData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    onSave({ ...formData, initial: initials }); // Call parent save function
  };

  return (
    <motion.section 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-3xl mx-auto space-y-12 text-white"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-8 border-b border-white/5">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 mt-5 text-blue-400 font-medium text-sm hover:text-blue-300">
          <ArrowLeft size={16} /> Back
        </button>
        <h1 className="text-3xl font-extrabold tracking-tight">Edit Your Profile</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-10 bg-[#212121] p-10 rounded-lg mb-20 border border-white/5 shadow-2xl">
        
        {/* Avatar Editor Section */}
        <div className="flex flex-col items-center gap-6 pb-10 border-b border-white/5">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full bg-[#E3F2FD] text-[#0D2344] flex items-center justify-center font-extrabold text-5xl shadow-xl">
              {formData.initial}
            </div>
          </div>
          <p className="text-gray-400 text-sm text-center">Avatar is auto-generated from your initials.</p>
        </div>

        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <User size={15} /> Full Name
            </label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              className="w-full bg-[#1a1a1a] border border-white/10 p-4 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Email (Read-only as per image logic generally) */}
          <div className="space-y-2 opacity-60">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Mail size={15} /> Email Address (Read-only)
            </label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              readOnly
              className="w-full bg-[#1a1a1a] border border-white/10 p-4 rounded-xl text-gray-400 focus:outline-none cursor-not-allowed"
            />
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Phone size={15} /> Phone Number
            </label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              className="w-full bg-[#1a1a1a] border border-white/10 p-4 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Action Button */}
        <button 
          type="submit"
          className="w-full py-4 flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all"
        >
          <Save size={18} /> Update Profile
        </button>
      </form>
    </motion.section>
  );
};

export default EditProfile;