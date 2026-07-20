"use client"

import { fetchUsers, User } from "@/redux/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
// import { User } from "@/types/user"; // Adjust import based on your User type

export default function FindClassmatesPage() {
    const dispatch = useAppDispatch();
    const { users, loading, error } = useAppSelector((state) => state.users);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredUsers([]);
            setSelectedUser(null);
            return;
        }

        const searchLower = searchTerm.toLowerCase();
        const results = users.filter((user) => {
            const fullName = `${user.firstName} ${user.middleName || ""} ${user.lastName}`.toLowerCase();
            return fullName.includes(searchLower) || 
                   user.firstName.toLowerCase().includes(searchLower) ||
                   user.lastName.toLowerCase().includes(searchLower);
        });
        setFilteredUsers(results);
        
        // Auto-select first result if exact match or single result
        if (results.length === 1) {
            setSelectedUser(results[0]);
        } else {
            setSelectedUser(null);
        }
    }, [searchTerm, users]);

    const handleUserSelect = (user: User) => {
        setSelectedUser(user);
        setSearchTerm(`${user.firstName} ${user.lastName}`);
        setFilteredUsers([]);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    Error: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
                Find Classmates
            </h1>

            {/* Search Bar */}
            <div className="relative mb-8">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    />
                    <svg
                        className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    {searchTerm && (
                        <button
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedUser(null);
                                setFilteredUsers([]);
                            }}
                            className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* Search Suggestions */}
                {filteredUsers.length > 0 && !selectedUser && (
                    <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto z-10">
                        {filteredUsers.map((user) => (
                            <button
                                key={user.id}
                                onClick={() => handleUserSelect(user)}
                                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                            >
                                <div className="font-medium text-gray-800">
                                    {user.firstName} {user.middleName && `${user.middleName} `}{user.lastName}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {user.email}
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Selected User Profile */}
            {selectedUser ? (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8">
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-blue-600 shadow-lg">
                                {selectedUser.firstName[0]}
                                {selectedUser.lastName[0]}
                            </div>
                            <div className="text-white">
                                <h2 className="text-2xl font-bold">
                                    {selectedUser.firstName} {selectedUser.middleName && `${selectedUser.middleName} `}{selectedUser.lastName}
                                </h2>
                                <p className="text-blue-100 text-sm">Classmate</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start space-x-3">
                                <svg className="w-5 h-5 text-gray-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="text-gray-800 font-medium">{selectedUser.email}</p>
                                </div>
                            </div>

                            {selectedUser.phoneNumber && (
                                <div className="flex items-start space-x-3">
                                    <svg className="w-5 h-5 text-gray-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p className="text-gray-800 font-medium">{selectedUser.phoneNumber}</p>
                                    </div>
                                </div>
                            )}

                            {selectedUser.socialMedia && (
                                <div className="col-span-1 md:col-span-2 flex items-start space-x-3">
                                    <svg className="w-5 h-5 text-gray-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                    <div>
                                        <p className="text-sm text-gray-500">Social Media</p>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {Object.entries(selectedUser.socialMedia).map(([platform, url]) => (
                                                <a
                                                    key={platform}
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                                                >
                                                    {platform}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                        <button
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedUser(null);
                                setFilteredUsers([]);
                            }}
                            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        >
                            ← Back to search
                        </button>
                    </div>
                </div>
            ) : searchTerm && filteredUsers.length === 0 ? (
                <div className="text-center py-12">
                    <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-700">No users found</h3>
                    <p className="mt-1 text-gray-500">Try adjusting your search term</p>
                </div>
            ) : !searchTerm && !selectedUser ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-700">Search for classmates</h3>
                    <p className="mt-1 text-gray-500">Type a name to find your classmates</p>
                </div>
            ) : null}
        </div>
    );
}