'use client';

import AlumniHero from '../../components/major/alumni/AlumniHero';
import AlumniOverviewGrid from '../../components/major/alumni/AlumniOverviewGrid';
import AlumniProfileInsight from '../../components/major/alumni/AlumniProfileInsight';
import AlumniQuickActions from '../../components/major/alumni/AlumniQuickActions';
import AlumniSnapshotCard from '../../components/major/alumni/AlumniSnapshotCard';
import { getOverviewCards } from '../../components/major/alumni/dashboardData';
import { useAppSelector } from '../../redux/hooks';

export default function AlumniDashboardPage() {
  const { user } = useAppSelector((state) => state.auth);
  const fullName = [user?.firstName, user?.middleName, user?.lastName]
    .filter(Boolean)
    .join(' ');
  const currentAddress = [
    user?.currentAddress?.city,
    user?.currentAddress?.state,
    user?.currentAddress?.country,
  ]
    .filter(Boolean)
    .join(', ');
  const completionItems = [
    Boolean(user?.phoneNumber),
    Boolean(user?.currentAddress?.addressLine),
    Boolean(user?.permanentAddress?.addressLine),
    Boolean(user?.yearOfGraduation),
  ];
  const profileCompletion = Math.round(
    (completionItems.filter(Boolean).length / completionItems.length) * 100,
  );
  const overviewCards = getOverviewCards(Boolean(user?.currentAddress?.addressLine));
  const isProfileComplete = completionItems.every(Boolean);
  const missingProfileItems = [
    !user?.phoneNumber
      ? {
          title: 'Phone number',
          description: 'Add your phone number so the association can reach you when needed.',
        }
      : null,
    !user?.currentAddress?.addressLine
      ? {
          title: 'Current address',
          description: 'Complete your current address for location-based engagement and outreach.',
        }
      : null,
    !user?.permanentAddress?.addressLine
      ? {
          title: 'Permanent address',
          description: 'Keep your permanent address on file for complete alumni records.',
        }
      : null,
    !user?.yearOfGraduation
      ? {
          title: 'Graduation year',
          description: 'Add your class year to improve alumni directory accuracy.',
        }
      : null,
  ].filter(Boolean) as { title: string; description: string }[];

  return (
    <section className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <AlumniHero
          fullName={fullName}
          profileCompletion={profileCompletion}
          yearOfGraduation={user?.yearOfGraduation}
        />
        <AlumniSnapshotCard
          firstName={user?.firstName}
          email={user?.email}
          phoneNumber={user?.phoneNumber}
          currentAddress={currentAddress}
        />
      </div>

      <AlumniOverviewGrid cards={overviewCards} showNextStep={!isProfileComplete} />

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <AlumniQuickActions />
        <AlumniProfileInsight
          isProfileComplete={isProfileComplete}
          missingProfileItems={missingProfileItems}
        />
      </div>
    </section>
  );
}
