export type BriefItem = {
  title: string;
  description: string;
};

export type DemoStep = {
  scene: string;
  summary: string;
};

export type Metric = {
  label: string;
  whyItMatters: string;
};

export type ImpactItem = {
  beneficiary: string;
  impact: string;
};

export type ValidationGroup = {
  group: string;
  targetCount: string;
  method: string;
  keyQuestion: string;
};

export type DemoAccountCredential = {
  role: string;
  email: string;
  password: string;
  dashboard: string;
};

export const problemPoints: BriefItem[] = [
  {
    title: "Scattered visitor information",
    description:
      "Tourists depend on social media, search results, and word of mouth, making it harder to plan a complete Tayabas trip.",
  },
  {
    title: "Missed local experiences",
    description:
      "Visitors often stay with popular places and miss heritage stories, food spots, pasalubong sellers, local guides, stays, and transport options.",
  },
  {
    title: "Limited MSME visibility",
    description:
      "Local businesses have uneven digital reach, so tourism spending does not spread as widely across the local economy.",
  },
  {
    title: "Weak visitor insight loop",
    description:
      "Tourism staff need clearer data on QR scans, destination interest, feedback, and participating businesses.",
  },
];

export const valuePillars: BriefItem[] = [
  {
    title: "Digital tourism guide",
    description:
      "A Tayabas-focused guide with maps, destinations, suggested itineraries, QR stories, visitor tips, and events.",
  },
  {
    title: "Local marketplace",
    description:
      "Food and pasalubong listings help visitors discover nearby sellers and send inquiry or preorder requests.",
  },
  {
    title: "Ride, tour, and stay requests",
    description:
      "Visitors can request transport, guided tours, and accommodation inquiries from one local platform.",
  },
  {
    title: "QR-based LocalPass rewards",
    description:
      "QR check ins, points, badges, coupons, and challenges make heritage discovery measurable and rewarding.",
  },
  {
    title: "Tourism and merchant dashboards",
    description:
      "Local stakeholders can manage listings, requests, QR content, approvals, feedback, and activity metrics.",
  },
];

export const demoStoryline: DemoStep[] = [
  {
    scene: "Tourist Discovery",
    summary:
      "A visitor opens Lakbay LocalPass and sees a Tayabas heritage route, nearby food spots, and featured pasalubong shops.",
  },
  {
    scene: "Heritage QR Scan",
    summary:
      "The visitor scans a QR code at a heritage site to unlock a story page, trivia, recommendations, and LocalPass points.",
  },
  {
    scene: "Local Spending",
    summary:
      "The visitor chooses a pasalubong bundle from the marketplace and submits a preorder request.",
  },
  {
    scene: "Mobility",
    summary:
      "The visitor requests a tricycle or van pickup for the next destination.",
  },
  {
    scene: "Merchant Dashboard",
    summary:
      "The merchant receives the preorder request and marks it accepted.",
  },
  {
    scene: "Tourism Dashboard",
    summary:
      "Tourism staff reviews check ins, popular destinations, QR scans, feedback, and participating businesses.",
  },
];

export const keyMetrics: Metric[] = [
  {
    label: "Number of QR scans",
    whyItMatters: "Measures heritage engagement.",
  },
  {
    label: "Number of destination views",
    whyItMatters: "Shows which places attract visitor interest.",
  },
  {
    label: "Number of itinerary saves",
    whyItMatters: "Measures planning usefulness.",
  },
  {
    label: "Number of merchant inquiries",
    whyItMatters: "Measures local economic activity.",
  },
  {
    label: "Number of ride or tour requests",
    whyItMatters: "Measures mobility demand.",
  },
  {
    label: "Number of stay inquiries",
    whyItMatters: "Measures accommodation demand.",
  },
  {
    label: "Number of active merchants",
    whyItMatters: "Measures MSME adoption.",
  },
  {
    label: "Visitor feedback rating",
    whyItMatters: "Measures tourist satisfaction.",
  },
  {
    label: "Repeat app usage",
    whyItMatters: "Measures product stickiness.",
  },
];

export const expectedImpact: ImpactItem[] = [
  {
    beneficiary: "Tourists",
    impact:
      "Easier trip planning, better local discovery, and a more meaningful Tayabas experience.",
  },
  {
    beneficiary: "MSMEs",
    impact:
      "More visibility, more inquiries, and more chances to earn from tourists.",
  },
  {
    beneficiary: "Transport Providers",
    impact: "More organized ride and tour requests.",
  },
  {
    beneficiary: "Accommodation Owners",
    impact: "A simple listing and inquiry channel.",
  },
  {
    beneficiary: "Tour Guides",
    impact: "Better promotion of local expertise and tour packages.",
  },
  {
    beneficiary: "Tourism Office",
    impact:
      "Improved destination promotion, feedback collection, and visitor activity data.",
  },
  {
    beneficiary: "Community",
    impact:
      "Wider tourism spending, stronger heritage appreciation, and stronger local branding.",
  },
];

export const validationGroups: ValidationGroup[] = [
  {
    group: "Tourists and visitors",
    targetCount: "10",
    method: "Short survey and prototype test",
    keyQuestion:
      "What information do you usually need before or during a visit?",
  },
  {
    group: "Local food and pasalubong businesses",
    targetCount: "10",
    method: "Interview",
    keyQuestion: "Would you join a Tayabas-focused tourism marketplace?",
  },
  {
    group: "Transport providers and tour guides",
    targetCount: "5",
    method: "Interview",
    keyQuestion:
      "Would ride and tour requests help you receive more bookings?",
  },
  {
    group: "Accommodation owners",
    targetCount: "3",
    method: "Interview",
    keyQuestion:
      "Would a simple local listing channel help you receive inquiries?",
  },
  {
    group: "Tourism staff",
    targetCount: "1 to 3",
    method: "Interview and dashboard walkthrough",
    keyQuestion: "What data and tools would help promote Tayabas better?",
  },
];

export const demoAccountCredentials: DemoAccountCredential[] = [
  {
    role: "Tourist",
    email: "tourist@lakbay.local",
    password: "demo12345",
    dashboard: "Tourist dashboard",
  },
  {
    role: "Food Merchant",
    email: "food@lakbay.local",
    password: "demo12345",
    dashboard: "Merchant dashboard",
  },
  {
    role: "Pasalubong Merchant",
    email: "pasalubong@lakbay.local",
    password: "demo12345",
    dashboard: "Merchant dashboard",
  },
  {
    role: "Transport Provider",
    email: "transport@lakbay.local",
    password: "demo12345",
    dashboard: "Provider dashboard",
  },
  {
    role: "Accommodation Owner",
    email: "stay@lakbay.local",
    password: "demo12345",
    dashboard: "Provider dashboard",
  },
  {
    role: "Tourism Staff",
    email: "tourism@lakbay.local",
    password: "demo12345",
    dashboard: "Tourism dashboard",
  },
  {
    role: "Admin",
    email: "admin@lakbay.local",
    password: "demo12345",
    dashboard: "Admin dashboard",
  },
];

export const productBrief = {
  problemPoints,
  valuePillars,
  demoStoryline,
  keyMetrics,
  expectedImpact,
  validationGroups,
  demoAccountCredentials,
};
