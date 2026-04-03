export type TouristSpot = {
  id: string;
  name: string;
  image: string;
  shortDescription: string;
  details: string;
};

export type LocalFood = {
  id: string;
  name: string;
  image: string;
  description: string;
};

export const place = {
  name: "Villanueva",
  tagline: "Discover the Hidden Beauty of Villanueva",
  history:
    "Nestled between emerald mountains and a sunlit coast, Villanueva started as a small riverside settlement known for its bamboo craft and healing hot springs. Over centuries, it became a vibrant hometown where tradition and modern creativity grow side by side.",
};

export const touristSpots: TouristSpot[] = [
  {
    id: "mistfall-canyon",
    name: "Mistfall Canyon",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80",
    shortDescription: "A dramatic canyon with layered waterfalls and cloud-kissed cliffs.",
    details:
      "Mistfall Canyon is best visited at sunrise, when light pierces through the mist and paints the cliffs in gold. Visitors can take a 40-minute trail to the lower deck or continue to the ridge for panoramic views.",
  },
  {
    id: "old-lighthouse",
    name: "Serrano Lighthouse",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
    shortDescription: "A heritage landmark overlooking the bay near Villanueva.",
    details:
      "Built in 1892, Serrano Lighthouse stands as a symbol of Villanueva's maritime history. The top deck offers sweeping views of the bay and is a favorite spot for sunset photography.",
  },
  {
    id: "everpine-forest",
    name: "Everpine Forest Trail",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=80",
    shortDescription: "A pine-scented trail with hanging bridges and quiet picnic corners.",
    details:
      "Everpine Forest Trail winds through giant pines, moss-covered rocks, and natural creeks. Guided eco-walks share stories about local wildlife and conservation efforts.",
  },
  {
    id: "market-square",
    name: "Luna Market Square",
    image:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1400&q=80",
    shortDescription: "The cultural heart of town filled with crafts, music, and flavors.",
    details:
      "From handwoven textiles to evening street performances, Luna Market Square is where visitors meet artisans and taste Villanueva's iconic street cuisine.",
  },
];

export const foods: LocalFood[] = [
  {
    id: "amber-braised-pork",
    name: "Amber-Braised Pork",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=80",
    description: "Slow-cooked pork glazed in palm sugar, citrus zest, and village spices.",
  },
  {
    id: "coastal-herb-soup",
    name: "Coastal Herb Soup",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1400&q=80",
    description: "A light, aromatic broth with river fish, ginger, and mountain herbs.",
  },
  {
    id: "sunstone-rice-cake",
    name: "Sunstone Rice Cake",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1400&q=80",
    description: "Sticky rice cake wrapped in leaves, filled with coconut and cacao nibs.",
  },
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1400&q=80",
];
