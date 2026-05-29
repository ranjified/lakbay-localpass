import type { Business, Destination, EventItem, RoleProfile, UserRole } from "./types";
import type { DemoRequest } from "./experience-data";
import {
  demoRequests,
  experienceItems,
  foodItems,
  roleExperiences,
  stayOptions,
  tourPackages as guidePackages,
  tripStyles,
  vehicleOptions
} from "./experience-data";

export const destinations: Destination[] = [
  {
    id: "basilica-st-michael",
    name: "Minor Basilica of St. Michael the Archangel",
    category: "Religious",
    barangay: "Poblacion",
    description: "A landmark church and anchor stop for a heritage walk in Tayabas.",
    story: "QR story demo: Learn about the basilica, nearby heritage streets, visitor etiquette, and nearby food stops.",
    latitude: 14.0251,
    longitude: 121.5929,
    qrCode: "LP-BASILICA-001",
    points: 50,
    tags: ["heritage", "church", "walkable"]
  },
  {
    id: "casa-comunidad",
    name: "Casa Comunidad de Tayabas",
    category: "Heritage",
    barangay: "Poblacion",
    description: "A civic heritage structure that can anchor storytelling and student tours.",
    story: "QR story demo: Unlock old Tayabas civic stories, photo prompts, and nearby local merchant coupons.",
    latitude: 14.0243,
    longitude: 121.5914,
    qrCode: "LP-CASA-002",
    points: 40,
    tags: ["heritage", "history", "students"]
  },
  {
    id: "budin-trail",
    name: "Budin and Pasalubong Trail",
    category: "Pasalubong",
    barangay: "Poblacion",
    description: "A curated food trail that gives visibility to local delicacy makers.",
    story: "QR story demo: View pasalubong bundles, pickup instructions, merchant stories, and rewards.",
    latitude: 14.0263,
    longitude: 121.5941,
    qrCode: "LP-BUDIN-003",
    points: 30,
    tags: ["food", "pasalubong", "coupon"]
  },
  {
    id: "kamay-ni-hesus-route",
    name: "Pilgrim Route Connector",
    category: "Religious",
    barangay: "Route Link",
    description: "Suggested side trip route connecting Tayabas local stops with nearby pilgrim traffic.",
    story: "QR story demo: Use Tayabas as a food, heritage, and pasalubong side trip before or after pilgrim visits.",
    latitude: 14.0331,
    longitude: 121.6078,
    qrCode: "LP-PILGRIM-004",
    points: 25,
    tags: ["route", "pilgrim", "family"]
  },
  {
    id: "tayabas-food-loop",
    name: "Tayabas Food Loop",
    category: "Food",
    barangay: "City Proper",
    description: "A sample itinerary connecting restaurants, cafes, and local delicacy shops.",
    story: "QR story demo: Browse meal suggestions, preorder forms, and LocalPass reward stamps.",
    latitude: 14.0219,
    longitude: 121.5899,
    qrCode: "LP-FOOD-005",
    points: 35,
    tags: ["food", "msme", "preorder"]
  }
];

export const businesses: Business[] = [
  {
    id: "merchant-budin-house",
    name: "Tayabas Budin House",
    type: "Pasalubong",
    owner: "Demo Merchant",
    barangay: "Poblacion",
    status: "approved",
    engagement: 128,
    offers: ["Budin box preorder", "10 percent LocalPass coupon", "Pickup request"]
  },
  {
    id: "merchant-cafe-heritage",
    name: "Heritage Cafe Tayabas",
    type: "Cafe",
    owner: "Demo Merchant",
    barangay: "City Proper",
    status: "approved",
    engagement: 94,
    offers: ["Coffee stop", "Student tour meal set", "QR badge reward"]
  },
  {
    id: "guide-juan",
    name: "Lakbay Guide Juan",
    type: "Tour Guide",
    owner: "Juan Dela Cruz",
    barangay: "Poblacion",
    status: "pending",
    engagement: 23,
    offers: ["Heritage walk", "Food crawl", "Student tour package"]
  },
  {
    id: "stay-farm",
    name: "Tayabas Farm Stay Demo",
    type: "Accommodation",
    owner: "Demo Host",
    barangay: "Rural Tayabas",
    status: "needs_review",
    engagement: 39,
    offers: ["Overnight room", "Retreat package", "Breakfast add on"]
  },
  {
    id: "transport-terminal",
    name: "Local Transport Desk",
    type: "Transport",
    owner: "Demo Operator",
    barangay: "Terminal Area",
    status: "approved",
    engagement: 76,
    offers: ["Tricycle request", "Van inquiry", "Terminal pickup"]
  }
];

