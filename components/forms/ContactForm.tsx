"use client";

import { useState } from "react";

const SUBJECT_OPTIONS = [
  "Membership enquiry",
  "Event registration",
  "Project submission",
  "General enquiry",
];

export default function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(SUBJECT_OPTIONS[0]);
  const [message, setMessage] = useState("");

  const wordCount = message.trim() === "" ? 0 : message.trim().split(/\s+/).length;

  const handleSubmit = () => {
    console.log({ fullName, graduationYear, email, subject, message });
  };

  return (
    <div className="bg-white shadow-sm p-8 w-full max-w-[480px]">
      {/* Row 1: Full name + Graduation Year */}
      <div className="flex gap-4 mb-5">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Full name
          </label>
          <input
            type="text"
            placeholder="David"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Graduation Year
          </label>
          <input
            type="text"
            placeholder="Akan"
            value={graduationYear}
            onChange={(e) => setGraduationYear(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Email
        </label>
        <input
          type="email"
          placeholder="youremail@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        />
      </div>

      {/* Subject */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Subject
        </label>
        <div className="relative">
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full appearance-none border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition pr-10 cursor-pointer"
          >
            {SUBJECT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {/* Chevron */}
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Message
        </label>
        <textarea
          placeholder="Tell us about yourself…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-none"
        />
        <p className="text-xs text-amber-500 mt-1">
          You can write up to 500 words
        </p>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-primary hover:bg-primary active:bg-primary text-white font-semibold text-sm py-3.5 rounded-full transition-colors duration-150"
      >
        Join Us
      </button>
    </div>
  );
}
