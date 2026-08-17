'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Calendar, CreditCard, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { checkDuePaymentStatus, initializeDuePayment } from '../../redux/features/dues/duesSlice';

export function MonthlyDuesForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { 
    dueSummary, 
    isCheckingDueStatus, 
    isInitializingPayment, 
    paymentError 
  } = useAppSelector((state) => state.dues);
  
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);

  const reference = searchParams.get('reference');
  const paymentStatus = searchParams.get('status');

  // Get current month in YYYY-MM format
  const getCurrentMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      // Check due payment status on component mount
      dispatch(checkDuePaymentStatus(false));
    }
  }, [isAuthenticated, user, dispatch]);

  useEffect(() => {
    if (paymentStatus === 'cancelled') {
      setError('Payment was cancelled before completion.');
    }
  }, [paymentStatus]);

  useEffect(() => {
    if (!reference) {
      return;
    }

    let cancelled = false;

    const verifyPayment = async () => {
      setIsVerifyingPayment(true);
      setError(null);

      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:4000';
        const response = await fetch(`${baseUrl}/api/dues/verify/${encodeURIComponent(reference)}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Unable to verify due payment.');
        }

        if (cancelled) {
          return;
        }

        if (data?.due?.status === 'success') {
          dispatch(checkDuePaymentStatus(true));
          const redirectPath = user?.role === 'admin' ? '/admin' : '/alumni';
          router.replace(redirectPath);
          return;
        }

        setError(data.message || 'Payment is still being processed. Please check again shortly.');
      } catch (verificationError) {
        if (!cancelled) {
          setError(
            verificationError instanceof Error
              ? verificationError.message
              : 'Unable to verify due payment.'
          );
        }
      } finally {
        if (!cancelled) {
          setIsVerifyingPayment(false);
        }
      }
    };

    verifyPayment();

    return () => {
      cancelled = true;
    };
  }, [reference, dispatch, router, user]);

  useEffect(() => {
    // Set default selected month to current month
    const currentMonth = getCurrentMonth();
    setSelectedMonth(currentMonth);
  }, []);

  useEffect(() => {
    // If current month is already paid, redirect to dashboard
    if (dueSummary?.isCurrentMonthPaid) {
      const redirectPath = user?.role === 'admin' ? '/admin' : '/alumni';
      router.replace(redirectPath);
    }
  }, [dueSummary, user, router]);

  const handlePayNow = async () => {
    if (!user || !selectedMonth) return;

    setError(null);
    
    try {
      const result = await dispatch(initializeDuePayment({
        month: selectedMonth,
        type: 'monthly',
        notes: `Monthly due for ${formatMonth(selectedMonth)}`
      })).unwrap();

      if (result.authorizationUrl) {
        // Redirect to Paystack payment page
        window.location.href = result.authorizationUrl;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment initialization failed');
    }
  };

  const formatMonth = (month: string) => {
    if (!month) return '';
    const [year, monthNum] = month.split('-');
    const date = new Date(parseInt(year), parseInt(monthNum) - 1, 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusConfig = (isPaid: boolean) => {
    if (isPaid) {
      return {
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        text: 'Paid',
        color: 'text-green-700',
        bgColor: 'bg-green-100',
      };
    }
    
    const today = new Date();
    const dueDate = new Date(today.getFullYear(), today.getMonth(), 10);
    
    if (today > dueDate) {
      return {
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
        text: 'Overdue',
        color: 'text-red-700',
        bgColor: 'bg-red-100',
      };
    }
    
    return {
      icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
      text: 'Pending',
      color: 'text-yellow-700',
      bgColor: 'bg-yellow-100',
    };
  };

  const statusConfig = getStatusConfig(dueSummary?.isCurrentMonthPaid || false);

  if (isCheckingDueStatus || isVerifyingPayment) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">
            {isVerifyingPayment ? 'Verifying payment...' : 'Checking payment status...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xs p-8">
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Monthly Dues Payment</h2>
            <p className="mt-2 text-gray-600">
              Complete your monthly dues payment to access your dashboard
            </p>
          </div>

          {/* Payment Status */}
          <div className="mb-8 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {formatMonth(getCurrentMonth())}
                </h3>
                <p className="text-gray-600">Monthly due</p>
              </div>
              <div className={`px-3 py-1 rounded-full ${statusConfig.bgColor} ${statusConfig.color} flex items-center gap-2`}>
                {statusConfig.icon}
                <span className="font-medium">{statusConfig.text}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-bold text-gray-900">{formatCurrency(12000)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Due Date</span>
                <span className="font-medium text-gray-900">10th of each month</span>
              </div>
            </div>
          </div>

          {/* Month Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Payment Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            >
              <option value={getCurrentMonth()}>Current Month ({formatMonth(getCurrentMonth())})</option>
              {/* You can add more month options here if needed */}
            </select>
          </div>

          {/* Error Display */}
          {(error || paymentError) && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-red-700">{error || paymentError}</p>
              </div>
            </div>
          )}

          {/* Payment Button */}
          <button
            onClick={handlePayNow}
            disabled={isInitializingPayment || dueSummary?.isCurrentMonthPaid}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold rounded-lg transition duration-200"
          >
            {isInitializingPayment ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="h-5 w-5" />
                {dueSummary?.isCurrentMonthPaid ? 'Payment Completed' : 'Pay Now'}
              </>
            )}
          </button>

          {/* Payment Summary */}
          {dueSummary && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Payment Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Paid</span>
                  <span className="font-medium text-gray-900">{formatCurrency(dueSummary.totalPaid)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pending Payments</span>
                  <span className="font-medium text-gray-900">{dueSummary.pendingCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Overdue Payments</span>
                  <span className="font-medium text-gray-900">{dueSummary.overdueCount}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
