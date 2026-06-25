// import React from 'react'

import Image from "next/image";

export default function PresidentSection() {
  return (
      <section className="flex justify-center w-full px-4 lg:px-[6rem] xl:px-[12.5rem]">
          <div className="bg-gradient-to-r from-[#efe9f5] to-[#f7f7f7] w-full flex flex-wrap gap-6 lg:gap-16 p-4 lg:p-[72px]">
              <div className="w-full max-w-[354px] h-full max-h-[490px] bg-yellow-200 border-4 border-[#aeecfe] rounded-xl">
                  <Image src="/images/President_image.png" className="w-full h-full bg-cover" alt="President" width={100} height={100} />
              </div>
              {/* Right: Message content */}
              <div className="flex-1 flex flex-col gap-5 lg:mt-20">
                {/* Heading */}
                <h2
                    className="text-3xl md:text-4xl font-semibold tracking-tight"
                    style={{ color: "#1a1a2e", fontFamily: "inherit" }}
                >
                    A{" "}
                    <span
                    style={{
                        fontFamily: "'Georgia', 'Times New Roman', serif",
                        fontStyle: "italic",
                        fontWeight: 400,
                        color: "#7B9FE0",
                    }}
                    >
                    Message
                    </span>{" "}
                    <span style={{ fontWeight: 600 }}>from the President</span>
                </h2>
        
                {/* Salutation */}
                <p
                    className="text-base mt-2"
                    style={{ color: "#555" }}
                >
                    Dear{" "}
                    <span
                    style={{
                        fontFamily: "'Georgia', 'Times New Roman', serif",
                        fontStyle: "italic",
                        color: "#C0392B",
                        fontWeight: 500,
                    }}
                    >
                    Roses,
                    </span>
                </p>
        
                {/* Body */}
                <p
                    className="text-base leading-relaxed"
                    style={{ color: "#555" }}
                >
                    It is with great honour and joy that I welcome you to the official
                    website of HROGA. This platform is a testament to our continued
                    growth, unity, and shared commitment to making a difference. As we
                    journey forward, let us remember the values instilled in us at Holy
                    Rosary;{" "}
                    <strong style={{ color: "#333" }}>Truth</strong>,{" "}
                    <strong style={{ color: "#333" }}>Service</strong>,{" "}
                    <strong style={{ color: "#333" }}>Discipline</strong>, and{" "}
                    <strong style={{ color: "#333" }}>Faith</strong>. May this space
                    inspire reconnection, collaboration, and active participation from
                    every old girl near and far.
                </p>
        
                {/* Closing */}
                <p className="text-base" style={{ color: "#555" }}>
                    Yours sincerely
                </p>
        
                {/* Signature block */}
                <div className="mt-1">
                    <p
                    className="text-base font-bold"
                    style={{ color: "#1a1a2e", letterSpacing: "0.01em" }}
                    >
                    IGONIBYA. BRISIBE
                    </p>
                    <p className="text-sm mt-0.5" style={{ color: "#777" }}>
                    President-General, HROGA
                    </p>
                  </div>
            </div>
          </div>
    </section>
  )
}
