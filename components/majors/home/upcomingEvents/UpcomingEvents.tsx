'use client';

import SectionHeading from "@/components/reusables/SectionHeading";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { fetchEvents, Event, EventType } from "../../../../redux/features/events/eventsSlice";
import Image from "next/image";

const badgeConfig: Record<
  EventType,
  { emoji: string; image: string; bg: string; text: string; gradientBg: string }
> = {
  Birthday: {
    emoji: "🎂",
    image: 'https://images.unsplash.com/photo-1554719956-5c151ab80680?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmlydGhkYXklMjBiYWxsb29uc3xlbnwwfHwwfHx8MA%3D%3D',
    bg: "bg-[#C3E2FF]",
    gradientBg: 'bg-gradient-to-r from-gray-300 via-gray-50 to-gray-300',
    text: "text-[#1A3982]",
  },
  Wedding: {
    emoji: "💍",
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2VkZGluZyUyMHJpbmdzfGVufDB8fDB8fHww',
    bg: "bg-[#F2C3FF]",
    gradientBg: 'bg-gradient-to-r from-[#DBCCDF] via-gray-50 to-[#DBCCDF]',
    text: "text-[#8A2FA4]",
  },
  "New Arrivals": {
    emoji: "🐣",
    image: 'https://images.unsplash.com/photo-1610880095973-1e71054ac473?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fGJhYnklMjBmZWV0c3xlbnwwfHwwfHx8MA%3D%3D',
    bg: "bg-[#DAF4EC]",
    gradientBg: 'bg-gradient-to-r from-[#99B4AC] via-gray-50 to-[#99B4AC]',
    text: "text-[#066649]",
  },
};

const dateColor: Record<EventType, string> = {
  Birthday: "text-[#2fa8c8]",
  Wedding: "text-[#2fa8c8]",
  "New Arrivals": "text-[#3aaa78]",
};

export default function UpcomingEvents() {
  const dispatch = useAppDispatch();
  const { events, loading } = useAppSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) {
    return (
      <section className="bg-gradient-to-tl from-gray-400 via-gray-50 via-gray-400 via-white to-gray-100 px-4 py-14 lg:px-[5rem] xl:px-[13rem]">
        <div className="py-12 text-center text-gray-500">Loading events...</div>
      </section>
    );
  }

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
        
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {events.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500">No events to display yet.</div>
          ) : (
              events.map((event) => {
              const badge = badgeConfig[event.type];
              const dc = dateColor[event.type];
              return (
                <div key={event._id} className="rotate-[5deg]">
                  <div className={`h-[22rem] md:h-[25rem] lg:h-[27rem] ${badge.gradientBg}`}>
                    <div className="relative flex flex-col h-full items-center justify-center bg-gradient-to-r from-gray-300 via-gray-50 to-gray-200 rotate-[-5deg] shadow-sm overflow-hidden">
                      <div className="h-[100%]">
                        <Image src={badge.image} alt="event" width={100} height={100} className="h-full w-full bg-cover" objectFit="cover" />
                      </div>
                      <div className="absolute left-0 top-0 h-full w-full pt-4">
                        <div className="h-[55%]">
                          <div className={`h-8 w-full flex items-center text-center justify-center ${badge.bg} ${badge.text}`}>{event.type}</div>
                        </div>
                        <div className="h-[45%] p-2">
                          <div className="rounded-md bg-white shadow-sm h-full p-4">
                            <h3 className=" mb-1 text-md font-bold text-gray-900 font-serif">
                              {event.title}
                            </h3>
                            <p className={`mb-1 text-sm font-semibold ${dc}`}>
                              {event.dateLocation}
                            </p>
                            <p className="text-sm leading-relaxed text-gray-500">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </section>
  );
}