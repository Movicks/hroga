import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { quickActions } from './dashboardData';

export default function AlumniQuickActions() {
  return (
    <div className="rounded-xl border border-darkNavy/10 bg-white p-6 shadow-xs sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-darkNavy/70">
            Quick actions
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-darkNavy">
            Manage your alumni journey
          </h2>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.href}
              href={action.href}
              className="group rounded-xl border border-darkNavy/10 bg-white p-5 shadow-xs transition hover:border-darkNavy hover:bg-darkNavy hover:text-white"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-darkNavy text-white">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-darkNavy transition group-hover:text-white">
                {action.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-darkNavy/70 transition group-hover:text-white/80">
                {action.description}
              </p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-darkNavy transition group-hover:text-white">
                Open
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
