'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { fetchUser, changeUserRole, User } from '../../../../redux/features/users/usersSlice';
import { ArrowLeft, X, Edit } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu';
import Image from 'next/image';
import Loader from '@/components/reusables/Loader';

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedUser: user, selectedUserLoading: loading, selectedUserError: error } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchUser(params.id as string));
    }
  }, [dispatch, params.id]);

  const handleChangeUserRole = async (userId: string, role: 'admin' | 'alumni') => {
    if (confirm(`Are you sure you want to change this user's role to ${role}?`)) {
      await dispatch(changeUserRole({ userId, role }));
    }
  };

  return (
    <section className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => router.push('/admin/users')}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back to Users</span>
      </button>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => {}}>
            <X size={18} />
          </button>
        </div>
      )}

      {loading ? (
        <Loader loadTitle='Loading user profile'/>
      ) : !user ? (
        <div className="py-12 text-center text-slate-500">User not found</div>
      ) : (
        <div className="bg-[#E3EFFC] rounded-lg p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-6">
              <div className="h-24 w-24 rounded-full bg-[#6393f6]/10 border-3 border-[#6393f6] p-1 flex items-center justify-center text-[#6393f6] text-3xl font-bold">
                <Image src={user.image || 'https://plus.unsplash.com/premium_photo-1683972509783-da5a74795bb3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8'}
                  alt={user.firstName[0] + user.lastName[0]}
                  width={48} height={48}
                  className="rounded-full w-full h-full bg-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1E3A8A]">
                  {user.firstName}{' '}
                  {user.middleName ? `${user.middleName} ` : ''}
                  {user.lastName}
                  {user.maidenName ? ` (${user.maidenName})` : ''}
                </h2>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {user.role}
                  </span>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      user.suspended
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {user.suspended ? 'Suspended' : 'Active'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-6 py-2 bg-[#6393f6] text-white rounded-full hover:bg-[#6393f6]/90 transition-colors shadow-sm">
                    <Edit size={18} />
                    Edit Role
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44 bg-white rounded-lg shadow-xl border border-[#E5E7EB]">
                  <DropdownMenuItem 
                    onClick={() => handleChangeUserRole(user.id, 'admin')}
                    disabled={user.role === 'admin'}
                    className="cursor-pointer hover:bg-[#F2F7FC] rounded-lg mx-1 my-1"
                  >
                    <span className={user.role === 'admin' ? 'opacity-50' : ''}>
                      Admin
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleChangeUserRole(user.id, 'alumni')}
                    disabled={user.role === 'alumni'}
                    className="cursor-pointer hover:bg-[#F2F7FC] rounded-lg mx-1 my-1"
                  >
                    <span className={user.role === 'alumni' ? 'opacity-50' : ''}>
                      Alumni
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-[#F2F7FC] rounded-lg p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg md:text-xl font-semibold text-[#6393f6]">Personal Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.dateOfBirth && (
                  <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                    <p className="text-xs text-gray-500 mb-1">Date of Birth</p>
                    <p className="text-sm text-[#4B5563] font-medium">{user.dateOfBirth}</p>
                  </div>
                )}
                {user.gender && (
                  <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                    <p className="text-xs text-gray-500 mb-1">Gender</p>
                    <p className="text-sm text-[#4B5563] font-medium">{user.gender}</p>
                  </div>
                )}
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                  <p className="text-xs text-gray-500 mb-1">Email Address</p>
                  <p className="text-sm text-[#4B5563] font-medium">{user.email}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                  <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                  <p className="text-sm text-[#4B5563] font-medium">{user.phoneNumber}</p>
                </div>
                {user.whatsappNumber && (
                  <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                    <p className="text-xs text-gray-500 mb-1">WhatsApp Number</p>
                    <p className="text-sm text-[#4B5563] font-medium">{user.whatsappNumber}</p>
                  </div>
                )}
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                  <p className="text-xs text-gray-500 mb-1">Country</p>
                  <p className="text-sm text-[#4B5563] font-medium">{user.country}</p>
                </div>
                {user.stateCity && (
                  <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                    <p className="text-xs text-gray-500 mb-1">State/City</p>
                    <p className="text-sm text-[#4B5563] font-medium">{user.stateCity}</p>
                  </div>
                )}
                {user.homeAddress && (
                  <div className="bg-white rounded-lg p-4 border border-[#E5E7EB] lg:col-span-2">
                    <p className="text-xs text-gray-500 mb-1">Home Address</p>
                    <p className="text-sm text-[#4B5563] font-medium">{user.homeAddress}</p>
                  </div>
                )}
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                  <p className="text-xs text-gray-500 mb-1">Year of Graduation</p>
                  <p className="text-sm text-[#4B5563] font-medium">{user.yearOfGraduation}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                  <p className="text-xs text-gray-500 mb-1">Account Created</p>
                  <p className="text-sm text-[#4B5563] font-medium">
                    {user.createdAt 
                      ? new Date(user.createdAt).toLocaleString() 
                      : 'Not available'}
                  </p>
                </div>
              </div>
            </div>

            {/* School Details */}
            <div className="bg-[#F2F7FC] rounded-lg p-6 space-y-6">
              <h3 className="text-lg md:text-xl font-semibold text-[#6393f6]">School Details</h3>
              <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                <h4 className="text-md font-semibold text-[#4B5563] mb-4">Your Class</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.entryYear && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Entry Year</p>
                      <p className="text-sm text-[#4B5563]">{user.entryYear}</p>
                    </div>
                  )}
                  {user.house && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">House / Dormitory</p>
                      <p className="text-sm text-[#4B5563]">{user.house}</p>
                    </div>
                  )}
                  {user.classArm && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Class / Arm</p>
                      <p className="text-sm text-[#4B5563]">{user.classArm}</p>
                    </div>
                  )}
                  {user.formTeacher && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Form Teacher</p>
                      <p className="text-sm text-[#4B5563]">{user.formTeacher}</p>
                    </div>
                  )}
                  {user.positionsHeld && (
                    <div className="md:col-span-2">
                      <p className="text-xs text-gray-500 mb-1">Positions Held</p>
                      <p className="text-sm text-[#4B5563]">{user.positionsHeld}</p>
                    </div>
                  )}
                  {user.clubsSocieties && (
                    <div className="md:col-span-2">
                      <p className="text-xs text-gray-500 mb-1">Clubs & Societies</p>
                      <p className="text-sm text-[#4B5563]">{user.clubsSocieties}</p>
                    </div>
                  )}
                </div>
              </div>
              {user.favoriteMemory && (
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                  <p className="text-xs text-gray-500 mb-1">Favorite School Memory</p>
                  <p className="text-sm text-[#4B5563]">{user.favoriteMemory}</p>
                </div>
              )}
              {user.classmates && (
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                  <p className="text-xs text-gray-500 mb-1">Classmates You Remember</p>
                  <p className="text-sm text-[#4B5563]">{user.classmates}</p>
                </div>
              )}
            </div>

            {/* Life After School */}
            {(user.currentOccupation || user.jobTitle || user.organisation || user.industry || user.highestQualification || user.institutionAttended || user.maritalStatus) && (
              <div className="bg-[#F2F7FC] rounded-lg p-6 space-y-6">
                <h3 className="text-lg md:text-xl font-semibold text-[#6393f6]">Life After School</h3>
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user.currentOccupation && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Current Occupation</p>
                        <p className="text-sm text-[#4B5563]">{user.currentOccupation}</p>
                      </div>
                    )}
                    {user.jobTitle && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Job Title</p>
                        <p className="text-sm text-[#4B5563]">{user.jobTitle}</p>
                      </div>
                    )}
                    {user.organisation && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Organisation</p>
                        <p className="text-sm text-[#4B5563]">{user.organisation}</p>
                      </div>
                    )}
                    {user.industry && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Industry</p>
                        <p className="text-sm text-[#4B5563]">{user.industry}</p>
                      </div>
                    )}
                    {user.highestQualification && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Highest Qualification</p>
                        <p className="text-sm text-[#4B5563]">{user.highestQualification}</p>
                      </div>
                    )}
                    {user.institutionAttended && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Institution Attended</p>
                        <p className="text-sm text-[#4B5563]">{user.institutionAttended}</p>
                      </div>
                    )}
                    {user.maritalStatus && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Marital Status</p>
                        <p className="text-sm text-[#4B5563]">{user.maritalStatus}</p>
                      </div>
                    )}
                    {user.spouseName && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Spouse Name</p>
                        <p className="text-sm text-[#4B5563]">{user.spouseName}</p>
                      </div>
                    )}
                    {user.numberOfChildren && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Number of Children</p>
                        <p className="text-sm text-[#4B5563]">{user.numberOfChildren}</p>
                      </div>
                    )}
                    {user.numberOfGrandchildren && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Number of Grandchildren</p>
                        <p className="text-sm text-[#4B5563]">{user.numberOfGrandchildren}</p>
                      </div>
                    )}
                  </div>
                  {user.yourStory && (
                    <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                      <p className="text-xs text-gray-500 mb-1">Your Story</p>
                      <p className="text-sm text-[#4B5563]">{user.yourStory}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Involvement & Notifications */}
            {(user.involvement || user.notifications || user.howHeard || user.referralName) && (
              <div className="bg-[#F2F7FC] rounded-lg p-6 space-y-6">
                <h3 className="text-lg md:text-xl font-semibold text-[#6393f6]">Involvement & Notifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.involvement && (
                    <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                      <p className="text-xs text-gray-500 mb-2">Get Involved</p>
                      <div className="space-y-1">
                        {Object.entries(user.involvement).map(([key, value]) => (
                          value && (
                            <p key={key} className="text-sm text-[#4B5563]">
                              • {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </p>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                  {user.notifications && (
                    <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                      <p className="text-xs text-gray-500 mb-2">Notifications</p>
                      <div className="space-y-1">
                        {Object.entries(user.notifications).map(([key, value]) => (
                          value && (
                            <p key={key} className="text-sm text-[#4B5563]">
                              • {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </p>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {user.howHeard && (
                  <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                    <p className="text-xs text-gray-500 mb-1">How Did You Hear About Us?</p>
                    <p className="text-sm text-[#4B5563]">{user.howHeard}</p>
                  </div>
                )}
                {user.referralName && (
                  <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                    <p className="text-xs text-gray-500 mb-1">Referral Name</p>
                    <p className="text-sm text-[#4B5563]">{user.referralName}</p>
                  </div>
                )}
              </div>
            )}

            {/* Addresses */}
            <div className="bg-[#F2F7FC] rounded-lg p-6 space-y-6">
              <h3 className="text-lg md:text-xl font-semibold text-[#6393f6]">Addresses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                  <p className="text-xs text-gray-500 mb-3">Current Address</p>
                  <p className="text-sm text-[#4B5563]">
                    {user.currentAddress.addressLine}
                    <br />
                    {user.currentAddress.city},{' '}
                    {user.currentAddress.state}
                    <br />
                    {user.currentAddress.country}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                  <p className="text-xs text-gray-500 mb-3">Permanent Address</p>
                  <p className="text-sm text-[#4B5563]">
                    {user.permanentAddress.addressLine}
                    <br />
                    {user.permanentAddress.city},{' '}
                    {user.permanentAddress.state}
                    <br />
                    {user.permanentAddress.country}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}