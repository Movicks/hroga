import React from "react";
import Image from "next/image";

// Icon: Eye with rays (Mission)
const MissionIcon = () => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Rays */}
    <line x1="28" y1="4" x2="28" y2="11" stroke="#00B894" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="28" y1="45" x2="28" y2="52" stroke="#00B894" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="7" y1="17" x2="13" y2="21" stroke="#00B894" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="43" y1="35" x2="49" y2="39" stroke="#00B894" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="7" y1="39" x2="13" y2="35" stroke="#00B894" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="43" y1="21" x2="49" y2="17" stroke="#00B894" strokeWidth="2.5" strokeLinecap="round" />
    {/* Eye outline */}
    <path
      d="M8 28C8 28 16 14 28 14C40 14 48 28 48 28C48 28 40 42 28 42C16 42 8 28 8 28Z"
      stroke="#0D1B4B"
      strokeWidth="2.5"
      fill="none"
    />
    {/* Iris */}
    <circle cx="28" cy="28" r="6" stroke="#0D1B4B" strokeWidth="2.5" fill="none" />
    {/* Pupil */}
    <circle cx="28" cy="28" r="2.5" fill="#0D1B4B" />
  </svg>
);

// Icon: Target with arrow (Vision)
const VisionIcon = () => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Outer circle */}
    <circle cx="26" cy="30" r="18" stroke="#0D1B4B" strokeWidth="2.5" fill="none" />
    {/* Middle circle */}
    <circle cx="26" cy="30" r="11" stroke="#0D1B4B" strokeWidth="2.5" fill="none" />
    {/* Inner circle */}
    <circle cx="26" cy="30" r="4.5" stroke="#0D1B4B" strokeWidth="2.5" fill="none" />
    {/* Arrow shaft */}
    <line x1="30" y1="26" x2="46" y2="10" stroke="#00B894" strokeWidth="2.5" strokeLinecap="round" />
    {/* Arrow head */}
    <polyline
      points="38,8 46,8 46,16"
      stroke="#00B894"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export default function GetToKnowUs() {
  return (
    <section
      className="w-full"
    //   style={{ background: "linear-gradient(135deg, #fdf6ee 0%, #fdf0f0 100%)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2
          className="text-4xl md:text-5xl mb-8 text-black font-serif"
        >
          Get to know us
        </h2>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Left column: Mission + Vision */}
          <div className="flex-1 flex flex-col gap-10">
            {/* Mission */}
            <div className="w-full">
              <div className="mb-3">
                <MissionIcon />
              </div>
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: "#0D1B4B", fontFamily: "inherit" }}
              >
                Our Mission
              </h3>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#444", maxWidth: "100%" }}
              >
                To be a united sisterhood of Roses, nurturing excellence,
                discipline, and patriotism, while upholding the enduring legacy
                of Holy Rosary Port Harcourt and shining as beacons of light in
                Nigeria and beyond.
              </p>
            </div>

            {/* Vision */}
            <div>
              <div className="mb-3">
                <VisionIcon />
              </div>
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: "#0D1B4B", fontFamily: "inherit" }}
              >
                Our Vision
              </h3>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#444", maxWidth: "100%" }}
              >
                To uphold the values of truth, service, and discipline instilled
                by our Alma Mater. Foster lifelong bonds of sisterhood and unity,
                and contribute meaningfully to the growth of our Alma Mater,
                communities and nation through education, service, leadership, and
                excellence, inspiring generations of women to be stars in all
                things good.
              </p>
            </div>
          </div>

          {/* Right column: stacked images */}
          <div className="flex-1 flex flex-col gap-4 relative w-full">
            {/* Top image — offset right */}
            <div className="self-end w-[80%]">
              <div
                className="overflow-hidden"
                style={{ borderRadius: "4px" }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1739303987830-ca19742b19bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VHdvJTIwYmxhY2slMjB3b21lbiUyMHN0YW5kaW5nJTIwYW5kJTIwY29sbGFib3JhdGluZyUyMG9uJTIwYSUyMGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Two women collaborating on a laptop"
                  width={600}
                  height={340}
                  className="w-full object-cover h-[170px] lg:h-[260px]"
                />
              </div>
            </div>

            {/* Bottom image — offset left */}
            <div className="self-start w-[80%]" style={{ marginTop: "-35px" }}>
              <div
                className="overflow-hidden"
                style={{ borderRadius: "4px" }}
              >
                <Image
                  src="https://media.istockphoto.com/id/2226926882/photo/planning-meeting-or-business-women-with-laptop-for-feedback-collaboration-or-investment.webp?a=1&b=1&s=612x612&w=0&k=20&c=Fbvc9-jpfXNNZoOL3gHuwfzamDbfJjOEVaaB2FqaBo0="
                  alt="Three women having a discussion in a living room"
                  width={600}
                  height={140}
                  className="w-full object-cover h-[170px] lg:h-[260px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}