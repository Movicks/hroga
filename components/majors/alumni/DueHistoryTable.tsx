'use client';

import { CheckCircle, Clock, AlertCircle, Calendar, Filter } from 'lucide-react';
import { useState, useMemo, useCallback, memo } from 'react';

interface Due {
  _id: string;
  reference: string;
  paymentReference?: string;
  amount: number;
  paymentTotalAmount?: number;
  currency: string;
  type: string;
  month: string;
  paymentMonthCount?: number;
  coveredMonths?: string[];
  status: string;
  paidAt?: string;
  dueDate?: string;
  notes?: string;
}

interface DueHistoryTableProps {
  dues: Due[];
}

// Helper functions
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString?: string) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const formatMonth = (month: string) => {
  const [year, monthNum] = month.split('-');
  const date = new Date(parseInt(year), parseInt(monthNum) - 1, 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'success':
      return {
        icon: <CheckCircle className="h-4 w-4 text-green-500" />,
        text: 'Paid',
        color: 'text-green-700',
        bgColor: 'bg-green-100',
      };
    case 'pending':
      return {
        icon: <Clock className="h-4 w-4 text-yellow-500" />,
        text: 'Pending',
        color: 'text-yellow-700',
        bgColor: 'bg-yellow-100',
      };
    case 'overdue':
      return {
        icon: <AlertCircle className="h-4 w-4 text-red-500" />,
        text: 'Overdue',
        color: 'text-red-700',
        bgColor: 'bg-red-100',
      };
    case 'failed':
      return {
        icon: <AlertCircle className="h-4 w-4 text-red-500" />,
        text: 'Failed',
        color: 'text-red-700',
        bgColor: 'bg-red-100',
      };
    default:
      return {
        icon: <Clock className="h-4 w-4 text-gray-500" />,
        text: 'Unknown',
        color: 'text-gray-700',
        bgColor: 'bg-gray-100',
      };
  }
};

// Memoized Row Component
const DueRow = memo(({ due }: { due: Due }) => {
  const statusConfig = getStatusConfig(due.status);
  
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-50">
            <Calendar className="h-5 w-5 text-blue-600" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {formatMonth(due.month)}
            </div>
            <div className="text-xs text-gray-500">
              Due: {formatDate(due.dueDate)}
            </div>
            <div className="text-xs text-gray-500">
              Payment batch: {due.paymentMonthCount || due.coveredMonths?.length || 1} month(s)
            </div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div>
            <span className="text-sm font-medium text-gray-900">
              {formatCurrency(due.amount)}
            </span>
            <div className="text-xs text-gray-500">
              Group total: {formatCurrency(due.paymentTotalAmount || due.amount)}
            </div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color}`}>
          {statusConfig.icon}
          {statusConfig.text}
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
        {due.paidAt ? formatDate(due.paidAt) : '-'}
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="text-xs font-mono text-gray-500 bg-gray-50 px-2 py-1 rounded">
          {due.paymentReference || due.reference}
        </div>
      </td>
    </tr>
  );
});

DueRow.displayName = 'DueRow';

export default function DueHistoryTable({ dues }: DueHistoryTableProps) {
  const [selectedYear, setSelectedYear] = useState<string>('all');

  // Get unique years from dues
  const availableYears = useMemo(() => {
    const years = new Set<string>();
    dues.forEach(due => {
      if (due.month) {
        const year = due.month.split('-')[0];
        years.add(year);
      }
    });
    return Array.from(years).sort();
  }, [dues]);

  // Filter dues by selected year
  const filteredDues = useMemo(() => {
    if (selectedYear === 'all') return dues;
    return dues.filter(due => {
      const year = due.month?.split('-')[0];
      return year === selectedYear;
    });
  }, [dues, selectedYear]);

  // Handlers
  const handleYearChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  }, []);

  const handleClearFilter = useCallback(() => {
    setSelectedYear('all');
  }, []);

  if (dues.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-12 w-12 text-gray-400">
          <Calendar className="h-12 w-12" />
        </div>
        <h3 className="mt-4 text-sm font-medium text-gray-900">No payment history</h3>
        <p className="mt-2 text-sm text-gray-500">
          You haven't made any due payments yet. Pay your first monthly due to get started.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Year Filter - Always visible when there are dues */}
      <div className="flex items-center gap-3 mb-4 px-4 py-2 bg-gray-50 rounded-lg">
        <Filter className="h-4 w-4 text-gray-500" />
        <span className="text-sm text-gray-600 font-medium">Filter by year:</span>
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="text-sm border border-gray-300 rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Years</option>
          {availableYears.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <span className="text-xs text-gray-500 ml-auto">
          Showing {filteredDues.length} of {dues.length} records
        </span>
      </div>

      {filteredDues.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">No records found for {selectedYear}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium whitespace-nowrap text-gray-500 uppercase tracking-wider">
                  Payment Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDues.map((due) => (
                <DueRow key={due._id} due={due} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}