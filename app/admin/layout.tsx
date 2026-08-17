'use client';

import { useState } from 'react';
import ProtectedRoute from '../../authGuard/ProtectedRoute';
import AdminNavbar from '../../components/sidebars/AdminNavbar';
import AdminLayoutTopbar from '../../components/topbars/AdminLayoutTopbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen bg-slate-50">
        <AdminNavbar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="flex min-h-screen flex-col lg:pl-72 w-full">
          <AdminLayoutTopbar onMenuClick={() => setIsSidebarOpen(true)} />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 w-full">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