export const events: EventItem[] = [
  {
    id: "mayohan-demo",
    title: "Mayohan Festival Demo Listing",
    date: "2026-05-15",
    venue: "Tayabas City Proper",
    description: "Sample event listing for calendar, route recommendations, QR challenges, and merchant promos."
  },
  {
    id: "heritage-weekend",
    title: "Heritage Weekend Walk",
    date: "2026-06-08",
    venue: "Poblacion Heritage Loop",
    description: "Demo guided walk showing how tourism staff and guides can publish bookable activities."
  }
];

export const roleOrder: UserRole[] = [
  "tourist",
  "merchant",
  "guide",
  "transport",
  "accommodation",
  "event_organizer",
  "tourism_staff",
  "admin"
];

export const roleProfiles: Record<UserRole, RoleProfile> = {
  tourist: {
    role: "tourist",
    label: "Tourist",
    demoEmail: "tourist@lakbay.local",
    headline: "Plan, scan, earn, and discover more of Tayabas.",
    summary: "The tourist dashboard focuses on routes, QR check ins, points, badges, saved places, and local recommendations.",
    primaryActions: ["Open interactive map", "Scan LocalPass QR", "Build itinerary", "Browse food and pasalubong"],
    stats: [
      { label: "LocalPass Points", value: "155", hint: "earned from demo QR stops" },
      { label: "Visited Stops", value: "4", hint: "heritage and food locations" },
      { label: "Saved Coupons", value: "3", hint: "merchant promos ready to claim" }
    ],
    panels: [
      { title: "Recommended Route", items: ["Basilica", "Casa Comunidad", "Budin Trail", "Heritage Cafe"] },
      { title: "Unlocked Badges", items: ["Heritage Starter", "Food Explorer", "Pasalubong Hunter"] }
    ]
  },
  merchant: {
    role: "merchant",
    label: "Merchant",
    demoEmail: "food@lakbay.local",
    headline: "Manage products, promos, and visitor inquiries.",
    summary: "The merchant dashboard helps restaurants, cafes, and pasalubong sellers become discoverable in tourism routes.",
    primaryActions: ["Edit business listing", "Add product or bundle", "Create coupon", "Review inquiries"],
    stats: [
      { label: "Listing Views", value: "128", hint: "from tourist discovery cards" },
      { label: "Pending Orders", value: "7", hint: "preorder and pickup requests" },
      { label: "Coupon Claims", value: "24", hint: "LocalPass coupon scans" }
    ],
    panels: [
      { title: "Active Offers", items: ["Budin box preorder", "Family pasalubong bundle", "LocalPass discount"] },
      { title: "Recent Inquiries", items: ["2 pickup requests", "3 route recommendation clicks", "2 festival bundle questions"] }
    ]
  },
  guide: {
    role: "guide",
    label: "Tour Guide",
    demoEmail: "guide@lakbay.local",
    headline: "Publish tours and respond to booking requests.",
    summary: "The guide dashboard turns local knowledge into structured heritage walks, food tours, and educational packages.",
    primaryActions: ["Update guide profile", "Create tour package", "Review booking request", "View tourist feedback"],
    stats: [
      { label: "Tour Requests", value: "9", hint: "pending demo inquiries" },
      { label: "Profile Views", value: "61", hint: "from itinerary pages" },
      { label: "Rating", value: "4.8", hint: "demo feedback score" }
    ],
    panels: [
      { title: "Published Packages", items: ["Heritage Walk", "Food Crawl", "Student Educational Tour"] },
      { title: "Needs Action", items: ["Confirm Saturday group", "Add guide availability", "Upload profile photo"] }
    ]
  },
  transport: {
    role: "transport",
    label: "Transport Provider",
    demoEmail: "transport@lakbay.local",
    headline: "Receive local ride, terminal pickup, and route requests.",
    summary: "The transport dashboard connects visitors with local mobility providers without requiring a full ride hailing system for the MVP.",
    primaryActions: ["Set available routes", "Review ride requests", "Update contact number", "Post service notes"],
    stats: [
      { label: "Ride Requests", value: "12", hint: "terminal pickup and city tour" },
      { label: "Route Clicks", value: "76", hint: "from map and itinerary pages" },
      { label: "Accepted", value: "8", hint: "demo accepted requests" }
    ],
    panels: [
      { title: "Route Requests", items: ["Terminal to Basilica", "Food loop transfer", "Group van inquiry"] },
      { title: "Service Notes", items: ["Available 8 AM to 6 PM", "Group tour coordination", "Festival day routing"] }
    ]
  },
  accommodation: {
    role: "accommodation",
    label: "Accommodation Owner",
    demoEmail: "stay@lakbay.local",
    headline: "List rooms, farm stays, inns, and retreat packages.",
    summary: "The accommodation dashboard gives smaller stays a simple booking inquiry channel connected to tourist routes.",
    primaryActions: ["Edit stay listing", "Upload room photos", "Review booking inquiries", "Set room availability"],
    stats: [
      { label: "Booking Inquiries", value: "5", hint: "demo stay requests" },
      { label: "Listing Views", value: "39", hint: "from Stay Tayabas cards" },
      { label: "Available Rooms", value: "4", hint: "sample inventory" }
    ],
    panels: [
      { title: "Stay Offers", items: ["Overnight room", "Farm breakfast", "Retreat package"] },
      { title: "Guest Questions", items: ["Parking available", "Family room rate", "Check in time"] }
    ]
  },
  event_organizer: {
    role: "event_organizer",
    label: "Event Organizer",
    demoEmail: "events@lakbay.local",
    headline: "Publish events and connect them to routes and merchants.",
    summary: "The event dashboard helps promote festivals, guided walks, weekend markets, and special QR challenges.",
    primaryActions: ["Create event", "Add event route", "Invite merchants", "View registrations"],
    stats: [
      { label: "Published Events", value: "2", hint: "demo event calendar" },
      { label: "Interested Visitors", value: "46", hint: "event saves and clicks" },
      { label: "Partner Merchants", value: "6", hint: "food and pasalubong partners" }
    ],
    panels: [
      { title: "Upcoming Events", items: ["Mayohan Festival Demo", "Heritage Weekend Walk"] },
      { title: "Event Tools", items: ["QR challenge", "Merchant coupon bundle", "Visitor feedback form"] }
    ]
  },
  tourism_staff: {
    role: "tourism_staff",
    label: "Tourism Staff",
    demoEmail: "tourism@lakbay.local",
    headline: "Manage destinations, stories, QR codes, and tourism analytics.",
    summary: "The tourism staff dashboard serves as the city operations console for destination content, route curation, events, and insights.",
    primaryActions: ["Approve destination edits", "Generate QR content", "Publish itinerary", "View visitor analytics"],
    stats: [
      { label: "QR Scans", value: "342", hint: "across demo tourist spots" },
      { label: "Active Listings", value: "38", hint: "destinations and MSMEs" },
      { label: "Feedback Items", value: "21", hint: "tourist suggestions" }
    ],
    panels: [
      { title: "Content Queue", items: ["Review guide profile", "Approve farm stay listing", "Update Casa Comunidad story"] },
      { title: "Insights", items: ["Basilica has highest scans", "Food Loop drives merchant clicks", "QR rewards increase route completion"] }
    ]
  },
  admin: {
    role: "admin",
    label: "System Admin",
    demoEmail: "admin@lakbay.local",
    headline: "Control roles, approvals, audit logs, and platform settings.",
    summary: "The admin dashboard manages account permissions, user roles, listing moderation, data governance, and platform health.",
    primaryActions: ["Manage users", "Assign roles", "Review approvals", "Export reports"],
    stats: [
      { label: "Users", value: "86", hint: "demo users across roles" },
      { label: "Pending Approvals", value: "4", hint: "listings and profiles" },
      { label: "System Health", value: "Good", hint: "mock operational status" }
    ],
    panels: [
      { title: "Approval Queue", items: ["Tour guide profile", "Accommodation listing", "Merchant coupon", "New QR site"] },
      { title: "Governance", items: ["RLS enabled in Supabase", "Role based dashboards", "Audit logs planned"] }
    ]
  }
};

export const serviceModules = [
  {
    name: "Tourist Discovery",
    href: "/destinations",
    roles: ["Tourist", "Tourism Staff", "Admin"],
    description: "Destination stories, QR stops, itinerary cards, and map-ready tourism content."
  },
  {
    name: "Taste Trail",
    href: "/food",
    roles: ["Tourist", "Merchant", "Tourism Staff", "Admin"],
    description: "Food and pasalubong ordering with pickup, preorder, delivery request, and dine-in demo modes."
  },
  {
    name: "Stay Tayabas",
    href: "/stays",
    roles: ["Tourist", "Accommodation Owner", "Tourism Staff", "Admin"],
    description: "Accommodation discovery, Stay Match tags, booking requests, and host inbox actions."
  },
  {
    name: "Sakay Tayabas",
    href: "/transport",
    roles: ["Tourist", "Transport Provider", "Tourism Staff", "Admin"],
    description: "Vehicle requests, Route Buddy tourism packages, and provider queue status updates."
  },
  {
    name: "Kwentong Gabay",
    href: "/tours",
    roles: ["Tourist", "Tour Guide", "Tourism Staff", "Admin"],
    description: "Guide package requests and reusable story cards for heritage, food, bridge, and festival narratives."
  },
  {
    name: "Event Trip Builder",
    href: "/events",
    roles: ["Tourist", "Event Organizer", "Merchant", "Transport Provider", "Accommodation Owner", "Admin"],
    description: "Event listings that connect schedules to food, rides, stays, QR challenges, and spending options."
  },
  {
    name: "QR LocalPass Rewards",
    href: "/qr",
    roles: ["Tourist", "Merchant", "Tourism Staff", "Admin"],
    description: "QR check-ins, points, coupons, reward stamps, and destination storytelling."
  },
  {
    name: "Tourism Staff Console",
    href: "/dashboard?role=tourism_staff",
    roles: ["Tourism Staff", "Admin"],
    description: "Content approvals, QR story management, heat pulse insights, and field operations."
  },
  {
    name: "Admin Control Room",
    href: "/dashboard?role=admin",
    roles: ["Admin"],
    description: "Role management, audit logs, trust queue, platform settings, and demo governance."
  }
];

