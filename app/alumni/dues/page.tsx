'use client';

import { useState, useEffect, useRef } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { fetchUserDues, checkDuePaymentStatus } from '../../../redux/features/dues/duesSlice';
import ProtectedRoute from '../../../authGuard/ProtectedRoute';
import Loader from '../../../components/reusables/Loader';
import DuePaymentCard from '../../../components/majors/alumni/DuePaymentCard';
import DueHistoryTable from '../../../components/majors/alumni/DueHistoryTable';
import DueSummaryCard from '../../../components/majors/alumni/DueSummaryCard';

export default function AlumniDuesPage() {
  const dispatch = useAppDispatch();
  
  const { user, loading } = useAppSelector((state) => state.auth);
  const { 
    dues, 
    dueSummary, 
    isFetchingDues, 
    isCheckingDueStatus,
    fetchError 
  } = useAppSelector((state) => state.dues);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasFetchedDues = useRef(false);

  useEffect(() => {
    if (!loading && user && !hasFetchedDues.current) {
      hasFetchedDues.current = true;
      dispatch(fetchUserDues());
    }
  }, [loading, user, dispatch]);

  const handlePaymentSuccess = () => {
    dispatch(fetchUserDues());
    dispatch(checkDuePaymentStatus(true));
  };

  const formatMonth = (month: string) => {
    const [year, monthNumber] = month.split('-').map(Number);
    return new Date(year, monthNumber - 1, 1).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);

  const paidDues = dues
    .filter((due) => due.status === 'success')
    .sort((first, second) => second.month.localeCompare(first.month));

  const isPageLoading = loading || isFetchingDues || isCheckingDueStatus;
  const displayError = error || fetchError;

  if (isPageLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader loadTitle='Loading your monthly dues..'/>
      </div>
    );
  }

  return (
    <ProtectedRoute allowedRoles={['alumni']}>
      <div className="min-h-auto bg-slate-50">
        {/* Main Content */}
        <div className="">
          <main className="flex-1">
            {displayError ? (
              <div className="rounded bg-red-50 p-4 mb-6">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error loading dues</h3>
                    <p className="mt-2 text-sm text-red-700">{displayError}</p>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Left column - Payment and Summary */}
              <div className="lg:col-span-2 space-y-6">
                {/* Current Month Payment Card */}
                <DuePaymentCard
                  onPaymentSuccess={handlePaymentSuccess}
                  currentMonth={dueSummary?.currentMonth || ''}
                  isCurrentMonthPaid={dueSummary?.isCurrentMonthPaid || false}
                />

                {/* <div className="rounded bg-white p-6 shadow-xs border border-gray-200">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Paid Months</h2>
                      <p className="text-sm text-gray-500">
                        Each paid month is tracked independently for reminders, audit, and reporting.
                      </p>
                    </div>
                    <div className="rounded bg-green-50 px-3 py-2 text-sm font-medium text-green-700">
                      {paidDues.length} month{paidDues.length === 1 ? '' : 's'} paid
                    </div>
                  </div>

                  {paidDues.length === 0 ? (
                    <div className="rounded border border-dashed border-gray-200 bg-gray-50 p-6 text-sm text-gray-500">
                      No paid months yet. Once a payment succeeds, each covered month appears here as its own card.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                      {paidDues.map((due) => (
                        <div key={due._id} className="rounded border border-green-200 bg-green-50 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="text-sm font-semibold text-gray-900">
                                {formatMonth(due.month)}
                              </h3>
                              <p className="mt-1 text-xs text-gray-600">
                                {formatCurrency(due.amount)}
                              </p>
                            </div>
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                              <CheckCircle className="h-3.5 w-3.5" />
                              Paid
                            </span>
                          </div>
                          <div className="mt-4 space-y-1 text-xs text-gray-600">
                            <p>
                              Group reference: <span className="font-mono">{due.paymentReference || due.reference}</span>
                            </p>
                            <p>
                              Payment batch: {due.paymentMonthCount || due.coveredMonths?.length || 1} month(s)
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div> */}

                {/* Due History */}
                <div className="bg-white rounded shadow-xs border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Payment History</h2>
                      <p className="text-sm text-gray-500">Track all your monthly due payments</p>
                    </div>
                    <button
                      onClick={() => dispatch(fetchUserDues())}
                      className="rounded bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                      Refresh
                    </button>
                  </div>
                  <DueHistoryTable dues={dues} />
                </div>
              </div>

              {/* Right column - Summary and Info */}
              <div className="space-y-6">
                {/* Due Summary Card */}
                {dueSummary && <DueSummaryCard summary={dueSummary} />}

                {/* Payment Information */}
                <div className="bg-white rounded shadow-xs border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Monthly Amount</span>
                      <span className="text-sm font-medium text-gray-900">₦12,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Payment Method</span>
                      <span className="text-sm font-medium text-gray-900">Paystack</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Due Date</span>
                      <span className="text-sm font-medium text-gray-900">10th of each month</span>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        Payments are processed securely through Paystack. You will receive a confirmation email once your payment is successful.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Need Help Card */}
                <div className="bg-blue-50 rounded border border-blue-200 p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-6 w-6 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-blue-900">Need Help?</h3>
                      <p className="mt-2 text-sm text-blue-700">
                        If you encounter any issues with payments or have questions about dues, please contact the alumni association treasurer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
