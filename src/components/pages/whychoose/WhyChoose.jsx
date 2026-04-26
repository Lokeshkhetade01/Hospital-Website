import React from "react";
import { Clock, ShieldCheck, FileText } from "lucide-react"; // Icons matching your image
// import Card from "./Card";
import Card from "../../common/Cards";
import { motion } from "framer-motion";

const WhyChoose = () => {
  const features = [
    {
      icon: Clock,
      title: "Instant booking",
      description: "Book in under 2 minutes",
      iconBgColor: "#E3F2FD", // Light blue
      iconColor: "#1E88E5",   // Darker blue
    },
    {
      icon: ShieldCheck,
      title: "Verified doctors",
      description: "All credentials checked",
      iconBgColor: "#F1F8E9", // Light green
      iconColor: "#43A047",   // Darker green
    },
    {
      icon: FileText,
      title: "Digital prescriptions",
      description: "Download PDF anytime",
      iconBgColor: "#F3E5F5", // Light purple
      iconColor: "#8E24AA",   // Darker purple
    },
  ];

  return (
    <section className=" py-20 px-6">
      <div className="max-w-full mx-auto">
        {/* Optional Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full" />
        </div>

        {/* Cards Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((item, index) => (
            <Card 
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              iconBgColor={item.iconBgColor}
              iconColor={item.iconColor}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;