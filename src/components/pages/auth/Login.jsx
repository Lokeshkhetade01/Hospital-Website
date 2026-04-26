// src/pages/auth/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, LogIn } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Auth logic yahan aayegi
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-[#0D0D0E] flex items-center justify-center p-4">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 blur-[100px] pointer-events-none"></div>
      
      <div className="w-full max-w-md">
        <div className="bg-[#141415] border border-zinc-800/50 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          
          <div className="text-center mb-10">
            <div className="inline-flex p-4 rounded-3xl bg-blue-500/10 mb-4">
              <LogIn className="text-blue-500" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-zinc-200 tracking-tight">Welcome Back</h1>
            <p className="text-zinc-500 mt-2">Enter your details to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors" 
                  size={20} 
                />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#0D0D0E] border border-zinc-800 text-zinc-200 pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-700"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                  Password
                </label>
                <button type="button" className="text-xs font-semibold text-blue-500 hover:text-blue-400">
                  Forgot?
                </button>
              </div>
              <div className="relative group">
                <Lock 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors" 
                  size={20} 
                />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0D0D0E] border border-zinc-800 text-zinc-200 pl-12 pr-12 py-4 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-700"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-zinc-100 font-bold rounded-2xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group active:scale-[0.98]"
            >
              Sign In
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="text-center mt-8 text-zinc-500 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 font-bold hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;