import { FastifyInstance } from "fastify";
import { getAllVehicles, getCarByPlate } from "../controllers/VehicleController";

export default async function routes(fastify: FastifyInstance) {
  fastify.get("/vehicles", getAllVehicles);
  fastify.get("/vehicle", getCarByPlate);
}