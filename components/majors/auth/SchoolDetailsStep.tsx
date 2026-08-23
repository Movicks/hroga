"use client";

import { FormData } from './types';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { ChevronDown, Search, X, Check } from 'lucide-react';

interface SchoolDetailsStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function SchoolDetailsStep({ formData, setFormData }: SchoolDetailsStepProps) {
  const [isEntryOpen, setIsEntryOpen] = useState(false);
  const [isGraduationOpen, setIsGraduationOpen] = useState(false);
  const [entrySearchTerm, setEntrySearchTerm] = useState("");
  const [graduationSearchTerm, setGraduationSearchTerm] = useState("");
  
  const entryDropdownRef = useRef<HTMLDivElement>(null);
  const graduationDropdownRef = useRef<HTMLDivElement>(null);
  const entrySearchInputRef = useRef<HTMLInputElement>(null);
  const graduationSearchInputRef = useRef<HTMLInputElement>(null);

  const currentYear = new Date().getFullYear();
  
  const years = useMemo(() => {
    const yearList: string[] = [];
    for (let year = currentYear; year >= 1965; year--) {
      yearList.push(year.toString());
    }
    return yearList;
  }, [currentYear]);

  const filteredEntryYears = useMemo(() => {
    return years.filter((year) =>
      year.includes(entrySearchTerm.trim())
    );
  }, [years, entrySearchTerm]);

  const filteredGraduationYears = useMemo(() => {
    return years.filter((year) =>
      year.includes(graduationSearchTerm.trim())
    );
  }, [years, graduationSearchTerm]);

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (entryDropdownRef.current && !entryDropdownRef.current.contains(event.target as Node)) {
        setIsEntryOpen(false);
        setEntrySearchTerm("");
      }
      if (graduationDropdownRef.current && !graduationDropdownRef.current.contains(event.target as Node)) {
        setIsGraduationOpen(false);
        setGraduationSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isEntryOpen && entrySearchInputRef.current) {
      setTimeout(() => entrySearchInputRef.current?.focus(), 100);
    }
  }, [isEntryOpen]);

  useEffect(() => {
    if (isGraduationOpen && graduationSearchInputRef.current) {
      setTimeout(() => graduationSearchInputRef.current?.focus(), 100);
    }
  }, [isGraduationOpen]);

  const handleEntrySelect = useCallback((year: string) => {
    setFormData({ ...formData, entryYear: year });
    setIsEntryOpen(false);
    setEntrySearchTerm("");
  }, [setFormData, formData]);

  const handleGraduationSelect = useCallback((year: string) => {
    setFormData({ ...formData, graduationYear: year });
    setIsGraduationOpen(false);
    setGraduationSearchTerm("");
  }, [setFormData, formData]);

  const handleClearEntry = useCallback(() => {
    setFormData({ ...formData, entryYear: "" });
    setIsEntryOpen(false);
    setEntrySearchTerm("");
  }, [setFormData, formData]);

  const handleClearGraduation = useCallback(() => {
    setFormData({ ...formData, graduationYear: "" });
    setIsGraduationOpen(false);
    setGraduationSearchTerm("");
  }, [setFormData, formData]);

  const handleClearEntrySearch = useCallback(() => {
    setEntrySearchTerm("");
    entrySearchInputRef.current?.focus();
  }, []);

  const handleClearGraduationSearch = useCallback(() => {
    setGraduationSearchTerm("");
    graduationSearchInputRef.current?.focus();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6 px-3 md:px-0">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#6393f6]">School Details</h2>
        <p className="hidden lg:block text-[#6393f6] font-medium">Your Holy Rosary chapter</p>
      </div>
      
      <div className="bg-[#F2F7FC] rounded-3xl p-6 space-y-6">
        {/* Your Class */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-[#4B5563]">Your Class</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Entry Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Entry year *
              </label>
              <div ref={entryDropdownRef} className="relative flex flex-col-reverse">
                <button
                  type="button"
                  onClick={() => setIsEntryOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <span className="truncate">
                    {formData.entryYear || "Select Entry Year"}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                      isEntryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isEntryOpen && (
                  <div className="absolute left-0 right-0 z-50 mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                    <div className="border-b border-gray-100 p-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                          ref={entrySearchInputRef}
                          type="text"
                          value={entrySearchTerm}
                          onChange={(e) => setEntrySearchTerm(e.target.value)}
                          placeholder="Search years..."
                          className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-9 pr-8 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                        />
                        {entrySearchTerm && (
                          <button
                            type="button"
                            onClick={handleClearEntrySearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="max-h-[150px] overflow-y-auto p-1">
                      <button
                        type="button"
                        onClick={handleClearEntry}
                        className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                          !formData.entryYear
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>Clear selection</span>
                        {!formData.entryYear && <Check className="h-4 w-4" />}
                      </button>

                      {filteredEntryYears.length === 0 && entrySearchTerm && (
                        <div className="px-3 py-6 text-center text-sm text-gray-500">
                          No years found matching "{entrySearchTerm}"
                        </div>
                      )}

                      {filteredEntryYears.map((year) => (
                        <button
                          key={year}
                          type="button"
                          onClick={() => handleEntrySelect(year)}
                          className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                            formData.entryYear === year
                              ? "bg-blue-50 text-blue-600"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <span>{year}</span>
                          {formData.entryYear === year && (
                            <Check className="h-4 w-4" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Graduation Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Graduation year *
              </label>
              <div ref={graduationDropdownRef} className="relative flex flex-col-reverse">
                <button
                  type="button"
                  onClick={() => setIsGraduationOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <span className="truncate">
                    {formData.graduationYear || "Select Graduation Year"}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                      isGraduationOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isGraduationOpen && (
                  <div className="absolute left-0 right-0 z-50 mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                    <div className="border-b border-gray-100 p-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                          ref={graduationSearchInputRef}
                          type="text"
                          value={graduationSearchTerm}
                          onChange={(e) => setGraduationSearchTerm(e.target.value)}
                          placeholder="Search years..."
                          className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-9 pr-8 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                        />
                        {graduationSearchTerm && (
                          <button
                            type="button"
                            onClick={handleClearGraduationSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="max-h-[150px] overflow-y-auto p-1">
                      <button
                        type="button"
                        onClick={handleClearGraduation}
                        className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                          !formData.graduationYear
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>Clear selection</span>
                        {!formData.graduationYear && <Check className="h-4 w-4" />}
                      </button>

                      {filteredGraduationYears.length === 0 && graduationSearchTerm && (
                        <div className="px-3 py-6 text-center text-sm text-gray-500">
                          No years found matching "{graduationSearchTerm}"
                        </div>
                      )}

                      {filteredGraduationYears.map((year) => (
                        <button
                          key={year}
                          type="button"
                          onClick={() => handleGraduationSelect(year)}
                          className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                            formData.graduationYear === year
                              ? "bg-blue-50 text-blue-600"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <span>{year}</span>
                          {formData.graduationYear === year && (
                            <Check className="h-4 w-4" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}