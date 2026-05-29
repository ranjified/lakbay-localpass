import type { UserRole } from "./types";

export type ExperienceItem = {
  title: string;
  description: string;
  webAccess: string[];
  mobileAccess: string[];
  uniqueFeature: string;
  primaryCta: string;
  href: string;
};

export type RoleExperience = {
  role: UserRole;
  label: string;
  dashboardName: string;
  mobileName: string;
  colorTag: string;
  mission: string;
  webFeatures: string[];
  mobileFeatures: string[];
  uniqueMode: string;
  demoScenario: string;
  quickActions: { label: string; href: string; hint: string }[];
  inbox: { title: string; status: string; note: string }[];
};

export type FoodItem = {
  id: string;
  shop: string;
  name: string;
  category: "Meal" | "Pasalubong" | "Snack" | "Bundle";
  price: string;
  prepTime: string;
  pickupPoint: string;
  localPassReward: string;
  trailTag: string;
};

export type StayOption = {
  id: string;
  name: string;
  stayType: "Inn" | "Homestay" | "Farm Stay" | "Resort" | "Retreat House";
  bestFor: string;
  location: string;
  room: string;
  rate: string;
  inclusions: string[];
  matchTags: string[];
};

export type VehicleOption = {
  id: string;
  name: string;
  vehicleType: "Tricycle" | "Van" | "Tour Vehicle" | "Terminal Pickup" | "Group Shuttle";
  capacity: string;
  route: string;
  priceMode: string;
  driverNote: string;
  routeBadge: string;
};

export type TourPackage = {
  id: string;
  guide: string;
  name: string;
  duration: string;
  idealFor: string;
  meetingPoint: string;
  includes: string[];
  storyCards: string[];
};

export type DemoRequest = {
  id: string;
  kind: "Food Order" | "Stay Booking" | "Ride Request" | "Tour Request" | "Event Interest";
  tourist: string;
  provider: string;
  status: "Pending" | "Confirmed" | "Preparing" | "Ready" | "On Route" | "Completed";
  detail: string;
  ownerRole: UserRole;
};

