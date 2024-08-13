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

export async function getPlayer(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = request.params;

  try {
    const playerId = parseInt(id);
    if (isNaN(playerId)) {
      throw new Error('ID do jogador inválido');
    }

    const player = await prisma.player.findUnique({
      where: { id: playerId },
    });

    if (!player) {
      reply.status(404).send({ error: "Jogador não encontrado." });
      return;
    }

    reply.send(player);
  } catch (error) {
    console.error('Erro ao obter jogador:', error);
    reply.status(500).send({ error: "Erro ao obter jogador." });
  }
}

export async function updatePlayerAdminStatus(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = request.params;

  try {
    const playerId = parseInt(id);
    if (isNaN(playerId)) {
      throw new Error('ID do jogador inválido');
    }

    // Verifica se o jogador existe
    const existingPlayer = await prisma.player.findUnique({
      where: { id: playerId },
    });

    if (!existingPlayer) {
      reply.status(404).send({ error: "Jogador não encontrado." });
      return;
    }

    // Alterna o status de administrador
    const newAdminStatus = !existingPlayer.isAdmin;

    const player = await prisma.player.update({
      where: { id: playerId },
      data: { isAdmin: newAdminStatus },
    });

    reply.send({ isAdmin: newAdminStatus });
  } catch (error) {
    console.error('Erro ao atualizar status de administrador:', error);
    reply.status(500).send({ error: "Erro ao atualizar status de administrador." });
  }
}