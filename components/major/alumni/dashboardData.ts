import {
  CalendarDays,
  CreditCard,
  HandHeart,
  MapPin,
  Settings,
  type LucideIcon,
} from 'lucide-react';

export type QuickAction = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export type OverviewCard = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
};

export const quickActions: QuickAction[] = [
  {
    title: 'Update Profile',
    description: 'Keep your contact details and address information current.',
    href: '/alumni/profile-setting',
    icon: Settings,
  },
  {
    title: 'My Donations',
    description: 'Review your giving history and track contribution progress.',
    href: '/alumni/my_donate',
    icon: CreditCard,
  },
  {
    title: 'Make A Donation',
    description: 'Support student welfare, events, and community initiatives.',
    href: '/donate',
    icon: HandHeart,
  },
];

export function getOverviewCards(isAddressSaved: boolean): OverviewCard[] {
  return [
    {
      title: 'Community Role',
      value: 'Alumni',
      description: 'You are signed in with alumni access and member-only tools.',
      icon: HandHeart,
    },
    {
      title: 'Giving Status',
      value: 'Ready',
      description: 'Your dashboard is set up for donation tracking and new contributions.',
      icon: CreditCard,
    },
    {
      title: 'Address Status',
      value: isAddressSaved ? 'Saved' : 'Pending',
      description: 'Keep both current and permanent addresses updated for outreach.',
      icon: MapPin,
    },
  ];
}

export const nextStepCard: OverviewCard = {
  title: 'Next Best Step',
  value: 'Complete profile',
  description: 'A fuller profile improves alumni records and future engagement.',
  icon: CalendarDays,
};
