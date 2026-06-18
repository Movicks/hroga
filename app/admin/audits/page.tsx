'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchAudits, Audit } from '../../../redux/features/audits/auditsSlice';
import { Clock, User, Activity, FileText, Trash2, Plus, Eye, Ban, UserCheck } from 'lucide-react';

const getActionIcon = (action: string) => {
  switch (action) {
    case 'create':
      return <Plus className="h-5 w-5 text-green-600" />;
    case 'update':
      return <Activity className="h-5 w-5 text-blue-600" />;
    case 'delete':
      return <Trash2 className="h-5 w-5 text-red-600" />;
    case 'login':
      return <User className="h-5 w-5 text-purple-600" />;
    case 'logout':
      return <Eye className="h-5 w-5 text-slate-600" />;
    case 'suspend':
      return <Ban className="h-5 w-5 text-amber-600" />;
    case 'unsuspend':
      return <UserCheck className="h-5 w-5 text-emerald-600" />;
    default:
      return <FileText className="h-5 w-5 text-slate-400" />;
  }
};

const getActionBadgeColor = (action: string) => {
  switch (action) {
    case 'create':
      return 'bg-green-100 text-green-800';
    case 'update':
      return 'bg-blue-100 text-blue-800';
    case 'delete':
      return 'bg-red-100 text-red-800';
    case 'login':
      return 'bg-purple-100 text-purple-800';
    case 'logout':
      return 'bg-slate-100 text-slate-800';
    case 'suspend':
      return 'bg-amber-100 text-amber-800';
    case 'unsuspend':
      return 'bg-emerald-100 text-emerald-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function AuditsPage() {
  const dispatch = useAppDispatch();
  const { audits, loading, error } = useAppSelector((state) => state.audits);
  const { isAuthenticated, user, loading: authLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Only fetch audits once authenticated and user is loaded
    if (isAuthenticated && user) {
      dispatch(fetchAudits());
    }
  }, [dispatch, isAuthenticated, user]);

  if (loading && audits.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 text-lg font-medium">Error: {error}</p>
          <button
            onClick={() => dispatch(fetchAudits())}
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
          <h1 className="text-2xl font-bold text-slate-800">Audit Logs</h1>
          <p className="text-slate-600 mt-1">Track all system activities and changes</p>
        </div>
      </div>

      <div className="space-y-4">
        {audits.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
            <Clock className="h-12 w-12 mx-auto text-slate-400" />
            <h3 className="mt-4 text-lg font-medium text-slate-800">No Audit Logs Found</h3>
            <p className="mt-2 text-slate-600">Start performing actions to see audit logs here</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Entity
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Performed By
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {audits.map((audit: Audit) => (
                  <tr key={audit._id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getActionIcon(audit.action)}
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionBadgeColor(audit.action)}`}
                        >
                          {audit.action.charAt(0).toUpperCase() + audit.action.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {audit.entity}
                      {audit.entityId && <span className="text-xs text-slate-500 ml-2">({audit.entityId.substring(0, 8)}...)</span>}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {audit.performedByName || audit.performedBy.substring(0, 8) + '...'}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {audit.createdAt ? new Date(audit.createdAt).toLocaleString() : 'Not available'}
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
