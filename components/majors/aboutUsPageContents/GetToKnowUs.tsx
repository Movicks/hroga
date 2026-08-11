// import React from "react";
import Image from "next/image";


export default function GetToKnowUs() {
  return (
    <section
      className="w-full px-4 lg:px-[6rem] xl:px-[12.5rem]"
    //   style={{ background: "linear-gradient(135deg, #fdf6ee 0%, #fdf0f0 100%)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2
          className="text-4xl md:text-5xl mb-8 lg:mt-10 text-black font-serif"
        >
          Get to know us
        </h2>

        <p className="my-6 md:my-9 w-full text-base leading-[1.75] text-[#616161] sm:text-lg lg:mt-10 lg:text-[18px] lg:leading-[1.8]">
          As ambassadors of our <span className="font-semibold">Alma Mater,</span> we remain committed to preserving our rich heritage,
          strengthening our community and building a lasting legacy for generations of Holy Rosary girls to come.
        </p>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-8 items-start">
          {/* Left column: Mission + Vision */}
          <div className="flex-1 flex flex-col gap-10">
            {/* Mission */}
            <div className="w-full">
              <div className="mb-3">
                <Image src="/svgIcons/Eye_Frame.svg" alt="Mission Icon" width={66} height={66} />
              </div>
              <h3
                className="text-xl font-semibold mb-4"
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
                <Image src="/svgIcons/Target_Frame.svg" alt="Vision Icon" width={56} height={56} />
              </div>
              <h3
                className="text-xl font-semibold mb-4"
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
                  src="/images/HROGA_Group.jpeg"
                  alt="Two women collaborating on a laptop"
                  width={600}
                  height={340}
                  className="w-full object-cover h-[170px] lg:h-[250px]"
                />
              </div>
            </div>

            {/* Bottom image — offset left */}
            <div className="self-start w-[80%]" style={{ marginTop: "-30px" }}>
              <div
                className="overflow-hidden"
                style={{ borderRadius: "4px" }}
              >
                <Image
                  src="/images/HROGA_highTable.jpeg"
                  alt="Three women having a discussion in a living room"
                  width={600}
                  height={140}
                  className="w-full object-cover h-[170px] lg:h-[250px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}