"use client"

import { User } from "@/redux/features/users/usersSlice";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  Briefcase, 
  Link2, 
  GraduationCap,
  ChevronLeft 
} from "lucide-react";

interface UserProfileProps {
  user: User;
  onBack: () => void;
  getInitials: (user: User) => string;
  formatPlatform: (platform: string) => string;
}

export default function UserProfile({
  user,
  onBack,
  getInitials,
  formatPlatform,
}: UserProfileProps) {
  return (
    <motion.div
      key="profile"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-primary/10 rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      {/* Profile Header */}
      <div className="w-full bg-gradient-to-r from-primary to-primary px-2 py-4 relative overflow-hidden">
        {/* <div className="absolute inset-0 bg-black/5" /> */}
        <div className="relative flex flex-col md:flex-row items-center md:space-x-5">
          {user.image ? (
            <img
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-24 h-24 rounded-full object-cover border-4 border-white/80 shadow-xl"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm 
              flex items-center justify-center text-3xl font-bold text-white
              border-4 border-white/80 shadow-xl">
              {getInitials(user)}
            </div>
          )}
          <div className="text-white space-y-2 mt-2">
            <h2 className="text-xl md:text-2xl font-bold text-center md:text-start">
              {user.firstName} {user.middleName && `${user.middleName} `}{user.lastName}
            </h2>
            <div className="flex items-center space-x-3 mt-1">
              {user.yearOfGraduation && (
                <span className="flex items-center text-blue-100 text-xs md:text-sm bg-white/10 px-3 py-1 rounded-full">
                  <GraduationCap className="w-4 h-4 mr-1.5" />
                  Class of {user.yearOfGraduation}
                </span>
              )}
              {user.currentOccupation && (
                <span className="flex items-center text-blue-100 text-xs md:text-sm bg-white/10 px-3 py-1 rounded-full">
                  <Briefcase className="w-4 h-4 mr-1.5" />
                  {user.currentOccupation}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="px-3 py-6 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Email */}
          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-sm">
            <Mail className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email</p>
              <a href={`mailto:${user.email}`} className="text-sm text-gray-800 truncate">{user.email} <span className="ml-1.5 text-gray-400 group-hover:text-primary">↗</span></a>
            </div>
          </div>

          {/* Phone */}
          {user.phoneNumber && (
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-sm">
              <Phone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</p>
                <a href={`tel:${user.phoneNumber}`} className="text-sm text-gray-800 truncate">{user.phoneNumber} <span className="ml-1.5 text-gray-400 group-hover:text-primary">↗</span></a>
              </div>
            </div>
          )}

          {/* Occupation */}
          {user.currentOccupation && (
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-sm">
              <Briefcase className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Occupation</p>
                <p className="text-sm text-gray-800">
                  {user.jobTitle && `${user.jobTitle}`}
                  {user.organisation && ` at ${user.organisation}`}
                  {!user.jobTitle && user.currentOccupation}
                </p>
              </div>
            </div>
          )}

          {/* Social Media */}
          {user.socialMedia && Object.keys(user.socialMedia).length > 0 && (
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-sm md:col-span-2">
              <Link2 className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Connect</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {Object.entries(user.socialMedia).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1.5 bg-primary/10 text-primary border border-primary/30 
                        hover:border-blue-500 hover:bg-blue-50 rounded-full text-xs 
                        text-gray-700 transition-all duration-200 group"
                    >
                      {formatPlatform(platform)}
                      <span className="ml-1.5 text-gray-400 group-hover:text-primary">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Bio */}
          {user.yourStory && (
            <div className="md:col-span-2">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-sm">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">About</p>
                <p className="text-sm text-gray-700 leading-relaxed">{user.yourStory}</p>
              </div>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-6 pt-4 border-t border-primary/30 flex justify-between items-center">
          <button
            onClick={onBack}
            className="inline-flex items-center text-sm text-primary hover:text-blue-400 
              font-medium transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-0.5 transition-transform" />
            Back to search
          </button>
          {/* <button className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            Report
          </button> */}
        </div>
      </div>
    </motion.div>
  );
}