export const roleExperiences: Record<UserRole, RoleExperience> = {
  tourist: {
    role: "tourist",
    label: "Tourist / Visitor",
    dashboardName: "My Lakbay Pass",
    mobileName: "Lakbay Pocket Pass",
    colorTag: "Explorer",
    mission: "Plan a Tayabas trip, scan QR stories, book local services, and collect rewards in one journey.",
    webFeatures: [
      "Build a route by travel style",
      "View destination stories and map cards",
      "Book stays through Stay Match",
      "Request local vehicles through Route Buddy",
      "Order food and pasalubong through Taste Trail",
      "Track points, coupons, badges, and booking statuses"
    ],
    mobileFeatures: [
      "Scan LocalPass QR at destinations",
      "Use Nearby Now suggestions",
      "Quick order food or pasalubong",
      "Request ride from current stop",
      "Show coupons to merchants",
      "Receive booking confirmations"
    ],
    uniqueMode: "Lakbay Mode recommends places, food, rides, stays, and rewards based on Heritage Walk, Food Trip, Family Tour, Pilgrim Route, or Pasalubong Run.",
    demoScenario: "A visitor scans the Basilica QR, earns points, orders budin for pickup, books a farm stay, and requests a Heritage Trike Loop.",
    quickActions: [
      { label: "Order food", href: "/food", hint: "Taste Trail preorder and pickup" },
      { label: "Book stay", href: "/stays", hint: "Stay Match inquiry" },
      { label: "Grab vehicle", href: "/transport", hint: "Route Buddy ride request" },
      { label: "Scan QR", href: "/qr", hint: "Earn LocalPass points" }
    ],
    inbox: [
      { title: "Budin pickup", status: "Ready", note: "Show LocalPass coupon at Tayabas Budin House." },
      { title: "Heritage Trike Loop", status: "Confirmed", note: "Driver will meet you at Casa Comunidad." },
      { title: "Farm stay inquiry", status: "Pending", note: "Host is reviewing guest count and date." }
    ]
  },
  merchant: {
    role: "merchant",
    label: "Food Merchant / Pasalubong Seller",
    dashboardName: "Local Seller Counter",
    mobileName: "Seller Quick Counter",
    colorTag: "MSME Boost",
    mission: "Turn a small shop into a tourism-ready pickup, preorder, bundle, and coupon point.",
    webFeatures: [
      "Manage shop profile and photos",
      "Add meals, pasalubong bundles, and daily availability",
      "Confirm, prepare, and complete orders",
      "Create LocalPass coupons",
      "Attach products to nearby routes",
      "View product clicks and QR-driven visits"
    ],
    mobileFeatures: [
      "Receive new order alerts",
      "Mark order as preparing or ready",
      "Reply to tourist notes",
      "Toggle product availability",
      "Validate coupon claims",
      "See daily pickup queue"
    ],
    uniqueMode: "Tourism Boost Card lets a seller attach products to specific routes like Basilica Snack Stop, Pasalubong Run, or Food Trip Trail.",
    demoScenario: "A merchant receives a budin bundle preorder from a tourist who scanned a nearby QR story, prepares it, and marks it ready for pickup.",
    quickActions: [
      { label: "Manage orders", href: "/food", hint: "Accept and prepare tourist orders" },
      { label: "Create coupon", href: "/dashboard?role=merchant", hint: "LocalPass reward offer" },
      { label: "Attach to route", href: "/map", hint: "Appear near tourist stops" },
      { label: "View analytics", href: "/dashboard?role=merchant", hint: "Clicks, claims, and visits" }
    ],
    inbox: [
      { title: "Budin Bundle x2", status: "Preparing", note: "Pickup at 3:00 PM. Tourist used Food Trail badge." },
      { title: "Cafe meal set", status: "Pending", note: "Student group asks for 12 pax quotation." },
      { title: "Coupon claim", status: "Completed", note: "LocalPass 10 percent promo validated." }
    ]
  },
  guide: {
    role: "guide",
    label: "Tour Guide",
    dashboardName: "Kwentong Gabay Desk",
    mobileName: "Guide Story Kit",
    colorTag: "Story Keeper",
    mission: "Package local knowledge into bookable heritage walks, food tours, and student learning routes.",
    webFeatures: [
      "Create tour packages",
      "Set available dates and group size",
      "Receive guide booking requests",
      "Prepare route story cards",
      "View ratings and feedback",
      "Coordinate with transport and food partners"
    ],
    mobileFeatures: [
      "Accept tour requests",
      "Open meeting point map",
      "Use story cards during tour",
      "Check guest count and notes",
      "Mark tour as started or completed",
      "Ask for rating after tour"
    ],
    uniqueMode: "Story Cards convert oral history into short, reusable guide scripts tied to QR destinations.",
    demoScenario: "A guide accepts a Heritage Walk request, opens Basilica and Casa Comunidad story cards, then completes the tour and asks for rating.",
    quickActions: [
      { label: "Tour requests", href: "/tours", hint: "Accept guide bookings" },
      { label: "Story cards", href: "/tours", hint: "Open destination scripts" },
      { label: "Route map", href: "/map", hint: "Guide the group" },
      { label: "Ratings", href: "/dashboard?role=guide", hint: "View feedback" }
    ],
    inbox: [
      { title: "Saturday Heritage Walk", status: "Pending", note: "6 guests, meeting at Basilica entrance." },
      { title: "Student tour", status: "Confirmed", note: "Teacher requested civic history focus." },
      { title: "Food Crawl", status: "Completed", note: "Rating request sent." }
    ]
  },
  transport: {
    role: "transport",
    label: "Transport Provider",
    dashboardName: "Sakay Tayabas Board",
    mobileName: "Driver Route Board",
    colorTag: "Route Buddy",
    mission: "Offer tourist-friendly local rides, terminal pickups, loops, and group transfers.",
    webFeatures: [
      "Manage driver or operator profile",
      "Publish route packages",
      "Accept ride and transfer requests",
      "Set service area and schedule",
      "View pickup notes",
      "Track completed tourist rides"
    ],
    mobileFeatures: [
      "Accept incoming ride request",
      "Open pickup and destination details",
      "Call or message tourist",
      "Mark arrived and completed",
      "Toggle available status",
      "View today’s route queue"
    ],
    uniqueMode: "Route Buddy offers tourism loops instead of generic ride hailing, such as Heritage Trike Loop and Pasalubong Stopover Ride.",
    demoScenario: "A driver accepts a Casa Comunidad pickup, follows a Food Loop stopover, and completes the ride for LocalPass points.",
    quickActions: [
      { label: "Ride queue", href: "/transport", hint: "Accept Sakay requests" },
      { label: "Route packages", href: "/transport", hint: "Publish tourist loops" },
      { label: "Map stops", href: "/map", hint: "View pickup areas" },
      { label: "Availability", href: "/dashboard?role=transport", hint: "Set active hours" }
    ],
    inbox: [
      { title: "Terminal to Basilica", status: "Confirmed", note: "2 passengers, light baggage." },
      { title: "Food Trip Loop", status: "Pending", note: "Group of 4 requests 4:30 PM pickup." },
      { title: "Farm stay transfer", status: "On Route", note: "Drop-off at Rural Tayabas stay." }
    ]
  },
  accommodation: {
    role: "accommodation",
    label: "Accommodation Owner",
    dashboardName: "Stay Tayabas Desk",
    mobileName: "Host Pocket Desk",
    colorTag: "Stay Match",
    mission: "Help inns, homestays, resorts, and farm stays receive tourism-linked booking inquiries.",
    webFeatures: [
      "Manage property listing",
      "Add room types and amenities",
      "Receive booking inquiries",
      "Confirm or decline reservations",
      "Offer breakfast, tour, or ride add-ons",
      "View inquiry calendar"
    ],
    mobileFeatures: [
      "Confirm booking request",
      "Message guest",
      "Update room availability",
      "Send check-in instructions",
      "Mark guest checked in",
      "Offer local add-ons"
    ],
    uniqueMode: "Stay Match tags rooms by trip purpose, such as Best for Pilgrims, Family Tour, Quiet Retreat, or Budget Barkada Stay.",
    demoScenario: "A host receives a Family Tour stay request, confirms a room, adds breakfast, and suggests a nearby Pasalubong Run.",
    quickActions: [
      { label: "Booking inbox", href: "/stays", hint: "Confirm stay requests" },
      { label: "Room listing", href: "/stays", hint: "Edit room and amenities" },
      { label: "Add-ons", href: "/dashboard?role=accommodation", hint: "Breakfast, tour, transport" },
      { label: "Guest guide", href: "/destinations", hint: "Recommend nearby stops" }
    ],
    inbox: [
      { title: "Family room inquiry", status: "Pending", note: "4 guests, one night, asks for parking." },
      { title: "Pilgrim overnight", status: "Confirmed", note: "Late check-in instructions sent." },
      { title: "Farm breakfast add-on", status: "Completed", note: "Added to guest itinerary." }
    ]
  },
  event_organizer: {
    role: "event_organizer",
    label: "Event Organizer",
    dashboardName: "Tayabas Events Desk",
    mobileName: "Event Day Console",
    colorTag: "Trip Builder",
    mission: "Publish events that automatically connect to nearby food, rides, stays, and QR challenges.",
    webFeatures: [
      "Create event listing",
      "Add venue, schedule, and registration link",
      "Connect event to routes and merchants",
      "Create event QR challenge",
      "View interested visitors",
      "Send event updates"
    ],
    mobileFeatures: [
      "Post event update",
      "Check interested visitors",
      "Share event QR",
      "Mark event as ongoing",
      "Send announcement",
      "Recommend nearby services"
    ],
    uniqueMode: "Event Trip Builder converts an event into a full visitor plan with where to eat, where to stay, how to get there, and what badge to earn.",
    demoScenario: "An organizer publishes Heritage Weekend Walk and links it to Budin pickup, a trike loop, and nearby homestays.",
    quickActions: [
      { label: "Publish event", href: "/events", hint: "Create event cards" },
      { label: "Event QR", href: "/events", hint: "Create challenge" },
      { label: "Partner bundle", href: "/food", hint: "Link merchants" },
      { label: "Visitor interest", href: "/dashboard?role=event_organizer", hint: "View saves and clicks" }
    ],
    inbox: [
      { title: "Heritage Weekend Walk", status: "Confirmed", note: "46 interested visitors." },
      { title: "Food merchant bundle", status: "Pending", note: "Waiting for 2 merchant confirmations." },
      { title: "Event QR challenge", status: "Ready", note: "Badge reward configured." }
    ]
  },
  tourism_staff: {
    role: "tourism_staff",
    label: "City Tourism Staff",
    dashboardName: "Tourism Command Center",
    mobileName: "Field Tourism Console",
    colorTag: "City Pulse",
    mission: "Manage official tourism content, approvals, QR stories, events, and visitor activity insights.",
    webFeatures: [
      "Manage official destinations",
      "Create QR heritage stories",
      "Approve businesses, guides, rides, and stays",
      "Curate routes and event calendars",
      "View tourism heat pulse analytics",
      "Export reports for planning"
    ],
    mobileFeatures: [
      "Preview QR story on site",
      "Review visitor feedback",
      "Approve urgent listing edits",
      "Monitor active events",
      "Feature under-promoted spots",
      "Check live scan pulse"
    ],
    uniqueMode: "Tourism Heat Pulse shows which destinations, merchants, routes, and event links are gaining visitor engagement.",
    demoScenario: "Tourism staff approves a farm stay listing, updates Casa Comunidad QR content, and sees that Food Loop is driving MSME clicks.",
    quickActions: [
      { label: "Approvals", href: "/admin", hint: "Review partner listings" },
      { label: "QR stories", href: "/qr", hint: "Manage heritage content" },
      { label: "Routes", href: "/map", hint: "Curate city itineraries" },
      { label: "Analytics", href: "/dashboard?role=tourism_staff", hint: "Tourism Heat Pulse" }
    ],
    inbox: [
      { title: "Farm stay listing", status: "Pending", note: "Needs photo and amenities review." },
      { title: "Casa QR story", status: "Ready", note: "Updated civic history content." },
      { title: "Merchant coupon", status: "Confirmed", note: "Approved for Food Trail." }
    ]
  },
  admin: {
    role: "admin",
    label: "System Admin",
    dashboardName: "Platform Control Room",
    mobileName: "Admin Watch Panel",
    colorTag: "Trust Queue",
    mission: "Protect platform data, roles, permissions, approvals, and operational reliability.",
    webFeatures: [
      "Manage users and roles",
      "Review trust and safety queue",
      "Suspend or restore listings",
      "Audit content changes",
      "Configure categories and badges",
      "Check system health"
    ],
    mobileFeatures: [
      "Approve urgent account",
      "Lock suspicious listing",
      "View platform alerts",
      "Check role changes",
      "Open audit trail",
      "Monitor deployment notes"
    ],
    uniqueMode: "Trust and Safety Queue highlights unverified merchants, duplicate listings, reported guides, and suspicious booking patterns.",
    demoScenario: "Admin assigns roles, approves a transport provider, hides a duplicate listing, and checks the audit trail.",
    quickActions: [
      { label: "User roles", href: "/admin", hint: "Assign access" },
      { label: "Safety queue", href: "/admin", hint: "Review reports" },
      { label: "System settings", href: "/dashboard?role=admin", hint: "Configure demo" },
      { label: "Audit logs", href: "/admin", hint: "Track changes" }
    ],
    inbox: [
      { title: "New transport account", status: "Pending", note: "Needs verification before listing appears." },
      { title: "Duplicate stay listing", status: "Pending", note: "Suggested merge with existing property." },
      { title: "Reported guide profile", status: "Confirmed", note: "Reviewed and cleared." }
    ]
  }
};

