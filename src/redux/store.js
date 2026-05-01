import { configureStore } from "@reduxjs/toolkit";
// import doctorReducer from "./getAllDoctor";
import doctorReducer from "./slices/doctor/getAllDoctor"
import authReducer from "./slices/auth/authSlice"
import appointmentReducer from "./slices/doctor/bookAppointment"
import myBookingReducer from "./slices/booking/myBooking"
import profileReducer from "./slices/profile/profile"
import prescriptionReducer from "./slices/doctor/getPrescriptions"
import paymentReducer from "./slices/payment/paymentSlice"
import faqsReducer from "./slices/faq/faqSlice"
export const store = configureStore({
  reducer: {
    doctors: doctorReducer,
    auth: authReducer,
    appointment: appointmentReducer,
    myBookings: myBookingReducer,
    payment:paymentReducer,
    profile: profileReducer,
    prescription: prescriptionReducer,
    faqs:faqsReducer,
  },
});