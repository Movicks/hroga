"use client"

import SectionHeading from "@/components/reusables/SectionHeading";
import HomeTopbar from "@/components/topbars/HomeTopbar";
import { EventType, fetchEvents } from "@/redux/features/events/eventsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { monthMap, monthNames } from "./consts/EventsConsts";
import Loader from "@/components/reusables/Loader";
import ItalicTitle from "@/components/reusables/ItalicTitle";

// Define the event interface based on your actual event structure
interface Event {
  _id: string;
  type: EventType;
  title: string;
  dateLocation: string;
  description: string;
  // Add any other properties your events have
}

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

const getMonthFromDateLocation = (text: string) => {
  const lower = text.toLowerCase();

  for (const month in monthMap) {
    if (lower.includes(month)) {
      return monthMap[month];
    }
  }

  return null;
};

const getDayFromDateLocation = (text: string) => {
  const match = text.match(/\b([1-9]|[12][0-9]|3[01])\b/);

  return match ? Number(match[1]) : null;
};

const groupEventsByThreeMonths = (events: Event[]) => {
  const groups: Record<string, Event[]> = {};

  events.forEach((event) => {
    const month = getMonthFromDateLocation(event.dateLocation);

    if (month === null) return;

    // Optional: Extract the day if you need it later
    getDayFromDateLocation(event.dateLocation);

    const quarterStart = Math.floor(month / 3) * 3;

    const key = `${monthNames[quarterStart]} - ${
      monthNames[quarterStart + 2]
    }`;

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(event);
  });

  return groups;
};

export default function EventsPage() {
    const dispatch = useAppDispatch();
    const { events, loading } = useAppSelector((state) => state.events);
    
    // Fetch events when component mounts
    useEffect(() => {
      dispatch(fetchEvents());
    }, [dispatch]);
    
    // Group events only when events are available
    const groupedEvents = useMemo(() => {
      if (events.length === 0) return {};
      return groupEventsByThreeMonths(events);
    }, [events]);
    
    // Show loader while loading
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <Loader loadTitle="Loading events" />
        </div>
      );
    }
    
    return (
      <section className="relative flex flex-col">
        <HomeTopbar />
        <div className="flex items-center w-full pt-30 md:pt-40">
          <section className="px-4 lg:px-[5rem] xl:px-[13rem]">
            {/* Header */}
            <div className="mb-16 max-w-xl">
              <SectionHeading title="ALL UPCOMING EVENTS" className="text-xs md:text-[18px] mb-2"/>
              <h2 className="mb-4 text-[2rem] sm:text-[3.25rem] font-medium tracking-tight text-gray-900">
                <ItalicTitle title="Celebrating"/> our own
              </h2>
              <p className="text-base leading-relaxed text-gray-500">
                Birthdays, weddings, new arrivals we mark every milestone
                <br />
                together as one community.
              </p>
            </div>
            {/* CARDS */}
            <div className="mx-auto w-full max-w-7xl px-6 sm:px-6">
              {events.length === 0 ? (
                <div className="py-12 text-center text-gray-500">No events to display yet.</div>
              ) : (
                Object.entries(groupedEvents).map(([period, periodEvents]) => (
                  <div key={period} className="mb-12">
                    <h2 className="mb-8 text-xl font-bold text-gray-900">
                      {period}
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                      {periodEvents.map((event: Event) => {
                        // Type assertion to tell TypeScript that event.type is of type EventType
                        const badge = badgeConfig[event.type as EventType];
                        const dc = dateColor[event.type as EventType];
                        return (
                          <div key={event._id} className="rotate-[5deg]">
                            <div className={`h-[22rem] md:h-[25rem] lg:h-[27rem] ${badge.gradientBg}`}>
                              <div className="relative flex flex-col h-full items-center justify-center bg-gradient-to-r from-gray-300 via-gray-50 to-gray-200 rotate-[-5deg] shadow-sm overflow-hidden">
                                <div className="h-[100%]">
                                  <Image 
                                    src={badge.image} 
                                    alt={event.type} 
                                    width={400} 
                                    height={400} 
                                    className="h-full w-full object-cover" 
                                  />
                                </div>
                                <div className="absolute left-0 top-0 h-full w-full pt-4">
                                  <div className="h-[55%]">
                                    <div className={`h-8 w-full flex items-center text-center justify-center ${badge.bg} ${badge.text}`}>
                                      {event.type}
                                    </div>
                                  </div>
                                  <div className="h-[45%] p-2">
                                    <div className="rounded-md bg-white shadow-sm h-full p-4">
                                      <h3 className="mb-1 text-md font-bold text-gray-900 font-serif">
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
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </section>
    )
}