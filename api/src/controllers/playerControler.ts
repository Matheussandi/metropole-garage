import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../utils/prismaClient";
import { PlayerProps } from "../models/player";

export async function createPlayer(
  request: FastifyRequest<{ Body: PlayerProps }>,
  reply: FastifyReply
) {
  const { id, name } = request.body;

  try {
    const existingPlayer = await prisma.player.findUnique({
      where: { id: id },
    });

    if (existingPlayer) {
      reply.send();
      return;
    }

    const player = await prisma.player.create({
      data: {
        id: id,
        name: name,
      },
    });

    reply.send(player);
  } catch (error) {
    reply.status(500).send({ error: "Erro ao registrar jogador." });
  }
}

export async function getPlayers(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const players = await prisma.player.findMany();
    reply.send(players);
  } catch (error) {
    reply.status(500).send({ error: "Erro ao listar jogadores." });
  }
}