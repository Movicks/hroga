interface CoreValue {
  id: number;
  letter: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
}

interface DeftUp {
  id: number
  title: string;
  description: string;
}

interface CoreValuesData {
  acronym: string;
  values: CoreValue[];
  deftUp: DeftUp;
}

export const coreValuesDummy: CoreValuesData = {
  acronym: "D.E.F.T U.P",
  values: [
    {
      id: 1,
      letter: "D",
      title: "Discipline",
      subtitle: "Discipline:",
      description:
        "A culture of self-control, responsibility, and accountability.",
      color: "bg-[#0882de]",
    },
    {
      id: 2,
      letter: "E",
      title: "Excellence",
      subtitle: "Excellence:",
      description:
        "Striving to shine and lead in academics and in all life pursuits.",
      color: "bg-[#37c45d]",
    },
    {
      id: 3,
      letter: "F",
      title: "Faith",
      subtitle: "Faith and Resilience:",
      description:
        "Upholding the light of Holy Rosary and remaining steadfast through challenges.",
      color: "bg-[#ca31e0]",
    },
    {
      id: 4,
      letter: "T",
      title: "Truth",
      subtitle: "Truth and Service:",
      description:
        "Commitment to integrity, honesty, and service to others.",
      color: "bg-[#fd2d57]",
    },
    {
      id: 5,
      letter: "U",
      title: "Unity",
      subtitle: "Unity and Sisterhood:",
      description:
        "Cluster together for a firm union, standing strong as one body.",
      color: "bg-[#6255f5]",
    },
    {
      id: 6,
      letter: "P",
      title: "Patriotism",
      subtitle: "Patriotism:",
      description:
        "Fruitful Garden of Young Patriots, dedicated to building and brightening Nigeria.",
      color: "bg-[#01bfe8]",
    },
  ],

deftUp: {
    id: 0,
    title: "Deft-Up",
    description:
      "To rise skillfully and confidently, guided by Discipline, Excellence, Faith, Truth, Unity, and Patriotism.",
  },
};