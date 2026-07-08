'use client';

import { usePathname } from 'next/navigation';
import { useAppSelector } from '../../redux/hooks';
import Searchbar from '../reusables/Searchbar';
import Notifications from '../reusables/Notifications';

interface AdminLayoutTopbarProps {
  onMenuClick: () => void;
}

export default function AdminLayoutTopbar({ onMenuClick }: AdminLayoutTopbarProps) {
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth);

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'Admin User';
  const initials = [user?.firstName?.[0], user?.lastName?.[0]].filter(Boolean).join('') || 'AU';

  const routeMeta: Record<string, { label: string; title: string }> = {
    '/admin': { label: 'Admin dashboard', title: `Welcome back, ${user?.firstName || 'Admin'}` },
    '/admin/activities': { label: 'Activities', title: 'Manage activities' },
    '/admin/gallery': { label: 'Gallery', title: 'Gallery management' },
    '/admin/upcomingevents': { label: 'Events', title: ' Upcoming Event Management' },
    '/admin/users': { label: 'All Users', title: 'Manage all registered users on the platform.' },
    '/admin/contact_messages': { label: 'Inbox', title: 'Manage all contact requests.' },
    '/admin/donations': {label: 'All Donations', title: 'Manage all donations.'},
    '/admin/audits': { label: 'Audits', title: 'Manage all audit logs.' },
  };

  const currentRoute = routeMeta[pathname] || {
    label: 'Admin dashboard',
    title:
      pathname
        .split('/')
        .filter(Boolean)
        .pop()
        ?.replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase()) || 'Dashboard',
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open sidebar"
              onClick={onMenuClick}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
            >
              <span className="flex flex-col gap-1.5">
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
              </span>
            </button>

            <div className='hidden lg:flex flex-col w-full lg:min-w-[20rem]'>
              <p className="text-xl font-semibold text-slate-900">{currentRoute.label}</p>
              <h1 className="text-sm font-medium text-slate-500">{currentRoute.title}</h1>
            </div>
          </div>
          
          <div className="flex gap-4 items-center justify-end lg:gap-6 w-full max-w-[40rem]">
            <Searchbar />
            <Notifications/>
          </div>
        </div>

      </div>
    </header>
  );
}
