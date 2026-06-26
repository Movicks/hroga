import { UserRound } from 'lucide-react';

type AlumniSnapshotCardProps = {
  firstName?: string;
  email?: string;
  phoneNumber?: string;
  currentAddress?: string;
};

export default function AlumniSnapshotCard({
  firstName,
  email,
  phoneNumber,
  currentAddress,
}: AlumniSnapshotCardProps) {
  return (
    <div className="rounded-xl border border-darkNavy/10 bg-white p-6 shadow-xs">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-darkNavy text-white">
          <UserRound size={26} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-darkNavy/70">
            Member snapshot
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-darkNavy">
            {firstName || 'Alumni'} profile
          </h2>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="rounded-xl bg-darkNavy/4 p-4 shadow-xs">
          <p className="text-xs uppercase tracking-[0.2em] text-darkNavy/55">Email</p>
          <p className="mt-2 break-all text-sm font-medium text-darkNavy">{email}</p>
        </div>
        <div className="rounded-xl bg-darkNavy/4 p-4 shadow-xs">
          <p className="text-xs uppercase tracking-[0.2em] text-darkNavy/55">Phone</p>
          <p className="mt-2 text-sm font-medium text-darkNavy">
            {phoneNumber || 'Add your phone number'}
          </p>
        </div>
        <div className="rounded-xl bg-darkNavy/4 p-4 shadow-xs">
          <p className="text-xs uppercase tracking-[0.2em] text-darkNavy/55">Current location</p>
          <p className="mt-2 text-sm font-medium text-darkNavy">
            {currentAddress || 'Complete your current address'}
          </p>
        </div>
      </div>
    </div>
  );
}
