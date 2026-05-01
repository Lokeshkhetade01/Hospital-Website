import { lazy, Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
// import MainLayout from "../components/Layouts/MainLayout";
import MainLayout from "../components/Layout/MainLayout";
import Doctors from "../components/pages/doctors/Doctors";
import BookingPage from "../components/pages/doctors/BookingPage";
import Profile from "../components/pages/profile/Profile";
import EditProfile from "../components/pages/profile/EditProfile";
import Login from "../components/pages/auth/Login";
import Register from "../components/pages/auth/Register";
import MyBooking from "../components/pages/doctors/MyBooking";
import About from "../components/pages/about/About";
import Faq from "../components/pages/faq/Faq";
const Home = lazy(() => import("../components/pages/Home"));
const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="w-10 h-10 border-4 border-gray-100 border-t-orange-500 rounded-full animate-spin" />
  </div>
);

export default function PublicRoute () {
  // 1. Centralize the state here
  const [userData, setUserData] = useState({
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    initial: "RS",
  });

  // 2. This function updates the state and sends user back to profile
  const handleSave = (updatedData) => {
    setUserData(updatedData);
    navigate("/profile"); // Redirect back after saving
  };
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

          {/* Home */}
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/book/:doctorId" element={<BookingPage />} />
          <Route path="/profile" element={<Profile userData={userData} />} />
          <Route path="/booking" element={<MyBooking/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/faq" element={<Faq/>} />
          <Route
            path="/profile/edit-profile"
            element={<EditProfile userData={userData} onSave={handleSave} />}
          />
          
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center h-screen text-2xl text-gray-500">
                404 – Page Not Found
              </div>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}
