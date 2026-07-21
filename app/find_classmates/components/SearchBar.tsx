"use client"

import { Search, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "@/redux/features/users/usersSlice";

interface SearchBarProps {
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
  searchTerm,
  isFocused,
  isSearching,
  filteredUsers,
  selectedUser,
  onSearchChange,
  onFocus,
  onBlur,
  onClearSearch,
  onUserSelect,
  getInitials,
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
            placeholder="Search by name..."
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

        {/* Search Results Dropdown */}
        <AnimatePresence>
          {filteredUsers.length > 0 && !selectedUser && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 
                max-h-72 overflow-y-auto z-10 overflow-hidden"
            >
              {filteredUsers.map((user, index) => (
                <motion.button
                  key={user.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onUserSelect(user)}
                  className="w-full px-5 py-3.5 text-left hover:bg-primary/50 
                    transition-all duration-200 flex items-center space-x-4
                    border-b border-gray-50 last:border-0
                    group"
                >
                  <div className="flex-shrink-0">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.firstName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary 
                        flex items-center justify-center text-white font-semibold text-sm">
                        {getInitials(user)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                      {user.firstName} {user.middleName && `${user.middleName} `}{user.lastName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                  {user.yearOfGraduation && (
                    <div className="flex-shrink-0">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">
                        {user.yearOfGraduation}
                      </span>
                    </div>
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}