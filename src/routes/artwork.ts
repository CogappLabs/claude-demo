import { Hono } from "hono";
import { getArtwork } from "../search";

export const artworkRoutes = new Hono();

/**
 * GET /artwork/:id
 *
 * Returns a single artwork, or 404 if no artwork has that id.
 */
artworkRoutes.get("/artwork/:id", (c) => {
  const id = c.req.param("id");
  const art = getArtwork(id);
  if (!art) {
    return c.json({ error: `No artwork with id ${id}` }, 404);
  }
  return c.json(art);
});
