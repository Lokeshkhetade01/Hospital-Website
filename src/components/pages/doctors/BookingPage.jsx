// import React, { useEffect, useState } from "react";
// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import { Calendar as CalendarIcon, CheckCircle, Loader2, Lock, X } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { motion, AnimatePresence } from "framer-motion";
// import { bookAppointment,resetState } from "../../../redux/slices/doctor/bookAppointment";
// import { toast } from "react-toastify";
// const BookingPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { doctorData } = location.state || {};
//   const { doctorId } = useParams();

//   const { token } = useSelector((state) => state.auth);
//   const { loading, success, error } = useSelector((state) => state.appointment);

//     useEffect(() => {
//     if (error) {
//       const errorMessage = typeof error === 'object' ? error.message : error;

//       toast.error(errorMessage || "Slot booking failed!", {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "dark",
//       });
//       dispatch(resetState());
//     }
//     if (success) {
//       toast.success("Appointment Booked!");
//     }
//   }, [error, success, dispatch]);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       dispatch(resetState());
//     };
//   }, [dispatch]);

//   // Component States
//   const [selectedSlot, setSelectedSlot] = useState("10:00 AM");
//   const [symptoms, setSymptoms] = useState("");
//   const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
//   const [showAuthModal, setShowAuthModal] = useState(false);

//   const slots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM","5:30 PM","6:00 PM"];
//   const today = new Date().toISOString().split("T")[0];

//   const handleBooking = () => {
//     // Stage 1: Check Authentication
//     if (!token) {
//       setShowAuthModal(true);
//       return;
//     }

//     // Stage 2: Proceed to Book
//     const payload = {
//       doctorId: doctorId,
//       date: date,
//       timeSlot: selectedSlot,
//       symptoms: symptoms || "No symptoms described",
//     };
//     dispatch(bookAppointment(payload));
//   };

//   if (success) {
//     return (
//       <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white p-4">
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           className="text-center bg-[#1E1E1E] p-10 rounded-3xl border border-white/5 shadow-2xl"
//         >
//           <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
//             <CheckCircle className="text-green-500" size={48} />
//           </div>
//           <h2 className="text-3xl font-bold mb-2">Success!</h2>
//           <p className="text-gray-400 mb-8">Your appointment is confirmed for {date} at {selectedSlot}.</p>
//           <button
//             onClick={() => navigate('/')}
//             className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-all font-bold"
//           >
//             Back to Dashboard
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   if (!doctorData) return <div className="text-white p-20 text-center font-bold">Doctor data not found!</div>;

//   return (
//     <div className="min-h-screen bg-[#121212] text-white p-6 md:p-12 font-sans relative">
//       <div className="max-w-3xl mx-auto space-y-8">

//         {/* Doctor Info Header */}
//         <header className="space-y-4">
//           <p className="text-blue-500 font-bold uppercase tracking-widest text-xs">Confirm your booking</p>
//           <div className="flex items-center justify-between bg-[#1E1E1E] p-6 rounded-lg border border-white/5 shadow-lg">
//             <div className="flex items-center gap-5">
//               <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center font-black text-xl shadow-inner">
//                 {doctorData.initial || "DR"}
//               </div>
//               <div>
//                 <h2 className="font-bold text-xl leading-tight">{doctorData.name}</h2>
//                 <p className="text-gray-400 text-sm mt-1">{doctorData.specialty} • <span className="text-blue-400">₹{doctorData.fees}</span></p>
//               </div>
//             </div>
//             <span className="hidden sm:flex bg-green-500/10 text-green-500 px-4 py-1.5 rounded-full text-xs font-bold items-center gap-2 border border-green-500/20">
//               <CheckCircle size={14} /> Verified Profile
//             </span>
//           </div>
//         </header>

//         {/* Date Selection */}
//         <section className="bg-[#1E1E1E] p-6 rounded-lg border border-white/5 space-y-4">
//           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Step 1: Choose Date</h3>
//           <div className="relative max-w-[240px]">
//             <input
//               type="date"
//               min={today}
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="w-full bg-[#2D2D2D] border border-white/5 p-4 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all cursor-pointer"
//             />
//             <CalendarIcon className="absolute right-4 top-4 text-gray-500 pointer-events-none" size={18} />
//           </div>
//         </section>

