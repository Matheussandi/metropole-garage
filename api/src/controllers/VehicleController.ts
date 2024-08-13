import { FastifyReply, FastifyRequest } from "fastify";
import { GetCarByPlateQuery } from "../models/vehicle";
import prismaClient from "../utils/prismaClient";

class VehicleController {
  async getCarByPlate(request: FastifyRequest<{ Querystring: GetCarByPlateQuery }>, reply: FastifyReply) {
    const { plate } = request.query;

    try {
      const vehicle = await prismaClient.vehicle.findUnique({
        where: { plate: plate },
      });

      if (vehicle) {
        reply.send(vehicle);
      } else {
        reply.status(404).send({ error: "Veículo não encontrado." });
      }
    } catch (error) {
      reply.status(500).send({ error: "Erro ao buscar veículo." });
    }
  }

  async getAllVehicles(request: FastifyRequest, reply: FastifyReply) {
    try {
      const vehicles = await prismaClient.vehicle.findMany();
      reply.send(vehicles);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao buscar veículos." });
    }
  }

  async respawnCar(request: FastifyRequest<{ Body: { plate: string } }>, reply: FastifyReply) {
    const { plate } = request.body;

    try {
      const vehicle = await prismaClient.vehicle.findUnique({
        where: { plate: plate },
      });

      if (vehicle) {      
        reply.send({ success: true });
      } else {
        reply.status(404).send({ error: "Veículo não encontrado." });
      }
    } catch (error) {
      reply.status(500).send({ error: "Erro ao respawnar veículo." });
    }
  }

  async assignCarToPlayer(request: FastifyRequest<{ Body: { playerId: number, plate: string } }>, reply: FastifyReply) {
    const { playerId, plate } = request.body;

    try {
      const vehicle = await prismaClient.vehicle.findUnique({
        where: { plate: plate },
      });

      if (!vehicle) {
        reply.status(404).send({ error: "Veículo não encontrado." });
        return;
      }

      const updatedVehicle = await prismaClient.vehicle.update({
        where: { plate: plate },
        data: { playerId: playerId },
      });

      reply.send({ success: true, vehicle: updatedVehicle });
    } catch (error) {
      reply.status(500).send({ error: "Erro ao atribuir veículo ao jogador." });
    }
  }
}

export default new VehicleController();