/**
 * Search over the artwork fixtures.
 *
 * A plain substring filter across the title and artist fields. No ranking,
 * no pagination, no fuzzy matching: the smallest thing that behaves like a
 * search endpoint.
 */

import { type Artwork, artworks } from "./data/artworks";

/**
 * Return every artwork whose title or artist contains the query string.
 * An empty query returns everything.
 */
export function searchArtworks(query: string): Artwork[] {
  const q = query.trim();
  if (q === "") return artworks;

  return artworks.filter((art) => {
    const haystack = `${art.title} ${art.artist}`;
    return haystack.includes(q);
  });
}

/** Look up a single artwork by id. Returns undefined if not found. */
export function getArtwork(id: string): Artwork | undefined {
  return artworks.find((art) => art.id === id);
}
