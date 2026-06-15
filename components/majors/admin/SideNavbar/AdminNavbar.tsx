'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Profile from '@/components/reusables/Profile';
import Divider from '@/components/reusables/Divider';

interface AdminNavbarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Activities', href: '/admin/activities' },
  { name: 'Gallery', href: '/admin/gallery' },
];

export default function AdminNavbar({ isOpen, onClose }: AdminNavbarProps) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-slate-950 px-5 py-6 text-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">HROGA</p>
            <h2 className="mt-2 text-2xl font-semibold">Admin Panel</h2>
          </div>

          <button
            type="button"
            aria-label="Close sidebar"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-300 lg:hidden"
          >
            x
          </button>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4 ">
          <p className="text-sm font-medium text-slate-100">Your Workspace</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Manage activities, gallery content, and other admin sections from one place.
          </p>
        </div>

        <Divider />

        <nav className="mt-4 flex flex-1 flex-col gap-2">
          {navItems.map((item) => {
            const isActive =
              item.href === '/admin' ? pathname === item.href : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`rounded-r-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-white shadow-r-lg'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <Profile onClose={onClose} />
      </aside>
    </>
  );
}
