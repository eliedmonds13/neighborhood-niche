export interface FoodSpot {
  id: string;
  name: string;
  reason: string;
  videoUrl: string;
  emoji: string; // Add this!
  position: { lat: number; lng: number };
}

export const myFavoriteSpots: FoodSpot[] = [
  {
    id: '1',
    name: "Joe's Pizza",
    reason: "Best thin crust around!",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    emoji: "🍕",
    position: { lat: 40.730, lng: -73.997 }
  },
  {
    id: '2',
    name: "Noodle House",
    reason: "The owner makes the noodles by hand every morning.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    emoji: "🍜",
    position: { lat: 40.732, lng: -73.999 }
  }
];