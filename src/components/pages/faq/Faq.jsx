import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicFaqs } from "../../../redux/slices/faq/faqSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`mb-4 overflow-hidden transition-all duration-500 border ${isOpen ? 'bg-white border-blue-200 shadow-xl shadow-blue-100/50' : 'bg-white/50 border-gray-200 hover:border-blue-100'} rounded-[1rem]`}>
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-4 md:p-6 text-left focus:outline-none"
      >
        <span className={`text-[17px] font-bold transition-colors duration-300 ${isOpen ? 'text-blue-600' : 'text-[#0D2344]'}`}>
          {question}
        </span>
        <div className={`flex-shrink-0 ml-4 p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-blue-50 text-blue-600'}`}>
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-8 pb-6 text-gray-500 leading-relaxed text-[16px]">
              <div className=" border-t border-gray-50 pt-4">
                {answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Faq = () => {
  const dispatch = useDispatch();
  const { data: faqs, loading, error } = useSelector((state) => state.faqs);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchPublicFaqs());
  }, [dispatch]);

  return (
    <section className="py-20 px-6 bg-[#f8fbff] relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/4 -right-20 w-64 h-64 bg-blue-100/40 rounded-2xl blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest"
          >
            <HelpCircle size={14} /> Support Center
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0D2344]">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            MediCare+ ke baare mein sab kuch jaaniye. Agar aapka sawaal yahan nahi hai, toh humse sampark karein.
          </p>
        </div>

        {/* FAQ List with Loading/Error State */}
        <div className="space-y-2">
          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-4">Sawaal dhoond rahe hain...</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-6 bg-red-50 rounded-2xl">
              Galti hui: {error}
            </div>
          ) : faqs.length > 0 ? (
            faqs.map((item, index) => (
              <AccordionItem
                key={item._id}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))
          ) : (
            <p className="text-center text-gray-400">Filhaal koi FAQs nahi hain.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Faq;