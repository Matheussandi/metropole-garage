import { FastifyInstance } from "fastify";
import { createPlayer, getPlayers, updatePlayerAdminStatus, getPlayer } from "../controllers/playerControler";

export default async function playerRoutes(app: FastifyInstance) {
  app.post("/players", createPlayer);
  app.get("/players", getPlayers);
  app.get("/players/:id", getPlayer); // Nova rota para obter jogador
  app.patch("/players/:id/admin", updatePlayerAdminStatus);
}