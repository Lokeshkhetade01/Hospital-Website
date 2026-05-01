import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle,
  Clock,
  Star
} from "lucide-react";
import WhyChoose from "./whychoose/WhyChoose";
import TopDoctors from "./doctors/TopDoctors";
import Reviews from "./Reviews";
import { useNavigate } from "react-router-dom";
import Faq from "./faq/Faq";
import home from "../../assets/home.avif"
const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="w-full bg-[#f8fbff]">
      {/* ─── Hero Section ────────────────────────────────────────────── */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center px-6 pt-12 pb-20 overflow-hidden">
        
        {/* Background Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center z-10">
          
          {/* Left Content (Same but refined) */}
          <div className="text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[11px] font-bold uppercase tracking-[0.2em]"
            >
              <ShieldCheck size={14} /> 100% Secure & HIPAA Compliant
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-[80px] font-extrabold text-[#0D2344] leading-[1] tracking-tight"
            >
              Expert Care, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Anytime.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-lg md:text-[17px] max-w-lg leading-relaxed"
            >
              Skip the waiting room. Access top-rated doctors from the comfort of your home within minutes.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-5"
            >
              <button 
                onClick={() => navigate("/doctors")} 
                className="px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-300/40 flex items-center gap-3 group active:scale-95"
              >
                Find a Doctor
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <img 
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                      src={`https://i.pravatar.cc/150?u=${i+10}`}
                      alt="User"
                    />
                  ))}
                </div>
                <div className="text-sm">
                   <p className="font-bold text-[#0D2344]">50k+ Patients</p>
                   <div className="flex text-amber-400"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ─── Right Side: Modern Image Composition ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center items-center"
          >
            {/* Background Shape */}
            <div className="absolute w-[80%] h-[80%] bg-gradient-to-tr from-blue-600 to-indigo-400 rounded-[4rem] rotate-6 opacity-10 animate-pulse" />
            
            {/* Main Doctor Image Container */}
            <div className="relative z-10 w-full max-w-[400px]">
              <img 
                src={home} 
                alt="Doctor Specialist"
                className="rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-4 border-white object-cover aspect-[4/5]"
              />

              {/* Floating Info Card 1: Availability */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-10 top-20 bg-white p-4 rounded-2xl shadow-xl border border-blue-50 flex items-center gap-4 z-20"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Available Now</p>
                  <p className="text-sm font-bold text-[#0D2344]">Instant Consultation</p>
                </div>
              </motion.div>

              {/* Floating Info Card 2: Verified */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 bottom-20 bg-white p-5 rounded-2xl shadow-xl border border-blue-50 z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 rounded-lg text-white">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0D2344]">100% Verified</p>
                    <p className="text-[10px] text-gray-400 font-medium">Professional Doctors</p>
                  </div>
                </div>
              </motion.div>

              {/* Experience Badge */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#0D2344] text-white px-8 py-4 rounded-2xl shadow-2xl z-20 whitespace-nowrap">
                <p className="text-xs opacity-70 font-medium">Trusted Specialists</p>
                <p className="text-lg font-bold">Experience 15+ Years</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ─── Other Sections ─── */}
      <div className="bg-white">
        <WhyChoose />
        <TopDoctors />
        <Reviews />
        <Faq/>
      </div>
    </main>
  );
};

export default Home;