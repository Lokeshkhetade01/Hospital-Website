// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { updateProfile, getMe } from "../../../redux/slices/profile/profile";
// import { ArrowLeft, Save, User, Phone, Mail, Camera } from "lucide-react";
// import { motion } from "framer-motion";

// const EditProfile = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const fileInputRef = useRef(null); 
  
//   const { user, loading } = useSelector((state) => state.profile);

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     avatar: "", // URL preview ke liye
//     initial: "U"
//   });

//   const [selectedFile, setSelectedFile] = useState(null); // Actual file store karne ke liye

//   useEffect(() => {
//     if (user) {
//       const initials = user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || "U";
//       setFormData({
//         name: user.name || "",
//         phone: user.phone || "",
//         email: user.email || "",
//         avatar: user.avatar || "",
//         initial: initials
//       });
//     } else {
//       dispatch(getMe());
//     }
//   }, [user, dispatch]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => {
//       const newData = { ...prev, [name]: value };
//       if (name === "name") {
//         newData.initial = value.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || "U";
//       }
//       return newData;
//     });
//   };

//   // Image Select Handle Karne ke liye
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       // Local preview dikhane ke liye
//       setFormData(prev => ({ ...prev, avatar: URL.createObjectURL(file) }));
//     }
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
    
//     if (!formData.name || !formData.phone) {
//       return toast.error("Name and Phone are required");
//     }

//     // FormData ka use (File bhejne ke liye zaroori hai)
//     const dataToSend = new FormData();
//     dataToSend.append("name", formData.name);
//     dataToSend.append("phone", formData.phone);
    
//     // Agar file select ki hai toh file bhejo, warna purana URL (agar back-end support karta hai)
//     if (selectedFile) {
//       dataToSend.append("avatar", selectedFile);
//     }

//     const result = await dispatch(updateProfile(dataToSend));

//     if (updateProfile.fulfilled.match(result)) {
//       navigate("/profile");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0d0d0ec7] p-4 sm:p-8">
//       <motion.section 
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         className="max-w-3xl mx-auto space-y-12 text-white"
//       >
//         <div className="flex items-center justify-between pb-8 border-b border-white/5">
//           <button 
//             onClick={() => navigate(-1)} 
//             className="flex items-center gap-2 mt-5 text-blue-400 font-medium text-sm hover:text-blue-300 transition-colors"
//           >
//             <ArrowLeft size={16} /> Back
//           </button>
//           <h1 className="text-3xl font-extrabold tracking-tight">Edit Your Profile</h1>
//         </div>

//         <form onSubmit={handleSave} className="space-y-10 bg-[#212121] p-10 rounded-lg mb-20 border border-white/5 shadow-2xl">
          
//           {/* Avatar Section with Upload Logic */}
//           <div className="flex flex-col items-center gap-6 pb-10 border-b border-white/5">
//             <div 
//               className="relative group cursor-pointer" 
//               onClick={() => fileInputRef.current.click()} // Div click par file input open hoga
//             >
//               {formData.avatar ? (
//                 <img 
//                   src={formData.avatar} 
//                   alt="Avatar" 
//                   className="w-28 h-28 rounded-full object-cover border-4 border-blue-500/30 group-hover:opacity-75 transition-opacity"
//                 />
//               ) : (
//                 <div className="w-28 h-28 rounded-full bg-[#E3F2FD] text-[#0D2344] flex items-center justify-center font-extrabold text-5xl shadow-xl group-hover:bg-blue-100 transition-colors">
//                   {formData.initial}
//                 </div>
//               )}
              
//               {/* Overlay Icon */}
//               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                 <Camera className="text-white bg-black/50 p-2 rounded-full" size={40} />
//               </div>

//               {/* Hidden File Input */}
//               <input 
//                 type="file"
//                 ref={fileInputRef}
//                 className="hidden"
//                 accept="image/*"
//                 onChange={handleFileChange}
//               />
//             </div>
            
//             <p className="text-[10px] uppercase tracking-widest text-gray-500">Click circle to upload new photo</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
//                 <User size={15} /> Full Name
//               </label>
//               <input 
//                 type="text" 
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="e.g. Rahul Sharma"
//                 className="w-full bg-[#1a1a1a] border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>

