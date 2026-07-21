import Image from "next/image";
import ItalicTitle from "@/components/reusables/ItalicTitle";
import SectionHeading from "@/components/reusables/SectionHeading";
import OgaGallery from "./OgaGallery";

export default function HeroSection() {
  const handleClick = () => {
    window.location.href = "/find_classmates";
  }
  return (
    <section className="overflow-hidden bg-white px-4 pb-[2rem] pt-[5.5rem] md:pt-[8rem] lg:pt-[10rem] sm:px-6 lg:px-[5rem] xl:px-[12.5rem]">
      <div className="w-full">
        <div className="flex min-h-[auto] flex-col pb-8 gap-12 md:gap-12 lg:min-h-[560px] lg:flex-row lg:items-start lg:gap-20">
          {/* LEFT CONTENT */}
          <div className="w-full lg:max-w-[560px] ">
            {/* <p className="mb-4 text-sm font-normal uppercase tracking-[-0.02em] text-[#8B8B8B] sm:text-base lg:mb-5 lg:text-[18px]">
              
            </p> */}
            <SectionHeading title="EST. 1968. OLD GIRLS ASSOCIATION" className="text-xs md:text-[18px] mb-4 !text-[#6393f6] border-2 border-[#6393f6]/20 rounded-full bg-[#6393f6]/10 px-4 py-1 max-w-[23rem]"/>

            <h1 className="mb-3 text-[2.4rem] leading-[1] font-medium tracking-[-0.05em] text-[#020D39] sm:text-[3.25rem] lg:text-[56px]">
              Where Sisterhood
            </h1>
            <ItalicTitle
              title="Lasts a Lifetime"
              colorClass="text-[#648FDF] text-[2.7rem] sm:text-[3.25rem] lg:text-[4rem]"
            />

            <p className="mt-4 text-sm font-semibold uppercase text-[#5C5C5C] sm:text-[15px] lg:text-[17px]">
              HOLY ROSARY COLLEGE
            </p>

            <p className="mt-6 max-w-[560px] text-base leading-[1.75] text-[#616161] sm:text-lg lg:mt-10 lg:text-[18px] lg:leading-[1.8]">
              Reconnect with your class, celebrate every milestone, and continue
              the legacy of excellence Holy rosary built in each of us.
            </p>

            <button onClick={handleClick} className="mt-8 h-[40px] rounded-full bg-[#5E89DA] px-6 text-sm font-medium text-white transition hover:bg-[#4F79C8] sm:mt-10 sm:h-[48px] sm:px-8 sm:text-base lg:mt-16 lg:px-10">
              Find your Classmates
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <OgaGallery/>
        </div>
      </div>
    </section>
  );
}
