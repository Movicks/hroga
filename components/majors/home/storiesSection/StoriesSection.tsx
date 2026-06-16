import { motion } from "framer-motion";
import SlactBackground from "./SlactBackground";

// import React from 'react'
interface Alumnus {
  initials: string;
  name: string;
  classInfo: string;
  quote: string;
  role: string;
}

// Alumni mock data directly from the pixel-perfect image. Later these will be replaced with actual data
const alumniData: Alumnus[] = [
  {
    initials: "AO",
    name: "Dr. Adaeze Okoye",
    classInfo: "Class of 1998 · Abuja",
    quote: '"The discipline I learnt within those school walls was the foundation for everything I\'ve built. The friendships formed there remain the most genuine of my life."',
    role: "Consultant Cardiologist, UITH",
  },
  {
    initials: "NK",
    name: "Ngozi Kalu-Williams",
    classInfo: "Class of 2005 · London",
    quote: '"I carry Holy Rosary\'s motto into every boardroom I walk into. It is not just a school — it is a character factory."',
    role: "Partner, PwC UK · Fintech Investor",
  },
  {
    initials: "AO",
    name: "Bisi Ilesanmi",
    classInfo: "Class of 2012 · Lagos",
    quote: '"My teachers saw potential in me before I saw it in myself. I now teach young girls that same lesson: believe before the evidence arrives."',
    role: "Founder, GirlsCode Nigeria",
  },
];

export default function StoriesSection() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans text-slate-800 flex items-center justify-center py-16 px-4 lg:px-[5rem] xl:px-[13rem]" id="app-root">
      
      {/* Master 3D Slat Background */}
      <SlactBackground />

      {/* Main Content Area */}
      <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col justify-center gap-12 md:gap-14" id="main-container">
        
        {/* Header Text Block */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-left max-w-3xl"
          id="header-section"
        >
          {/* Small spaced overline */}
          <span className="text-xs md:text-[18px] font-semibold tracking-[0.18em] text-slate-500 uppercase block mb-3" id="overline-title">
            ALUMNI STORIES
          </span>
          
          {/* Main heading */}
          <h1 className="text-[2rem] sm:text-[3.25rem] md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 sm:mb-5 leading-[1.12]" id="main-title">
            Life Since Graduation
          </h1>
          
          {/* Subheading/Description */}
          <p className="text-sm sm:text-base md:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl" id="main-subtitle">
            Inspiring journeys of purpose, resilience, and success - in lists of their own words.
          </p>
        </motion.header>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch w-full" id="cards-grid">
          {alumniData.map((item, index) => (
            <motion.div
              key={index}
              id={`alumni-card-${index}`}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.12, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              whileHover={{ 
                y: -6, 
                boxShadow: "0 22px 40px -12px rgba(0,0,0,0.06)",
                transition: { duration: 0.25, ease: "easeOut" } 
              }}
              className="bg-white rounded-[28px] overflow-hidden flex flex-col justify-between border border-slate-100 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.035)] h-full transition-shadow duration-300"
            >
              
              {/* Card Header (Light Teal-Blue Background) */}
              <div 
                className="bg-[#EBF3F8] px-6 py-6 sm:px-8 sm:py-7 flex items-center gap-4.5 border-b border-[#dfebf3]/60" 
                id={`card-header-${index}`}
              >
                {/* Circular Avatar */}
                <div 
                  className="w-12 h-12 rounded-full bg-[#006080] flex items-center justify-center shrink-0 shadow-sm" 
                  id={`card-avatar-${index}`}
                >
                  <span className="text-white font-bold text-sm tracking-wider select-none">
                    {item.initials}
                  </span>
                </div>
                
                {/* User details */}
                <div className="flex flex-col min-w-0" id={`card-user-info-${index}`}>
                  <h3 className="font-bold text-[15px] sm:text-[17px] text-[#006080] truncate leading-tight tracking-tight">
                    {item.name}
                  </h3>
                  <p className="text-slate-500 font-medium text-xs sm:text-[13px] truncate mt-0.5">
                    {item.classInfo}
                  </p>
                </div>
              </div>

              {/* Card Body & Footer (Pure White Background) */}
              <div 
                className="px-6 py-7 sm:px-8 sm:py-8 flex flex-col justify-between flex-grow gap-4 bg-white" 
                id={`card-body-${index}`}
              >
                {/* Italic Quotation */}
                <p className="text-slate-600 text-[14px] sm:text-[15px] italic leading-[1.65] font-normal text-left select-text" id={`card-quote-${index}`}>
                  {item.quote}
                </p>
                
                {/* Lower Impact/Role metadata */}
                <div className="text-left pt-1" id={`card-footer-info-${index}`}>
                  <h4 className="font-bold text-[13px] sm:text-[14px] text-[#006080] leading-snug tracking-wide">
                    {item.role}
                  </h4>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
