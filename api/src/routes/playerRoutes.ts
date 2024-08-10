import { FastifyInstance } from "fastify";
import { createPlayer, getPlayers } from "../controllers/playerControler";

export default async function playerRoutes(app: FastifyInstance) {
  app.post("/players", createPlayer);
  app.get("/players", getPlayers);
}