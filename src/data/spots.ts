export interface FoodSpot {
  id: string;
  name: string;
  address: string;
  recommendation: string;
  reason: string;
  videoUrl: string;
  emoji: string;
  iconUrl?: string;
  position: { lat: number; lng: number };
}

export const myFavoriteSpots: FoodSpot[] = [
  {
    id: 'school',
    name: 'Friends Seminary',
    address: '222 East 16th Street',
    recommendation: '',
    reason: '',
    videoUrl: '',
    emoji: '',
    position: { lat: 40.734165106611755, lng: -73.98509066176852 }
  },
   {
    id: '1',
    name: "Nishaan",
    address: "160 1st Avenue",
    recommendation: "Pakistani Chopped Cheese",
    reason: "DESCRIPTION GOES HERE",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    emoji: "🇵🇰",
    position: { lat: 40.72867177952548, lng: -73.98432854827728 }
  },
  {
    id: '2',
    name: "Pizzazz",
    address: "38 Union Square East",
    recommendation: "Sweet & Spicy Pizza",
    reason: "DESCRIPTION GOES HERE",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    emoji: "🍕",
    position: { lat: 40.736247102031946, lng: -73.98913454827682 }
  },
  {
    id: '3',
    name: "Mini Gourmet Deli",
    address: "230 E 14th Street",
    recommendation: "Beef Empanada",
    reason: "DESCRIPTION GOES HERE",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    emoji: "🥟",
    position: { lat: 40.73270795943661, lng: -73.98614114827704 }
  }
];