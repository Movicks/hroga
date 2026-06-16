'use client';

import { useState, useEffect } from 'react';
import {
  MoreHorizontal,
  Eye,
  UserX,
  UserCheck,
  Trash2,
  X,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  fetchUsers,
  suspendUser,
  unsuspendUser,
  deleteUser,
  clearUsersError,
  User,
} from '../../../redux/features/users/usersSlice';

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleViewProfile = (user: User) => {
    setViewingUser(user);
    setDropdownOpen(null);
  };

  const handleSuspend = async (userId: string) => {
    if (confirm('Are you sure you want to suspend this user?')) {
      await dispatch(suspendUser(userId));
    }
    setDropdownOpen(null);
  };

  const handleUnsuspend = async (userId: string) => {
    await dispatch(unsuspendUser(userId));
    setDropdownOpen(null);
  };

  const handleDelete = async (userId: string) => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      await dispatch(deleteUser(userId));
    }
    setDropdownOpen(null);
  };

  return (
    <section className="space-y-6">
      {/* <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Users
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          User Management
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Manage all registered users on the platform.
        </p>
      </div> */}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => dispatch(clearUsersError())}>
            <X size={18} />
          </button>
        </div>
      )}

      {/* Table Container */}
      <div className="rounded-t-xl border border-slate-200 bg-white overflow-hidden">
        <div className="">
          <table className="w-full text-left border-collapse">
            <thead className="bg-black text-white border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                  Graduation Year
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-3">
                          {user.firstName[0]}
                          {user.lastName[0]}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">
                            {user.firstName}{' '}
                            {user.middleName ? `${user.middleName} ` : ''}
                            {user.lastName}
                          </div>
                          <div className="text-xs text-slate-500">
                            {user.phoneNumber}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === 'admin'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {user.yearOfGraduation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.suspended
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {user.suspended ? 'Suspended' : 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium relative">
                      <button
                        onClick={() =>
                          setDropdownOpen(
                            dropdownOpen === user.id ? null : user.id
                          )
                        }
                        className="text-slate-500 hover:text-slate-700 transition-colors p-1 rounded-full hover:bg-slate-100"
                      >
                        <MoreHorizontal size={20}  className='rotate-90'/>
                      </button>
                      {/* Dropdown menu */}
                      {dropdownOpen === user.id && (
                        <div className="absolute right-4 top-0 z-100 mt-8 w-48 rounded-2xl bg-white shadow-xl border border-slate-200 z-10">
                          <div className="py-1">
                            <button
                              onClick={() => handleViewProfile(user)}
                              className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors"
                            >
                              <Eye size={16} />
                              View Profile
                            </button>
                            {user.suspended ? (
                              <button
                                onClick={() => handleUnsuspend(user.id)}
                                className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors"
                              >
                                <UserCheck size={16} />
                                Unsuspend User
                              </button>
                            ) : (
                              <button
                                onClick={() => handleSuspend(user.id)}
                                className="w-full text-left px-4 py-3 text-sm text-amber-700 hover:bg-amber-50 flex items-center gap-2 transition-colors"
                              >
                                <UserX size={16} />
                                Suspend User
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="w-full text-left px-4 py-3 text-sm text-red-700 hover:bg-red-50 flex items-center gap-2 transition-colors border-t border-slate-100"
                            >
                              <Trash2 size={16} />
                              Delete User
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Profile Modal */}
      {viewingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl relative">
            <button
              onClick={() => setViewingUser(null)}
              className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              User Profile
            </h2>
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="flex items-center gap-6">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold">
                  {viewingUser.firstName[0]}
                  {viewingUser.lastName[0]}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {viewingUser.firstName}{' '}
                    {viewingUser.middleName ? `${viewingUser.middleName} ` : ''}
                    {viewingUser.lastName}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        viewingUser.role === 'admin'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {viewingUser.role}
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        viewingUser.suspended
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {viewingUser.suspended ? 'Suspended' : 'Active'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
                  <p className="text-xs text-slate-500 mb-1">Email Address</p>
                  <p className="text-sm text-slate-800 font-medium">
                    {viewingUser.email}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
                  <p className="text-xs text-slate-500 mb-1">Phone Number</p>
                  <p className="text-sm text-slate-800 font-medium">
                    {viewingUser.phoneNumber}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
                  <p className="text-xs text-slate-500 mb-1">
                    Year of Graduation
                  </p>
                  <p className="text-sm text-slate-800 font-medium">
                    {viewingUser.yearOfGraduation}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
                  <p className="text-xs text-slate-500 mb-1">
                    Account Created
                  </p>
                  <p className="text-sm text-slate-800 font-medium">
                    {new Date(viewingUser.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Addresses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-xs text-slate-500 mb-3">Current Address</p>
                  <p className="text-sm text-slate-800">
                    {viewingUser.currentAddress.addressLine}
                    <br />
                    {viewingUser.currentAddress.city},{' '}
                    {viewingUser.currentAddress.state}
                    <br />
                    {viewingUser.currentAddress.country}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-xs text-slate-500 mb-3">Permanent Address</p>
                  <p className="text-sm text-slate-800">
                    {viewingUser.permanentAddress.addressLine}
                    <br />
                    {viewingUser.permanentAddress.city},{' '}
                    {viewingUser.permanentAddress.state}
                    <br />
                    {viewingUser.permanentAddress.country}
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
