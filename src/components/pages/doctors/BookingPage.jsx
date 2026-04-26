import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Calendar as CalendarIcon, CheckCircle } from "lucide-react";

const BookingPage = () => {
  const location = useLocation();
  const { doctorData } = location.state || {}; // Doctor ka data state se fetch karein
  
  const [selectedSlot, setSelectedSlot] = useState("10:00 AM");
  const slots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM"];

  if (!doctorData) return <div className="text-white p-20">Doctor data not found!</div>;

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6 md:p-12 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header Section */}
        <section>
          <p className="text-gray-400 text-sm mb-4">Booking appointment with</p>
          <div className="flex items-center justify-between bg-[#1E1E1E] p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#E3F2FD] text-[#0D2344] flex items-center justify-center font-bold text-lg">
                {doctorData.initial}
              </div>
              <div>
                <h2 className="font-bold text-lg">{doctorData.name}</h2>
                <p className="text-gray-400 text-sm">{doctorData.specialty} • ₹{doctorData.fees} consultation</p>
              </div>
            </div>
            <span className="bg-[#F1F8E9] text-[#43A047] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <CheckCircle size={12} /> Verified
            </span>
          </div>
        </section>

        {/* Date Selection */}
        <section className="space-y-3">
          <label className="text-gray-300 text-sm font-medium">Select date</label>
          <div className="relative max-w-[200px]">
            <input 
              type="text" 
              value="20-04-2026" 
              readOnly
              className="w-full bg-[#2D2D2D] border border-white/10 p-3 rounded-lg text-sm pr-10 focus:outline-none"
            />
            <CalendarIcon className="absolute right-3 top-3 text-gray-400" size={18} />
          </div>
        </section>

        {/* Time Slots */}
        <section className="space-y-4">
          <p className="text-gray-300 text-sm">Available time slots — April 20</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {slots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`py-3 rounded-xl border text-sm font-medium transition-all ${
                  selectedSlot === slot 
                  ? "bg-[#E3F2FD] text-[#1E88E5] border-[#1E88E5]" 
                  : "bg-transparent border-white/10 text-gray-400 hover:border-white/30"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </section>

        {/* Symptoms Textarea */}
        <section className="space-y-3">
          <label className="text-gray-300 text-sm">Describe your symptoms</label>
          <textarea 
            placeholder="e.g. Chest pain since 2 days, mild fever..."
            className="w-full bg-[#2D2D2D] border border-white/10 p-4 rounded-xl h-32 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </section>

        <hr className="border-white/5" />

        {/* Pricing Summary */}
        <section className="space-y-3 text-sm">
          <div className="flex justify-between text-gray-400">
            <span>Consultation fee</span>
            <span className="text-white font-bold">₹{doctorData.fees}</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Platform fee</span>
            <span className="text-white font-bold">₹29</span>
          </div>
          <div className="flex justify-between text-lg pt-2 border-t border-white/5">
            <span className="font-bold">Total</span>
            <span className="text-blue-400 font-bold">₹{doctorData.fees + 29}</span>
          </div>
        </section>

        {/* Action Button */}
        <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all">
          Confirm Appointment
        </button>

      </div>
    </div>
  );
};

export default BookingPage;