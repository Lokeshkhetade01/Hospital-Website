import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyBookings } from "../../../redux/slices/booking/myBooking";
import { getMe } from "../../../redux/slices/profile/profile";
import {
  fetchMyPrescriptions,
  downloadPrescriptionPDF,
} from "../../../redux/slices/doctor/getPrescriptions";
import {
  CalendarDays,
  Download,
  RotateCcw,
  XCircle,
  User,
  ArrowRight,
  Loader2,
  MapPin,
  X,
  Pill,
  ClipboardList,
  FileText,
  UserCircle,
} from "lucide-react";
const PrescriptionModal = ({ isOpen, onClose, data, patientName }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#141415] border border-zinc-800 w-full max-w-2xl rounded-[1rem] overflow-hidden shadow-2xl scale-in-center">
        {/* Modal Header */}
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/40">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl">
              <FileText className="text-blue-500" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-100">Prescription</h2>
              <p className="text-xs text-zinc-500 font-medium">
                By {data.doctor?.user?.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-zinc-800/30 rounded-2xl border border-zinc-700/30">
              <span className="text-[10px] font-bold text-blue-400 uppercase flex items-center gap-1 mb-1">
                <UserCircle size={12} /> Patient Name
              </span>
              <p className="text-zinc-100 font-bold text-lg">
                {patientName || "Loading..."}
              </p>
            </div>
            <div className="p-4 bg-zinc-800/30 rounded-2xl border border-zinc-700/30">
              <span className="text-[10px] font-bold text-zinc-500 uppercase flex items-center gap-1 mb-1">
                <ClipboardList size={12} /> Diagnosis
              </span>
              <p className="text-zinc-200 font-semibold">{data.diagnosis}</p>
            </div>
            <div className="p-4 bg-zinc-800/30 rounded-2xl border border-zinc-700/30">
              <span className="text-[10px] font-bold text-zinc-500 uppercase flex items-center gap-1 mb-1">
                <CalendarDays size={12} /> Follow Up
              </span>
              <p className="text-zinc-200 font-semibold">
                {new Date(data.followUpDate).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-bold text-zinc-400 flex items-center gap-2">
              <Pill size={16} className="text-emerald-500" /> MEDICINES
            </h3>
            {data.medicines.map((med, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-2xl"
              >
                <div>
                  <p className="text-zinc-100 font-bold">{med.name}</p>
                  <p className="text-xs text-zinc-500">
                    {med.dosage} • {med.duration}
                  </p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[11px] font-bold rounded-lg">
                  {med.frequency}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10 text-sm text-zinc-300 italic">
            <strong>Advice:</strong> {data.advice}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PROFILE COMPONENT ---
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDownload = (appointmentId) => {
    // 1. Prescriptions array mein se wo object dhundo jiska appointment._id match kare
    const rx = prescriptions.find((p) => p.appointment._id === appointmentId);

    if (rx && rx._id) {
      // 2. Ab hum rx._id bhej rahe hain (jo ki 69f5b319... wali hai)
      dispatch(downloadPrescriptionPDF(rx._id));
    } else {
      alert("Download error: Prescription ID not found for this appointment.");
    }
  };

  // Modal Local State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPrescription, setCurrentPrescription] = useState(null);

  const { user, loading: userLoading } = useSelector((state) => state.profile);
  const { bookings, loading: bookingsLoading } = useSelector(
    (state) => state.myBookings,
  );
  const { prescriptions } = useSelector((state) => state.prescription);

  useEffect(() => {
    dispatch(getMe());
    dispatch(fetchMyBookings());
    dispatch(fetchMyPrescriptions());
  }, [dispatch]);

  const handleViewPrescription = (appointmentId) => {
    const rx = prescriptions.find((p) => p.appointment._id === appointmentId);
    if (rx) {
      setCurrentPrescription(rx);
      setIsModalOpen(true);
    } else {
      alert("Prescription not found or pending.");
    }
  };

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-blue-500/10 text-blue-400/90 border border-blue-500/20";
      case "completed":
        return "bg-emerald-500/10 text-emerald-400/90 border border-emerald-500/20";
      case "cancelled":
        return "bg-zinc-800 text-zinc-500 border border-zinc-700/50";
      default:
        return "bg-zinc-900 text-zinc-400";
    }
  };

  if (userLoading || bookingsLoading) {
    return (
      <div className="min-h-screen bg-[#0d0d0ec7] flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0ec7] text-zinc-400 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Profile Header */}
        <header className="flex flex-col md:flex-row items-center gap-8 pb-10 border-b border-zinc-800/50">
          <div className="flex flex-col sm:flex-row items-center gap-6 flex-1">
            <div className="relative w-24 h-24 rounded-full bg-zinc-800 border-2 border-zinc-700 overflow-hidden shadow-2xl">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-200 text-4xl font-bold uppercase">
                  {user?.name?.slice(0, 2)}
                </div>
              )}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-zinc-200 uppercase tracking-tight">
                {user?.name}
              </h1>
              <p className="text-zinc-500">
                {user?.email} | {user?.phone}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/profile/edit-profile")}
            className="px-6 py-3 rounded-2xl bg-zinc-800 border border-zinc-700 text-zinc-300 font-semibold hover:bg-zinc-700 transition-all flex items-center gap-2"
          >
            Edit Profile <ArrowRight size={16} />
          </button>
        </header>

        {/* Appointments Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-zinc-200 flex items-center gap-3">
            <CalendarDays className="text-blue-500" /> My Appointments
          </h2>

          <div className="grid gap-5">
            {bookings?.length > 0 ? (
              bookings.map((app) => (
                <div
                  key={app._id}
                  className="bg-[#141415] p-4 rounded-[1rem] border border-zinc-800/50 hover:border-blue-500/30 transition-all"
                >
                  <div className="flex flex-col sm:flex-row justify-between gap-6">
                    <div className="flex items-start gap-5">
                      <div>
                        <h3 className="font-bold text-lg text-zinc-200">
                          {app.doctor.user.name}
                        </h3>
                        <p className="text-sm text-zinc-500">
                          {app.doctor.specialization}
                        </p>
                        <p className="text-xs text-zinc-600 mt-1 flex items-center gap-1">
                          <MapPin size={12} /> {app.doctor.hospital}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest h-fit ${getStatusStyles(app.status)}`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <div className="mt-6 pt-6 border-t border-zinc-800/50 flex flex-wrap gap-3">
                    {app.status === "completed" ? (
                      <>
                        <button
                          onClick={() => handleViewPrescription(app._id)}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold bg-blue-600/10 text-blue-400 border cursor-pointer border-blue-500/20 hover:bg-blue-600 hover:text-white transition-all"
                        >
                          <FileText size={14} /> View Prescription
                        </button>
                        <button
                          onClick={() => handleDownload(app._id)} // Hum appointment ID bhej rahe hain, function andar se prescription ID nikal lega
                          className="flex items-center gap-2 px-5 py-2.5 cursor-pointer rounded-xl text-[13px] font-bold bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-zinc-700 transition-all"
                        >
                          <Download size={14} /> Download Receipt
                        </button>
                      </>
                    ) : app.status === "cancelled" ? (
                      <span className="text-zinc-600 text-sm font-medium italic">
                        Appointment was cancelled
                      </span>
                    ) : (
                      <>
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold bg-blue-600 text-white hover:bg-blue-500 transition-all">
                          Reschedule
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">
                          <XCircle size={14} /> Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-zinc-900/20 rounded-[2.5rem] border border-zinc-800/50">
                <p className="text-zinc-500">No appointments found.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Prescription Modal Component */}
      <PrescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={currentPrescription}
        patientName={user?.name}
      />
    </div>
  );
};

export default Profile;
