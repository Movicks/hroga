export default function Activities() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Activities</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Manage activities</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Review upcoming events, edit schedules, and keep alumni activity updates organized.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          { title: 'Upcoming reunion', status: 'Draft schedule pending' },
          { title: 'Charity outreach', status: 'Ready for publication' },
          { title: 'School visit', status: 'Venue confirmation needed' },
          { title: 'Annual meetup', status: 'Open for registrations' },
        ].map((activity) => (
          <div key={activity.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{activity.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{activity.status}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
