'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  fetchCurrentUser,
  initializeAuth,
} from '../redux/features/auth/authSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'alumni')[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isHydrated, setIsHydrated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const { isAuthenticated, user, loading } = useAppSelector(
    (state) => state.auth
  );

  // Initialize auth from localStorage
  useEffect(() => {
    const initialize = async () => {
      const token = localStorage.getItem('accessToken');
      const storedUser = localStorage.getItem('user');

      dispatch(
        initializeAuth({
          token,
          user: storedUser ? JSON.parse(storedUser) : null,
        })
      );

      setIsHydrated(true);
    };

    initialize();
  }, [dispatch]);

  // Fetch user if authenticated but user data is missing
  useEffect(() => {
    const verifyUser = async () => {
      if (!isHydrated) return;

      try {
        if (isAuthenticated && !user) {
          await dispatch(fetchCurrentUser()).unwrap();
        }
      } catch (error) {
        console.error('Failed to fetch current user:', error);
      } finally {
        setAuthChecked(true);
      }
    };

    verifyUser();
  }, [dispatch, isAuthenticated, user, isHydrated]);

  // Handle redirects
  useEffect(() => {
    if (!isHydrated || !authChecked || loading) return;

    // Not logged in
    if (!isAuthenticated) {
      router.replace('/auth/login');
      return;
    }

    // No role restriction
    if (!allowedRoles || !user) {
      return;
    }

    // Wrong role
    if (!allowedRoles.includes(user.role)) {
      switch (user.role) {
        case 'admin':
          router.replace('/admin');
          break;

        case 'alumni':
          router.replace('/alumni');
          break;

        default:
          router.replace('/auth/login');
      }
    }
  }, [
    isAuthenticated,
    user,
    allowedRoles,
    router,
    loading,
    authChecked,
    isHydrated,
  ]);

  // Loading state
  if (!isHydrated || loading || !authChecked) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" />
        <h2 className="text-xl font-medium text-slate-800">
          Verifying access...
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Please wait while we secure your session.
        </p>
      </div>
    );
  }

  // Prevent rendering during redirect
  if (!isAuthenticated) {
    return null;
  }

  if (
    user &&
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return null;
  }

  return <>{children}</>;
}