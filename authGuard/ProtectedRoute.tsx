'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  fetchCurrentUser,
  initializeAuth,
} from '../redux/features/auth/authSlice';
import { checkDuePaymentStatus } from '../redux/features/dues/duesSlice';
import Loader from '@/components/reusables/Loader';

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

  // Check if user has paid current month dues (applies to both admins and alumni)
  const { dueSummary, isCheckingDueStatus } = useAppSelector((state) => state.dues);
  const [hasCheckedDues, setHasCheckedDues] = useState(false);

  useEffect(() => {
    const checkDuePayment = async () => {
      if (!isHydrated || !authChecked || loading || !isAuthenticated || !user) return;
      
      // Only check dues once per session
      if (hasCheckedDues) return;
      
      // Check dues payment status for both admins and alumni
      dispatch(checkDuePaymentStatus(false));
      setHasCheckedDues(true);
    };

    checkDuePayment();
  }, [isHydrated, authChecked, loading, isAuthenticated, user, dispatch, hasCheckedDues]);

  // Redirect to dues page if current month is not paid
  useEffect(() => {
    if (!isCheckingDueStatus && dueSummary && !dueSummary.isCurrentMonthPaid) {
      // Redirect to monthly dues form
      router.replace('/monthly_dues_form');
    }
  }, [dueSummary, isCheckingDueStatus, router]);

  // Handle redirects
  useEffect(() => {
    if (!isHydrated || !authChecked || loading || isCheckingDueStatus) return;

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
    isCheckingDueStatus,
    dueSummary,
  ]);

  // Loading state
  if (!isHydrated || loading || !authChecked || isCheckingDueStatus) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader loadTitle='Verifying access'/>
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
