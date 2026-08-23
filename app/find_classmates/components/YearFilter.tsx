"use client";

import { User } from "@/redux/features/users/usersSlice";
import { useCallback, useMemo, useState, useRef, useEffect } from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";

interface YearFilterProps {
    selectedYear: string;
    onYearSelect: (year: string) => void;
    onClearYear: () => void;
    users: User[];
}

export default function YearFilter({
    selectedYear,
    onYearSelect,
    onClearYear,
    users,
}: YearFilterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const graduationYears = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const years: string[] = [];
        for (let year = currentYear; year >= 1965; year--) {
            years.push(year.toString());
        }
        return years;
    }, []);

    const getUserCountForYear = useCallback((year: string) => {
        return users.filter(u => u.yearOfGraduation === year).length;
    }, [users]);

    const filteredYears = useMemo(() => {
        return graduationYears.filter((year) =>
            year.toString().includes(searchTerm.trim())
        );
    }, [graduationYears, searchTerm]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleYearSelect = useCallback((year: string) => {
        onYearSelect(year);
        setIsOpen(false);
        setSearchTerm("");
    }, [onYearSelect]);

    const handleClearYear = useCallback(() => {
        onClearYear();
        setIsOpen(false);
        setSearchTerm("");
    }, [onClearYear]);

    const handleClearSearch = useCallback(() => {
        setSearchTerm("");
        searchInputRef.current?.focus();
    }, []);

    return (
        <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-medium text-gray-700">
                    Filter by Graduation Year
                </h2>
                {selectedYear && (
                    <button
                        onClick={handleClearYear}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                    >
                        <X className="h-3 w-3" />
                        Clear filter
                    </button>
                )}
            </div>

            <div ref={dropdownRef} className="relative w-full sm:w-64">
                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                    <span className="truncate">
                        {selectedYear || "Select Year Of Graduation"}
                    </span>
                    <div className="flex items-center gap-2">
                        {selectedYear && (
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/50 text-primary text-xs font-medium text-white">
                                {getUserCountForYear(selectedYear)}
                            </span>
                        )}
                        <ChevronDown
                            className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                                isOpen ? "rotate-180" : ""
                            }`}
                        />
                    </div>
                </button>

                {isOpen && (
                    <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                        <div className="border-b border-gray-100 p-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search years..."
                                    className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-9 pr-8 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                />
                                {searchTerm && (
                                    <button
                                        type="button"
                                        onClick={handleClearSearch}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="max-h-64 overflow-y-auto p-1">
                            <button
                                type="button"
                                onClick={handleClearYear}
                                className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                                    !selectedYear
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                <span>All Years</span>
                                {!selectedYear && <Check className="h-4 w-4" />}
                            </button>

                            {filteredYears.length === 0 && searchTerm && (
                                <div className="px-3 py-6 text-center text-sm text-gray-500">
                                    No years found matching "{searchTerm}"
                                </div>
                            )}

                            {filteredYears.map((year) => {
                                const count = getUserCountForYear(year);
                                return (
                                    <button
                                        key={year}
                                        type="button"
                                        onClick={() => handleYearSelect(year)}
                                        className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                                            selectedYear === year
                                                ? "bg-blue-50 text-blue-600"
                                                : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                    >
                                        <span>{year}</span>
                                        <div className="flex items-center gap-2">
                                            {count > 0 && (
                                                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-medium">
                                                    {count}
                                                </span>
                                            )}
                                            {selectedYear === year && (
                                                <Check className="h-4 w-4" />
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}