export const experienceItems: ExperienceItem[] = [
  {
    title: "Taste Trail",
    description: "Tourists preorder food, reserve pasalubong bundles, and unlock food badges while merchants manage preparation and pickup.",
    webAccess: ["Browse shops", "Build basket", "Choose pickup or delivery request", "Track order status"],
    mobileAccess: ["Quick reorder", "Show pickup QR", "Claim coupon", "Receive ready alert"],
    uniqueFeature: "Food orders are tied to tourism routes and QR badges, not just delivery.",
    primaryCta: "Order food demo",
    href: "/food"
  },
  {
    title: "Stay Match",
    description: "Tourists book inns, homestays, farm stays, and retreat houses based on trip style while hosts manage inquiries.",
    webAccess: ["Compare stay tags", "Select date", "Send booking request", "Receive confirmation"],
    mobileAccess: ["Book from itinerary", "Message host", "View check-in guide", "Save nearby stops"],
    uniqueFeature: "Rooms are recommended by tourism purpose such as pilgrim, family, retreat, or barkada stay.",
    primaryCta: "Book stay demo",
    href: "/stays"
  },
  {
    title: "Sakay Tayabas",
    description: "Tourists request local tricycles, vans, terminal pickups, and route loops while transport providers manage a queue.",
    webAccess: ["Choose pickup", "Pick route package", "Send ride request", "Track driver status"],
    mobileAccess: ["Request from current stop", "Call driver", "View pickup note", "Complete ride"],
    uniqueFeature: "Route Buddy promotes tourism loops instead of copying generic ride hailing.",
    primaryCta: "Grab vehicle demo",
    href: "/transport"
  },
  {
    title: "Kwentong Gabay",
    description: "Guides publish story-led routes, accept tour bookings, and use digital story cards during walks.",
    webAccess: ["View packages", "Request guide", "Choose group size", "Add learning focus"],
    mobileAccess: ["Open story cards", "View meeting point", "Start tour", "Request rating"],
    uniqueFeature: "Tour guides get route scripts connected to QR heritage stories.",
    primaryCta: "Tour guide demo",
    href: "/tours"
  },
  {
    title: "Event Trip Builder",
    description: "Events become complete tourism plans with food, rides, stays, QR challenges, and merchant bundles.",
    webAccess: ["Publish event", "Link route", "Add partners", "Monitor interest"],
    mobileAccess: ["Event day update", "Share QR", "Send announcement", "Check attendees"],
    uniqueFeature: "Every event recommends where to eat, where to stay, and how to get there.",
    primaryCta: "Events demo",
    href: "/events"
  }
];

