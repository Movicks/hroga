import { User } from "@/redux/features/users/usersSlice";
import { useMemo, useState, useCallback } from "react";

export function useClassmatesFilter(
    users: User[],
    selectedYear: string,
    selectedUser: User | null,
    setSelectedUser: (user: User | null) => void
) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = useMemo(() => {
        let results = users;

        if (selectedYear) {
            results = results.filter(
                (user) => user.yearOfGraduation === selectedYear
            );
        }

        const query = searchTerm.trim().toLowerCase();
        if (query) {
            results = results.filter((user) => {
                const firstName = user.firstName?.toLowerCase() ?? "";
                const lastName = user.lastName?.toLowerCase() ?? "";
                const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.toLowerCase();
                return (
                    firstName.includes(query) ||
                    lastName.includes(query) ||
                    fullName.includes(query)
                );
            });
        }

        return results;
    }, [users, selectedYear, searchTerm]);

    const isSearching = searchTerm.trim().length > 0;

    const handleSearchChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setSearchTerm(value);
            if (selectedUser) {
                setSelectedUser(null);
            }
        },
        [selectedUser, setSelectedUser]
    );

    const handleClearSearch = useCallback(() => {
        setSearchTerm("");
        setSelectedUser(null);
    }, [setSelectedUser]);

    return {
        searchTerm,
        setSearchTerm,
        isSearching,
        filteredUsers,
        handleSearchChange,
        handleClearSearch,
    };
}