export const products = foodItems;

export const foodOrders = [
  {
    id: "FOOD-001",
    shop: "Tayabas Budin House",
    customer: "Demo Tourist",
    items: "Budin Box Preorder x2",
    mode: "Pickup",
    status: "Pending confirmation",
    routeTag: "Pasalubong Run"
  },
  {
    id: "FOOD-002",
    shop: "Heritage Cafe Tayabas",
    customer: "SLSU Student Group",
    items: "Heritage Snack Set x12",
    mode: "Dine-in reservation",
    status: "Preparing",
    routeTag: "Heritage Walk"
  },
  {
    id: "FOOD-003",
    shop: "Local Eats Demo Kitchen",
    customer: "Family Visitor",
    items: "Family Food Trip Bundle",
    mode: "Delivery request",
    status: "Ready for pickup",
    routeTag: "Family Day Tour"
  },
  {
    id: "FOOD-004",
    shop: "Tayabas Budin House",
    customer: "Weekend Visitor",
    items: "Pasalubong Bundle",
    mode: "Preorder",
    status: "Completed",
    routeTag: "Food Trip Ride"
  }
];

export const stayRooms = stayOptions.map((stay) => ({
  id: stay.id,
  property: stay.name,
  roomType: stay.room,
  stayType: stay.stayType,
  rate: stay.rate,
  location: stay.location,
  matchTags: stay.matchTags
}));

export const stayBookings = [
  {
    id: "STAY-001",
    guest: "Family Visitor",
    property: "Tayabas Farm Stay Demo",
    dates: "June 10 to 11, 2026",
    guests: 4,
    status: "Pending confirmation",
    action: "Confirm"
  },
  {
    id: "STAY-002",
    guest: "Pilgrim Couple",
    property: "Poblacion Heritage Inn",
    dates: "June 12 to 13, 2026",
    guests: 2,
    status: "Confirmed",
    action: "Send check-in instructions"
  },
  {
    id: "STAY-003",
    guest: "Barkada Group",
    property: "Barkada Homestay Hub",
    dates: "June 15 to 16, 2026",
    guests: 6,
    status: "Needs review",
    action: "Decline"
  }
];

