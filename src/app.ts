import { Hono } from "hono";
import { artworkRoutes } from "./routes/artwork";
import { searchRoutes } from "./routes/search";

/**
 * The Hono app. Kept separate from the server entrypoint (`server.ts`) so
 * tests can import and exercise it without binding a port.
 */
export const app = new Hono();

app.get("/", (c) =>
  c.json({
    name: "claude-demo artwork API",
    endpoints: ["GET /search?q=", "GET /artwork/:id"],
  }),
);

app.route("/", searchRoutes);
app.route("/", artworkRoutes);