//         {/* Time Slots */}
//         <section className="bg-[#1E1E1E] p-6 rounded-lg border border-white/5 space-y-4">
//           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Step 2: Available Slots</h3>
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//             {slots.map((slot) => (
//               <button
//                 key={slot}
//                 onClick={() => setSelectedSlot(slot)}
//                 className={`py-4 rounded-xl border text-sm font-bold transition-all duration-300 ${
//                   selectedSlot === slot
//                   ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/20"
//                   : "bg-[#2D2D2D] border-transparent text-gray-400 hover:border-white/10 hover:bg-[#333]"
//                 }`}
//               >
//                 {slot}
//               </button>
//             ))}
//           </div>
//         </section>

//         {/* Symptoms */}
//         <section className="bg-[#1E1E1E] p-6 rounded-lg border border-white/5 space-y-4">
//           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Step 3: Patient Notes</h3>
//           <textarea
//             value={symptoms}
//             onChange={(e) => setSymptoms(e.target.value)}
//             placeholder="Please describe any symptoms or history..."
//             className="w-full bg-[#2D2D2D] border border-white/5 p-4 rounded-xl h-32 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none"
//           />
//         </section>

//         {/* Pricing Summary */}
//         <section className="bg-blue-500/5 p-6 rounded-lg border border-blue-500/10 space-y-3">
//           <div className="flex justify-between text-gray-400 text-sm">
//             <span>Consultation Charge</span>
//             <span className="text-white font-mono font-bold text-lg">₹{doctorData.fees}</span>
//           </div>
//           <div className="flex justify-between text-gray-400 text-sm">
//             <span>Booking & Platform Fee</span>
//             <span className="text-white font-mono font-bold text-lg">₹20</span>
//           </div>
//           <div className="flex justify-between items-center pt-3 border-t border-white/5">
//             <span className="font-bold text-lg">Amount to Pay</span>
//             <span className="text-blue-400 text-2xl font-black font-mono">₹{doctorData.fees + 20}</span>
//           </div>
//         </section>

//         {/* Error Message */}
//         {error && (
//           <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm text-center bg-red-400/10 py-3 rounded-lg border border-red-400/20">
//             {typeof error === 'string' ? error : "Booking failed. Please check your credentials."}
//           </motion.p>
//         )}

//         {/* Booking Button */}
//         <button
//           onClick={handleBooking}
//           disabled={loading}
//           className="w-full py-5 bg-blue-600 font-medium hover:bg-blue-700 text-white font-black text-[16px] rounded-lg shadow-2xl cursor-pointer transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
//         >
//           {loading ? <Loader2 className="animate-spin" /> : "Book Appointment"}
//         </button>
//       </div>

//       {/* --- Auth Modal Overlay --- */}
//       <AnimatePresence>
//         {showAuthModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
//           >
//             <motion.div
//               initial={{ y: 50, scale: 0.9 }}
//               animate={{ y: 0, scale: 1 }}
//               exit={{ y: 50, scale: 0.9 }}
//               className="bg-[#1E1E1E] border border-white/10 p-8 rounded-3xl max-w-md w-full text-center relative overflow-hidden"
//             >
//               {/* Close Button */}
//               <button
//                 onClick={() => setShowAuthModal(false)}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
//               >
//                 <X size={24} />
//               </button>

//               <div className="w-20 h-20 bg-blue-600/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <Lock size={40} />
//               </div>

//               <h3 className="text-2xl font-black mb-3 italic">Authentication Required</h3>
//               <p className="text-gray-400 leading-relaxed mb-8">
//                 Please <span className="text-white font-bold underline">Login</span> or create an account to finalize your appointment with {doctorData?.name}.
//               </p>

//               <div className="flex flex-col gap-4">
//                 <button
//                   onClick={() => navigate('/login')}
//                   className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-600/20"
//                 >
//                   Go to Login
//                 </button>
//                 <button
//                   onClick={() => navigate('/register')}
//                   className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold text-gray-300 transition-all"
//                 >
//                   Register Account
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default BookingPage;







import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Calendar as CalendarIcon, CheckCircle, Loader2, Lock, X, CreditCard, ShieldCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { bookAppointment, resetState } from "../../../redux/slices/doctor/bookAppointment";
import { createOrder, verifyPayment, resetPaymentState } from "../../../redux/slices/payment/paymentSlice";
import { toast } from "react-toastify";

const BookingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { doctorData } = location.state || {};
  const { doctorId } = useParams();

  // Redux States
  const { token } = useSelector((state) => state.auth);
  const { loading: bookingLoading, success: bookingSuccess, error: bookingError, appointmentId } = useSelector((state) => state.appointment);
  const { order, loading: orderLoading, verifying, paymentSuccess, error: paymentError } = useSelector((state) => state.payment);

  // Component States
  const [selectedSlot, setSelectedSlot] = useState("10:00 AM");
  const [symptoms, setSymptoms] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const slots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM"];
  const today = new Date().toISOString().split("T")[0];

  // LOGIC 1: Booking Success Monitor
  useEffect(() => {
    if (bookingSuccess) {
      console.log("SUCCESS DETECTED! ID is:", appointmentId);
      
      // Agar success mil gayi hai toh order create karo aur modal dikhao
      if (appointmentId) {
        setShowPaymentModal(true);
        dispatch(createOrder({ appointmentId, token }));
      } else {
        console.error("Booking success but Appointment ID is missing in Redux State!");
        toast.error("Internal Error: Appointment ID missing");
      }
    }
  }, [bookingSuccess, appointmentId]);

  // LOGIC 2: Error Monitoring
  useEffect(() => {
    if (bookingError) {
      toast.error(bookingError.message || "Booking Failed");
      dispatch(resetState());
    }
    if (paymentError) {
      toast.error(paymentError.message || "Payment Failed");
    }
  }, [bookingError, paymentError, dispatch]);

  // LOGIC 3: Final Navigation
  useEffect(() => {
    if (paymentSuccess) {
      toast.success("Payment Verified!");
      // Success screen dikhane ke liye paymentSuccess use kar rahe hain (niche return logic mein)
    }
  }, [paymentSuccess]);

  const handleBooking = async() => {
    if (!token) {
      setShowAuthModal(true);
      return;
    }
    const payload = {
      doctorId,
      date,
      timeSlot: selectedSlot,
      symptoms: symptoms || "No symptoms described",
    };
    // dispatch(bookAppointment(payload));
    try {
    // .unwrap() use karne se humein seedha response mil jata hai
    const response = await dispatch(bookAppointment(payload)).unwrap();
    
    // Yahan check karein backend kya bhej raha hai
    console.log("Full Backend Response:", response);

    // ID nikaalne ke liye flexibility rakhein
    const id = response?._id || response?.data?._id || response?.appointment?._id;

    if (id) {
      setShowPaymentModal(true);
      dispatch(createOrder({ appointmentId: id, token }));
    } else {
      toast.error("Appointment created but ID not received from server");
    }
  } catch (err) {
    toast.error(err?.message || "Booking failed");
  }
  };

  const handleDummyPayment = () => {
    if (order?.id) {
      dispatch(verifyPayment({ orderId: order.id, token }));
    } else {
      toast.warn("Waiting for Order ID...");
    }
  };

  // Jab Payment Success ho jaye toh ye screen dikhao
  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white p-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center bg-[#1E1E1E] p-10 rounded-3xl border border-white/5 shadow-2xl">
          <CheckCircle className="text-green-500 mx-auto mb-6" size={60} />
          <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
          <p className="text-gray-400 mb-8">Your appointment is secured for {date} at {selectedSlot}.</p>
          <button onClick={() => navigate('/')} className="px-8 py-3 bg-blue-600 rounded-xl font-bold hover:bg-blue-700 transition-all">Go to Dashboard</button>
        </motion.div>
      </div>
    );
  }

  if (!doctorData) return <div className="text-white p-20 text-center font-bold">Doctor data not found!</div>;

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6 md:p-12 font-sans relative">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* UI Structure (Bina badlav ke) */}
        <header className="space-y-4">
          <p className="text-blue-500 font-bold uppercase tracking-widest text-xs">Confirm your booking</p>
          <div className="flex items-center justify-between bg-[#1E1E1E] p-6 rounded-lg border border-white/5 shadow-lg">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center font-black text-xl shadow-inner">
                {doctorData.initial || "DR"}
              </div>
              <div>
                <h2 className="font-bold text-xl leading-tight">{doctorData.name}</h2>
                <p className="text-gray-400 text-sm mt-1">{doctorData.specialty} • <span className="text-blue-400">₹{doctorData.fees}</span></p>
              </div>
            </div>
            <span className="hidden sm:flex bg-green-500/10 text-green-500 px-4 py-1.5 rounded-full text-xs font-bold items-center gap-2 border border-green-500/20">
              <CheckCircle size={14} /> Verified Profile
            </span>
          </div>
        </header>

        {/* Form Sections */}
        <section className="bg-[#1E1E1E] p-6 rounded-lg border border-white/5 space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Step 1: Choose Date</h3>
          <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-[#2D2D2D] border border-white/5 p-4 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
        </section>

        <section className="bg-[#1E1E1E] p-6 rounded-lg border border-white/5 space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Step 2: Available Slots</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {slots.map((slot) => (
              <button key={slot} onClick={() => setSelectedSlot(slot)} className={`py-4 rounded-xl border text-sm font-bold transition-all ${selectedSlot === slot ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/20" : "bg-[#2D2D2D] border-transparent text-gray-400 hover:border-white/10"}`}>{slot}</button>
            ))}
          </div>
        </section>

        <section className="bg-[#1E1E1E] p-6 rounded-lg border border-white/5 space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Step 3: Patient Notes</h3>
          <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder="Please describe any symptoms..." className="w-full bg-[#2D2D2D] border border-white/5 p-4 rounded-xl h-32 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
        </section>

        {/* Pricing Summary */}
        <section className="bg-blue-500/5 p-6 rounded-lg border border-blue-500/10 space-y-3">
          <div className="flex justify-between text-gray-400 text-sm"><span>Consultation Charge</span><span className="text-white font-mono font-bold text-lg">₹{doctorData.fees}</span></div>
          <div className="flex justify-between text-gray-400 text-sm"><span>Booking & Platform Fee</span><span className="text-white font-mono font-bold text-lg">₹20</span></div>
          <div className="flex justify-between items-center pt-3 border-t border-white/5"><span className="font-bold text-lg">Amount to Pay</span><span className="text-blue-400 text-2xl font-black font-mono">₹{doctorData.fees + 20}</span></div>
        </section>

        {/* Booking Button */}
        <button onClick={handleBooking} disabled={bookingLoading} className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black text-[16px] rounded-lg shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50">
          {bookingLoading ? <Loader2 className="animate-spin" /> : "Book Appointment"}
        </button>
      </div>

      {/* --- PAYMENT MODAL --- */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
            <motion.div initial={{ y: 50, scale: 0.9 }} animate={{ y: 0, scale: 1 }} className="bg-[#1E1E1E] border border-white/10 p-8 rounded-3xl max-w-md w-full text-center relative border border-white/5 shadow-2xl">
              <div className="w-20 h-20 bg-blue-600/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6"><CreditCard size={40} /></div>
              <h3 className="text-2xl font-black mb-1">Confirm Payment</h3>
              <p className="text-gray-400 text-sm mb-6 font-mono">Order ID: {order?.id || "Generating..."}</p>
              
              <div className="bg-white/5 p-6 rounded-2xl mb-8 border border-white/5 space-y-2">
                <div className="flex justify-between text-sm text-gray-400"><span>Consultation:</span><span className="text-white font-bold">₹{doctorData.fees}</span></div>
                <div className="flex justify-between text-sm text-gray-400"><span>Platform Fee:</span><span className="text-white font-bold">₹20</span></div>
                <div className="flex justify-between text-lg font-bold border-t border-white/5 pt-2 mt-2"><span>Total:</span><span className="text-blue-400">₹{doctorData.fees + 20}</span></div>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleDummyPayment}
                  disabled={orderLoading || verifying || !order}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 disabled:opacity-50 transition-all active:scale-95"
                >
                  {verifying ? <Loader2 className="animate-spin" /> : "Pay Now"}
                </button>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center justify-center gap-2 mt-2"><ShieldCheck size={12}/> Secure 256-bit Encryption</p>
              </div>

              {!verifying && (
                <button onClick={() => setShowPaymentModal(false)} className="mt-6 text-red-400 text-xs hover:underline opacity-50 hover:opacity-100">Cancel Payment</button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Auth Modal --- */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
            <motion.div initial={{ y: 50, scale: 0.9 }} animate={{ y: 0, scale: 1 }} className="bg-[#1E1E1E] p-8 rounded-3xl max-w-md w-full text-center relative">
              <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={24} /></button>
              <div className="w-20 h-20 bg-blue-600/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6"><Lock size={40} /></div>
              <h3 className="text-2xl font-black mb-3">Login Required</h3>
              <p className="text-gray-400 mb-8">Please login to book your appointment with {doctorData?.name}.</p>
              <div className="flex flex-col gap-4">
                <button onClick={() => navigate('/login')} className="w-full py-4 bg-blue-600 rounded-2xl font-black text-lg">Go to Login</button>
                <button onClick={() => navigate('/register')} className="w-full py-4 bg-white/5 rounded-2xl font-bold text-gray-300">Register</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingPage;