"use client";

import { useState } from "react";
import api from "../../apiConfig/axios";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const wordCount = message.trim() === "" ? 0 : message.trim().split(/\s+/).length;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await api.post("/contact-messages", {
        fullName,
        graduationYear,
        email,
        subject,
        message,
      });
      setSuccess(true);
      // Reset form
      setFullName("");
      setGraduationYear("");
      setEmail("");
      setSubject(SUBJECT_OPTIONS[0]);
      setMessage("");
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white shadow-sm p-8 w-full max-w-[480px]">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Message Sent!
          </h3>
          <p className="text-gray-600">
            We'll get back to you as soon as possible.
          </p>
        </div>
      </div>
    );
  }

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
            disabled={isSubmitting}
            className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
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
            disabled={isSubmitting}
            className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
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
          disabled={isSubmitting}
          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
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
            disabled={isSubmitting}
            className="w-full appearance-none border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition pr-10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
          disabled={isSubmitting}
          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <p className="text-xs text-amber-500 mt-1">
          You can write up to 500 words
        </p>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="mt-4 w-full bg-primary hover:bg-primary active:bg-primary text-white font-semibold text-sm py-3.5 rounded-full transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </>
        ) : (
          "Join Us"
        )}
      </button>
    </div>
  );
}
