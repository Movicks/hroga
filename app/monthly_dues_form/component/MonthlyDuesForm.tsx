'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Calendar,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Loader2,
  Layers3,
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import {
  checkDuePaymentStatus,
  initializeDuePayment,
  verifyDuePayment,
} from '../../../redux/features/dues/duesSlice';

const PAYMENT_OPTIONS = [1, 3, 6, 12] as const;
const MONTHLY_DUE_AMOUNT = 12000;

export function MonthlyDuesForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { 
    dueSummary, 
    isCheckingDueStatus, 
    isInitializingPayment, 
    isVerifyingPayment,
    paymentError 
  } = useAppSelector((state) => state.dues);
  
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [monthsCount, setMonthsCount] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const reference = searchParams.get('reference');
  const paymentStatus = searchParams.get('status');

  const getCurrentMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
  };

  const getMonthOptions = () => {
    const currentMonth = getCurrentMonth();
    const [startYear, startMonth] = currentMonth.split('-').map(Number);

    return Array.from({ length: 12 }, (_, index) => {
      const date = new Date(startYear, startMonth - 1 + index, 1);
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    });
  };

  const formatMonth = (month: string) => {
    if (!month) return '';
    const [year, monthNumber] = month.split('-');
    const date = new Date(parseInt(year, 10), parseInt(monthNumber, 10) - 1, 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const buildCoveredMonths = (startMonth: string, count: number) => {
    if (!startMonth) {
      return [];
    }

    const [startYear, startMonthNumber] = startMonth.split('-').map(Number);

    return Array.from({ length: count }, (_, index) => {
      const date = new Date(startYear, startMonthNumber - 1 + index, 1);
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    });
  };

  useEffect(() => {
    if (isAuthenticated && user) {
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

    const verifyPaymentRedirect = async () => {
      setError(null);

      try {
        const data = await dispatch(verifyDuePayment(reference)).unwrap();

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
            typeof verificationError === 'string'
              ? verificationError
              : verificationError instanceof Error
                ? verificationError.message
                : 'Unable to verify due payment.'
          );
        }
      }
    };

    verifyPaymentRedirect();

    return () => {
      cancelled = true;
    };
  }, [reference, dispatch, router, user]);

  useEffect(() => {
    const currentMonth = getCurrentMonth();
    setSelectedMonth(currentMonth);
  }, []);

  const handlePayNow = async () => {
    if (!user || !selectedMonth) return;

    setError(null);
    const coveredMonths = buildCoveredMonths(selectedMonth, monthsCount);
    const lastMonth = coveredMonths[coveredMonths.length - 1];
    
    try {
      const result = await dispatch(initializeDuePayment({
        month: selectedMonth,
        type: 'monthly',
        monthsCount,
        notes:
          monthsCount === 1
            ? `Monthly due for ${formatMonth(selectedMonth)}`
            : `Monthly dues from ${formatMonth(selectedMonth)} to ${formatMonth(lastMonth)}`
      })).unwrap();

      if (result.authorizationUrl) {
        window.location.href = result.authorizationUrl;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment initialization failed');
    }
  };

  const monthOptions = getMonthOptions();
  const coveredMonths = buildCoveredMonths(selectedMonth, monthsCount);
  const totalAmount = MONTHLY_DUE_AMOUNT * monthsCount;
  const paidMonths = new Set(dueSummary?.paidMonths || []);

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

      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl bg-white md:p-8 shadow-xs">
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Monthly Dues Payment</h2>
            <p className="mt-2 text-gray-600">
              Pay for 1, 3, 6, or 12 months upfront with full month-by-month tracking
            </p>
          </div>

          {dueSummary?.isCurrentMonthPaid && (
            <div className="mb-8 rounded border border-green-200 bg-green-50 p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
                <div>
                  <h3 className="text-sm font-medium text-green-900">Current month already settled</h3>
                  <p className="mt-1 text-sm text-green-700">
                    You can still pay ahead for future months and keep your dues up to date.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mb-8 grid grid-cols-1 gap-6">
            <div className='w-full grid lg:grid-cols-3 gap-6'>
              <div className="rounded border border-gray-200 p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Payment Setup</h3>
                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Start Month
                    </label>
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="w-full rounded border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    >
                      {monthOptions.map((month) => (
                        <option key={month} value={month}>
                          {formatMonth(month)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Number of Months
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {PAYMENT_OPTIONS.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setMonthsCount(option)}
                          className={`rounded border px-3 py-3 text-sm font-medium transition ${
                            monthsCount === option
                              ? 'border-blue-600 bg-blue-50 text-blue-700'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                          }`}
                        >
                          {option} mo
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded bg-gray-50 p-4">
                      <p className="text-sm text-gray-500">Monthly Rate</p>
                      <p className="mt-2 text-lg font-semibold text-gray-900">
                        {formatCurrency(MONTHLY_DUE_AMOUNT)}
                      </p>
                    </div>
                    <div className="rounded bg-gray-50 p-4">
                      <p className="text-sm text-gray-500">Months Covered</p>
                      <p className="mt-2 text-lg font-semibold text-gray-900">{monthsCount}</p>
                    </div>
                    <div className="rounded bg-gray-50 p-4">
                      <p className="text-sm text-gray-500">Total Due</p>
                      <p className="mt-2 text-lg font-semibold text-gray-900">
                        {formatCurrency(totalAmount)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded border border-gray-200 p-6 lg:col-span-2">
                <div className="mb-4 flex items-center gap-2">
                  <Layers3 className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Covered Months</h3>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {coveredMonths.map((month, index) => {
                    const isAlreadyPaid = paidMonths.has(month);
                    return (
                      <div
                        key={month}
                        className={`rounded border p-4 ${
                          isAlreadyPaid
                            ? 'border-green-200 bg-green-50'
                            : 'border-blue-200 bg-blue-50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {formatMonth(month)}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              Month {index + 1} of {monthsCount}
                            </p>
                          </div>
                          <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                              isAlreadyPaid
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {isAlreadyPaid ? 'Paid' : 'This payment'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 rounded bg-gray-50 p-4 text-sm text-gray-600">
                  Due date remains the 10th of each month, and each covered month is tracked as a separate due record for reporting and audit purposes.
                </div>
                <button
                  onClick={handlePayNow}
                  disabled={isInitializingPayment || !selectedMonth}
                  className="flex w-full items-center justify-center gap-3 mt-6 rounded bg-primary px-4 py-3 font-semibold text-white transition duration-200 hover:bg-primary/80 disabled:bg-primary/60"
                >
                  {isInitializingPayment ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      Pay {monthsCount} {monthsCount === 1 ? 'Month' : 'Months'} - {formatCurrency(totalAmount)}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {(error || paymentError) && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
              <div className="flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
                <p className="text-red-700">{error || paymentError}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
