import ItalicTitle from "@/components/reusables/ItalicTitle";
import SectionHeading from "@/components/reusables/SectionHeading";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600"],
});

const activities = [
  {
    day: "14",
    month: "AUG",
    title: "Class of 1999 — 25 - year Reunion",
    details:
      "Lagos Island Club  •  Evening gala, dinner & awards  •  RSVP by July 30",
  },
  {
    day: "22",
    month: "SEP",
    title: "Class of 2004 — 20 - year Reunion",
    details:
      "School Grounds  •  Afternoon tea, tours & class photo  •  RSVP by September 10",
  },
  {
    day: "11",
    month: "OCT",
    title: "All — Classes Mega Reunion",
    details:
      "Eko Hotel, Lagos  •  Annual all - class gathering  •  Black tie  •  RSVP by September 28",
  },
];

export default function ActivitiesSection() {
  return (
    <section className="w-full bg-[#F7F7F7] py-14 lg:pl-[4rem] lg:pr-[5rem] xl:pl-[12rem] xl:pr-[17rem]">
      <div className="px-4 md:px-6">
        {/* Header */}
        <div className="grid grid-cols-1 gap-5 xl:gap-10 lg:grid-cols-[400px_1fr]">
          {/* Left Content */}
          <div>
            <SectionHeading title="ACTIVITIES" className="text-xs md:text-[18px] mb-0"/>

            <h2 className="mt-5 text-[2rem] sm:text-[3.25rem] leading-[0.95] font-light tracking-[-3px] text-[#5F8FE8] lg:whitespace-nowrap">
              What we do{" "}
              <ItalicTitle title="Together" colorClass={`text-[#1260ad] text-[2rem] sm:text-[3.25rem]`}  />
            </h2>

            <p className="mt-6 max-w-[500px] text-[19px] leading-[1.9] text-[#5F5F5F]">
              Reunions, interviews, and annual meetings keep our community
              active and engaged year-round.
            </p>
          </div>

          {/* Right Menu */}
          <div className="flex items-start justify-center pt-4 lg:pt-13 w-full">
            <div className="flex flex-wrap items-center lg:justify-end gap-4 md:gap-8 text-[17px] font-medium text-[#A97408] w-full">
              <span>- Reunion Schedule</span>
              <span>- Interviews</span>
              <span>- Annual Meetings</span>
            </div>
          </div>
        </div>

        {/* Activities Card */}
        <div className="mt-10 xl:mt-16 flex justify-end">
          <div className="w-full max-w-[50rem] bg-[#f7fbdf]  px-4 md:px-11 py-7 shadow-xs">
            {activities.map((activity, index) => (
              <div key={index}>
                <div className="flex gap-4 md:gap-6 py-5">
                  {/* Date Card */}
                  <div className="flex h-[58px] w-[58px] md:h-[78px] md:w-[69px] flex-shrink-0 flex-col items-center justify-center rounded-md border border-[#D7A32C] bg-[#F5EFD4] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                    <span className="text-[20px] font-medium text-[#C88700]">
                      {activity.day}
                    </span>

                    <span className="mt-1 text-[11px] tracking-[0.08em] text-[#C88700]">
                      {activity.month}
                    </span>
                  </div>

                  {/* Event Content */}
                  <div className="flex-1">
                    <h3 className="text-[19px] font-semibold text-[#242424]">
                      {activity.title}
                    </h3>

                    <p className="mt-3 text-[15px] leading-relaxed text-[#667329]">
                      {activity.details}
                    </p>
                  </div>
                </div>

                {index !== activities.length - 1 && (
                  <div className=" border-t border-[#D9D9C8]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}