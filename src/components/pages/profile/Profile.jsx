// src/pages/profile/UserProfile.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Download, RotateCcw, XCircle, User, ArrowRight } from "lucide-react";

// Mock Data
const APPOINTMENTS = [
  {
    doctor: "Dr. Anjali Mehta",
    specialty: "Cardiologist",
    date: "Apr 20, 2026",
    time: "10:00 AM",
    status: "Upcoming",
    actions: ["Reschedule", "Cancel"],
  },
  {
    doctor: "Dr. Priya Kulkarni",
    specialty: "Dermatologist",
    date: "Apr 12, 2026",
    time: "2:30 PM",
    status: "Completed",
    actions: ["Download Rx", "View prescription"],
  },
  {
    doctor: "Dr. Rohit Singh",
    specialty: "Orthopedic",
    date: "Mar 28, 2026",
    time: "11:00 AM",
    status: "Cancelled",
    actions: ["Rebook"],
  },
];

// Helper to style status badges (Zinc & Muted Tones)
const getStatusStyles = (status) => {
  switch (status) {
    case "Upcoming": return "bg-blue-500/10 text-blue-400/90 border border-blue-500/20";
    case "Completed": return "bg-emerald-500/10 text-emerald-400/90 border border-emerald-500/20";
    case "Cancelled": return "bg-zinc-800 text-zinc-500 border border-zinc-700/50";
    default: return "bg-zinc-900 text-zinc-400";
  }
};

// Modern Action Buttons
const ActionButton = ({ action }) => {
  const baseClass = "flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 active:scale-95 ";
  
  switch (action) {
    case "Cancel": 
      return (
        <button className={`${baseClass} bg-red-500/5 text-red-400/80 border border-red-500/10 hover:bg-red-500/20 hover:text-red-400`}>
          <XCircle size={14} /> {action}
        </button>
      );
    case "Rebook":
      return (
        <button className={`${baseClass} bg-blue-600/90 text-zinc-100 hover:bg-blue-600 shadow-lg shadow-blue-900/20`}>
          <RotateCcw size={14} /> {action}
        </button>
      );
    case "Download Rx":
      return (
        <button className={`${baseClass} bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-zinc-700 hover:text-zinc-100`}>
          <Download size={14} /> {action}
        </button>
      );
    default: 
      return (
        <button className={`${baseClass} bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 hover:border-zinc-500 hover:text-zinc-200`}>
          {action}
        </button>
      );
  }
};

const Profile = ({ userData }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0d0d0ec7] text-zinc-400 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Profile Header */}
        <section className="flex flex-col md:flex-row items-center gap-8 pb-10 border-b border-zinc-800/50">
          <div className="flex flex-col sm:flex-row items-center gap-6 flex-1">
            {/* Avatar with Glow */}
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 transition-all"></div>
              <div className="relative w-24 h-24 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center shadow-2xl">
                <span className="text-zinc-200 font-bold text-4xl uppercase">
                  {userData?.initial || userData?.name?.[0] || "U"}
                </span>
              </div>
            </div>

            <div className="text-center sm:text-left space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-200">
                {userData?.name || "User Name"}
              </h1>
              <p className="text-zinc-500 font-medium">
                {userData?.email} <span className="mx-2 text-zinc-700">|</span> {userData?.phone}
              </p>
            </div>
          </div>

          <button 
            onClick={() => navigate("edit-profile")}
            className="group flex items-center gap-2 px-6 py-3 rounded-2xl bg-zinc-800 border border-zinc-700 text-zinc-300 font-semibold text-sm hover:bg-zinc-700 hover:text-zinc-100 transition-all shadow-xl"
          >
            Edit Profile
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </section>

        {/* Appointments Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-zinc-200 flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <CalendarDays className="text-blue-500" size={20} />
              </div>
              My Appointments
            </h2>
            <div className="h-[1px] flex-1 bg-zinc-800/50 ml-6 hidden sm:block"></div>
          </div>

          <div className="grid gap-5">
            {APPOINTMENTS.map((app, index) => (
              <div 
                key={index} 
                className="group relative bg-[#141415] hover:bg-[#18181A] p-6 rounded-[2.5rem] border border-zinc-800/50 hover:border-blue-500/30 transition-all duration-500 shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-start gap-5">
                    {/* Dr. Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center border border-zinc-700 shrink-0 group-hover:border-blue-500/40 transition-colors">
                      <User size={24} className="text-zinc-500 group-hover:text-blue-400" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-bold text-lg text-zinc-200 group-hover:text-blue-400 transition-colors">
                        {app.doctor}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px]">
                        <span className="text-zinc-500 font-medium">{app.specialty}</span>
                        <span className="text-zinc-800">•</span>
                        <div className="flex items-center gap-2 text-zinc-500">
                          <CalendarDays size={14} className="text-zinc-600" />
                          <span>{app.date}</span>
                          <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                          <span className="text-zinc-600">{app.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-inner ${getStatusStyles(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                </div>

                {/* Divider & Actions */}
                <div className="mt-6 pt-6 border-t border-zinc-800/50 flex flex-wrap gap-3">
                  {app.actions.map(action => (
                    <ActionButton key={action} action={action} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;