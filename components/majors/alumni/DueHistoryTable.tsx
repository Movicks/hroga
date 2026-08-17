'use client';

import { CheckCircle, Clock, AlertCircle, Calendar } from 'lucide-react';

interface Due {
  _id: string;
  reference: string;
  amount: number;
  currency: string;
  type: string;
  month: string;
  status: string;
  paidAt?: string;
  dueDate?: string;
  notes?: string;
}

interface DueHistoryTableProps {
  dues: Due[];
}

export default function DueHistoryTable({ dues }: DueHistoryTableProps) {
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
          {dues.map((due) => {
            const statusConfig = getStatusConfig(due.status);
            
            return (
              <tr key={due._id} className="hover:bg-gray-50">
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
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(due.amount)}
                    </span>
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
                    {due.reference}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}