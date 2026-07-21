"use client"

import { searchUsers, fetchUsersPublicly, User } from "@/redux/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import HomeTopbar from "@/components/topbars/HomeTopbar";
import Loader from "@/components/reusables/Loader";
import SearchBar from "./components/SearchBar";
import UserProfile from "./components/UserProfile";
import SearchResults from "./components/SearchResults";
import { useDebounce, getInitials, formatPlatform, filterUsers } from "./components/utils";
import ItalicTitle from "@/components/reusables/ItalicTitle";

export default function FindClassmatesPage() {
    const dispatch = useAppDispatch();
    const { users, loading, error } = useAppSelector((state) => state.users);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    // Load all users initially
    useEffect(() => {
        dispatch(fetchUsersPublicly());
    }, [dispatch]);

    // Effect for debounced search
    useEffect(() => {
        const performSearch = async () => {
            if (debouncedSearchTerm.trim() === "") {
                dispatch(fetchUsersPublicly());
            } else {
                dispatch(searchUsers(debouncedSearchTerm));
            }
            setIsSearching(false);
        };

        performSearch();
    }, [debouncedSearchTerm, dispatch]);

    // Client-side filtering with highlighting
    useEffect(() => {
        const results = filterUsers(users, searchTerm);
        setFilteredUsers(results.slice(0, 8)); // Limit results
    }, [searchTerm, users]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        setIsSearching(true);
        if (selectedUser) setSelectedUser(null);
    };

    const handleUserSelect = (user: User) => {
        setSelectedUser(user);
        setSearchTerm(`${user.firstName} ${user.lastName}`);
        setFilteredUsers([]);
        setIsFocused(false);
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        setSelectedUser(null);
        setFilteredUsers([]);
        dispatch(fetchUsersPublicly());
    };

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setTimeout(() => setIsFocused(false), 200);

    if (loading && !isSearching) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center">
                <div className="text-center flex flex-col items-center justify-center h-screen">
                    <Loader loadTitle="Loading classmates"/>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center p-4">
                <div className="bg-red-50 border border-red-200 rounded-xl px-6 py-4 max-w-md w-full">
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-red-800">Error loading users</p>
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
            <HomeTopbar />
            <div className="container mx-auto px-4 pt-25 md:pt-40 pb-8 max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                Find <ItalicTitle title="Classmates" />
                            </h1>
                            <div className="text-gray-500 mt-1 flex items-center">
                                <p className="mt-4 text-lg text-gray-600 max-w-2xl leading-relaxed">
                                    Reconnect with old friends and expand your professional network. 
                                    Search for classmates by name and discover where life has taken them.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <SearchBar
                    searchTerm={searchTerm}
                    isFocused={isFocused}
                    isSearching={isSearching}
                    filteredUsers={filteredUsers}
                    selectedUser={selectedUser}
                    onSearchChange={handleSearchChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onClearSearch={handleClearSearch}
                    onUserSelect={handleUserSelect}
                    getInitials={getInitials}
                />

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    {selectedUser ? (
                        <UserProfile
                            user={selectedUser}
                            onBack={handleClearSearch}
                            getInitials={getInitials}
                            formatPlatform={formatPlatform}
                        />
                    ) : (
                        <SearchResults
                            searchTerm={searchTerm}
                            selectedUser={selectedUser}
                            filteredUsers={filteredUsers}
                            isSearching={isSearching}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}