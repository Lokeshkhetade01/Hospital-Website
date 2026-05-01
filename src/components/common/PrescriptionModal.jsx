import React from "react";
import { X, Pill, ClipboardList, User, Calendar,UserCircle, Download } from "lucide-react";

const PrescriptionModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#141415] border border-zinc-800 w-full max-w-2xl rounded-[2rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
          <div>
            <h2 className="text-xl font-bold text-zinc-100">Medical Prescription</h2>
            <p className="text-sm text-zinc-500">Issued by {data.doctor.user.name}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Diagnosis & Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase mb-1">
                <ClipboardList size={14} /> Diagnosis
              </div>
              <p className="text-zinc-200 font-semibold">{data.diagnosis}</p>
            </div>
            <div className="p-4 bg-zinc-800/30 rounded-2xl border border-zinc-700/30">
              <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase mb-1">
                <Calendar size={14} /> Date
              </div>
              <p className="text-zinc-200 font-semibold">
                {new Date(data.appointment.date).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Medicines List */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-400 flex items-center gap-2">
              <Pill size={16} className="text-emerald-500" /> PRESCRIBED MEDICINES
            </h3>
            <div className="grid gap-3">
              {data.medicines.map((med, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-zinc-800/20 rounded-xl border border-zinc-800">
                  <div>
                    <p className="text-zinc-100 font-bold">{med.name}</p>
                    <p className="text-xs text-zinc-500">{med.dosage} • {med.duration}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[11px] font-bold rounded-lg border border-emerald-500/20">
                      {med.frequency}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advice */}
          <div className="p-4 bg-amber-500/5 rounded-2xl border border-amber-500/10">
            <h4 className="text-xs font-bold text-amber-500/80 mb-1">DOCTOR'S ADVICE</h4>
            <p className="text-zinc-300 text-sm italic">"{data.advice}"</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-800 flex gap-3 bg-zinc-900/50">
           <button 
            onClick={() => window.open(data.attachments[0], '_blank')}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all"
           >
            <Download size={18} /> Download Report
           </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionModal;