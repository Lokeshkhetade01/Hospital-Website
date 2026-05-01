import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyBookings,
  cancelAppointment,
} from "../../../redux/slices/booking/myBooking";
import {
  Calendar,
  Clock,
  MapPin,
  XCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MyBooking = () => {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((state) => state.myBookings);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  const handleOpenModal = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleCancelSubmit = () => {
    if (!reason.trim()) return alert("Please provide a reason");
    dispatch(cancelAppointment({ id: selectedId, reason }));
    setIsModalOpen(false);
    setReason("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/10 text-green-500";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500";
      case "cancelled":
        return "bg-red-500/10 text-red-500";
      case "completed":
        return "bg-blue-500/10 text-blue-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
          My Appointments{" "}
          <span className="text-sm font-normal text-gray-500 bg-white/5 px-3 py-1 rounded-full">
            {bookings.length} total
          </span>
        </h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-500" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((item) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={item._id}
                className="bg-[#1E1E1E] border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4">
                    <div>
                      <h3 className="font-bold text-lg">
                        {item.doctor.user.name}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {item.doctor.specialization}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded ${getStatusColor(item.status)}`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="space-y-3 py-4 border-y border-white/5 my-4">
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Calendar size={16} className="text-blue-500" />{" "}
                    {new Date(item.date).toLocaleDateString("en-GB")}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Clock size={16} className="text-blue-500" />{" "}
                    {item.timeSlot}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <MapPin size={16} className="text-blue-500" />{" "}
                    {item.doctor.hospital}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                      Total Amount
                    </p>
                    <p className="text-xl font-bold text-blue-400">
                      ₹{item.totalAmount}
                    </p>
                  </div>
                  {/* {item.status !== "cancelled" &&
                    item.status !== "completed" && (
                      <button
                        onClick={() => handleOpenModal(item._id)}
                        className="flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
                      >
                        <XCircle size={18} /> Cancel
                      </button>
                    )} */}

                  {item.status !== "cancelled" &&
                    item.status !== "completed" &&
                    !item.isPaid && ( // Agar isPaid true hoga, toh ye button hide ho jayega
                      <button
                        onClick={() => handleOpenModal(item._id)}
                        className="flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
                      >
                        <XCircle size={18} /> Cancel
                      </button>
                    )}
                </div>
                <p>
                  <span className="text-gray-500">Payment Status: </span>
                  <span
                    className={item.isPaid ? "text-green-500" : "text-red-500"}
                  >
                    {item.isPaid ? "Paid" : "Not paid yet"}
                  </span>
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Cancel Reason */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#252525] border border-white/10 w-full max-w-md p-8 rounded-3xl z-10 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-500/20 rounded-full text-red-500">
                  <AlertCircle size={24} />
                </div>
                <h2 className="text-xl font-bold">Cancel Appointment?</h2>
              </div>

              <p className="text-gray-400 text-sm mb-4">
                Please let us know the reason for cancellation.
              </p>

              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Schedule conflict, feeling better..."
                className="w-full bg-[#1A1A1A] border border-white/5 p-4 rounded-xl h-32 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 mb-6"
              />

              <div className="flex gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-xl font-medium hover:bg-white/5 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleCancelSubmit}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-bold transition-all"
                >
                  Confirm Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyBooking;
