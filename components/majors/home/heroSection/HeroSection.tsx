import Image from "next/image";
import ItalicTitle from "@/components/reusables/ItalicTitle";

export default function HeroSection() {
  return (
    <section className="overflow-hidden bg-[#F6F6F6] px-4 pt-[5.5rem] md:pt-[8rem] lg:pt-[10rem] sm:px-6 lg:px-[5rem] xl:px-[12.5rem]">
      <div className="w-full">
        <div className="flex min-h-[auto] flex-col pb-8 gap-12 md:gap-16 lg:min-h-[560px] lg:flex-row lg:items-start lg:gap-20">
          {/* LEFT CONTENT */}
          <div className="w-full lg:max-w-[560px] ">
            <p className="mb-4 text-sm font-normal uppercase tracking-[-0.02em] text-[#8B8B8B] sm:text-base lg:mb-5 lg:text-[18px]">
              EST. 1968. OLD GIRLS ASSOCIATION
            </p>

            <h1 className="mb-2 text-[2.4rem] leading-[1] font-light tracking-[-0.05em] text-[#23232D] sm:text-[3.25rem] lg:text-[56px]">
              Where Sisterhood
            </h1>
            <ItalicTitle
              title="Lasts a Lifetime"
              colorClass="text-[#648FDF] text-[2.4rem] sm:text-[3.25rem] lg:text-[56px]"
            />

            <p className="mt-4 text-sm font-semibold uppercase text-[#5C5C5C] sm:text-[15px] lg:text-[17px]">
              HOLY ROSARY COLLEGE
            </p>

            <p className="mt-6 max-w-[560px] text-base leading-[1.75] text-[#616161] sm:text-lg lg:mt-10 lg:text-[18px] lg:leading-[1.8]">
              Reconnect with your class, celebrate every milestone, and continue
              the legacy of excellence Holy rosary built in each of us.
            </p>

            <button className="mt-8 h-[40px] rounded-full bg-[#5E89DA] px-6 text-sm font-medium text-white transition hover:bg-[#4F79C8] sm:mt-10 sm:h-[48px] sm:px-8 sm:text-base lg:mt-16 lg:px-10">
              Find your Classmates
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex w-full justify-center lg:justify-end lg:pt-[3.5rem]">
            <div className="relative aspect-[5/3] lg:aspect-[4.5/3] xl:aspect-[5.5/3] w-full lg:max-w-[535px] overflow-hidden rounded-[6px] border-[6px] border-[#9DDCDC] sm:border-[8px]">
              <Image
                src="https://plus.unsplash.com/premium_photo-1661401872795-5c3744af4a1f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmxhY2slMjB3b21lbiUyMGJpcnRoZGF5JTIwcmV1bmlvbnxlbnwwfHwwfHx8MA%3D%3D"
                alt="Holy Rosary Alumni"
                className="object-cover"
                priority
                // width={100}
                fill
                // height={100}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
