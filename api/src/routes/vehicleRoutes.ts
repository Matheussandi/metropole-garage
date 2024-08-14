import { FastifyInstance } from "fastify";
import VehicleController from "../controllers/VehicleController";

export default async function vehicleRoutes(app: FastifyInstance) {
  app.get("/vehicles", VehicleController.getAllVehicles);
  app.get("/vehicle", VehicleController.getCarByPlate);
  app.post('/vehicles/respawn', VehicleController.respawnCar);
  app.post('/vehicles/assign', VehicleController.assignCarToPlayer);
}