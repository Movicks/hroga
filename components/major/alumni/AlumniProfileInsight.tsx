import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type MissingProfileItem = {
  title: string;
  description: string;
};

type AlumniProfileInsightProps = {
  isProfileComplete: boolean;
  missingProfileItems: MissingProfileItem[];
};

export default function AlumniProfileInsight({
  isProfileComplete,
  missingProfileItems,
}: AlumniProfileInsightProps) {
  return (
    <div className="rounded-xl border border-darkNavy/10 bg-white p-6 shadow-xs sm:p-7">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-darkNavy/70">
        {isProfileComplete ? 'Profile status' : 'Profile insight'}
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-darkNavy">
        {isProfileComplete
          ? 'Your alumni profile is complete'
          : 'A stronger record helps the association stay connected'}
      </h2>

      {isProfileComplete ? (
        <div className="mt-6 rounded-xl border border-darkNavy/10 bg-darkNavy p-5 shadow-xs">
          <p className="text-sm font-semibold text-white">Everything important is on file</p>
          <p className="mt-2 text-sm leading-6 text-white/80">
            Your key alumni details are complete, so you can focus on staying connected,
            supporting community projects, and managing your donations when needed.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {missingProfileItems.map((item) => (
              <div key={item.title} className="rounded-xl border border-darkNavy/10 p-4 shadow-xs">
                <p className="text-sm font-semibold text-darkNavy">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-darkNavy/70">{item.description}</p>
              </div>
            ))}
          </div>

          <Link
            href="/alumni/profile-setting"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-darkNavy px-5 py-3 text-sm font-semibold text-white transition hover:bg-darkNavy/90"
          >
            Complete my profile
            <ArrowRight size={16} />
          </Link>
        </>
      )}
    </div>
  );
}
