export type PageId =
  | 'home'
  | 'our-world'
  | 'the-retreat'
  | 'suites'
  | 'suite-details'
  | 'experiences'
  | 'dining'
  | 'gallery'
  | 'reservations'
  | 'contact';

export interface Suite {
  id: string;
  name: string;
  subtitle: string;
  category: 'cliff-villa' | 'master-pavilion' | 'penthouse-sanctuary';
  categoryLabel: string;
  headline: string;
  description: string;
  editorialQuote: string;
  specs: {
    indoorSqFt: number;
    terraceSqFt: number;
    bedrooms: number;
    bathrooms: number;
    maxGuests: number;
    poolLengthMeters: number;
    view: string;
    level: string;
  };
  features: string[];
  amenities: {
    title: string;
    items: string[];
  }[];
  pricePerNight: number;
  featured: boolean;
  images: {
    hero: string;
    gallery: string[];
    caption: string;
  };
}

export interface Experience {
  id: string;
  title: string;
  tagline: string;
  category: 'wellness' | 'ocean' | 'culinary' | 'astronomy';
  categoryLabel: string;
  duration: string;
  curator: string;
  description: string;
  highlights: string[];
  image: string;
  inclusions: string[];
  schedule: string;
}

export interface DiningVenue {
  id: string;
  name: string;
  concept: string;
  executiveChef: string;
  hours: string;
  dressCode: string;
  atmosphere: string;
  description: string;
  image: string;
  menuHighlights: {
    category: string;
    items: {
      name: string;
      description: string;
      winePairing?: string;
      signature?: boolean;
    }[];
  }[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'architecture' | 'suites' | 'coastline' | 'gastronomy' | 'wellness';
  categoryLabel: string;
  location: string;
  image: string;
  caption: string;
  cameraInfo?: string;
}

export interface ReservationFormData {
  arrivalDate: string;
  departureDate: string;
  adults: number;
  children: number;
  suiteId: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  transferPreference: 'helicopter' | 'maybach' | 'yacht' | 'independent';
  specialRequests: string;
  dietaryNotes: string;
  butlerServiceRequested: boolean;
}
