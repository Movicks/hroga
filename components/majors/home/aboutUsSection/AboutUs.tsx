import ItalicTitle from "@/components/reusables/ItalicTitle";
import SectionHeading from "@/components/reusables/SectionHeading";
import { ArrowRight } from "lucide-react";
import { Cormorant_Garamond } from "next/font/google";
import Link from "next/link";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
});

const tags = [
  "Community",
  "Service",
  "Legacy",
  "Sisterhood",
  "Excellence",
];

export default function AboutAssociation() {
  return (
    <section className="bg-[#020d39] py-14 lg:py-22 h-[50rem] md:h-[45rem] overflow-hidden">
      <div className="relative flex items-center justify-end h-[100%] mx-auto max-w-[1280px] lg:px-6">

        <div className='w-[25%] min-h-full flex items-start justify-end'>
          <div className=''>
            <div className='w-[9rem] h-[9rem] md:w-[48rem] md:h-[48rem] bg-[#73A3ED]/60 rounded-full bottom-[-5rem] right-[-5rem] md:top-[-26rem] md:right-[-29rem] absolute' />
            <div className='hidden md:block absolute w-[6rem] h-[6rem] md:w-[13rem] md:h-[11rem] rounded-[5px] bg-[#061977FF]/80 px-1 py-2 right-[2rem] top-[2rem] md:right-[7rem] md:top-[8rem] text-center'>
              <div className='w-full h-full border-2 border-gray-400 rounded-md bg-primary/60 flex flex-col justify-center'>
                <span className='md:text-4xl font-serif text-[#061977FF]'>OGA</span>
                <span className='text-gray-300 text-[10px] md:text-lg'>EST. 1968.</span>
              </div>
            </div>
          </div>
        </div>
        
        
        <div className="absolute w-full px-4 lg:px-[5rem] xl:px-[6.7rem]">
          <div className="max-w-[760px]">
            {/* section heading */}
            <SectionHeading title="WHO WE ARE AND HOW TO GET INVOLVED" className="text-white/90 text-xs md:text-[18px] mb-0"/>

            {/* Heading */}
            <h2 className="mt-4 text-[2.5rem] sm:text-[3.25rem] leading-[1.02] font-light tracking-[-0.04em] md:text-[66px] leading-[1.02] font-light tracking-[-0.04em] text-white">
              A{" "}
              <ItalicTitle title="Sisterhood" colorClass={`text-[#6C93E8] text-[2.5rem] sm:text-[3.25rem] leading-[1.02] font-light tracking-[-0.04em] md:text-[66px]`} /> built 
              <br />
              to last
            </h2>

            {/* Content */}
            <div className="mt-8 space-y-6">
              <p className="max-w-[690px] md:text-[19px] leading-[2.05] font-normal text-white/90">
                The Holy Rosary Old Girls Association connects alumnae across
                every graduating class celebrating shared memories, driving
                impactful projects, and keeping the bonds of school alive for
                life.
              </p>

              <p className="max-w-[690px] md:text-[19px] leading-[2.05] font-normal text-white/90">
                From Lagos to London, our community spans continents but the
                heart of who we are was shaped within the walls of Holy Rosary.
              </p>
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#5E8FE6] bg-[#17317C] px-6 py-1 md:text-[18px] font-normal text-[#B7C9F7]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Button */}
            <Link href='/about_us' className="max-w-[13.3rem] mt-10 flex h-[45px] items-center gap-3 rounded-full bg-[#6C93E8] px-6 md:text-[18px] font-medium text-white transition-all duration-300 hover:bg-[#7A9DF0]">
              Read our story
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}