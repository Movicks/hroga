'use client';

import { useState } from 'react';
import { Calendar, CreditCard, CheckCircle, Loader2 } from 'lucide-react';
import { useAppSelector } from '../../../redux/hooks';

interface DuePaymentCardProps {
  onPaymentSuccess: () => void;
  currentMonth: string;
  isCurrentMonthPaid: boolean;
}

export default function DuePaymentCard({ 
  onPaymentSuccess, 
  currentMonth, 
  isCurrentMonthPaid 
}: DuePaymentCardProps) {
  const { user } = useAppSelector((state) => state.auth);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatMonth = (month: string) => {
    if (!month) return '';
    const [year, monthNum] = month.split('-');
    const date = new Date(parseInt(year), parseInt(monthNum) - 1, 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const handlePayNow = async () => {
    if (!user) return;

    setIsProcessing(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:4000';
      const response = await fetch(`${baseUrl}/api/dues/initialize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          month: currentMonth,
          type: 'monthly',
          notes: `Monthly due for ${formatMonth(currentMonth)}`,
        }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to initialize payment');
      }

      // Redirect to Paystack payment page
      if (data.authorizationUrl) {
        window.location.href = data.authorizationUrl;
      } else if (data.reference) {
        // Payment already exists, show success
        onPaymentSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment initialization failed');
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

  return (
    <div className="bg-white rounded shadow-xs border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Current Month Due</h2>
          <p className="text-sm text-gray-500">Pay your monthly alumni association due</p>
        </div>
        <div className={`flex items-center gap-2 rounded-lg px-3 py-2 ${status.bgColor}`}>
          {status.icon}
          <span className={`text-sm font-medium ${status.color}`}>
            {status.text}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Payment Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded p-4">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Month</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">
              {formatMonth(currentMonth)}
            </p>
          </div>

          <div className="bg-gray-50 rounded p-4">
            <div className="flex items-center gap-3 mb-2">
              <CreditCard className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Amount</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">₦12,000</p>
          </div>

          <div className="bg-gray-50 rounded p-4">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Due Date</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">10th of month</p>
          </div>
        </div>

        {/* Error Message */}
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

        {/* Payment Button */}
        <div className="pt-4 border-t border-gray-200">
          {isCurrentMonthPaid ? (
            <div className="flex items-center justify-center gap-3 rounded bg-green-50 px-6 py-4">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <div>
                <p className="text-sm font-medium text-green-900">Payment Completed</p>
                <p className="text-xs text-green-700">Your due for this month has been paid</p>
              </div>
            </div>
          ) : (
            <button
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
                  Pay Now - ₦12,000
                </>
              )}
            </button>
          )}
        </div>

        {/* Payment Note */}
        <div className="rounded bg-blue-50 p-4">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> Payments are processed securely through Paystack. 
            You will be redirected to the Paystack payment page to complete your transaction.
            After successful payment, you will receive a confirmation email.
          </p>
        </div>
      </div>
    </div>
  );
}