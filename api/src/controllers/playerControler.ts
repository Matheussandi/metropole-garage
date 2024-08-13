import { FastifyReply, FastifyRequest } from "fastify";
import { PlayerProps } from "../models/player";
import prismaClient from "../utils/prismaClient";

class PlayerController {
  async createPlayer(request: FastifyRequest<{ Body: PlayerProps }>, reply: FastifyReply) {
    const { id, name } = request.body;

    try {
      const existingPlayer = await prismaClient.player.findUnique({
        where: { id: id },
      });

      if (existingPlayer) {
        reply.send();
        return;
      }

      const player = await prismaClient.player.create({
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

  async getPlayers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const players = await prismaClient.player.findMany();
      reply.send(players);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao listar jogadores." });
    }
  }

  async getPlayer(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = request.params;

    try {
      const playerId = parseInt(id);
      if (isNaN(playerId)) {
        throw new Error('ID do jogador inválido');
      }

      const player = await prismaClient.player.findUnique({
        where: { id: playerId },
        include: { vehicle: true },
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

  async updatePlayerAdminStatus(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = request.params;

    try {
      const playerId = parseInt(id);
      if (isNaN(playerId)) {
        throw new Error('ID do jogador inválido');
      }

      const existingPlayer = await prismaClient.player.findUnique({
        where: { id: playerId },
      });

      if (!existingPlayer) {
        reply.status(404).send({ error: "Jogador não encontrado." });
        return;
      }

      const newAdminStatus = !existingPlayer.isAdmin;

      const player = await prismaClient.player.update({
        where: { id: playerId },
        data: { isAdmin: newAdminStatus },
      });

      reply.send({ isAdmin: newAdminStatus });
    } catch (error) {
      console.error('Erro ao atualizar status de administrador:', error);
      reply.status(500).send({ error: "Erro ao atualizar status de administrador." });
    }
  }

  async getPlayerVehicles(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = request.params;

    try {
      const playerId = parseInt(id);
      if (isNaN(playerId)) {
        throw new Error('ID do jogador inválido');
      }

      const vehicles = await prismaClient.vehicle.findMany({
        where: { playerId: playerId },
      });

      reply.send(vehicles);
    } catch (error) {
      console.error('Erro ao obter veículos do jogador:', error);
      reply.status(500).send({ error: "Erro ao obter veículos do jogador." });
    }
  }
}

export default new PlayerController();