'use client';

import { useState } from 'react';
import { BellDotIcon } from 'lucide-react';

import ProtectedRoute from '../../authGuard/ProtectedRoute';
import AlumniSidebar from '../../components/sidebars/AlumniSidebar';
import Searchbar from '../../components/reusables/Searchbar';

export default function AlumniLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ProtectedRoute allowedRoles={['alumni']}>
      <div className="min-h-screen bg-slate-50">
        <AlumniSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="flex min-h-screen flex-col lg:pl-72">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Open sidebar"
                    onClick={() => setIsSidebarOpen(true)}
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
                  >
                    <span className="flex flex-col gap-1.5">
                      <span className="block h-0.5 w-5 bg-current" />
                      <span className="block h-0.5 w-5 bg-current" />
                      <span className="block h-0.5 w-5 bg-current" />
                    </span>
                  </button>

                  <div className="flex flex-col hidden lg:block">
                    <p className="text-xl font-semibold text-slate-900">Alumni dashboard</p>
                    <h1 className="text-sm font-medium text-slate-500">
                      Stay connected, track your impact, and manage your profile.
                    </h1>
                  </div>
                </div>

                <div className="flex w-full max-w-[40rem] items-center justify-end gap-4 lg:gap-6">
                  <Searchbar />
                  <button className="relative flex h-12 min-w-13 items-center justify-center rounded-xl border border-slate-200 bg-black text-white shadow-sm">
                    <BellDotIcon size={28} />
                    <span className="absolute right-0 top-0 flex h-4 min-w-7 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-medium">
                      3
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
