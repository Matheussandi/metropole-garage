import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../utils/prismaClient";
import { GetCarByPlateQuery } from "../models/vehicle";

import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter();

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

export async function respawnCar(
  request: FastifyRequest<{ Body: { plate: string } }>,
  reply: FastifyReply
) {
  const { plate } = request.body;

  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { plate: plate },
    });

    if (vehicle) {
      eventEmitter.emit('spawnCarFromUI', vehicle);
      
      reply.send({ success: true });
    } else {
      reply.status(404).send({ error: "Veículo não encontrado." });
    }
  } catch (error) {
    reply.status(500).send({ error: "Erro ao respawnar veículo." });
  }
}
