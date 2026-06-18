type AlumniHeroProps = {
  fullName: string;
  profileCompletion: number;
  yearOfGraduation?: string;
};

export default function AlumniHero({
  fullName,
  profileCompletion,
  yearOfGraduation,
}: AlumniHeroProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-darkNavy p-6 text-white shadow-xs sm:p-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl space-y-4">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-white/75">Welcome back</p>
            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
              {fullName || 'Alumni Member'}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
              This dashboard keeps your alumni journey in one place, from profile updates and
              giving history to quick ways to support the HROGA community.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:w-[20rem] lg:grid-cols-1">
          <div className="rounded-xl border border-white/15 bg-white/10 p-5 shadow-xs backdrop-blur">
            <p className="text-xs uppercase tracking-[0.25em] text-white/70">
              Profile completion
            </p>
            <p className="mt-3 text-3xl font-semibold">{profileCompletion}%</p>
            <div className="mt-4 h-2 rounded-full bg-white/15">
              <div
                className="h-2 rounded-full bg-white"
                style={{ width: `${profileCompletion}%` }}
              />
            </div>
          </div>

          <div className="rounded-xl border border-white/15 bg-white/10 p-5 shadow-xs backdrop-blur">
            <p className="text-xs uppercase tracking-[0.25em] text-white/70">Class year</p>
            <p className="mt-3 text-3xl font-semibold">{yearOfGraduation || 'N/A'}</p>
            <p className="mt-2 text-sm text-white/80">Part of the HROGA sisterhood network.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
