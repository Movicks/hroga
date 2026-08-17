'use client';

import { useState } from 'react';
import { Calendar, CreditCard, CheckCircle, Loader2, Layers3 } from 'lucide-react';
import { initializeDuePayment } from '../../../redux/features/dues/duesSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

interface DuePaymentCardProps {
  onPaymentSuccess: () => void;
  currentMonth: string;
  isCurrentMonthPaid: boolean;
}

// const PAYMENT_OPTIONS = [1, 3, 6, 12] as const;
const MONTHLY_DUE_AMOUNT = 12000;

export default function DuePaymentCard({ 
  onPaymentSuccess, 
  currentMonth, 
  isCurrentMonthPaid 
}: DuePaymentCardProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [monthsCount, setMonthsCount] = useState<number>(1);

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

  const coveredMonths = currentMonth
    ? Array.from({ length: monthsCount }, (_, index) => {
        const [year, month] = currentMonth.split('-').map(Number);
        const date = new Date(year, month - 1 + index, 1);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      })
    : [];

  const handlePayNow = async () => {
    if (!user || !currentMonth) return;

    setIsProcessing(true);
    setError(null);

    try {
      const result = await dispatch(
        initializeDuePayment({
          month: currentMonth,
          type: 'monthly',
          monthsCount,
          notes:
            monthsCount === 1
              ? `Monthly due for ${formatMonth(currentMonth)}`
              : `Monthly dues from ${formatMonth(coveredMonths[0])} to ${formatMonth(coveredMonths[coveredMonths.length - 1])}`,
        })
      ).unwrap();

      if (result.authorizationUrl) {
        window.location.href = result.authorizationUrl;
      } else if (result.reference) {
        onPaymentSuccess();
      }
    } catch (err) {
      setError(
        typeof err === 'string'
          ? err
          : err instanceof Error
            ? err.message
            : 'Payment initialization failed'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const getCurrentMonthStatus = () => {
    if (isCurrentMonthPaid) {
      return {
        text: 'Paid',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      };
    }
    
    const today = new Date();
    const dueDate = new Date(today.getFullYear(), today.getMonth(), 10);
    
    if (today > dueDate) {
      return {
        text: 'Overdue',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        icon: <Calendar className="h-5 w-5 text-red-500" />,
      };
    }
    
    return {
      text: 'Pending',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      icon: <Calendar className="h-5 w-5 text-yellow-500" />,
    };
  };

  const status = getCurrentMonthStatus();
  const totalAmount = MONTHLY_DUE_AMOUNT * monthsCount;

  return (
    <div className="bg-white rounded shadow-xs border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Dues Payment Planner</h2>
          <p className="text-sm text-gray-500">Paid for this month already</p>
        </div>
        <div className={`flex items-center gap-2 rounded-lg px-3 py-2 ${status.bgColor}`}>
          {status.icon}
          <span className={`text-sm font-medium ${status.color}`}>
            {status.text}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded p-4">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Start Month</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">
              {formatMonth(currentMonth)}
            </p>
          </div>

          <div className="bg-gray-50 rounded p-4">
            <div className="flex items-center gap-3 mb-2">
              <Layers3 className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Months</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">{monthsCount}</p>
          </div>

          <div className="bg-gray-50 rounded p-4">
            <div className="flex items-center gap-3 mb-2">
              <CreditCard className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Total Amount</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">{formatCurrency(totalAmount)}</p>
          </div>
        </div>

        {/* <div>
          <label className="mb-3 block text-sm font-medium text-gray-700">
            Choose payment duration
          </label>
          <div className="grid grid-cols-4 gap-3">
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
        </div> */}

        {/* <div>
          <div className="mb-3 flex items-center gap-2">
            <Layers3 className="h-4 w-4 text-blue-600" />
            <p className="text-sm font-medium text-gray-700">Months covered by this payment</p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {coveredMonths.map((month, index) => (
              <div key={month} className="rounded border border-blue-200 bg-blue-50 p-4">
                <p className="text-sm font-medium text-gray-900">{formatMonth(month)}</p>
                <p className="mt-1 text-xs text-gray-500">
                  Month {index + 1} of {monthsCount}
                </p>
              </div>
            ))}
          </div>
        </div> */}

        {error && (
          <div className="rounded bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Payment Error</h3>
                <p className="mt-2 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200">
          {isCurrentMonthPaid && (
            <div className="mb-4 flex flex-col items-center justify-center gap-3 rounded bg-green-50 px-6 py-4">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <div className='text-center'>
                <p className="text-sm font-medium text-green-900">Current month already paid</p>
                <p className="text-xs text-green-700">You can still pay ahead for the upcoming months below.</p>
              </div>
            </div>
          )}
          {/* <button
            onClick={handlePayNow}
            disabled={isProcessing}
            className="w-full flex items-center justify-center gap-3 rounded bg-blue-600 px-6 py-4 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
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
          </button> */}
        </div>

        <div className="rounded bg-blue-50 p-4">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> Payments are processed securely through Paystack.
            Each month you cover is tracked as its own due record, while the transaction keeps one shared payment reference for auditing and reconciliation.
          </p>
        </div>
      </div>
    </div>
  );
}
