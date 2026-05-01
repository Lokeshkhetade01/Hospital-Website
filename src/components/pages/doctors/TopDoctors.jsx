import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../../../redux/slices/doctor/getAllDoctor";
import { 
  ShieldCheck, 
  MapPin, 
  Star, 
  Stethoscope, 
  Shield 
} from "lucide-react";
import Loader from "../../common/Loader";

const TopDoctors = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { doctors, loading, error } = useSelector((state) => state.doctors);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const isDoctorsPage = location.pathname === "/doctors";

  // Initials generator function for doctors without avatar
  const getInitials = (name) => {
    return name?.split(" ").map((n) => n[0]).join("").toUpperCase();
  };

  // Common navigation handler to send data to Booking Page
  const handleBookingClick = (doc) => {
    navigate(`/book/${doc._id}`, {
      state: {
        doctorData: {
          name: doc.user.name,
          specialty: doc.specialization,
          fees: doc.fees,
          id: doc._id
        }
      }
    });
  };

  if (loading) return <Loader />;

  if (error) return <div className="text-center py-20 text-red-500 font-bold">Error fetching doctors. Please try again.</div>;

  return (
    <section className="py-5 px-4 bg-[#F9FBFF]">
      <div className="max-w-7xl mx-auto">
        {/* Modern Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-bold tracking-widest uppercase text-xs"
          >
            Expert Care for You
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mt-3"
          >
            {isDoctorsPage ? "Available Specialists" : "Our Top Rated Doctors"}
          </motion.h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full" />
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {doctors?.map((doc, index) => (
            <motion.div
              key={doc._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-[2.5rem] border border-slate-100 p-6 shadow-xl shadow-slate-200/40 relative overflow-hidden group cursor-pointer"
              onClick={() => handleBookingClick(doc)} // Clicking card takes to booking
            >

              {/* Doctor Avatar / Initials */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  {doc.user.avatar ? (
                    <img 
                      src={doc.user.avatar} 
                      alt={doc.user.name} 
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-100"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {getInitials(doc.user.name)}
                    </div>
                  )}
                  {doc.isVerified && (
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                      <ShieldCheck className="w-5 h-5 text-blue-500 fill-blue-50" />
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors line-clamp-1">
                    {doc.user.name}
                  </h3>
                  <p className="text-blue-600 text-xs font-bold flex items-center gap-1">
                    <Stethoscope size={12} /> {doc.specialization}
                  </p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl mb-6 border border-slate-100">
                <div className="text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Exp.</p>
                  <p className="text-sm font-bold text-slate-800">{doc.experience} Yr</p>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div className="text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Fee</p>
                  <p className="text-sm font-bold text-slate-800">₹{doc.fees}</p>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div className="text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Rating</p>
                  <p className="text-sm font-bold text-slate-800 flex items-center gap-1">
                    <Star size={12} className="fill-amber-400 text-amber-400" /> {doc.rating || '4.5'}
                  </p>
                </div>
              </div>

              {/* Location & About */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2 text-slate-500 text-sm">
                  <MapPin size={16} className="text-slate-400 mt-0.5 shrink-0" />
                  <span className="line-clamp-1 font-medium">{doc.hospital || "General Hospital"}, {doc.city}</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 italic">
                  "{doc.about || "Dedicated to providing compassionate and professional healthcare for all patients."}"
                </p>
              </div>

              {/* Booking Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevents double click from card and button
                  handleBookingClick(doc);
                }}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm group-hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
              >
                Book Appointment
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  →
                </motion.span>
              </button>
            </motion.div>
          ))}
        </div>

        {/* View All Button - Only on Home Page */}
        {!isDoctorsPage && (
          <div className="flex justify-center mt-16">
            <button 
              onClick={() => navigate("/doctors")}
              className="px-10 py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
            >
              Explore All Specialists
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopDoctors;