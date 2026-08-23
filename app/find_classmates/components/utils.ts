import { User } from "@/redux/features/users/usersSlice";

export function getInitials(user: User): string {
    if (!user) return "";
    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();
    if (!name) return "";
    return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

export function formatPlatform(platform: string): string {
    const platforms: Record<string, string> = {
        github: "GitHub",
        linkedin: "LinkedIn",
        twitter: "Twitter",
        facebook: "Facebook",
        instagram: "Instagram",
        youtube: "YouTube",
        website: "Website",
    };
    return platforms[platform.toLowerCase()] || platform;
}