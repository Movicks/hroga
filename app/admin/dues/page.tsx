'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Filter, 
  Download,  
  CheckCircle, 
  Clock, 
  AlertCircle,
  DollarSign,
  User,
  Calendar
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { fetchAllDues, checkDuePaymentStatus } from '../../../redux/features/dues/duesSlice';
import ProtectedRoute from '../../../authGuard/ProtectedRoute';
import Loader from '../../../components/reusables/Loader';
import AdminNavbar from '../../../components/sidebars/AdminNavbar';

export default function AdminDuesPage() {
  const dispatch = useAppDispatch();
  
  const { 
    dues, 
    dueSummary, 
    isFetchingDues, 
    isCheckingDueStatus,
    fetchError 
  } = useAppSelector((state) => state.dues);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [monthFilter, setMonthFilter] = useState<string>('all');
  const [selectedDue, setSelectedDue] = useState<(typeof dues)[number] | null>(null);
  const hasFetchedAllDues = useRef(false);

  useEffect(() => {
    if (!hasFetchedAllDues.current) {
      hasFetchedAllDues.current = true;
      dispatch(fetchAllDues());
    }
  }, [dispatch]);

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
      hour: '2-digit',
      minute: '2-digit',
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

  // Filter dues based on search term and filters
  const filteredDues = dues.filter(due => {
    const matchesSearch = 
      due.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      due.user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      due.user?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      due.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || due.status === statusFilter;
    const matchesMonth = monthFilter === 'all' || due.month === monthFilter;

    return matchesSearch && matchesStatus && matchesMonth;
  });

  // Get unique months for filter
  const uniqueMonths = Array.from(new Set(dues.map(due => due.month))).sort().reverse();

  const loading = isFetchingDues || isCheckingDueStatus;
  const displayError = error || fetchError;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader loadTitle='Loading dues data...'/>
      </div>
    );
  }

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-auto bg-slate-50">
        <AdminNavbar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        {/* Main Content */}
        <div className="">
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden rounded p-2 hover:bg-gray-100"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Monthly Dues Management</h1>
                <p className="text-sm text-gray-500">Manage all alumni monthly due payments</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 rounded bg-primary hover:bg-primary/60 px-4 py-2 text-sm font-medium text-white">
                <Download className="h-4 w-4" />
                Export Report
              </button>
            </div>
          </header>

          <main className="flex-1 py-6">
            {/* Error Display */}
            {displayError && (
              <div className="rounded bg-red-50 p-4 mb-6">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error loading dues</h3>
                    <p className="mt-2 text-sm text-red-700">{displayError}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded shadow-xs border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Collected</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {formatCurrency(dues.filter(d => d.status === 'success').reduce((sum, d) => sum + d.amount, 0))}
                    </p>
                  </div>
                  <div className="rounded bg-green-100 p-3">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded shadow-xs border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Pending Payments</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {dues.filter(d => d.status === 'pending').length}
                    </p>
                  </div>
                  <div className="rounded bg-yellow-100 p-3">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded shadow-xs border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Overdue Payments</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {dues.filter(d => d.status === 'overdue').length}
                    </p>
                  </div>
                  <div className="rounded bg-red-100 p-3">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded shadow-xs border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Transactions</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {dues.length}
                    </p>
                  </div>
                  <div className="rounded bg-blue-100 p-3">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded shadow-xs border border-gray-200 p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by reference, name, or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <div className="w-full lg:w-48">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    >
                      <option value="all">All Status</option>
                      <option value="success">Paid</option>
                      <option value="pending">Pending</option>
                      <option value="overdue">Overdue</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>
                </div>

                {/* Month Filter */}
                <div className="w-full lg:w-48">
                  <select
                    value={monthFilter}
                    onChange={(e) => setMonthFilter(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  >
                    <option value="all">All Months</option>
                    {uniqueMonths.map(month => (
                      <option key={month} value={month}>
                        {formatMonth(month)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Refresh Button */}
                <div>
                  <button
                    onClick={() => dispatch(fetchAllDues())}
                    className="w-full lg:w-auto px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded transition"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </div>

            {/* Dues Table */}
            <div className="bg-white rounded shadow-xs border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reference
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Alumni
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Month
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Paid Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredDues.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                          No dues found matching your criteria
                        </td>
                      </tr>
                    ) : (
                      filteredDues.map((due) => {
                        const statusConfig = getStatusConfig(due.status);
                        return (
                          <tr key={due._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {due.reference}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-8 w-8 rounded bg-gray-200 flex items-center justify-center">
                                  <User className="h-4 w-4 text-gray-500" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {due.user?.firstName} {due.user?.lastName}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {due.user?.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {formatMonth(due.month)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {formatCurrency(due.amount)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className={`inline-flex items-center gap-1 px-3 py-1 rounded text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color}`}>
                                {statusConfig.icon}
                                {statusConfig.text}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {due.paidAt ? formatDate(due.paidAt) : '-'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => setSelectedDue(due)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {selectedDue && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                onClick={() => setSelectedDue(null)}
              >
                <div
                  className="w-full max-w-2xl rounded bg-white shadow-2xl"
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Transaction Details</h2>
                      <p className="text-sm text-gray-500">{selectedDue.reference}</p>
                    </div>
                    <button
                      onClick={() => setSelectedDue(null)}
                      className="rounded px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Close
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 px-6 py-6 md:grid-cols-2">
                    <div className="rounded bg-gray-50 p-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Alumni</p>
                      <p className="mt-2 text-sm font-medium text-gray-900">
                        {selectedDue.user?.firstName} {selectedDue.user?.lastName}
                      </p>
                      <p className="text-sm text-gray-600">{selectedDue.user?.email || '-'}</p>
                    </div>

                    <div className="rounded bg-gray-50 p-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Status</p>
                      <div className="mt-2 inline-flex items-center gap-1 rounded px-3 py-1 text-xs font-medium text-gray-800">
                        {getStatusConfig(selectedDue.status).icon}
                        {getStatusConfig(selectedDue.status).text}
                      </div>
                    </div>

                    <div className="rounded bg-gray-50 p-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Amount</p>
                      <p className="mt-2 text-sm font-medium text-gray-900">
                        {formatCurrency(selectedDue.amount)}
                      </p>
                    </div>

                    <div className="rounded bg-gray-50 p-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Type</p>
                      <p className="mt-2 text-sm font-medium capitalize text-gray-900">
                        {selectedDue.type}
                      </p>
                    </div>

                    <div className="rounded bg-gray-50 p-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Month</p>
                      <p className="mt-2 text-sm font-medium text-gray-900">
                        {formatMonth(selectedDue.month)}
                      </p>
                    </div>

                    <div className="rounded bg-gray-50 p-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Currency</p>
                      <p className="mt-2 text-sm font-medium text-gray-900">
                        {selectedDue.currency}
                      </p>
                    </div>

                    <div className="rounded bg-gray-50 p-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Due Date</p>
                      <p className="mt-2 text-sm font-medium text-gray-900">
                        {formatDate(selectedDue.dueDate)}
                      </p>
                    </div>

                    <div className="rounded bg-gray-50 p-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Paid Date</p>
                      <p className="mt-2 text-sm font-medium text-gray-900">
                        {formatDate(selectedDue.paidAt)}
                      </p>
                    </div>

                    <div className="rounded bg-gray-50 p-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Created</p>
                      <p className="mt-2 text-sm font-medium text-gray-900">
                        {formatDate(selectedDue.createdAt)}
                      </p>
                    </div>

                    <div className="rounded bg-gray-50 p-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Updated</p>
                      <p className="mt-2 text-sm font-medium text-gray-900">
                        {formatDate(selectedDue.updatedAt)}
                      </p>
                    </div>

                    <div className="rounded bg-gray-50 p-4 md:col-span-2">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Notes</p>
                      <p className="mt-2 text-sm text-gray-700">
                        {selectedDue.notes || 'No notes provided.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
