'use client';

import { useEffect } from 'react';
import {
  MoreHorizontal,
  Eye,
  UserX,
  UserCheck,
  Trash2,
  X,
  Edit,
  ChevronRight,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  fetchUsers,
  suspendUser,
  unsuspendUser,
  deleteUser,
  clearUsersError,
  changeUserRole,
  User,
} from '../../../redux/features/users/usersSlice';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '../../../components/ui/dropdown-menu';
import Loader from '@/components/reusables/Loader';

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { users, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleViewProfile = (user: User) => {
    router.push(`/admin/users/${user.id}`);
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

  const handleChangeUserRole = async (userId: string, role: 'admin' | 'alumni') => {
    if (confirm(`Are you sure you want to change this user's role to ${role}?`)) {
      await dispatch(changeUserRole({ userId, role }));
    }
  };

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
                  <Loader loadTitle='Loading users'/>
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
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit user role
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent align="end" className="w-44">
                            <DropdownMenuItem 
                              onClick={() => handleChangeUserRole(user.id, 'admin')}
                              disabled={user.role === 'admin'}
                            >
                              <span className={user.role === 'admin' ? 'opacity-50' : ''}>
                                Admin
                              </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleChangeUserRole(user.id, 'alumni')}
                              disabled={user.role === 'alumni'}
                            >
                              <span className={user.role === 'alumni' ? 'opacity-50' : ''}>
                                Alumni
                              </span>
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
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
    </section>
  );
}
