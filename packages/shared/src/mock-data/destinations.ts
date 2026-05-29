import type { Destination } from "../types";

export const destinations: Destination[] = [
  {
    id: "basilica",
    name: "Minor Basilica of Saint Michael the Archangel",
    category: "faith",
    description: "A landmark church and anchor for a Tayabas heritage walk.",
    story: "The Basilica is one of Tayabas' strongest heritage anchors, connecting faith, civic history, and walkable local stops.",
    locationLabel: "Poblacion",
    tags: ["faith", "heritage", "walkable"],
    points: 25,
    qrCode: "LLP:TAYABAS:BASILICA",
    featured: true
  },
  {
    id: "casa-comunidad",
    name: "Casa Comunidad de Tayabas",
    category: "heritage",
    description: "A civic heritage structure for history and student tours.",
    story: "Casa Comunidad opens stories about old Tayabas civic life, public memory, and local preservation.",
    locationLabel: "Poblacion",
    tags: ["history", "students"],
    points: 25,
    qrCode: "LLP:TAYABAS:CASA_COMUNIDAD",
    featured: true
  },
  {
    id: "malagonlong-bridge",
    name: "Malagonlong Bridge",
    category: "heritage",
    description: "A historic stone bridge and photo stop for heritage routes.",
    story: "Malagonlong Bridge shows the engineering and route history that shaped movement around Tayabas.",
    locationLabel: "Tayabas heritage route",
    tags: ["bridge", "photo stop"],
    points: 25,
    qrCode: "LLP:TAYABAS:MALAGONLONG"
  },
  {
    id: "calle-budin",
    name: "Calle Budin",
    category: "pasalubong",
    description: "A local pasalubong stop centered on budin and delicacies.",
    story: "Calle Budin connects visitors to makers, pasalubong culture, and pickup-friendly local spending.",
    locationLabel: "City proper",
    tags: ["budin", "pasalubong"],
    points: 25,
    qrCode: "LLP:TAYABAS:CALLE_BUDIN"
  },
  {
    id: "kamay-ni-hesus-route",
    name: "Kamay ni Hesus Pilgrimage Route",
    category: "faith",
    description: "A faith-based route connector for pilgrim visitors.",
    story: "This route helps visitors connect nearby pilgrimage travel with Tayabas food, stories, and stays.",
    locationLabel: "Pilgrim route connector",
    tags: ["faith", "family"],
    points: 25,
    qrCode: "LLP:TAYABAS:KAMAY_NI_HESUS"
  },
  {
    id: "tayabas-food-trail",
    name: "Tayabas Food Trail Stop",
    category: "food",
    description: "A food discovery stop for local meals, snacks, and cafes.",
    story: "The food trail highlights small food sellers as part of the tourism experience.",
    locationLabel: "City food loop",
    tags: ["food", "local flavor"],
    points: 15,
    featured: true
  },
  {
    id: "local-pasalubong-stop",
    name: "Tayabas Local Pasalubong Stop",
    category: "pasalubong",
    description: "A pickup-friendly stop for bundles and local delicacies.",
    story: "Pasalubong stops help spread visitor spending to local makers.",
    locationLabel: "Poblacion pickup area",
    tags: ["shopping", "pickup"],
    points: 15
  },
  {
    id: "heritage-walk-route",
    name: "Local Heritage Walk Route",
    category: "tour",
    description: "A suggested guided walk through key Tayabas stories.",
    story: "The route ties public spaces, faith sites, civic stories, and local snacks into one mobile journey.",
    locationLabel: "Poblacion loop",
    tags: ["tour", "walk"],
    points: 20
  },
  {
    id: "tayabas-heritage-plaza",
    name: "Tayabas Heritage Plaza",
    category: "heritage",
    description: "A civic open space for orientation, photos, and short heritage stops.",
    story: "The plaza gives visitors a simple starting point for seeing how daily Tayabas life connects to public heritage spaces.",
    locationLabel: "City plaza",
    tags: ["heritage", "orientation"],
    points: 15,
    qrCode: "LLP:TAYABAS:PLAZA"
  }
];
