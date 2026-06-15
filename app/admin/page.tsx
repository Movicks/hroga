'use client';

import { useAppSelector } from '../../redux/hooks';

export default function AdminDashboardPage() {
  const { user } = useAppSelector((state) => state.auth);

  const stats = [
    { label: 'Upcoming activities', value: '08' },
    { label: 'Gallery collections', value: '24' },
    { label: 'Pending reviews', value: '05' },
  ];

  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-slate-900 px-6 py-8 text-white shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Overview</p>
        <h2 className="mt-3 text-3xl font-semibold">
          Welcome, {user?.firstName} {user?.lastName}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
          Monitor platform activity, publish updates, and manage gallery content from a single dashboard.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Recent activity</h3>
          <div className="mt-5 space-y-4">
            {['Approved new alumni submission', 'Updated reunion event details', 'Published new gallery highlight'].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Quick notes</h3>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Use the sidebar to switch between activities and gallery management. The search bar in the topbar
            is ready for future data wiring.
          </p>
        </div>
      </div>
    </section>
  );
}
