import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../utils/prismaClient";
import { GetCarByPlateQuery } from "../models/vehicle";

export async function getCarByPlate(
  request: FastifyRequest<{ Querystring: GetCarByPlateQuery }>,
  reply: FastifyReply
) {
  const { plate } = request.query;

  try {
    const vehicle = await prisma.vehicle.findUnique({
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

export async function getAllVehicles(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const vehicles = await prisma.vehicle.findMany();
    reply.send(vehicles);
  } catch (error) {
    reply.status(500).send({ error: "Erro ao buscar veículos." });
  }
}
