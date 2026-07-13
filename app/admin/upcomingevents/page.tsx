'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  clearEventError,
  Event,
  EventType,
} from '../../../redux/features/events/eventsSlice';
import Loader from '@/components/reusables/Loader';

const eventTypes: EventType[] = ['Birthday', 'Wedding', 'New Arrivals'];

export default function AdminUpcomingEvents() {
  const dispatch = useAppDispatch();
  const { events, loading, error } = useAppSelector((state) => state.events);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    type: 'Birthday' as EventType,
    title: '',
    dateLocation: '',
    description: '',
  });

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleOpenModal = (eventItem?: Event) => {
    if (eventItem) {
      setEditingId(eventItem._id);
      setFormData({
        type: eventItem.type,
        title: eventItem.title,
        dateLocation: eventItem.dateLocation,
        description: eventItem.description,
      });
    } else {
      setEditingId(null);
      setFormData({
        type: 'Birthday',
        title: '',
        dateLocation: '',
        description: '',
      });
    }
    setIsModalOpen(true);
    dispatch(clearEventError());
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      type: 'Birthday',
      title: '',
      dateLocation: '',
      description: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await dispatch(updateEvent({ id: editingId, data: formData }));
    } else {
      await dispatch(createEvent(formData));
    }
    handleCloseModal();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      await dispatch(deleteEvent(id));
    }
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 gap-4 shadow-sm flex flex-col md:flex-row justify-between items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Upcoming Events</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Events Management</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Manage birthdays, weddings, new arrivals, and other community milestones.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#020618] text-white px-6 py-3 rounded-xl hover:bg-[#020618]/70 transition-all shadow-xs"
        >
          <Plus size={20} />
          <span>Add Event</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => dispatch(clearEventError())}>
            <X size={18} />
          </button>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading && events.length === 0 ? (
          <div className="col-span-full py-12">
            <Loader loadTitle='Loading events'/>
          </div>
        ) : events.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500">No events found. Add one to get started!</div>
        ) : (
          events.map((event) => (
            <div key={event._id} className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-md">
                    {event.type}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal(event)}
                      className="p-1 text-slate-500 hover:text-primary transition-colors"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="p-1 text-slate-500 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{event.title}</h3>
                <p className="text-sm text-primary font-semibold mb-2">{event.dateLocation}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{event.description}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {editingId ? 'Edit Event' : 'Add New Event'}
              </h2>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Event Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as EventType })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                >
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="e.g., Mrs. Adaeze Okonkwo"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date & Location</label>
                <input
                  type="text"
                  value={formData.dateLocation}
                  onChange={(e) => setFormData({ ...formData, dateLocation: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="e.g., June 15, 2026"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="e.g., Class of 1994 · Celebrating her 50th..."
                  rows={3}
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
