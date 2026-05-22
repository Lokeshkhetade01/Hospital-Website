// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { HiMenuAlt3, HiX, HiLogout } from "react-icons/hi";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../../redux/slices/auth/authSlice";
// const NAV_LINKS = [
//   { label: "Home", href: "/", route: "/" },
//   { label: "Doctors", href: "/doctors", route: "/doctors" },
//   { label: "My Booking", href: "/booking", route: "/booking" },
//   { label: "My Profile", href: "/profile", route: "/profile" },
// ];

// const Navbar = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const location = useLocation();
//   const { user, token } = useSelector((state) => state.auth);
//   // --- Logout Logic ---
//   const handleLogout = () => {
//     // 1. LocalStorage clear karein
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     dispatch(logout());

//     navigate("/");
//     setIsOpen(false);

//     window.location.reload();
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollY = window.scrollY || document.documentElement.scrollTop;
//       setScrolled(scrollY > 24);
//     };
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const fn = () => {
//       if (window.innerWidth >= 768) setIsOpen(false);
//     };
//     window.addEventListener("resize", fn);
//     return () => window.removeEventListener("resize", fn);
//   }, []);

//   const handleClick = (e, link) => {
//     e.preventDefault();
//     if (link.route) {
//       navigate(link.route);
//       setIsOpen(false);
//     }
//   };

//   return (
//     <>
//       <div className="h-[65px] w-full border border-b-gray-500 " />
//       <motion.nav
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="fixed top-0 left-0 right-0 z-50 w-full"
//       >
//         <div
//           className="w-full transition-all duration-500"
//           style={{
//             background: scrolled ? "rgba(10,8,25,0.92)" : "rgba(255,255,255,1)",
//             backdropFilter: scrolled ? "blur(20px)" : "none",
//             borderBottom: scrolled
//               ? "1px solid rgba(59,130,246,0.2)"
//               : "1px solid rgba(0,0,0,0.07)",
//             boxShadow: scrolled
//               ? "0 8px 32px rgba(0,0,0,0.3)"
//               : "0 1px 6px rgba(0,0,0,0.06)",
//           }}
//         >
//           <div className="max-w-7xl mx-auto px-5 sm:px-10 flex items-center justify-between h-[68px]">
//             {/* Logo */}
//             <motion.div
//               whileHover={{ scale: 1.04 }}
//               onClick={() => {
//                 navigate("/");
//                 setIsOpen(false);
//               }}
//               className="cursor-pointer flex items-center text-2xl font-bold tracking-tight"
//             >
//               <span style={{ color: scrolled ? "#fff" : "#1f2937" }}>Medi</span>
//               <span className="text-blue-600">Care</span>
//               <span className="ml-1 text-blue-500">+</span>
//             </motion.div>

//             {/* Desktop links */}
//             <div className="hidden md:flex items-center gap-6">
//               {NAV_LINKS.map((link, i) => {
//                 const isActive = location.pathname === link.route; // Check active state

//                 return (
//                   <a
//                     key={i}
//                     href={link.href}
//                     onClick={(e) => handleClick(e, link)}
//                     className={`text-[15px] font-medium transition-all duration-300 relative pb-1 ${
//                       isActive ? "text-blue-600 font-bold" : ""
//                     } hover:text-blue-500`}
//                     style={{
//                       color: isActive
//                         ? "#2563eb" // Blue color for active
//                         : scrolled
//                           ? "rgba(255,255,255,0.8)"
//                           : "#4b5563",
//                     }}
//                   >
//                     {link.label}

//                     {/* Optional: Active link ke niche ek chhoti line (Underline effect) */}
//                     {isActive && (
//                       <motion.div
//                         layoutId="activeTab"
//                         className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
//                       />
//                     )}
//                   </a>
//                 );
//               })}

//               {/* Conditional Auth UI (Desktop) */}
//               {token && user ? (
//                 <div className="flex items-center gap-3 ml-4">
//                   <div
//                     onClick={() => navigate("/profile")}
//                     className="flex items-center gap-3 cursor-pointer p-1 pr-3 rounded-full hover:bg-gray-100/10 transition-all"
//                   >
//                     <img
//                       src={
//                         user.avatar ||
//                         "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//                       }
//                       alt="profile"
//                       className="w-9 h-9 rounded-full object-cover border-2 border-blue-500"
//                     />
//                     <span
//                       className="text-sm font-semibold capitalize"
//                       style={{ color: scrolled ? "#fff" : "#1f2937" }}
//                     >
//                       {user.name.split(" ")[0]}
//                     </span>
//                   </div>

//                   {/* Logout Button Desktop */}
//                   <button
//                     onClick={handleLogout}
//                     className="p-2 rounded-full hover:bg-red-50 text-red-500 transition-colors"
//                     title="Logout"
//                   >
//                     <HiLogout size={22} />
//                   </button>
//                 </div>
//               ) : (
//                 <motion.button
//                   onClick={() => navigate("/login")}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="ml-4 px-6 py-2 rounded-full border-2 font-semibold text-[14px] transition-all"
//                   style={{
//                     borderColor: scrolled ? "#3b82f6" : "#374151",
//                     color: scrolled ? "#fff" : "#374151",
//                   }}
//                 >
//                   Login
//                 </motion.button>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="md:hidden p-2 rounded-lg"
//               style={{ color: scrolled ? "white" : "black" }}
//             >
//               {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
//             </button>
//           </div>
//         </div>
//       </motion.nav>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, x: "100%" }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: "100%" }}
//             transition={{ type: "spring", damping: 25, stiffness: 200 }}
//             className="fixed inset-0 z-50 bg-white flex flex-col p-6 md:hidden"
//           >
//             <div className="flex justify-between items-center mb-10">
//               <div className="text-2xl font-bold">
//                 <span className="text-gray-800">Medi</span>
//                 <span className="text-blue-600">Care</span>+
//               </div>
//               <HiX
//                 size={28}
//                 className="cursor-pointer"
//                 onClick={() => setIsOpen(false)}
//               />
//             </div>

//             {/* User Profile & Logout in Mobile Menu */}
//             {token && user && (
//               <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-2xl">
//                 <div
//                   className="flex items-center gap-4"
//                   onClick={() => {
//                     navigate("/profile");
//                     setIsOpen(false);
//                   }}
//                 >
//                   <img
//                     src={
//                       user.avatar ||
//                       "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//                     }
//                     className="w-12 h-12 rounded-full border-2 border-blue-500"
//                     alt="user"
//                   />
//                   <div>
//                     <p className="font-bold text-gray-800 capitalize">
//                       {user.name}
//                     </p>
//                     <p className="text-xs text-gray-500">{user.email}</p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="p-3 bg-red-100 text-red-600 rounded-xl"
//                 >
//                   <HiLogout size={20} />
//                 </button>
//               </div>
//             )}

//             <div className="flex flex-col">
//               {NAV_LINKS.map((link, i) => {
//                 const isActive = location.pathname === link.route;

//                 return (
//                   <a
//                     key={i}
//                     href={link.href}
//                     onClick={(e) => handleClick(e, link)}
//                     className={`text-xl font-semibold py-4 border-b border-gray-100 transition-colors ${
//                       isActive
//                         ? "text-blue-600 bg-blue-50/50 px-2"
//                         : "text-gray-700"
//                     }`}
//                   >
//                     {link.label}
//                   </a>
//                 );
//               })}
//             </div>

//             {!token && (
//               <button
//                 onClick={() => {
//                   navigate("/login");
//                   setIsOpen(false);
//                 }}
//                 className="mt-10 w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200"
//               >
//                 Login / Register
//               </button>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Navbar;






import React, { useState, useEffect } from "react";
import { href, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX, HiLogout } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/auth/authSlice";
import { getMe } from "../../redux/slices/profile/profile"; // Profile Thunk import karein

const NAV_LINKS = [
  { label: "Home", href: "/", route: "/" },
  { label: "Doctors", href: "/doctors", route: "/doctors" },
  { label: "My Booking", href: "/booking", route: "/booking" },
  {label:"About Us",href:"/about",route:"/about"},
  { label: "My Profile", href: "/profile", route: "/profile" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Auth slice se sirf token lein
  const { token } = useSelector((state) => state.auth);
  // Profile slice se fresh user data lein
  const { user } = useSelector((state) => state.profile);

  // App load hote hi ya token milte hi user data fetch karein
  useEffect(() => {
    if (token) {
      dispatch(getMe());
    }
  }, [dispatch, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/");
    setIsOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setScrolled(scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fn = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const handleClick = (e, link) => {
    e.preventDefault();
    if (link.route) {
      navigate(link.route);
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="h-[65px] w-full border border-b-gray-500 " />
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 w-full"
      >
        <div
          className="w-full transition-all duration-500"
          style={{
            background: scrolled ? "rgba(10,8,25,0.92)" : "rgba(255,255,255,1)",
            backdropFilter: scrolled ? "blur(20px)" : "none",
            borderBottom: scrolled
              ? "1px solid rgba(59,130,246,0.2)"
              : "1px solid rgba(0,0,0,0.07)",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.3)"
              : "0 1px 6px rgba(0,0,0,0.06)",
          }}
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-10 flex items-center justify-between h-[68px]">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              onClick={() => {
                navigate("/");
                setIsOpen(false);
              }}
              className="cursor-pointer flex items-center text-2xl font-bold tracking-tight"
            >
              <span style={{ color: scrolled ? "#fff" : "#1f2937" }}>Medi</span>
              <span className="text-blue-600">Care</span>
              <span className="ml-1 text-blue-500">+</span>
            </motion.div>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link, i) => {
                const isActive = location.pathname === link.route;

                return (
                  <a
                    key={i}
                    href={link.href}
                    onClick={(e) => handleClick(e, link)}
                    className={`text-[15px] font-medium transition-all duration-300 relative pb-1 ${
                      isActive ? "text-blue-600 font-bold" : ""
                    } hover:text-blue-500`}
                    style={{
                      color: isActive
                        ? "#2563eb"
                        : scrolled
                        ? "rgba(255,255,255,0.8)"
                        : "#4b5563",
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                      />
                    )}
                  </a>
                );
              })}

              {/* Fresh Profile Data from profileSlice */}
              {token && user ? (
                <div className="flex items-center gap-3 ml-4">
                  <div
                    onClick={() => navigate("/profile")}
                    className="flex items-center gap-3 cursor-pointer p-1 pr-3 rounded-full hover:bg-gray-100/10 transition-all"
                  >
                    <img
                      src={user.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                      alt="profile"
                      className="w-9 h-9 rounded-full object-cover border-2 border-blue-500"
                    />
                    <span
                      className="text-sm font-semibold capitalize"
                      style={{ color: scrolled ? "#fff" : "#1f2937" }}
                    >
                      {/* Name Split logic for "Lokesh Khetade" -> "Lokesh" */}
                      {user.name ? user.name.split(" ")[0] : "User"}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-full hover:bg-red-50 text-red-500 transition-colors"
                    title="Logout"
                  >
                    <HiLogout size={22} />
                  </button>
                </div>
              ) : (
                <motion.button
                  onClick={() => navigate("/login")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-4 px-6 py-2 rounded-full border-2 font-semibold text-[14px] transition-all"
                  style={{
                    borderColor: scrolled ? "#3b82f6" : "#374151",
                    color: scrolled ? "#fff" : "#374151",
                  }}
                >
                  Login
                </motion.button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg"
              style={{ color: scrolled ? "white" : "black" }}
            >
              {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-white flex flex-col p-6 md:hidden"
          >
            <div className="flex justify-between items-center mb-10">
              <div className="text-2xl font-bold">
                <span className="text-gray-800">Medi</span>
                <span className="text-blue-600">Care</span>+
              </div>
              <HiX size={28} className="cursor-pointer" onClick={() => setIsOpen(false)} />
            </div>

            {/* User Profile in Mobile Menu */}
            {token && user && (
              <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-2xl">
                <div
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => {
                    navigate("/profile");
                    setIsOpen(false);
                  }}
                >
                  <img
                    src={user.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                    className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
                    alt="user"
                  />
                  <div>
                    <p className="font-bold text-gray-800 capitalize">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-3 bg-red-100 text-red-600 rounded-xl"
                >
                  <HiLogout size={20} />
                </button>
              </div>
            )}

            <div className="flex flex-col">
              {NAV_LINKS.map((link, i) => {
                const isActive = location.pathname === link.route;
                return (
                  <a
                    key={i}
                    href={link.href}
                    onClick={(e) => handleClick(e, link)}
                    className={`text-xl font-semibold py-4 border-b border-gray-100 transition-colors ${
                      isActive ? "text-blue-600 bg-blue-50/50 px-2" : "text-gray-700"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            {!token && (
              <button
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
                className="mt-10 w-full bg-blue-600 text-white py-4 rounded-xl font-bold"
              >
                Login / Register
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;