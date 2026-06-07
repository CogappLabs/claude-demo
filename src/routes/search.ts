import { Hono } from "hono";
import { searchArtworks } from "../search";

export const searchRoutes = new Hono();

/**
 * GET /search?q=<query>
 *
 * Returns matching artworks plus a total count. An empty or missing `q`
 * returns the full collection.
 */
searchRoutes.get("/search", (c) => {
  const q = c.req.query("q") ?? "";
  const results = searchArtworks(q);
  return c.json({ query: q, total: results.length, results });
});
