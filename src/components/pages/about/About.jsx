import React from "react";
import { 
  CheckCircle2, 
  Users, 
  Stethoscope, 
  Award, 
  Activity,
  HeartPulse,
  Clock,
  ShieldCheck
} from "lucide-react";
import about from "../../../assets/about.avif"
const StatsCard = ({ icon: Icon, value, label }) => (
  <div className="group p-6 bg-zinc-900/50 border border-zinc-800 rounded-[2rem] hover:border-blue-500/30 transition-all duration-500">
    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      <Icon className="text-blue-500" size={24} />
    </div>
    <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
    <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider">{label}</p>
  </div>
);

const FeatureItem = ({ title, desc }) => (
  <div className="flex gap-4 items-start">
    <div className="mt-1 bg-emerald-500/10 p-1 rounded-full">
      <CheckCircle2 className="text-emerald-500" size={18} />
    </div>
    <div>
      <h4 className="text-zinc-200 font-bold text-[16px]">{title}</h4>
      <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

const About = () => {
  return (
    <div className="min-h-screen bg-[#0d0d0e] text-zinc-400 overflow-hidden">
      {/* ─── Hero Section ────────────────────────────────────────────── */}
      <section className="relative pt-15 pb-30 px-6">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-blue-600/10 blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image Montage Pattern */}
          <div className="relative">
            <div className="relative z-10 rounded-[2rem] overflow-hidden border border-zinc-800 shadow-2xl">
              <img 
                src={about}
                alt="Modern Hospital"
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-10 -right-6 z-20 bg-[#141415] border border-blue-500 p-6 rounded-[1rem] shadow-2xl hidden md:block max-w-[250px]">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-blue-500 rounded-2xl shadow-lg shadow-blue-500/20">
                  <HeartPulse className="text-white" size={24} />
                </div>
                <div className="text-white font-bold leading-tight">Emergency <br/>Care 24/7</div>
              </div>
              <p className="text-xs text-zinc-500">Rapid response and world-class medical attention whenever you need it.</p>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-500 text-xs font-bold uppercase tracking-[0.2em]">
              <Activity size={14} /> Established Since 1998
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Redefining Healthcare <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                with Excellence.
              </span>
            </h1>

            <p className="text-lg text-zinc-500 leading-relaxed max-w-xl">
              At <span className="text-blue-500 font-semibold">MediCare+</span>, we believe healthcare is not just about treating symptoms, but about nurturing well-being through advanced technology and human compassion.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              <FeatureItem 
                title="Advanced Diagnostics" 
                desc="Utilizing AI-driven tools for 99.9% accurate health assessments." 
              />
              <FeatureItem 
                title="Elite Specialist Team" 
                desc="Over 500+ world-renowned doctors under one roof." 
              />
            </div>

            {/* <div className="pt-6">
               <button className="px-8 py-4 bg-zinc-100 hover:bg-white text-zinc-900 font-bold rounded-2xl transition-all flex items-center gap-3 active:scale-95 shadow-xl">
                 Learn Our History <ArrowRight size={18} />
               </button>
            </div> */}
          </div>
        </div>
      </section>

      {/* ─── Stats Section ────────────────────────────────────────────── */}
      <section className="py-15 border-y border-zinc-800/50 bg-[#0d0d0e]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard icon={Users}  label="Happy Patients" />
            <StatsCard icon={Stethoscope}  label="Specialist Doctors" />
            <StatsCard icon={Award} label="Global Awards" />
            <StatsCard icon={Clock} value="24/7" label="Support Available" />
          </div>
        </div>
      </section>

      {/* ─── Mission & Vision ─────────────────────────────────────────── */}
      <section className="py-15 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-20">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-5xl font-bold text-white">Our Core Philosophy</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-5 rounded-[1rem] bg-gradient-to-b from-zinc-800/20 to-transparent border border-zinc-800 text-left">
              <ShieldCheck className="text-blue-500 mb-6" size={40} />
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-zinc-500 leading-relaxed">
                To provide accessible, high-quality, and cost-effective healthcare services to our community while maintaining the highest ethical standards and fostering a culture of continuous learning and innovation.
              </p>
            </div>

            <div className="p-10 rounded-[1rem] bg-gradient-to-b from-blue-600/5 to-transparent border border-blue-500/20 text-left">
              <Activity className="text-blue-400 mb-6" size={40} />
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-zinc-500 leading-relaxed">
                To be the global benchmark in healthcare excellence, recognized for our clinical outcomes, patient-centric approach, and pioneering medical research that saves lives every day.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper Icon for button (if not imported)
const ArrowRight = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
);

export default About;