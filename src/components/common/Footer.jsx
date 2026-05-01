import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaYoutube, FaTwitter, FaMapMarkerAlt, 
  FaPhoneAlt, FaEnvelope, FaChevronRight,
} from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { FiInstagram } from "react-icons/fi";

/* ─── Links Updated: Only Home, About, Booking, FAQ, Doctors ────────────── */
const NAV_LINKS = {
  "Quick Links": [
    { label: "Home", route: "/" },
    { label: "About Us", route: "/about" },
    { label: "Find Doctors", route: "/doctors" },
  ],
  "Support": [
    { label: "Book Appointment", route: "/book" },
    { label: "FAQs", route: "/faq" },
  ],
};

const CONTACT = [
  { icon: <FaMapMarkerAlt size={13} />, text: "4th floor, Prince Complex, Nagpur 440015" },
  { icon: <FaPhoneAlt size={11} />, text: "+91 98765 43210", href: "tel:+919876543210" },
  { icon: <FaEnvelope size={11} />, text: "support@medicare.com", href: "mailto:support@medicare.com" },
];


/* ─── FooterColumn Component ────────────────────────────────────────────── */
const FooterColumn = ({ title, links }) => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="flex flex-col gap-4">
      <h5 className="text-white font-bold text-[16px] pb-2 relative">
        {title}
        <span className="absolute bottom-0 left-0 w-12 h-[2px] rounded-full bg-blue-500" />
      </h5>
      <ul className="flex flex-col gap-3">
        {links.map((link, i) => (
          <li key={i}>
            <button
              onClick={() => handleNavigation(link.route)}
              className="group flex items-center gap-2 text-gray-400 hover:text-blue-400 text-[14px] transition-all duration-200 text-left"
            >
              <FaChevronRight size={8} className="text-blue-500 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ─── Main Footer Component ────────────────────────────────────────────── */
const Footer = () => {
  return (
    <footer className="relative bg-[#0A1128] text-white pt-15 pb-5 overflow-hidden">
      
      {/* Background Subtle Effects (Blue Theme) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,_rgba(59,130,246,0.05)_0%,_transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,_rgba(59,130,246,0.05)_0%,_transparent_50%)]" />
      </div>

      {/* Top Blue Glowing Border */}
      <div className="relative h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mb-16" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-white/5">

          {/* COL 1: Logo & Intro */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="text-2xl font-bold tracking-tight">
              <span>Medi</span><span className="text-blue-500">Care</span><span className="ml-1 text-blue-400">+</span>
            </div>
            <p className="text-gray-400 text-[14px] leading-relaxed max-w-sm">
              Making healthcare accessible and easy. MediCare+ connects you with the best specialists and provides seamless booking for all your medical needs from the comfort of your home.
            </p>
            <div className="flex flex-col gap-4">
              {CONTACT.map((c, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-blue-400 group-hover:bg-blue-500/20 transition-all">
                    {c.icon}
                  </div>
                  {c.href ? (
                    <a href={c.href} className="text-gray-400 text-[13.5px] hover:text-blue-400 transition-colors mt-1">
                      {c.text}
                    </a>
                  ) : (
                    <span className="text-gray-400 text-[13.5px] mt-1">{c.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* COL 2: Updated Navigation Links */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-8">
              {Object.entries(NAV_LINKS).map(([title, links]) => (
                <FooterColumn key={title} title={title} links={links} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-[13px]">
          <p>© 2026 MediCare+. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Developed by</span>
            <span className="text-blue-400 font-semibold cursor-pointer hover:underline" onClick={() => window.open("#", "_blank")}>
              MediCare Tech Team
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;