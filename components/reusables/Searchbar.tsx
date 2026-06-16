'use client';

import { useState } from 'react';
import { SearchIcon } from 'lucide-react';

export default function Searchbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`
        flex items-center overflow-hidden rounded-xl
        border border-slate-200 bg-slate-50 shadow-sm
        transition-all duration-300 ease-in-out
        md:w-full md:max-w-xl
        ${isOpen ? 'w-full' : 'w-14'}
      `}
    >
      <div
        className={`
          flex-1 overflow-hidden transition-all duration-300 ease-in-out
          md:max-w-full md:opacity-100
          ${
            isOpen
              ? 'max-w-full opacity-100'
              : 'max-w-0 opacity-0'
          }
        `}
      >
        <input
          type="text"
          placeholder="Search activities, gallery items, and admin content"
          className="w-full bg-transparent px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />
      </div>

      <button
        type="button"
        aria-label={isOpen ? 'Hide search' : 'Show search'}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-11 lg:h-12 w-14 shrink-0 items-center justify-center bg-black text-white transition-colors duration-300 hover:bg-slate-800"
      >
        <SearchIcon size={20} />
      </button>
    </div>
  );
}