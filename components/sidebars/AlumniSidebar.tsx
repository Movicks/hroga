'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CreditCard, HandHeart, House, Settings, X } from 'lucide-react';

import Divider from '../reusables/Divider';
import Profile from '../reusables/Profile';

interface AlumniSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { name: 'Dashboard', href: '/alumni', icon: House },
  { name: 'My Donations', href: '/alumni/my_donate', icon: CreditCard },
  { name: 'Profile Settings', href: '/alumni/profile-setting', icon: Settings },
  { name: 'Make A Donation', href: '/donate', icon: HandHeart },
];

export default function AlumniSidebar({ isOpen, onClose }: AlumniSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-[var(--darkNavy)] transition-opacity duration-300 lg:hidden ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-[var(--darkNavy)] px-5 py-6 text-white shadow-md transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-300">HROGA</p>
            <h2 className="mt-2 text-2xl font-semibold">Alumni Portal</h2>
          </div>

          <button
            type="button"
            aria-label="Close sidebar"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
          <p className="text-sm font-medium text-slate-50">Your Community Hub</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Track your giving, keep your profile updated, and stay connected to the HROGA network.
          </p>
        </div>

        <Divider />

        <nav className="mt-4 flex flex-1 flex-col gap-2">
          {navItems.map((item) => {
            const isActive =
              item.href === '/alumni' ? pathname === item.href : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <Profile onClose={onClose} />
      </aside>
    </>
  );
}
