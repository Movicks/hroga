'use client';

import { useAppSelector } from '../../redux/hooks';

export default function AlumniDashboardPage() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Alumni Dashboard</h1>
      <p className="text-lg">Welcome, {user?.firstName} {user?.lastName}!</p>
    </div>
  );
}