export const foodItems: FoodItem[] = [
  {
    id: "budin-box",
    shop: "Tayabas Budin House",
    name: "Budin Box Preorder",
    category: "Pasalubong",
    price: "₱180",
    prepTime: "45 minutes",
    pickupPoint: "Poblacion pickup counter",
    localPassReward: "+25 Taste Trail points",
    trailTag: "Pasalubong Run"
  },
  {
    id: "heritage-cafe-set",
    shop: "Heritage Cafe Tayabas",
    name: "Heritage Snack Set",
    category: "Snack",
    price: "₱150",
    prepTime: "20 minutes",
    pickupPoint: "Near heritage route",
    localPassReward: "+15 Food Explorer points",
    trailTag: "Heritage Walk"
  },
  {
    id: "family-food-bundle",
    shop: "Local Eats Demo Kitchen",
    name: "Family Food Trip Bundle",
    category: "Bundle",
    price: "₱680",
    prepTime: "60 minutes",
    pickupPoint: "Food Loop counter",
    localPassReward: "+40 Family Tour points",
    trailTag: "Family Day Tour"
  }
];

export const stayOptions: StayOption[] = [
  {
    id: "stay-heritage-inn",
    name: "Poblacion Heritage Inn",
    stayType: "Inn",
    bestFor: "Pilgrim Route and Heritage Walk",
    location: "Near Basilica and Casa Comunidad",
    room: "Standard twin room",
    rate: "₱1,400 per night",
    inclusions: ["Walkable heritage stops", "Basic breakfast option", "Late check-in request"],
    matchTags: ["Best for pilgrims", "Near heritage sites", "Budget friendly"]
  },
  {
    id: "stay-farm-retreat",
    name: "Tayabas Farm Stay Demo",
    stayType: "Farm Stay",
    bestFor: "Family Tour and Quiet Retreat",
    location: "Rural Tayabas",
    room: "Family room with breakfast add-on",
    rate: "₱2,800 per night",
    inclusions: ["Farm breakfast add-on", "Parking", "Nature side trip suggestion"],
    matchTags: ["Best for families", "Quiet retreat", "Workation friendly"]
  },
  {
    id: "stay-barkada-homestay",
    name: "Barkada Homestay Hub",
    stayType: "Homestay",
    bestFor: "Food Trip and Barkada Adventure",
    location: "City Proper",
    room: "Group room for 4 to 6 pax",
    rate: "₱3,200 per night",
    inclusions: ["Group room", "Nearby food trail", "Transport referral"],
    matchTags: ["Budget barkada stay", "Near food stops", "Group friendly"]
  }
];

