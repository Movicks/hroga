'use client';

import { DollarSign, CheckCircle, Clock, AlertCircle, TrendingUp } from 'lucide-react';

interface DueSummary {
  totalPaid: number;
  pendingCount: number;
  overdueCount: number;
  totalDues: number;
  isCurrentMonthPaid: boolean;
  currentMonth: string;
}

interface DueSummaryCardProps {
  summary: DueSummary;
}

export default function DueSummaryCard({ summary }: DueSummaryCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatMonth = (month: string) => {
    const [year, monthNum] = month.split('-');
    const date = new Date(parseInt(year), parseInt(monthNum) - 1, 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const stats = [
    {
      title: 'Total Paid',
      value: formatCurrency(summary.totalPaid),
      icon: <DollarSign className="h-5 w-5 text-green-600" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Lifetime contributions',
    },
    {
      title: 'Paid Dues',
      value: summary.totalDues - summary.pendingCount - summary.overdueCount,
      icon: <CheckCircle className="h-5 w-5 text-blue-600" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Successful payments',
    },
    {
      title: 'Pending',
      value: summary.pendingCount,
      icon: <Clock className="h-5 w-5 text-yellow-600" />,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      description: 'Awaiting payment',
    },
    {
      title: 'Overdue',
      value: summary.overdueCount,
      icon: <AlertCircle className="h-5 w-5 text-red-600" />,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Past due payments',
    },
  ];

  const paymentStreak = calculatePaymentStreak(summary);

  return (
    <div className="bg-white rounded shadow-xs border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Payment Summary</h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>{formatMonth(summary.currentMonth)}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className={`rounded p-4 ${stat.bgColor}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600">{stat.title}</span>
              {stat.icon}
            </div>
            <div className={`text-xl font-semibold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.description}</div>
          </div>
        ))}
      </div>

      {/* Payment Streak */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-900">Payment Streak</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">{paymentStreak} months</div>
        </div>
        <div className="text-xs text-gray-500">
          Consecutive months of on-time payments. Keep it up!
        </div>
      </div>

      {/* Current Month Status */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Current Month Status</h4>
            <p className="text-xs text-gray-500">Payment for {formatMonth(summary.currentMonth)}</p>
          </div>
          <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
            summary.isCurrentMonthPaid 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {summary.isCurrentMonthPaid ? (
              <>
                <CheckCircle className="h-3 w-3" />
                Paid
              </>
            ) : (
              <>
                <Clock className="h-3 w-3" />
                Pending
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for calendar icon
function Calendar({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

// Helper function to calculate payment streak
function calculatePaymentStreak(summary: DueSummary): number {
  // This is a simplified calculation
  // In a real app, you would analyze the actual payment history
  const paidCount = summary.totalDues - summary.pendingCount - summary.overdueCount;
  
  if (summary.isCurrentMonthPaid) {
    return Math.min(paidCount, 12); // Cap at 12 months for display
  }
  
  return Math.max(0, paidCount - 1);
}