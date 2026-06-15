export default function Gallery() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Gallery</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Gallery management</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Organize image collections, review uploads, and maintain featured memories for the website.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {['Reunion highlights', 'Wedding moments', 'Visitations', 'Birthdays', 'Charity drives', 'School projects'].map((collection) => (
          <div key={collection} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="h-32 rounded-2xl bg-slate-100" />
            <h2 className="mt-4 text-lg font-semibold text-slate-900">{collection}</h2>
            <p className="mt-2 text-sm text-slate-600">Collection ready for editing and preview.</p>
          </div>
        ))}
      </div>
    </section>
  );
}
