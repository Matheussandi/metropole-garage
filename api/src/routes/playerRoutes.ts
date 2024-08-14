import { FastifyInstance } from "fastify";
import PlayerController from "../controllers/playerControler";

export default async function playerRoutes(app: FastifyInstance) {
  app.post("/players", PlayerController.createPlayer);
  app.get("/players", PlayerController.getPlayers);
  app.get("/players/:id", PlayerController.getPlayer);
  app.get("/players/:id/vehicles", PlayerController.getPlayerVehicles);
  app.patch("/players/:id/admin", PlayerController.updatePlayerAdminStatus);
}