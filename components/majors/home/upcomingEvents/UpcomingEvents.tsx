import SectionHeading from "@/components/reusables/SectionHeading";
import React from "react";

type EventType = "Birthday" | "Wedding" | "New Arrivals";

interface CelebrationEvent {
  id: number;
  type: EventType;
  title: string;
  dateLocation: string;
  description: string;
}

const events: CelebrationEvent[] = [
  {
    id: 1,
    type: "Birthday",
    title: "Mrs. Adaeze Okonkwo",
    dateLocation: "June 15, 2026",
    description:
      "Class of 1994 · Celebrating her 50th — join us in wishing her a wonderful milestone.",
  },
  {
    id: 2,
    type: "Wedding",
    title: "Chisom Eze & Femi Adeyemi",
    dateLocation: "July 5, 2026 · Lagos",
    description:
      "Class of 2008 · Our beloved Chisom walks down the aisle. RSVP to celebrate with her.",
  },
  {
    id: 3,
    type: "New Arrivals",
    title: "Baby Girl – Ngozi Bello",
    dateLocation: "Arrived June 2nd, 2026",
    description:
      "Class of 2005 · Ngozi welcomed her first grandchild! Send the family your congratulations.",
  },
];

const badgeConfig: Record<
  EventType,
  { emoji: string; bg: string; text: string }
> = {
  Birthday: {
    emoji: "🎂",
    bg: "bg-[#daf0f7]",
    text: "text-[#2fa8c8]",
  },
  Wedding: {
    emoji: "💍",
    bg: "bg-[#fce4f0]",
    text: "text-[#c96fa8]",
  },
  "New Arrivals": {
    emoji: "🐣",
    bg: "bg-[#d8f0e8]",
    text: "text-[#3aaa78]",
  },
};

const dateColor: Record<EventType, string> = {
  Birthday: "text-[#2fa8c8]",
  Wedding: "text-[#2fa8c8]",
  "New Arrivals": "text-[#3aaa78]",
};

export default function UpcomingEvents() {
  return (
    <section className="bg-gradient-to-tl from-gray-400 via-gray-50 via-gray-400 via-white to-gray-100 px-4 py-14 lg:px-[5rem] xl:px-[13rem]">
      {/* Header */}
      <div className="mb-16 max-w-xl">
        <SectionHeading title="UPCOMING EVENTS" className="text-xs md:text-[18px] mb-2"/>
        
        <h2 className="mb-4 text-[2rem] sm:text-[3.25rem] font-bold tracking-tight text-gray-900">
          Celebrating our own
        </h2>
        <p className="text-base leading-relaxed text-gray-500">
          Birthdays, weddings, new arrivals we mark every milestone
          <br />
          together as one community.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
        {events.map((event) => {
          const badge = badgeConfig[event.type];
          const dc = dateColor[event.type];
          return (
            <div key={event.id} className="relative pt-5">
              {/* Badge tab */}
              <div
                className={`absolute -top-0 left-1/2 z-10 -translate-x-1/2 min-w-[15rem] md:min-w-auto lg:min-w-[15rem] rounded-md px-5 py-1.5 text-sm font-semibold ${badge.bg} ${badge.text} flex items-center justify-center gap-2 whitespace-nowrap`}
              >
                <span>{badge.emoji}</span>
                <span>{event.type}</span>
              </div>

              {/* Card body */}
              <div className="rounded-2xl bg-white px-7 py-8 pt-10 shadow-sm md:min-h-[13.5rem]">
                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  {event.title}
                </h3>
                <p className={`mb-4 text-sm font-semibold ${dc}`}>
                  {event.dateLocation}
                </p>
                <p className="text-sm leading-relaxed text-gray-500">
                  {event.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}