export const vehicleOptions: VehicleOption[] = [
  {
    id: "heritage-trike-loop",
    name: "Heritage Trike Loop",
    vehicleType: "Tricycle",
    capacity: "1 to 3 passengers",
    route: "Basilica to Casa Comunidad to Budin Trail",
    priceMode: "Demo fixed package inquiry",
    driverNote: "Best for short city heritage route.",
    routeBadge: "Heritage Rider"
  },
  {
    id: "terminal-pickup",
    name: "Terminal Pickup Assist",
    vehicleType: "Terminal Pickup",
    capacity: "1 to 4 passengers",
    route: "Terminal to stay, basilica, or food stop",
    priceMode: "Driver confirms fare before trip",
    driverNote: "Good for first-time visitors arriving by public transport.",
    routeBadge: "Arrival Buddy"
  },
  {
    id: "family-van-day-tour",
    name: "Family Van Day Tour",
    vehicleType: "Van",
    capacity: "5 to 10 passengers",
    route: "Family route, food stop, pasalubong, stay transfer",
    priceMode: "Quote request",
    driverNote: "Best for families and group tours.",
    routeBadge: "Group Explorer"
  }
];

export const tourPackages: TourPackage[] = [
  {
    id: "heritage-walk",
    guide: "Lakbay Guide Juan",
    name: "Kwentong Tayabas Heritage Walk",
    duration: "2 hours",
    idealFor: "Students, balikbayans, first-time visitors",
    meetingPoint: "Basilica entrance",
    includes: ["Basilica story", "Casa Comunidad stop", "Photo prompts", "Pasalubong recommendation"],
    storyCards: ["Basilica etiquette", "Civic history", "Old Tayabas trivia"]
  },
  {
    id: "food-crawl",
    guide: "Lakbay Guide Maria",
    name: "Taste Trail Food Crawl",
    duration: "3 hours",
    idealFor: "Barkada and families",
    meetingPoint: "Food Loop marker",
    includes: ["Cafe stop", "Budin pickup", "Merchant stories", "Taste Trail badge"],
    storyCards: ["Budin story", "Local cafe scene", "Pasalubong culture"]
  },
  {
    id: "student-tour",
    guide: "Lakbay Edu Guide",
    name: "Student Educational Route",
    duration: "Half day",
    idealFor: "Schools and youth groups",
    meetingPoint: "Casa Comunidad",
    includes: ["History script", "Worksheet prompts", "Group QR challenge", "Feedback form"],
    storyCards: ["Civic identity", "Heritage preservation", "Local innovation"]
  }
];

