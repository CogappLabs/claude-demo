/**
 * Fixture data for the demo artwork API.
 *
 * This is the entire "database": an in-memory array of fake artworks. No
 * Elasticsearch, no external service, no secrets. Editing this file is the
 * only way to change what the API returns.
 */

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: number;
  medium: string;
  department: string;
}

export const artworks: Artwork[] = [
  {
    id: "1",
    title: "Water Lilies",
    artist: "Claude Monet",
    year: 1906,
    medium: "Oil on canvas",
    department: "European Paintings",
  },
  {
    id: "2",
    title: "The Starry Night",
    artist: "Vincent van Gogh",
    year: 1889,
    medium: "Oil on canvas",
    department: "European Paintings",
  },
  {
    id: "3",
    title: "Composition VIII",
    artist: "Wassily Kandinsky",
    year: 1923,
    medium: "Oil on canvas",
    department: "Modern Art",
  },
  {
    id: "4",
    title: "The Great Wave off Kanagawa",
    artist: "Katsushika Hokusai",
    year: 1831,
    medium: "Woodblock print",
    department: "Asian Art",
  },
  {
    id: "5",
    title: "Girl with a Pearl Earring",
    artist: "Johannes Vermeer",
    year: 1665,
    medium: "Oil on canvas",
    department: "European Paintings",
  },
  {
    id: "6",
    title: "The Persistence of Memory",
    artist: "Salvador Dalí",
    year: 1931,
    medium: "Oil on canvas",
    department: "Modern Art",
  },
  {
    id: "7",
    title: "Impression, Sunrise",
    artist: "Claude Monet",
    year: 1872,
    medium: "Oil on canvas",
    department: "European Paintings",
  },
  {
    id: "8",
    title: "The Kiss",
    artist: "Gustav Klimt",
    year: 1908,
    medium: "Oil and gold leaf on canvas",
    department: "Modern Art",
  },
  {
    id: "9",
    title: "Sunflowers",
    artist: "Vincent van Gogh",
    year: 1888,
    medium: "Oil on canvas",
    department: "European Paintings",
  },
  {
    id: "10",
    title: "The Birth of Venus",
    artist: "Sandro Botticelli",
    year: 1486,
    medium: "Tempera on canvas",
    department: "European Paintings",
  },
  {
    id: "11",
    title: "Nighthawks",
    artist: "Edward Hopper",
    year: 1942,
    medium: "Oil on canvas",
    department: "American Art",
  },
  {
    id: "12",
    title: "Rouen Cathedral, Façade",
    artist: "Claude Monet",
    year: 1894,
    medium: "Oil on canvas",
    department: "European Paintings",
  },
];
