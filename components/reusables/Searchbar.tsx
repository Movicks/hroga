'use client';

import { useState } from 'react';
import { SearchIcon } from "lucide-react";

export default function Searchbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`flex items-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm transition-all duration-300 ease-in-out ${
        isOpen ? 'w-full pl-4 lg:max-w-xl' : 'w-fit'
      }`}
    >
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'mr-3 max-w-md opacity-100' : 'mr-0 max-w-0 opacity-0'
        }`}
      >
        <input
          type="text"
          placeholder="Search activities, gallery items, and admin content"
          className="w-64 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 sm:w-80"
        />
      </div>

      <button
        type="button"
        aria-label={isOpen ? 'Hide search' : 'Show search'}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-center bg-black px-4 py-3 text-white transition-colors hover:bg-slate-800"
      >
        <SearchIcon size={22} />
      </button>
    </div>
  );
}
