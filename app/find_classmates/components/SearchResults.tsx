"use client"

import { motion } from "framer-motion";
import { Search, Users } from "lucide-react";
import { User } from "@/redux/features/users/usersSlice";

interface SearchResultsProps {
  searchTerm: string;
  selectedUser: User | null;
  filteredUsers: User[];
  isSearching: boolean;
}

// Skeleton loader component
const ProfileSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden animate-pulse">
    <div className="bg-gradient-to-r from-primary-500 to-primary px-6 py-8">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 rounded-full bg-gray-300" />
        <div className="flex-1">
          <div className="h-7 bg-gray-300 rounded w-48 mb-2" />
          <div className="h-4 bg-gray-300 rounded w-32" />
        </div>
      </div>
    </div>
    <div className="p-6 space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-gray-200 rounded" />
          <div className="flex-1">
            <div className="h-3 bg-gray-200 rounded w-16 mb-1" />
            <div className="h-4 bg-gray-200 rounded w-40" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function SearchResults({
  searchTerm,
  selectedUser,
  filteredUsers,
  isSearching,
}: SearchResultsProps) {
  // No Results State
  if (searchTerm && filteredUsers.length === 0 && !isSearching) {
    return (
      <motion.div
        key="no-results"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center py-16"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
          <Search className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700">No results found</h3>
        <p className="text-gray-500 mt-1">Try adjusting your search term</p>
      </motion.div>
    );
  }

  // Empty State (initial state)
  if (!searchTerm && !selectedUser) {
    return (
      <motion.div
        key="empty"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center px-2 py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-4">
          <Users className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700">Find your classmates</h3>
        <p className="text-gray-500 mt-1 max-w-sm mx-auto">
          Search by name to connect with your fellow alumni
        </p>
      </motion.div>
    );
  }

  // Loading State
  if (isSearching) {
    return (
      <div className="space-y-4">
        <ProfileSkeleton />
      </div>
    );
  }

  // If we have a selected user or search results, return null
  // The parent component will handle rendering the UserProfile component
  return null;
}