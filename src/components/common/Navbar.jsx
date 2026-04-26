import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { RiArrowRightUpLine } from "react-icons/ri";

// Updated links as per your image
const NAV_LINKS = [
  { label: "Home",       href: "/",         route: "/" },
  { label: "Doctors",    href: "/doctors",  route: "/doctors" },
  { label: "Book",       href: "/book",     route: "/book" },
  { label: "My Profile", href: "/profile",  route: "/profile" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setScrolled(scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setIsOpen(false); };
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
      <div className="h-[68px] w-full" />
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
            borderBottom: scrolled ? "1px solid rgba(59,130,246,0.2)" : "1px solid rgba(0,0,0,0.07)",
            boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.3)" : "0 1px 6px rgba(0,0,0,0.06)",
          }}
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-10 flex items-center justify-between h-[68px]">
            
            {/* Logo: MediCare + */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              onClick={() => navigate("/")}
              className="cursor-pointer flex items-center text-2xl font-bold tracking-tight"
            >
              <span style={{ color: scrolled ? "#fff" : "#1f2937" }}>Medi</span>
              <span className="text-blue-600">Care</span>
              <span className="ml-1 text-blue-500">+</span>
            </motion.div>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  onClick={(e) => handleClick(e, link)}
                  className="text-[15px] font-medium transition-colors hover:text-blue-500"
                  style={{ color: scrolled ? "rgba(255,255,255,0.8)" : "#4b5563" }}
                >
                  {link.label}
                </a>
              ))}

              {/* Login / Register Button */}
              <motion.button
                onClick={() => navigate("/login")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 px-5 py-2 rounded-full border-2 font-semibold text-[14px] transition-all"
                style={{
                  borderColor: scrolled ? "#3b82f6" : "#374151",
                  color: scrolled ? "#fff" : "#374151",
                }}
              >
                Login
              </motion.button>
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
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 z-50 bg-white flex flex-col p-6 md:hidden"
          >
            <div className="flex justify-between items-center mb-10">
               <div className="text-2xl font-bold"><span className="text-gray-800">Medi</span><span className="text-blue-600">Care</span>+</div>
               <HiX size={28} onClick={() => setIsOpen(false)} />
            </div>
            {NAV_LINKS.map((link, i) => (
              <a
                key={i}
                href={link.href}
                onClick={(e) => handleClick(e, link)}
                className="text-2xl font-semibold py-4 border-b border-gray-100"
              >
                {link.label}
              </a>
            ))}
            <button 
              onClick={() => navigate("/login")}
              className="mt-10 w-full bg-blue-600 text-white py-4 rounded-xl font-bold"
            >
              Login / Register
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;