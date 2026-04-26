import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaYoutube, FaTwitter, FaMapMarkerAlt, 
  FaPhoneAlt, FaEnvelope, FaChevronRight,
} from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { FiInstagram } from "react-icons/fi";

/* ─── Links as per your Navbar/Healthcare theme ─────────────────────────── */
const NAV_LINKS = {
  "Services": [
    { label: "Home", route: "/" },
    { label: "Find Doctors", route: "/doctors" },
    { label: "Book Appointment", route: "/book" },
    { label: "Health Packages", route: "/packages" },
  ],
  "Company": [
    { label: "About Us", route: "/about" },
    { label: "Our Team", route: "/team" },
    { label: "Contact Us", route: "/contact" },
    { label: "Privacy Policy", route: "/privacy" },
  ],
  "Support": [
    { label: "FAQs", route: "/faq" },
    { label: "Terms of Service", route: "/terms" },
    { label: "Help Center", route: "/help" },
    { label: "Emergency Care", route: "/emergency" },
  ],
};

const CONTACT = [
  { icon: <FaMapMarkerAlt size={13} />, text: "4th floor, Prince Complex, Nagpur 440015" },
  { icon: <FaPhoneAlt size={11} />, text: "+91 98765 43210", href: "tel:+919876543210" },
  { icon: <FaEnvelope size={11} />, text: "support@medicare.com", href: "mailto:support@medicare.com" },
];

const SOCIALS = [
  { icon: <TiSocialFacebook size={20} />, href: "#", label: "Facebook", color: "#1877f2" },
  { icon: <FiInstagram size={16} />, href: "#", label: "Instagram", color: "#e4405f" },
  { icon: <FaTwitter size={16} />, href: "#", label: "Twitter", color: "#1da1f2" },
  { icon: <FaYoutube size={16} />, href: "#", label: "YouTube", color: "#ff0000" },
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
  const navigate = useNavigate();

  return (
    <footer className="relative bg-[#0A1128] text-white pt-16 pb-8 overflow-hidden">
      
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
          <div className="lg:col-span-4 flex flex-col gap-6">
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

          {/* COL 2: Navigation Links */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {Object.entries(NAV_LINKS).map(([title, links]) => (
                <FooterColumn key={title} title={title} links={links} />
              ))}
            </div>
          </div>

          {/* COL 3: Socials & Newsletter Concept */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h5 className="text-white font-bold text-[16px] pb-2 relative">
              Follow Us
              <span className="absolute bottom-0 left-0 w-8 h-[2px] rounded-full bg-blue-500" />
            </h5>
            <div className="flex gap-4">
              {SOCIALS.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:scale-110 transition-all duration-300 relative group overflow-hidden"
                >
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: s.color }} />
                  <span className="relative z-10 text-gray-300 group-hover:text-white">{s.icon}</span>
                </a>
              ))}
            </div>
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/10">
              <p className="text-[13px] text-blue-300 font-medium mb-1">Emergency?</p>
              <p className="text-[12px] text-gray-400 italic">Our support team is available 24/7 for critical assistance.</p>
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