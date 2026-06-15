'use client';

import ProtectedRoute from '../../authGuard/ProtectedRoute';
import AlumniSidebar from '../../components/sidebars/AlumniSidebar';

export default function AlumniLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['alumni']}>
      <div className="flex">
        <AlumniSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
