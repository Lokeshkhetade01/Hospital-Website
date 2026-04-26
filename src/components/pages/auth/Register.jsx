// src/pages/auth/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Phone, Lock, ArrowRight, UserPlus } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Registration logic yahan aayegi
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-[#0D0D0E] flex items-center justify-center p-4">
      {/* Decorative background glow */}
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/5 blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-lg">
        <div className="bg-[#141415] border border-zinc-800/50 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          
          <div className="mb-10">
            <div className="inline-flex p-3 rounded-2xl bg-blue-500/10 mb-4">
              <UserPlus className="text-blue-500" size={28} />
            </div>
            <h1 className="text-3xl font-bold text-zinc-200 tracking-tight">Join Us</h1>
            <p className="text-zinc-500 mt-1">Create an account to manage your appointments</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="sm:col-span-2 space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  name="name"
                  type="text"
                  onChange={handleChange}
                  placeholder="Rahul Sharma"
                  className="w-full bg-[#0D0D0E] border border-zinc-800 text-zinc-200 pl-11 py-3.5 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-700"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  name="email"
                  type="email"
                  onChange={handleChange}
                  placeholder="rahul@example.com"
                  className="w-full bg-[#0D0D0E] border border-zinc-800 text-zinc-200 pl-11 py-3.5 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-700"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Phone</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  name="phone"
                  type="tel"
                  onChange={handleChange}
                  placeholder="+91 98..."
                  className="w-full bg-[#0D0D0E] border border-zinc-800 text-zinc-200 pl-11 py-3.5 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-700"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="sm:col-span-2 space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Create Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  name="password"
                  type="password"
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  className="w-full bg-[#0D0D0E] border border-zinc-800 text-zinc-200 pl-11 py-3.5 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-700"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="sm:col-span-2 mt-4 py-4 bg-blue-600 hover:bg-blue-500 text-zinc-100 font-bold rounded-2xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group active:scale-[0.98]"
            >
              Create Account
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="text-center mt-8 text-zinc-500 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 font-bold hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;