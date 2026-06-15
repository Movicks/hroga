'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/features/auth/authSlice';

interface ProfileProps {
  onClose?: () => void;
}

export default function Profile({ onClose }: ProfileProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'Admin User';
  const initials = [user?.firstName?.[0], user?.lastName?.[0]].filter(Boolean).join('') || 'AU';

  const handleProfileSettings = () => {
    setIsProfileOpen(false);
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
      <button
        type="button"
        // onClick={() => setIsProfileOpen((prev) => !prev)}
        onClick={handleProfileSettings}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-sm font-semibold">
            {initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{fullName}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">{user?.role || 'admin'}</p>
          </div>
        </div>

        {/* <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-sm font-semibold">
          {isProfileOpen ? '-' : '::'}
        </div> */}
      </button>

      {isProfileOpen && (
        <div className="mt-4 space-y-4 border-t border-white/10 pt-4">
          <div className="space-y-2 rounded-xl bg-white/5 p-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">Name</p>
              <p className="mt-1 text-sm text-white">{fullName}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">Email</p>
              <p className="mt-1 text-sm text-white/80">{user?.email || 'No email available'}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleProfileSettings}
            className="w-full rounded-xl border border-white/15 px-4 py-2 text-left text-white transition-colors hover:bg-white/10"
          >
            Profile settings
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-xl border border-red-300/40 px-4 py-2 text-left text-red-200 transition-colors hover:bg-white/10"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
