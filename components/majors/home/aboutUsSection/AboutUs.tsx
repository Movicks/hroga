import ItalicTitle from "@/components/reusables/ItalicTitle";
import SectionHeading from "@/components/reusables/SectionHeading";
import { ArrowRight } from "lucide-react";
import { Cormorant_Garamond } from "next/font/google";

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
    <section className="bg-[#020d39] py-14 lg:py-22 px-4 lg:px-[5rem] xl:px-[11.5rem]">
      <div className="mx-auto max-w-[1280px] lg:px-6">
        <div className="max-w-[760px]">
          {/* section heading */}
          <SectionHeading title="WHO WE ARE AND HOW TO GET INVOLVED" className="text-white/90 text-[15px] mb-0"/>

          {/* Heading */}
          <h2 className="mt-8 text-[48px] leading-[1.02] font-light tracking-[-0.04em] md:text-[66px] leading-[1.02] font-light tracking-[-0.04em] text-white">
            A{" "}
            <ItalicTitle title="Sisterhood" colorClass={`text-[#6C93E8] text-[48px] leading-[1.02] font-light tracking-[-0.04em] md:text-[66px]`} /> built 
            <br />
            to last
          </h2>

          {/* Content */}
          <div className="mt-10 space-y-10">
            <p className="max-w-[690px] text-[19px] leading-[2.05] font-normal text-white/90">
              The Holy Rosary Old Girls Association connects alumnae across
              every graduating class celebrating shared memories, driving
              impactful projects, and keeping the bonds of school alive for
              life.
            </p>

            <p className="max-w-[690px] text-[19px] leading-[2.05] font-normal text-white/90">
              From Lagos to London, our community spans continents but the
              heart of who we are was shaped within the walls of Holy Rosary.
            </p>
          </div>

          {/* Tags */}
          <div className="mt-14 flex flex-wrap gap-5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#5E8FE6] bg-[#17317C] px-6 py-1 text-[18px] font-normal text-[#B7C9F7]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Button */}
          <button className="mt-16 flex h-[45px] items-center gap-3 rounded-full bg-[#6C93E8] px-6 text-[18px] font-medium text-white transition-all duration-300 hover:bg-[#7A9DF0]">
            Read our story
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}