//             <div className="space-y-2 opacity-60">
//               <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
//                 <Mail size={15} /> Email Address (Read-only)
//               </label>
//               <input 
//                 type="email" 
//                 name="email"
//                 value={formData.email}
//                 readOnly
//                 className="w-full bg-[#1a1a1a] border border-white/10 p-4 rounded-xl text-gray-400 cursor-not-allowed"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
//                 <Phone size={15} /> Phone Number
//               </label>
//               <input 
//                 type="tel" 
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="+91 XXXXX XXXXX"
//                 className="w-full bg-[#1a1a1a] border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <button 
//             type="submit"
//             disabled={loading}
//             className="w-full py-4 flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98]"
//           >
//             {loading ? "Updating..." : <><Save size={18} /> Update Profile</>}
//           </button>
//         </form>
//       </motion.section>
//     </div>
//   );
// };

// export default EditProfile;





import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, getMe } from "../../../redux/slices/profile/profile";
import { ArrowLeft, Save, User, Phone, Mail, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify"; // Added missing toast import

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null); 
  
  const { user, loading } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    avatar: "", // Stores backend URL or object URL for local preview
    initial: "U"
  });

  const [selectedFile, setSelectedFile] = useState(null); // Actual binary file object

  useEffect(() => {
    if (user) {
      const initials = user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || "U";
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
        avatar: user.avatar || "",
        initial: initials
      });
    } else {
      dispatch(getMe());
    }
  }, [user, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      if (name === "name") {
        newData.initial = value.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || "U";
      }
      return newData;
    });
  };

  // Image Selection and Blob URL Creation
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Creates temporary local path for instant image preview before upload
      setFormData(prev => ({ ...prev, avatar: URL.createObjectURL(file) }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      return toast.error("Name and Phone are required");
    }

    // Creating FormData payload to process text fields along with media
    const dataToSend = new FormData();
    dataToSend.append("name", formData.name);
    dataToSend.append("phone", formData.phone);
    
    // Attach file if user has selected a new one
    if (selectedFile) {
      dataToSend.append("avatar", selectedFile);
    }

    const result = await dispatch(updateProfile(dataToSend));

    if (updateProfile.fulfilled.match(result)) {
      navigate("/profile");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0ec7] p-4 sm:p-8">
      <motion.section 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-3xl mx-auto space-y-12 text-white"
      >
        <div className="flex items-center justify-between pb-8 border-b border-white/5">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 mt-5 text-blue-400 font-medium text-sm hover:text-blue-300 transition-colors"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="text-3xl font-extrabold tracking-tight">Edit Your Profile</h1>
        </div>

        <form onSubmit={handleSave} className="space-y-10 bg-[#212121] p-10 rounded-lg mb-20 border border-white/5 shadow-2xl">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-6 pb-10 border-b border-white/5">
            <div 
              className="relative group cursor-pointer" 
              onClick={() => fileInputRef.current.click()} 
            >
              {formData.avatar ? (
                <img 
                  src={formData.avatar} 
                  alt="Avatar" 
                  className="w-28 h-28 rounded-full object-cover border-4 border-blue-500/30 group-hover:opacity-75 transition-opacity"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-[#E3F2FD] text-[#0D2344] flex items-center justify-center font-extrabold text-5xl shadow-xl group-hover:bg-blue-100 transition-colors">
                  {formData.initial}
                </div>
              )}
              
              {/* Overlay Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white bg-black/50 p-2 rounded-full" size={40} />
              </div>

              {/* Hidden File Input */}
              <input 
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            
            <p className="text-[10px] uppercase tracking-widest text-gray-500">Click circle to upload new photo</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <User size={15} /> Full Name
              </label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                className="w-full bg-[#1a1a1a] border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2 opacity-60">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Mail size={15} /> Email Address (Read-only)
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                readOnly
                className="w-full bg-[#1a1a1a] border border-white/10 p-4 rounded-xl text-gray-400 cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Phone size={15} /> Phone Number
              </label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                className="w-full bg-[#1a1a1a] border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98]"
          >
            {loading ? "Updating..." : <><Save size={18} /> Update Profile</>}
          </button>
        </form>
      </motion.section>
    </div>
  );
};

export default EditProfile;