'use client';

import Link from 'next/link';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/features/auth/authSlice';

export default function AlumniSidebar() {
  const dispatch = useAppDispatch();

  return (
    <div className="w-64 bg-secondary text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Alumni Portal</h2>
      <nav className="space-y-2">
        <Link href="/alumni" className="block py-2 px-4 rounded hover:bg-darkNavy">
          Dashboard
        </Link>
        <Link href="/alumni/profile" className="block py-2 px-4 rounded hover:bg-darkNavy">
          My Profile
        </Link>
      </nav>
      <button
        onClick={() => dispatch(logout())}
        className="mt-auto mt-8 w-full text-left py-2 px-4 text-red-300 hover:bg-darkNavy rounded"
      >
        Logout
      </button>
    </div>
  );
}
