import { nextStepCard, type OverviewCard } from './dashboardData';

type AlumniOverviewGridProps = {
  cards: OverviewCard[];
  showNextStep: boolean;
};

function OverviewItem({ card }: { card: OverviewCard }) {
  const Icon = card.icon;

  return (
    <article className="rounded-xl border border-darkNavy/10 bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-darkNavy/70">{card.title}</p>
        <Icon className="text-darkNavy" size={20} />
      </div>
      <p className="mt-4 text-3xl font-semibold text-darkNavy">{card.value}</p>
      <p className="mt-2 text-sm leading-6 text-darkNavy/70">{card.description}</p>
    </article>
  );
}

export default function AlumniOverviewGrid({
  cards,
  showNextStep,
}: AlumniOverviewGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <OverviewItem key={card.title} card={card} />
      ))}
      {showNextStep && <OverviewItem card={nextStepCard} />}
    </div>
  );
}
