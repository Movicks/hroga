import { useEffect, useState } from "react";
import { User } from "@/redux/features/users/usersSlice";

// Custom debounce hook
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Get initials for avatar
export function getInitials(user: User): string {
  return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
}

// Format social media platform name
export function formatPlatform(platform: string): string {
  return platform.charAt(0).toUpperCase() + platform.slice(1);
}

// Client-side filtering function
export function filterUsers(users: User[], searchTerm: string): User[] {
  if (!searchTerm.trim()) {
    return [];
  }

  const searchLower = searchTerm.toLowerCase();
  return users.filter((user) => {
    const fullName = `${user.firstName} ${user.middleName || ""} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchLower) || 
           user.firstName.toLowerCase().includes(searchLower) ||
           user.lastName.toLowerCase().includes(searchLower);
  });
}