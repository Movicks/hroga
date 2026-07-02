'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchDonations, Donation } from '@/redux/features/donations/donationsSlice';
import { CheckCircle2, XCircle, Clock, User, Eye, UserCheck } from 'lucide-react';

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'success':
      return <CheckCircle2 className="h-5 w-5 text-green-600" />;
    case 'failed':
      return <XCircle className="h-5 w-5 text-red-600" />;
    default:
      return <Clock className="h-5 w-5 text-yellow-600" />;
  }
};

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case 'success':
      return 'bg-green-100 text-green-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-yellow-100 text-yellow-800';
  }
};

export default function Donations() {
  const dispatch = useAppDispatch();
  const { donations, loading, error } = useAppSelector((state) => state.donations);

  useEffect(() => {
    dispatch(fetchDonations());
  }, [dispatch]);

  if (loading && donations.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 text-lg font-medium">Error: {error}</p>
          <button
            onClick={() => dispatch(fetchDonations())}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Donations</h1>
          <p className="text-slate-600 mt-1">Track all donations received</p>
        </div>
      </div>

      <div className="space-y-4">
        {donations.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
            <Clock className="h-12 w-12 mx-auto text-slate-400" />
            <h3 className="mt-4 text-lg font-medium text-slate-800">No Donations Found</h3>
            <p className="mt-2 text-slate-600">Start receiving donations to see them here</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Date/Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Purpose
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {donations.map((donation: Donation) => (
                  <tr key={donation._id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                      {donation.paidAt ? new Date(donation.paidAt).toLocaleString() : new Date(donation.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {donation.anonymous ? <Eye className="h-4 w-4 text-slate-500" /> : <User className="h-4 w-4 text-slate-500" />}
                        <span className="text-sm text-slate-700">
                          {donation.anonymous ? 'Anonymous' : donation.fullName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                      {donation.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {donation.purpose || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-800">
                      {donation.currency} {donation.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(donation.status)}
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(donation.status)}`}>
                          {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
