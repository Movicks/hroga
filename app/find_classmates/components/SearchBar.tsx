"use client";

import { Search, X, Loader2 } from "lucide-react";
import { User } from "@/redux/features/users/usersSlice";

interface SearchBarProps {
  placeholder: string;
  searchTerm: string;
  isFocused: boolean;
  isSearching: boolean;
  filteredUsers: User[];
  selectedUser: User | null;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  onClearSearch: () => void;
  onUserSelect: (user: User) => void;
  getInitials: (user: User) => string;
}

export default function SearchBar({
  placeholder,
  searchTerm,
  isFocused,
  isSearching,
  onSearchChange,
  onFocus,
  onBlur,
  onClearSearch,
}: SearchBarProps) {
  return (
    <div className="relative mb-8">
      <div className={`
        relative transition-all duration-300
        ${isFocused ? 'scale-[1.01]' : 'scale-100'}
      `}>
        <div className="relative">
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={onSearchChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className={`
              w-full px-5 py-3 pl-14 
              bg-white 
              border-2 rounded-full 
              transition-all duration-300
              focus:outline-none 
              ${isFocused 
                ? 'border-primary shadow-xs shadow-gray-500/10 ring-2 ring-primary/10' 
                : 'border-gray-200 hover:shadow-xs'
              }
              text-gray-800 placeholder-gray-400
              text-lg
            `}
          />
          <Search className={`
            absolute left-5 top-1/2 -translate-y-1/2 
            transition-colors duration-300
            ${isFocused ? 'text-primary' : 'text-primary'}
            w-5 h-5
          `} />
          
          {searchTerm && (
            <button
              onClick={onClearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 
                p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
          
          {isSearching && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}