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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);
  const [viewingUser, setViewingUser] = useState<User | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleViewProfile = (user: User) => {
    setViewingUser(user);
  };

  const handleSuspend = async (userId: string) => {
    if (confirm('Are you sure you want to suspend this user?')) {
      await dispatch(suspendUser(userId));
    }
  };

  const handleUnsuspend = async (userId: string) => {
    await dispatch(unsuspendUser(userId));
  };

  const handleDelete = async (userId: string) => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      await dispatch(deleteUser(userId));
    }
    };
    
    console.log(new Date(viewingUser?.createdAt || '').toLocaleString())

  return (
    <section className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => dispatch(clearUsersError())}>
            <X size={18} />
          </button>
        </div>
      )}

      {/* Table Container */}
      <div className="rounded-t-xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#020618] text-white border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-white uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-white uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-white uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-white uppercase tracking-wider">
                Graduation Year
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-white uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-white uppercase tracking-wider">
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="text-slate-500 hover:text-slate-700 transition-colors p-1 rounded-full hover:bg-slate-100">
                          <MoreHorizontal size={20} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 bg-white">
                        <DropdownMenuItem onClick={() => handleViewProfile(user)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        {user.suspended ? (
                          <DropdownMenuItem onClick={() => handleUnsuspend(user.id)}>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Unsuspend User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleSuspend(user.id)}>
                            <UserX className="mr-2 h-4 w-4" />
                            Suspend User
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(user.id)} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
                    {viewingUser.createdAt 
                      ? new Date(viewingUser.createdAt).toLocaleString() 
                      : 'Not available'}
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
