'use client';

import { usePathname } from 'next/navigation';
import { useAppSelector } from '../../redux/hooks';
import Searchbar from '../reusables/Searchbar';

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
          
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between gap-6 w-full max-w-[40rem]">
            <Searchbar />

            <div className="hidden min-w-[15rem] md:flex items-center justify-start gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:justify-end">
                <div className="flex items-center gap-3 w-full">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                        {initials}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-900">{fullName}</p>
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{user?.role || 'admin'}</p>
                    </div>
                </div>
            </div>
          </div>
          
          {/* <div className="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              Export
            </button>
            <button
              type="button"
              className="rounded-2xl bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              New Update
            </button>
          </div> */}
        </div>

        
        
      </div>
    </header>
  );
}
