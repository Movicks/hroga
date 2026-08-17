'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Clock, AlertCircle, DollarSign } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { fetchUserDues, checkDuePaymentStatus } from '../../../redux/features/dues/duesSlice';
import ProtectedRoute from '../../../authGuard/ProtectedRoute';
import AlumniSidebar from '../../../components/sidebars/AlumniSidebar';
import Loader from '../../../components/reusables/Loader';
import DuePaymentCard from '../../../components/majors/alumni/DuePaymentCard';
import DueHistoryTable from '../../../components/majors/alumni/DueHistoryTable';
import DueSummaryCard from '../../../components/majors/alumni/DueSummaryCard';

export default function AlumniDuesPage() {
  const router = useRouter();
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'overdue':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
