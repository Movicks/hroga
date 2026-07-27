'use client';

import { useAppSelector } from '../../redux/hooks';

export default function AdminDashboardPage() {
  const { user } = useAppSelector((state) => state.auth);

  const {
    donations,
    loading: donationsLoading,
    error: donationsError,
  } = useAppSelector((state) => state.donations);

  const {
    gallery,
    loading: galleryLoading,
    error: galleryError,
  } = useAppSelector((state) => state.gallery);

  const { users,
    loading: usersLoading,
    error: usersError
  } = useAppSelector((state) => state.users);

  const {activities, loading: activitiesLoading, error: activitiesError} = useAppSelector((state) => state.activities)

  const isLoading = donationsLoading || galleryLoading || usersLoading || activitiesLoading;

  const error = donationsError || galleryError || usersError || activitiesError;

  const stats = [
    {
      label: "Total Alumni", 
      value: String(users?.length ?? 0).padStart(2, '0')
    },
    {
      label: 'Upcoming activities',
      value: String(activities?.length ?? 0).padStart(2, '0'),
    },
    {
      label: 'Gallery collections',
      value: String(gallery?.length ?? 0).padStart(2, '0'),
    },
    {
      label: 'Successful Donations',
      value: String(donations?.length ?? 0).padStart(2, '0'),
    },
  ];

  if (isLoading) {
    return (
      <section className="space-y-6 animate-pulse">
        <div className="rounded-xl bg-slate-200 px-6 py-8">
          <div className="h-4 w-24 rounded bg-slate-300" />
          <div className="mt-4 h-9 w-80 rounded bg-slate-300" />
          <div className="mt-4 h-4 max-w-2xl rounded bg-slate-300" />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="h-4 w-32 rounded bg-slate-200" />
              <div className="mt-4 h-9 w-16 rounded bg-slate-200" />
            </div>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
          <div className="h-64 rounded-xl border border-slate-200 bg-white p-6 shadow-sm" />

          <div className="h-64 rounded-xl border border-slate-200 bg-white p-6 shadow-sm" />
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="rounded-xl bg-slate-900 px-6 py-8 text-white shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
          Overview
        </p>

        <h2 className="mt-3 text-3xl font-semibold">
          Welcome, {user?.firstName} {user?.lastName}
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
          Monitor platform activity, publish updates, and manage gallery
          content from a single dashboard.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">
              {stat.label}
            </p>

            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            Recent activity
          </h3>

          <div className="mt-5 space-y-4">
            {[
              'Approved new alumni submission',
              'Updated reunion event details',
              'Published new gallery highlight',
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            Quick notes
          </h3>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            Use the sidebar to switch between activities and gallery
            management. The search bar in the topbar is ready for future data
            wiring.
          </p>
        </div>
      </div>
    </section>
  );
}