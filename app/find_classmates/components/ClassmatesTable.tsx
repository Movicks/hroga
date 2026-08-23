"use client";

import { User } from "@/redux/features/users/usersSlice";
import Image from "next/image";

interface ClassmatesTableProps {
    users: User[];
    selectedYear: string;
    searchTerm: string;
    onUserSelect: (user: User) => void;
}

export default function ClassmatesTable({
    users,
    selectedYear,
    searchTerm,
    onUserSelect,
}: ClassmatesTableProps) {
    return (
        <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-primary border-b border-gray-200">
                        <tr className="text-white text-sm">
                            <th className="px-6 py-4 text-left font-medium uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-4 text-left font-medium uppercase tracking-wider">
                                Year Of Graduation
                            </th>
                            <th className="px-6 py-4 text-left font-medium uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                                    onClick={() => onUserSelect(user)}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 overflow-hidden flex-shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium text-sm">
                                                <Image
                                                    src={user?.image || ""}
                                                    alt={user?.firstName || ""}
                                                    width={40}
                                                    height={40}
                                                    className="w-full h-full bg-cover"
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {user?.firstName || ""}{" "}
                                                    {user?.middleName || ""}{" "}
                                                    {user?.lastName || ""}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {user.yearOfGraduation || "—"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onUserSelect(user);
                                            }}
                                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            View Profile
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                                    {searchTerm ? (
                                        `No classmates found matching "${searchTerm}"`
                                    ) : (
                                        `No classmates found for ${selectedYear}`
                                    )}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}