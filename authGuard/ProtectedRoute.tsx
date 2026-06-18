'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchCurrentUser, initializeAuth } from '../redux/features/auth/authSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'alumni')[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isHydrated, setIsHydrated] = useState(false);
  const { isAuthenticated, user, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    dispatch(initializeAuth(token));
    setIsHydrated(true);
  }, [dispatch]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (!user) {
      dispatch(fetchCurrentUser());
    }
  }, [isAuthenticated, user, dispatch, router, isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (user && allowedRoles && !allowedRoles.includes(user.role)) {
      if (user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/alumni');
      }
    }
  }, [user, allowedRoles, router, isHydrated]);

  if (!isHydrated || (loading && !user)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" />
        <div className="text-xl font-medium text-slate-800">Verifying access...</div>
        <div className="text-sm text-slate-500 mt-2">Please wait while we secure your session.</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
