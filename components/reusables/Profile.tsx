'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/features/auth/authSlice';
import { Settings } from 'lucide-react';

interface ProfileProps {
  onClose?: () => void;
}

export default function Profile({ onClose }: ProfileProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  // const [isProfileOpen, setIsProfileOpen] = useState(false);

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'Admin User';
  const initials = [user?.firstName?.[0], user?.lastName?.[0]].filter(Boolean).join('') || 'AU';

  const handleProfileSettings = () => {
    // setIsProfileOpen(false);
    onClose?.();

    if (pathname.startsWith('/admin') || user?.role === 'admin') {
      router.push('/admin/profile-setting');
      return;
    }

    if (pathname.startsWith('/alumni') || user?.role === 'alumni') {
      router.push('/alumni/profile-setting');
      return;
    }

    router.push('/profile-setting');
  };

  const handleLogout = () => {
    dispatch(logout());
    onClose?.();
  };

  return (
    <div className="mt-6 rounded-lg border border-slate-800 bg-slate-900/70 p-4">
      <div
        className="flex flex-col justify-between w-full items-center justify-between gap-3 text-left"
      >
        <div className="flex items-center justify-between gap-3 w-full">
          {/* <div className="avatar">{initials}</div> */}
          <div className="flex-1 min-w-0 w-full">
            <p className='text-sm'>{fullName}</p>
            <p className='text-sm text-gray-400'>{user?.role}</p>
          </div>
          <button onClick={handleProfileSettings} aria-label="Profile settings" className="text-white p-2 border rounded-lg">
            <Settings className="w-5 h-5" />
          </button>
        </div>
        <hr className='border border-slate-700 w-full' />
        <button onClick={handleLogout} className='border border-red-400 w-full py-1 rounded-md text-red-400 mt-2'>Log out</button>
      </div>
    </div>
  );
}