export const demoRequests: DemoRequest[] = [
  {
    id: "REQ-FOOD-001",
    kind: "Food Order",
    tourist: "Demo Tourist",
    provider: "Tayabas Budin House",
    status: "Ready",
    detail: "Budin Box x2, pickup at 3:00 PM, LocalPass coupon applied.",
    ownerRole: "merchant"
  },
  {
    id: "REQ-STAY-001",
    kind: "Stay Booking",
    tourist: "Family Visitor",
    provider: "Tayabas Farm Stay Demo",
    status: "Pending",
    detail: "Family room, 4 guests, one night, asks for parking and breakfast.",
    ownerRole: "accommodation"
  },
  {
    id: "REQ-RIDE-001",
    kind: "Ride Request",
    tourist: "Balikbayan Guest",
    provider: "Local Transport Desk",
    status: "Confirmed",
    detail: "Terminal pickup to Basilica, 2 passengers, light baggage.",
    ownerRole: "transport"
  },
  {
    id: "REQ-TOUR-001",
    kind: "Tour Request",
    tourist: "SLSU Student Group",
    provider: "Lakbay Guide Juan",
    status: "Pending",
    detail: "Heritage Walk, 12 students, civic history focus.",
    ownerRole: "guide"
  },
  {
    id: "REQ-EVENT-001",
    kind: "Event Interest",
    tourist: "Weekend Visitor",
    provider: "Heritage Weekend Walk",
    status: "Confirmed",
    detail: "Interested visitor saved event with food and ride recommendations.",
    ownerRole: "event_organizer"
  }
];

export const tripStyles = ["Heritage Walk", "Food Trip", "Family Day Tour", "Barkada Adventure", "Pilgrim Route", "Pasalubong Run"];