export const vehiclePackages = [
  ...vehicleOptions,
  {
    id: "food-trip-ride",
    name: "Food Trip Ride",
    vehicleType: "Tricycle" as const,
    capacity: "1 to 3 passengers",
    route: "Cafe stop to Budin Trail to Local Eats Demo Kitchen",
    priceMode: "Driver confirms fare before trip",
    driverNote: "Built for visitors hopping between food partners.",
    routeBadge: "Taste Trail Rider"
  },
  {
    id: "pasalubong-stopover",
    name: "Pasalubong Stopover",
    vehicleType: "Tour Vehicle" as const,
    capacity: "2 to 6 passengers",
    route: "Heritage stop with pasalubong pickup before terminal drop-off",
    priceMode: "Quote request",
    driverNote: "Good for checkout day and last-stop shopping.",
    routeBadge: "Pasalubong Buddy"
  },
  {
    id: "group-van-day-tour",
    name: "Group Van Day Tour",
    vehicleType: "Group Shuttle" as const,
    capacity: "8 to 12 passengers",
    route: "Basilica, Casa Comunidad, Malagonlong Bridge, food loop, and stay transfer",
    priceMode: "Group day quote",
    driverNote: "Best for schools, families, and organized tours.",
    routeBadge: "Group Day Explorer"
  }
];

export const rideRequests = [
  {
    id: "RIDE-001",
    tourist: "Balikbayan Guest",
    package: "Heritage Trike Loop",
    pickup: "Casa Comunidad",
    destination: "Budin and Pasalubong Trail",
    passengers: 3,
    status: "Pending acceptance"
  },
  {
    id: "RIDE-002",
    tourist: "Family Visitor",
    package: "Terminal Pickup",
    pickup: "Tayabas Terminal",
    destination: "Poblacion Heritage Inn",
    passengers: 4,
    status: "Accepted"
  },
  {
    id: "RIDE-003",
    tourist: "Student Group",
    package: "Group Van Day Tour",
    pickup: "SLSU Gate",
    destination: "Malagonlong Bridge",
    passengers: 10,
    status: "Arrived"
  }
];

export const tourPackages = guidePackages.map((tour) => ({
  ...tour,
  storyCards: Array.from(new Set([...tour.storyCards, "Malagonlong Bridge story", "Festival story"]))
}));

export const tourRequests = [
  {
    id: "TOUR-001",
    group: "SLSU Student Group",
    package: "Kwentong Tayabas Heritage Walk",
    date: "June 10, 2026",
    groupSize: 12,
    meetingPoint: "Basilica entrance",
    status: "Pending guide confirmation"
  },
  {
    id: "TOUR-002",
    group: "Weekend Family",
    package: "Taste Trail Food Crawl",
    date: "June 15, 2026",
    groupSize: 5,
    meetingPoint: "Food Loop marker",
    status: "Confirmed"
  }
];

export const eventTripBuilders = [
  {
    id: "EVENT-BUILDER-001",
    event: "Heritage Weekend Walk",
    schedule: "June 8, 2026, 8:00 AM",
    venue: "Poblacion Heritage Loop",
    eventQr: "EVT-HERITAGE-2026",
    nearbyFood: "Heritage Snack Set",
    nearbyRide: "Heritage Trike Loop",
    nearbyStay: "Poblacion Heritage Inn",
    qrChallenge: "Scan Basilica, Casa Comunidad, and Budin Trail"
  },
  {
    id: "EVENT-BUILDER-002",
    event: "Mayohan Festival Demo Listing",
    schedule: "May 15, 2026, 5:00 PM",
    venue: "Tayabas City Proper",
    eventQr: "EVT-MAYOHAN-2026",
    nearbyFood: "Family Food Trip Bundle",
    nearbyRide: "Terminal Pickup",
    nearbyStay: "Barkada Homestay Hub",
    qrChallenge: "Complete event QR and merchant coupon bundle"
  }
];

export const mobileRoleScreens = roleOrder.map((role) => ({
  role,
  label: roleExperiences[role].label,
  screenName: roleExperiences[role].mobileName,
  access: roleExperiences[role].mobileFeatures,
  quickActions: roleExperiences[role].quickActions.map((action) => action.label)
}));

export const adminTrustQueue = [
  { id: "TRUST-001", item: "New transport provider", risk: "Verification needed", status: "Review today" },
  { id: "TRUST-002", item: "Duplicate homestay listing", risk: "Possible duplicate", status: "Merge suggested" },
  { id: "TRUST-003", item: "Reported guide profile", risk: "Tourist feedback", status: "Cleared after review" }
];

export const tourismHeatPulse = [
  { label: "Basilica QR scans", value: "142", trend: "Highest this week" },
  { label: "Food Loop clicks", value: "96", trend: "Driving merchant visits" },
  { label: "Stay Match inquiries", value: "18", trend: "Family rooms leading" },
  { label: "Route Buddy requests", value: "24", trend: "Terminal pickup rising" }
];

export { demoRequests, experienceItems, roleExperiences, stayOptions, tripStyles };
export type { DemoRequest };
