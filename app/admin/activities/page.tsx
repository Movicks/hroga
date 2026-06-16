'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  fetchActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  clearActivityError,
} from '../../../redux/features/activities/activitiesSlice';

export default function ActivitiesPage() {
  const dispatch = useAppDispatch();
  const { activities, loading, error } = useAppSelector((state) => state.activities);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    day: '',
    month: '',
    title: '',
    details: '',
  });

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  const handleOpenModal = (activity?: any) => {
    if (activity) {
      setEditingId(activity._id);
      setFormData({
        day: activity.day,
        month: activity.month,
        title: activity.title,
        details: activity.details,
      });
    } else {
      setEditingId(null);
      setFormData({ day: '', month: '', title: '', details: '' });
    }
    setIsModalOpen(true);
    dispatch(clearActivityError());
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ day: '', month: '', title: '', details: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await dispatch(updateActivity({ id: editingId, data: formData }));
    } else {
      await dispatch(createActivity(formData));
    }
    handleCloseModal();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this activity?')) {
      await dispatch(deleteActivity(id));
    }
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex justify-between items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Activities</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Manage activities</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Review upcoming events, edit schedules, and keep alumni activity updates organized.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all shadow-md"
        >
          <Plus size={20} />
          <span>Add Activity</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => dispatch(clearActivityError())}>
            <X size={18} />
          </button>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading && activities.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500">Loading activities...</div>
        ) : activities.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500">No activities found. Add one to get started!</div>
        ) : (
          activities.map((activity) => (
            <div key={activity._id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all group relative">
              <div className="flex justify-between items-start">
                <div className="bg-primary/10 text-black rounded-2xl p-3 text-center min-w-[60px]">
                  <span className="block text-xl font-bold">{activity.day}</span>
                  <span className="text-xs uppercase font-medium">{activity.month}</span>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleOpenModal(activity)}
                    className="p-2 text-slate-400 hover:text-primary transition-colors"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(activity._id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <h2 className="mt-4 text-lg font-semibold text-slate-900">{activity.title}</h2>
              <p className="mt-2 text-sm text-slate-600 line-clamp-3">{activity.details}</p>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-md p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {editingId ? 'Edit Activity' : 'Add New Activity'}
              </h2>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Day</label>
                  <input
                    type="text"
                    placeholder="e.g. 14"
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Month</label>
                  <input
                    type="text"
                    placeholder="e.g. AUG"
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Activity Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Details</label>
                <textarea
                  placeholder="Location, time, and other details..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary h-32 resize-none"
                  required
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 rounded-full hover:bg-slate-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-all font-medium disabled:opacity-50 shadow-md"
                >
                  {loading ? 'Saving...' : editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
